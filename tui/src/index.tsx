import { createCliRenderer, type TextareaRenderable } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useRef, useEffect, useState } from "react";
import { useSpark } from "./useSpark";
import { highlighter, syntaxStyle, getStyleId } from "./highlight";

function App() {
  const { status, history, error, evaluate, complete } = useSpark();
  const [code, setCode] = useState("");
  const [completions, setCompletions] = useState<string[]>([]);
  const [completionIdx, setCompletionIdx] = useState(0);
  const [completionCursor, setCompletionCursor] = useState(0);
  const ref = useRef<TextareaRenderable>(null);

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
    setCompletions([]);
    await evaluate(code);
    setCode("");
    ref.current?.clear();
  };

  const requestCompletion = async () => {
    if (status !== "ready" || !code) return;
    const res = await complete(code);
    if (res.completions.length) {
      setCompletions(res.completions);
      setCompletionCursor(res.cursor);
      setCompletionIdx(0);
    }
  };

  const applyCompletion = (completion: string) => {
    const newCode = code.slice(0, completionCursor) + completion;
    const ta = ref.current as any;
    if (ta) {
      ta.clear();
      ta.insertText(newCode);
      ta.gotoBufferEnd();
    }
    setCode(newCode);
    setCompletions([]);
  };

  useKeyboard((key) => {
    if (completions.length > 0) {
      if (key.name === "down" || (key.name === "n" && key.ctrl)) {
        setCompletionIdx((i) => Math.min(i + 1, completions.length - 1));
        return;
      }
      if (key.name === "up" || (key.name === "p" && key.ctrl)) {
        setCompletionIdx((i) => Math.max(i - 1, 0));
        return;
      }
      if (key.name === "return" || key.name === "tab") {
        applyCompletion(completions[completionIdx]);
        return;
      }
      if (key.name === "escape") {
        setCompletions([]);
        return;
      }
    }

    if (key.name === "tab" && status === "ready") {
      requestCompletion();
      return;
    }

    if ((key.name === "return" && key.meta) || (key.name === "j" && key.ctrl)) {
      submit();
    }
  });

  return (
    <box style={{ flexDirection: "column", flexGrow: 1 }}>
      {/* Status bar */}
      <box style={{ height: 1 }}>
        <text style={{ fg: status === "ready" ? "#4a4" : status === "error" ? "#f44" : "#888" }}>
          {status === "starting" && "Starting Spark..."}
          {status === "ready" && "Ready (Cmd+Enter to execute, Tab for completions)"}
          {status === "executing" && "Executing..."}
          {status === "error" && `Error: ${error}`}
          {status === "stopped" && "Stopped"}
        </text>
      </box>
      

      {/* Output history */}
      <scrollbox style={{ flexGrow: 1, border: true, stickyScroll: true, stickyStart: "bottom" }} focused={completions.length === 0 && status !== "ready"}>
        {history.length === 0 ? (
          <text style={{ fg: "#666" }}>Output will appear here...</text>
        ) : (
          history.flatMap((h, i) => [
            <text key={`c${i}`} style={{ fg: "#6cf" }}>{">>> " + h.code}</text>,
            ...h.output.split("\n").map((line, j) => (
              <text key={`o${i}-${j}`} style={{ fg: h.isError ? "#f44" : "#fff" }}>{line}</text>
            )),
            <text key={`s${i}`}>{" "}</text>
          ])
        )}
      </scrollbox>

      {/* Code editor */}
      <box style={{ border: true, minHeight: 5, maxHeight: 50 }}>
        <textarea
          ref={ref}
          placeholder="Enter Scala code... (Tab for completions)"
          focused={status === "ready" && completions.length === 0}
          syntaxStyle={syntaxStyle}
          onContentChange={() => {
            setCode(ref.current?.plainText ?? "");
            setCompletions([]);
          }}
        />
      </box>

      {/* Completions dropdown */}
      {completions.length > 0 && (() => {
        const maxVisible = 5;
        const start = Math.max(0, Math.min(completionIdx - 2, completions.length - maxVisible));
        const visible = completions.slice(start, start + maxVisible);
        return (
          <box key={`c-${completionIdx}`} style={{ border: true, flexDirection: "column", width: "100%" }}>
            {visible.map((c, i) => {
              const selected = start + i === completionIdx;
              return (
                <box key={`${c}-${i}`} style={{ height: 1 }}>
                  <text style={{ fg: selected ? "#ff0" : "#fff" }}>{selected ? "> " : "  "}{c}</text>
                </box>
              );
            })}
            {completions.length > maxVisible && (
              <text style={{ fg: "#888" }}>{completionIdx + 1}/{completions.length}</text>
            )}
          </box>
        );
      })()}
    </box>
  );
}

createRoot(await createCliRenderer()).render(<App />);
