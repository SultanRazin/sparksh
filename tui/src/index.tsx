import {
  createCliRenderer,
  type TextareaRenderable,
  t,
  fg,
} from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useEffect, useRef, useState } from "react";
import { useSpark, initJarPath, type Progress } from "./useSpark";
import { getStyleId, highlighter, syntaxStyle } from "./highlight";
import { FilterablePopup } from "./FilterablePopup";
import { highlightOutputLine, errorLine } from "./highlightOutput";

type PopupMode = "none" | "completions" | "history";
type Status = "starting" | "ready" | "executing" | "error" | "stopped";

const BRACKET_COLORS = [
  "#f9e64f",
  "#da70d6",
  "#6be5fd",
  "#87d96c",
  "#ff9e64",
  "#bb9af7",
  "#7dcfff",
  "#f7768e",
  "#73daca",
  "#ff7a93",
];

function getProgressBar(progress: Progress, width: number = 20): string {
  if (!progress) return "";
  const { completedTasks, activeTasks, totalTasks } = progress;
  const filled = Math.round((completedTasks / totalTasks) * width);
  const bar = "█".repeat(filled) + "░".repeat(width - filled);
  return `[${bar}] (${completedTasks} + ${activeTasks}) / ${totalTasks}`;
}

function getStatusBar(status: Status, error: string, progress: Progress) {
  switch (status) {
    case "starting":
      return t`${fg("#888")("⏳ Starting...")}`;
    case "ready":
      return t`${fg("#4a4")("⚡ Ready")}`;
    case "executing":
      if (progress) {
        const progressBar = getProgressBar(progress);
        return t`${fg("#fa0")(`⚙ Stage ${progress.stageId}: ${progressBar}`)}`;
      }
      return t`${fg("#fa0")("⚙ Running...")}`;
    case "error":
      return t`${fg("#f44")(`✗ Error: ${error}`)}`;
    case "stopped":
      return t`${fg("#888")("⏹ Stopped")}`;
  }
}

function App() {
  const {
    status,
    history,
    storedHistory,
    error,
    progress,
    evaluate,
    complete,
  } = useSpark();
  const [code, setCode] = useState("");
  const [popupMode, setPopupMode] = useState<PopupMode>("none");
  const [completionItems, setCompletionItems] = useState<string[]>([]);
  const [completionCursor, setCompletionCursor] = useState(0);
  const [inputHeight, setInputHeight] = useState(5);
  const ref = useRef<TextareaRenderable>(null);

  // Syntax highlighting with rainbow brackets
  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.clearAllHighlights();
    if (!code) return;

    const { tokens } = highlighter.codeToTokens(code, {
      lang: "scala",
      theme: "github-dark",
    });

    // Track bracket depth across all lines
    let depth = 0;

    tokens.forEach((line, lineIdx) => {
      let col = 0;
      line.forEach(({ content, color }) => {
        const hasBrackets = /[()[\]{}]/.test(content);

        if (!hasBrackets) {
          ta.addHighlight(lineIdx, {
            start: col,
            end: col + content.length,
            styleId: getStyleId(color || "#fff"),
          });
        } else {
          for (let i = 0; i < content.length; i++) {
            const char = content[i];
            if ("([{".includes(char)) {
              ta.addHighlight(lineIdx, {
                start: col + i,
                end: col + i + 1,
                styleId: getStyleId(
                  BRACKET_COLORS[depth % BRACKET_COLORS.length],
                ),
              });
              depth++;
            } else if (")]}".includes(char)) {
              depth = Math.max(0, depth - 1);
              ta.addHighlight(lineIdx, {
                start: col + i,
                end: col + i + 1,
                styleId: getStyleId(
                  BRACKET_COLORS[depth % BRACKET_COLORS.length],
                ),
              });
            } else {
              ta.addHighlight(lineIdx, {
                start: col + i,
                end: col + i + 1,
                styleId: getStyleId(color || "#fff"),
              });
            }
          }
        }
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

    if ((key.name === "return" && key.ctrl) || (key.name === "j" && key.ctrl)) {
      submit();
      return;
    }

    // Ctrl+R for history search
    if (key.name === "r" && key.ctrl && combinedHistory.length > 0) {
      setPopupMode("history");
      return;
    }

    if (key.name === "up" && key.ctrl) {
      setInputHeight(Math.min(10, inputHeight + 1));
      return;
    }

    if (key.name === "down" && key.ctrl) {
      setInputHeight(Math.max(1, inputHeight - 1));
      return;
    }

    // Up arrow when empty to get last command
    if (code === "" && history.length > 0 && key.name === "up") {
      const prev = history[history.length - 1];
      if (prev) resetInputWithNewCode(prev.code);
    }
  });

  const currentSessionCodes = new Set(history.map((h) => h.code));
  const storedHistoryCommands = storedHistory
    .map((h) => h.code)
    .filter((code) => !currentSessionCodes.has(code));
  const combinedHistory = [
    ...storedHistoryCommands,
    ...history.map((h) => h.code),
  ];
  const historyCommands = Array.from(new Set(combinedHistory)).reverse();

  return (
    <box style={{ flexDirection: "column", flexGrow: 1, position: "relative" }}>
      {/* Status bar */}
      <box style={{ height: 1 }}>
        <text content={getStatusBar(status as Status, error, progress)} />
      </box>

      {/* Output history */}
      <scrollbox
        style={{
          flexGrow: 1,
          stickyScroll: true,
          stickyStart: "bottom",
        }}
        focused={popupMode === "none" && status !== "ready"}
      >
        {history.length === 0 ? (
          <box
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ascii-font text="SparkSH" font="block" />
          </box>
        ) : (
          history.flatMap((h, i) => [
            <text key={`c${i}`} style={{ fg: "#6cf" }}>
              {">>> " + h.code}
            </text>,
            ...h.output.split("\n").map((line, j) => (
              <box
                style={{ backgroundColor: "#1a1a1a" }}
                key={`o-box${i}-${j}`}
              >
                <text
                  key={`o${i}-${j}`}
                  content={
                    h.isError ? errorLine(line) : highlightOutputLine(line)
                  }
                />
              </box>
            )),
            <text key={`s${i}`}> </text>,
          ])
        )}
      </scrollbox>

      {/* Code editor */}
      <scrollbox
        style={{
          border: ["left"],
          borderColor: "#444",
          height: inputHeight,
          backgroundColor: "#1a1a1a",
          stickyScroll: true,
          stickyStart: "bottom",
        }}
      >
        <textarea
          ref={ref}
          placeholder="Type your Scala code here..."
          focused={status === "ready" && popupMode === "none"}
          syntaxStyle={syntaxStyle}
          style={{
            marginTop: 1,
            marginLeft: 1,
          }}
          onContentChange={() => {
            setCode(ref.current?.plainText ?? "");
            setPopupMode("none");
          }}
        />
      </scrollbox>

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

      {/* Shortcuts */}
      <box style={{ height: 1 }}>
        <text
          content={t`${fg("#888")("^↵ Run · ⇥ Complete · ^R History · ^↑/↓ Resize")}`}
        />
      </box>
    </box>
  );
}

// Initialize JAR path (extracts embedded JAR if needed) then start app
await initJarPath();
createRoot(await createCliRenderer()).render(<App />);
