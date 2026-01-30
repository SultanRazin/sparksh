import { useState, useEffect, useRef } from "react";
import { resolve } from "path";
import log from "../utils/logger";
import { getJarPath, detectSparkVersion } from "../lib/embeddedJar";
import { sparkArgs } from "../lib/sparkArgs";
import { addCommLog } from "../lib/commLog";
import type { Status, HistoryEntry, Progress, SparkInfo, DebugInfo } from "../types";

let JAR_PATH = "";
let DETECTED_SPARK_VERSION = "";

export async function initJarPath() {
  DETECTED_SPARK_VERSION = detectSparkVersion();
  JAR_PATH = await getJarPath();
  log("Detected Spark version:", DETECTED_SPARK_VERSION);
  log("Using JAR:", JAR_PATH);
}

export function useSpark() {
  const [status, setStatus] = useState<Status>("starting");
  const [storedHistory, setStoredHistory] = useState<HistoryEntry[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<Progress>(null);
  const [sparkInfo, setSparkInfo] = useState<SparkInfo>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    detectedSparkVersion: "",
    jarPath: "",
    sparkHome: "",
    javaHome: "",
    command: "",
    stderr: "",
  });
  const stdinRef = useRef<import("bun").FileSink | null>(null);
  const pendingRef = useRef<((res: any) => void) | null>(null);

  const homeDir = process.env.HOME || "";
  const filePath = resolve(homeDir, ".scala_history");

  useEffect(() => {
    (async () => {
      try {
        const file = Bun.file(filePath);
        const data = await file.text();
        const lines = data.split("\n").filter((line) => line.trim());
        log("Read history file with", lines.length, "lines");
        setStoredHistory(
          lines.map((line) => ({ code: line, output: "", isError: false })),
        );
      } catch (error) {
        log("Error reading the file:", error);
      }
    })();
  }, []);

  useEffect(() => {
    const cmd = ["spark-submit", ...sparkArgs, "--class", "Main", JAR_PATH];
    log("Spawning:", cmd.join(" "));

    setDebugInfo({
      detectedSparkVersion: DETECTED_SPARK_VERSION,
      jarPath: JAR_PATH,
      sparkHome: process.env.SPARK_HOME || "(not set)",
      javaHome: process.env.JAVA_HOME || "(not set)",
      command: cmd.join(" "),
      stderr: "",
    });

    const proc = Bun.spawn(cmd, {
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
    });

    stdinRef.current = proc.stdin;

    let stderrBuffer = "";
    const stderrReader = proc.stderr.getReader();
    (async () => {
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await stderrReader.read();
        if (done) break;
        stderrBuffer += decoder.decode(value, { stream: true });
        if (stderrBuffer.length > 5000) {
          stderrBuffer = stderrBuffer.slice(-5000);
        }
        setDebugInfo((prev) => ({ ...prev, stderr: stderrBuffer }));
      }
    })();

    const reader = proc.stdout.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    (async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          addCommLog("recv", line);
          try {
            const res = JSON.parse(line);
            if (res.type === "progress") {
              setProgress({
                stageId: res.stageId,
                stageName: res.stageName,
                totalTasks: res.totalTasks,
                completedTasks: res.completedTasks,
                activeTasks: res.activeTasks,
              });
            } else if (res.status === "ready") {
              setSparkInfo({
                sparkVersion: res.sparkVersion ?? "unknown",
                scalaVersion: res.scalaVersion ?? "unknown",
                master: res.master ?? "unknown",
              });
              setStatus("ready");
            } else if (res.status === "bye") setStatus("stopped");
            else if (pendingRef.current) {
              pendingRef.current(res);
              pendingRef.current = null;
            }
          } catch {}
        }
      }
      setStatus("stopped");
    })();

    proc.exited.then((exitCode) => {
      if (exitCode !== 0) {
        setStatus("error");
        setError(`Process exited with code ${exitCode}`);
      }
    });

    return () => proc.kill();
  }, []);

  const request = <T>(cmd: object): Promise<T> => {
    return new Promise((resolve) => {
      pendingRef.current = resolve;
      const json = JSON.stringify(cmd);
      addCommLog("send", json);
      stdinRef.current?.write(json + "\n");
      stdinRef.current?.flush();
    });
  };

  const evaluate = async (code: string) => {
    setStatus("executing");
    setProgress(null);
    const res = await request<{ status: string; output?: string }>({
      cmd: "eval",
      code,
    });
    setHistory((h) => [
      ...h,
      { code, output: res.output ?? "", isError: res.status === "error" },
    ]);
    setProgress(null);
    setStatus("ready");

    try {
      await Bun.write(
        filePath,
        (await Bun.file(filePath).text()) + code + "\n",
      );
    } catch {}

    return res;
  };

  const complete = async (code: string, cursor?: number) => {
    const effectiveCursor = cursor ?? code.trimEnd().length;
    const res = await request<{ completions: string[]; cursor: number }>({
      cmd: "complete",
      code,
      cursor: effectiveCursor,
    });
    const unique = [...new Set(res.completions?.filter((c) => c.trim()) ?? [])];
    return { completions: unique, cursor: res.cursor };
  };

  return { status, history, storedHistory, error, progress, sparkInfo, debugInfo, evaluate, complete };
}
