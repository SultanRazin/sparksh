import { useState, useEffect, useRef } from "react";
import { resolve } from "path";
import log from "./logger.ts";
import { getJarPath } from "./embeddedJar.ts";

let JAR_PATH = "";

export async function initJarPath() {
  JAR_PATH = await getJarPath();
  log("Using JAR:", JAR_PATH);
}

export function parseSparkArgs(): string[] {
  const args = process.argv.slice(2);
  const sparkArgs: string[] = [];

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (
      arg.startsWith("--conf") ||
      arg.startsWith("--jars") ||
      arg.startsWith("--packages") ||
      arg.startsWith("--driver-memory") ||
      arg.startsWith("--executor-memory") ||
      arg.startsWith("--master") ||
      arg.startsWith("--deploy-mode") ||
      arg.startsWith("--driver-class-path") ||
      arg.startsWith("--driver-java-options") ||
      arg.startsWith("--files") ||
      arg.startsWith("--py-files") ||
      arg.startsWith("--archives")
    ) {
      if (arg.includes("=")) {
        sparkArgs.push(arg);
        i++;
      } else if (i + 1 < args.length) {
        sparkArgs.push(arg, args[i + 1]);
        i += 2;
      } else {
        i++;
      }
    } else if (arg === "--help" || arg === "-h") {
      console.log(`SparkSH - Interactive Spark Shell with TUI

Usage: sparksh [options]

Options (passed to spark-submit):
  --master MASTER_URL     spark://host:port, local, yarn, etc.
  --conf KEY=VALUE        Spark configuration property
  --jars JARS             Comma-separated list of JARs
  --packages PACKAGES     Comma-separated list of Maven coordinates
  --driver-memory MEM     Memory for driver (e.g., 1g, 2g)
  --executor-memory MEM   Memory per executor (e.g., 1g, 2g)
  --files FILES           Comma-separated list of files
  --driver-class-path     Extra classpath for driver
  --driver-java-options   Extra Java options for driver

Examples:
  sparksh --master local[4]
  sparksh --conf spark.sql.shuffle.partitions=10
  sparksh --jars /path/to/custom.jar
  sparksh --packages org.apache.spark:spark-avro_2.13:4.0.0
`);
      process.exit(0);
    } else {
      i++;
    }
  }

  return sparkArgs;
}

export const sparkArgs = parseSparkArgs();

export type Status = "starting" | "ready" | "executing" | "error" | "stopped";
export type HistoryEntry = { code: string; output: string; isError: boolean };
export type Progress = {
  stageId: number;
  stageName: string;
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
} | null;
export type SparkInfo = {
  sparkVersion: string;
  scalaVersion: string;
  master: string;
} | null;

export function useSpark() {
  const [status, setStatus] = useState<Status>("starting");
  const [storedHistory, setStoredHistory] = useState<HistoryEntry[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<Progress>(null);
  const [sparkInfo, setSparkInfo] = useState<SparkInfo>(null);
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

    const proc = Bun.spawn(cmd, {
      stdin: "pipe",
      stdout: "pipe",
      stderr: "ignore",
    });

    stdinRef.current = proc.stdin;

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
      stdinRef.current?.write(JSON.stringify(cmd) + "\n");
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

  return { status, history, storedHistory, error, progress, sparkInfo, evaluate, complete };
}
