import { createCliRenderer, SyntaxStyle, RGBA, type TextareaRenderable } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { createHighlighter } from "shiki";
import { useRef, useEffect, useState } from "react";
import { resolve } from "path";
import { appendFileSync } from "fs";

const log = (...args: unknown[]) => appendFileSync("debug.log", args.map(String).join(" ") + "\n");

const JAR_PATH = resolve("../spark/target/scala-2.13/sparksh-backend-assembly-0.1.0.jar");

const highlighter = await createHighlighter({ themes: ["github-dark"], langs: ["scala"] });
const syntaxStyle = SyntaxStyle.create();
const styleIds = new Map<string, number>();

const getStyleId = (color: string) =>
  styleIds.get(color) ?? styleIds.set(color, syntaxStyle.registerStyle(color, { fg: RGBA.fromHex(color) })).get(color)!;

type Status = "starting" | "ready" | "executing" | "error" | "stopped";
type HistoryEntry = { code: string; output: string; isError: boolean };

function App() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("starting");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState("");
  const ref = useRef<TextareaRenderable>(null);
  const stdinRef = useRef<import("bun").FileSink | null>(null);
  const pendingRef = useRef<((res: { status: string; output?: string }) => void) | null>(null);

  useEffect(() => {
    const proc = Bun.spawn(["spark-submit", "--class", "Main", JAR_PATH], {
      stdin: "pipe",
      stdout: "pipe",
      stderr: "ignore",
    });

    stdinRef.current = proc.stdin;

    // Read stdout
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

    proc.exited.then((code) => {
      if (code !== 0) {
        setStatus("error");
        setError(`Process exited with code ${code}`);
      }
    });

    return () => proc.kill();
  }, []);

  // Syntax highlighting
  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.clearAllHighlights();
    if (!code) return;

    const { tokens } = highlighter.codeToTokens(code, { lang: "scala", theme: "github-dark" });
    tokens.forEach((line, lineIdx) => {
      let col = 0;
      line.forEach(({ content, color }) => {
        ta.addHighlight(lineIdx, { start: col, end: col + content.length, styleId: getStyleId(color || "#fff") });
        col += content.length;
      });
    });
  }, [code]);

  const submit = async () => {
    if (!code.trim() || status !== "ready") return;
    setStatus("executing");

    const res = await new Promise<{ status: string; output?: string }>((resolve) => {
      pendingRef.current = resolve;
      stdinRef.current?.write(JSON.stringify({ cmd: "eval", code }) + "\n");
      stdinRef.current?.flush();
    });

    setHistory((h) => [...h, { code, output: res.output ?? "", isError: res.status === "error" }]);
    setCode("");
    ref.current?.clear();
    setStatus("ready");
  };

  useKeyboard((key) => {
    log("key:", JSON.stringify(key));
    // Ctrl+Enter or Ctrl+J to submit (Ctrl+J works in more terminals)
    if ((key.name === "return" && key.meta) || (key.name === "j" && key.ctrl)) submit();
  });

  return (
    <box style={{ flexDirection: "column", flexGrow: 1 }}>
      <box style={{ height: 1 }}>
        <text style={{ fg: status === "ready" ? "#4a4" : status === "error" ? "#f44" : "#888" }}>
          {status === "starting" && "Starting Spark..."}
          {status === "ready" && "Ready (Ctrl+Enter to execute)"}
          {status === "executing" && "Executing..."}
          {status === "error" && `Error: ${error}`}
          {status === "stopped" && "Stopped"}
        </text>
      </box>

      <box style={{ flexGrow: 1, border: true, flexDirection: "column" }}>
        {history.length === 0 ? (
          <text style={{ fg: "#666" }}>Output will appear here...</text>
        ) : (
          history.map((h, i) => (
            <box key={i} style={{ flexDirection: "column", marginBottom: 1 }}>
              <text style={{ fg: "#6cf" }}>{">>> " + h.code}</text>
              <text style={{ fg: h.isError ? "#f44" : "#fff" }}>{h.output}</text>
            </box>
          ))
        )}
      </box>

      <box style={{ border: true, height: 10 }}>
        <textarea
          ref={ref}
          placeholder="Enter Scala code... (Ctrl+Enter to run)"
          focused={status === "ready"}
          syntaxStyle={syntaxStyle}
          keyBindings={[
            { name: "backspace", alt: true, action: "delete-word-backward" },
            { name: "delete", alt: true, action: "delete-word-forward" },
          ]}
          onContentChange={() => setCode(ref.current?.plainText ?? "")}
        />
      </box>
    </box>
  );
}

createRoot(await createCliRenderer()).render(<App />);
