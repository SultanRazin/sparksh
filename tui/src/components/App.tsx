import { useRef, useState } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useRenderer } from "@opentui/react";
import { useSpark } from "../hooks/useSpark";
import { copyToClipboard } from "../utils/clipboard";
import { StatusBar } from "./StatusBar";
import { OutputHistory } from "./OutputHistory";
import { CodeEditor } from "./CodeEditor";
import { FilterablePopup } from "./FilterablePopup";
import { CommLogPanel } from "./CommLogPanel";
import { ShortcutsBar } from "./ShortcutsBar";
import { Toast } from "./Toast";
import type { PopupMode, Status } from "../types";
import { FunctionInfoPanel } from "./FunctionInfoPanel.tsx";
import { ConfigsInfoPanel } from "./ConfigsInfoPanel.tsx";
import { TailStderrPanel } from "./TailStderrPanel.tsx";

export function App() {
  const renderer = useRenderer();
  const {
    status,
    history,
    storedHistory,
    error,
    progress,
    sparkInfo,
    debugInfo,
    functions,
    configs,
    evaluate,
    complete,
  } = useSpark();
  const [toast, setToast] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [popupMode, setPopupMode] = useState<PopupMode>("none");
  const [completionItems, setCompletionItems] = useState<string[]>([]);
  const [completionCursor, setCompletionCursor] = useState(0);
  const [inputHeight, setInputHeight] = useState(5);
  const [selectedFunction, setSelectedFunction] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("");
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

  const applyFunction = (functionName: string) => {
    setSelectedFunction(functionName);
    setPopupMode("function_info");
  };

  const applyConfig = (configName: string) => {
    setSelectedConfig(configName);
    setPopupMode("config_info");
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
    .map((h) => h.code.trim())
    .filter((code) => !currentSessionCodes.has(code));
  const combinedHistory = [
    ...storedHistoryCommands,
    ...history.map((h) => h.code),
  ];
  const historyCommands = Array.from(new Set(combinedHistory)).reverse();

  const handleMouseUp = async () => {
    const selection = (renderer as any).getSelection?.();
    const text = selection?.getSelectedText?.();
    if (text && text.length > 0) {
      const base64 = Buffer.from(text).toString("base64");
      const osc52 = `\x1b]52;c;${base64}\x07`;
      const finalOsc52 = process.env["TMUX"] ? `\x1bPtmux;\x1b${osc52}\x1b\\` : osc52;
      (renderer as any).writeOut?.(finalOsc52);
      await copyToClipboard(text);
      setToast("Copied!");
      setTimeout(() => setToast(null), 1500);
      (renderer as any).clearSelection?.();
    }
  };

  return (
    <box
      style={{ flexDirection: "column", flexGrow: 1, position: "relative", backgroundColor: "#121212" }}
      onMouseUp={handleMouseUp}
    >
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
        onOpenHistory={() =>
          historyCommands.length > 0 && setPopupMode("history")
        }
        onOpenCommLog={() => setPopupMode("commlog")}
        onOpenFunctions={() => setPopupMode("functions")}
        onOpenConfigs={() => setPopupMode("configs")}
        onOpenTail={() => setPopupMode("tail_stderr")}
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

      {popupMode === "functions" && (
        <FilterablePopup
          items={functions.map((f) => f.name) as string[]}
          placeholder="Search functions..."
          onSelect={applyFunction}
          onClose={() => setPopupMode("none")}
        />
      )}

      {popupMode === "configs" && (
        <FilterablePopup
          items={configs.map((c) => c.propertyName) as string[]}
          placeholder="Search configs..."
          onSelect={applyConfig}
          onClose={() => setPopupMode("none")}
        />
      )}

      {popupMode === "function_info" && (
        <FunctionInfoPanel
          functionName={selectedFunction}
          functions={functions}
          onClose={() => setPopupMode("functions")}
        />
      )}

      {popupMode === "config_info" && (
        <ConfigsInfoPanel
          configName={selectedConfig}
          configs={configs}
          onClose={() => setPopupMode("configs")}
        />
      )}

      {popupMode === "tail_stderr" && (
        <TailStderrPanel
          debugInfo={debugInfo}
          onClose={() => setPopupMode("none")}
        />
      )}

      <ShortcutsBar />
      <Toast message={toast} />
    </box>
  );
}
