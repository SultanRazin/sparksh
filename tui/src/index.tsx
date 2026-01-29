import { createCliRenderer, type TextareaRenderable } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { useSpark } from "./useSpark";
import { getStyleId, highlighter, syntaxStyle } from "./highlight";
import { FilterablePopup } from "./FilterablePopup";

type PopupMode = "none" | "completions" | "history";

function App() {
  const { status, history, storedHistory, error, evaluate, complete } =
    useSpark();
  const [code, setCode] = useState("");
  const [popupMode, setPopupMode] = useState<PopupMode>("none");
  const [completionItems, setCompletionItems] = useState<string[]>([]);
  const [completionCursor, setCompletionCursor] = useState(0);
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

  const resetInputWithNewCode = (newCode: string) => {
    const ta = ref.current as any;
    if (ta) {
      ta.clear();
      ta.insertText(newCode);
      ta.gotoBufferEnd();
    }
    setCode(newCode);
    setPopupMode("none");
  };

  const submit = async () => {
    if (!code.trim() || status !== "ready") return;
    setPopupMode("none");
    await evaluate(code);
    setCode("");
    ref.current?.clear();
  };

  const requestCompletion = async () => {
    if (status !== "ready" || !code) return;
    const res = await complete(code);
    if (res.completions.length) {
      setCompletionItems(res.completions);
      setCompletionCursor(res.cursor);
      setPopupMode("completions");
    }
  };

  const applyCompletion = (completion: string) => {
    const newCode = code.slice(0, completionCursor) + completion;
    resetInputWithNewCode(newCode);
  };

  const applyHistory = (historyCode: string) => {
    resetInputWithNewCode(historyCode);
  };

  useKeyboard((key) => {
    // When popup is open, let it handle keys
    if (popupMode !== "none") return;

    if (key.name === "tab" && status === "ready") {
      requestCompletion();
      return;
    }

    if ((key.name === "return" && key.meta) || (key.name === "j" && key.ctrl)) {
      submit();
      return;
    }

    // Ctrl+R for history search
    if (key.name === "r" && key.ctrl && combinedHistory.length > 0) {
      setPopupMode("history");
      return;
    }

    // Up arrow when empty to get last command
    if (code === "" && history.length > 0 && key.name === "up") {
      const prev = history[history.length - 1];
      if (prev) resetInputWithNewCode(prev.code);
    }
  });

  const storedHistoryCommands = storedHistory.map((h) => h.code);
  const combinedHistory = [
    ...storedHistoryCommands,
    ...history.map((h) => h.code),
  ];
  const historyCommands = Array.from(new Set(combinedHistory)).reverse();

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
            "Ready (Cmd+Enter to run, Tab completions, Ctrl+R history)"}
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
        focused={popupMode === "none" && status !== "ready"}
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
          placeholder="Enter Scala code... (Tab for completions, Ctrl+R for history)"
          focused={status === "ready" && popupMode === "none"}
          syntaxStyle={syntaxStyle}
          onContentChange={() => {
            setCode(ref.current?.plainText ?? "");
            setPopupMode("none");
          }}
        />
      </box>

      {/* Completions popup */}
      {popupMode === "completions" && (
        <FilterablePopup
          items={completionItems}
          placeholder="Filter completions..."
          onSelect={applyCompletion}
          onClose={() => setPopupMode("none")}
        />
      )}

      {/* History popup */}
      {popupMode === "history" && (
        <FilterablePopup
          items={historyCommands}
          placeholder="Search history..."
          onSelect={applyHistory}
          onClose={() => setPopupMode("none")}
        />
      )}
    </box>
  );
}

createRoot(await createCliRenderer()).render(<App />);
