import { createCliRenderer, type TextareaRenderable } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { useSpark } from "./useSpark";
import { getStyleId, highlighter, syntaxStyle } from "./highlight";

function App() {
  const { status, history, error, evaluate, complete } = useSpark();
  const [code, setCode] = useState("");
  const [allCompletions, setAllCompletions] = useState<string[]>([]);
  const [completionFilter, setCompletionFilter] = useState("");
  const [completionIdx, setCompletionIdx] = useState(0);
  const [completionCursor, setCompletionCursor] = useState(0);

  const completions = completionFilter
    ? allCompletions.filter((c) =>
        c.toLowerCase().includes(completionFilter.toLowerCase()),
      )
    : allCompletions;

  const safeIdx = Math.min(completionIdx, Math.max(0, completions.length - 1));
  const ref = useRef<TextareaRenderable>(null);

  // Syntax highlighting
  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.clearAllHighlights();
    if (!code) return;

    const { tokens } = highlighter.codeToTokens(code, {
      lang: "scala",
      theme: "github-dark",
    });
    tokens.forEach((line, lineIdx) => {
      let col = 0;
      line.forEach(({ content, color }) => {
        ta.addHighlight(lineIdx, {
          start: col,
          end: col + content.length,
          styleId: getStyleId(color || "#fff"),
        });
        col += content.length;
      });
    });
  }, [code]);

  const submit = async () => {
    if (!code.trim() || status !== "ready") return;
    setAllCompletions([]);
    setCompletionFilter("");
    await evaluate(code);
    setCode("");
    ref.current?.clear();
  };

  const requestCompletion = async () => {
    if (status !== "ready" || !code) return;
    const res = await complete(code);
    if (res.completions.length) {
      setAllCompletions(res.completions);
      setCompletionFilter("");
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
    setAllCompletions([]);
    setCompletionFilter("");
  };

  useKeyboard((key) => {
    if (allCompletions.length > 0) {
      if (key.name === "down" || (key.name === "n" && key.ctrl)) {
        setCompletionIdx((i) => Math.min(i + 1, completions.length - 1));
        return;
      }
      if (key.name === "up" || (key.name === "p" && key.ctrl)) {
        setCompletionIdx((i) => Math.max(i - 1, 0));
        return;
      }
      if (key.name === "return" || key.name === "tab") {
        applyCompletion(completions[safeIdx]);
        return;
      }
      if (key.name === "escape") {
        setAllCompletions([]);
        setCompletionFilter("");
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
    <box style={{ flexDirection: "column", flexGrow: 1, position: "relative" }}>
      {/* Status bar */}
      <box style={{ height: 1 }}>
        <text
          style={{
            fg:
              status === "ready"
                ? "#4a4"
                : status === "error"
                  ? "#f44"
                  : "#888",
          }}
        >
          {status === "starting" && "Starting Spark..."}
          {status === "ready" &&
            "Ready (Cmd+Enter to execute, Tab for completions)"}
          {status === "executing" && "Executing..."}
          {status === "error" && `Error: ${error}`}
          {status === "stopped" && "Stopped"}
        </text>
      </box>

      {/* Output history */}
      <scrollbox
        style={{
          flexGrow: 1,
          border: true,
          stickyScroll: true,
          stickyStart: "bottom",
        }}
        focused={allCompletions.length === 0 && status !== "ready"}
      >
        {history.length === 0 ? (
          <text style={{ fg: "#666" }}>Output will appear here...</text>
        ) : (
          history.flatMap((h, i) => [
            <text key={`c${i}`} style={{ fg: "#6cf" }}>
              {">>> " + h.code}
            </text>,
            ...h.output.split("\n").map((line, j) => (
              <text
                key={`o${i}-${j}`}
                style={{ fg: h.isError ? "#f44" : "#fff" }}
              >
                {line}
              </text>
            )),
            <text key={`s${i}`}> </text>,
          ])
        )}
      </scrollbox>

      {/* Code editor */}
      <box style={{ border: true, minHeight: 5, maxHeight: 10 }}>
        <textarea
          ref={ref}
          placeholder="Enter Scala code... (Tab for completions)"
          focused={status === "ready" && allCompletions.length === 0}
          syntaxStyle={syntaxStyle}
          onContentChange={() => {
            setCode(ref.current?.plainText ?? "");
            setAllCompletions([]);
            setCompletionFilter("");
          }}
        />
      </box>

      {/* Completions popup */}
      {allCompletions.length > 0 &&
        (() => {
          const maxVisible = 5;
          const start = Math.max(
            0,
            Math.min(safeIdx - 2, completions.length - maxVisible),
          );
          const visible = completions.slice(start, start + maxVisible);
          return (
            <box
              style={{
                position: "absolute",
                bottom: 11,
                left: 0,
                right: 0,
                border: true,
                flexDirection: "column",
                backgroundColor: "#1a1a1a",
              }}
            >
              <input
                placeholder="Filter..."
                focused
                onInput={(filter) => {
                  setCompletionFilter(filter);
                  setCompletionIdx(0);
                }}
                onSubmit={() =>
                  completions.length > 0 &&
                  applyCompletion(completions[safeIdx])
                }
              />
              {completions.length === 0 ? (
                <text style={{ fg: "#888" }}>No matches</text>
              ) : (
                visible.map((c, i) => (
                  <text
                    key={`${c}-${i}`}
                    style={{ fg: start + i === safeIdx ? "#ff0" : "#fff" }}
                  >
                    {start + i === safeIdx ? "> " : "  "}
                    {c}
                  </text>
                ))
              )}
              {completions.length > maxVisible && (
                <text style={{ fg: "#888" }}>
                  {safeIdx + 1}/{completions.length}
                </text>
              )}
            </box>
          );
        })()}
    </box>
  );
}

createRoot(await createCliRenderer()).render(<App />);
