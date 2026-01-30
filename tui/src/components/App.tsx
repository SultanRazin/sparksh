import { useRef, useState } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useSpark } from "../hooks/useSpark";
import { StatusBar } from "./StatusBar";
import { OutputHistory } from "./OutputHistory";
import { CodeEditor } from "./CodeEditor";
import { FilterablePopup } from "./FilterablePopup";
import { CommLogPanel } from "./CommLogPanel";
import { ShortcutsBar } from "./ShortcutsBar";
import type { PopupMode, Status } from "../types";

export function App() {
  const {
    status,
    history,
    storedHistory,
    error,
    progress,
    sparkInfo,
    debugInfo,
    evaluate,
    complete,
  } = useSpark();
  const [code, setCode] = useState("");
  const [popupMode, setPopupMode] = useState<PopupMode>("none");
  const [completionItems, setCompletionItems] = useState<string[]>([]);
  const [completionCursor, setCompletionCursor] = useState(0);
  const [inputHeight, setInputHeight] = useState(5);
  const ref = useRef<TextareaRenderable | null>(null);

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
      <StatusBar
        status={status as Status}
        error={error}
        progress={progress}
        sparkInfo={sparkInfo}
      />

      <OutputHistory
        history={history}
        status={status as Status}
        debugInfo={debugInfo}
        focused={popupMode === "none" && status !== "ready"}
      />

      <CodeEditor
        status={status as Status}
        popupMode={popupMode}
        history={history}
        storedHistory={storedHistory}
        inputHeight={inputHeight}
        onCodeChange={(newCode) => {
          setCode(newCode);
          setPopupMode("none");
        }}
        onSubmit={submit}
        onRequestCompletion={requestCompletion}
        onOpenHistory={() => historyCommands.length > 0 && setPopupMode("history")}
        onOpenCommLog={() => setPopupMode("commlog")}
        onResizeUp={() => setInputHeight(Math.min(10, inputHeight + 1))}
        onResizeDown={() => setInputHeight(Math.max(1, inputHeight - 1))}
        onLoadPreviousCommand={resetInputWithNewCode}
        codeRef={ref}
        code={code}
      />

      {popupMode === "completions" && (
        <FilterablePopup
          items={completionItems}
          placeholder="Filter completions..."
          onSelect={applyCompletion}
          onClose={() => setPopupMode("none")}
        />
      )}

      {popupMode === "history" && (
        <FilterablePopup
          items={historyCommands}
          placeholder="Search history..."
          onSelect={applyHistory}
          onClose={() => setPopupMode("none")}
        />
      )}

      {popupMode === "commlog" && (
        <CommLogPanel onClose={() => setPopupMode("none")} />
      )}

      <ShortcutsBar />
    </box>
  );
}
