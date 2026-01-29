import { useState, useEffect, useRef } from "react";
import { resolve } from "path";
import log from "./logger.ts";

const JAR_PATH = resolve(
  "../spark/target/scala-2.13/sparksh-backend-assembly-0.1.0.jar",
);

export type Status = "starting" | "ready" | "executing" | "error" | "stopped";
export type HistoryEntry = { code: string; output: string; isError: boolean };

export function useSpark() {
  const [status, setStatus] = useState<Status>("starting");
  const [storedHistory, setStoredHistory] = useState<HistoryEntry[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState("");
  const stdinRef = useRef<import("bun").FileSink | null>(null);
  const pendingRef = useRef<((res: any) => void) | null>(null);

  const homeDir = process.env.HOME || "";
  const filePath = resolve(homeDir, ".scala_history");

  try {
    const file = Bun.file(filePath);
    const content = file.text();
    content.then((data) => {
      const lines = data.split("\n").filter((line) => line.trim());
      log("Read history file with", lines.length, "lines");
      setStoredHistory(
        lines.map((line) => ({ code: line, output: "", isError: false })),
      );
    });
  } catch (error) {
    log("Error reading the file:", error);
  }

  useEffect(() => {
    const proc = Bun.spawn(["spark-submit", "--class", "Main", JAR_PATH], {
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
            if (res.status === "ready") setStatus("ready");
            else if (res.status === "bye") setStatus("stopped");
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
    const res = await request<{ status: string; output?: string }>({
      cmd: "eval",
      code,
    });
    setHistory((h) => [
      ...h,
      { code, output: res.output ?? "", isError: res.status === "error" },
    ]);
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

  return { status, history, storedHistory, error, evaluate, complete };
}
