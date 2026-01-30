import { useRef, useState } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { syntaxStyle } from "../utils/highlight";
import { useSyntaxHighlight } from "../hooks/useSyntaxHighlight";
import type { PopupMode, Status, HistoryEntry } from "../types";

interface CodeEditorProps {
  status: Status;
  popupMode: PopupMode;
  history: HistoryEntry[];
  storedHistory: HistoryEntry[];
  inputHeight: number;
  onCodeChange: (code: string) => void;
  onSubmit: () => void;
  onRequestCompletion: () => void;
  onOpenHistory: () => void;
  onOpenCommLog: () => void;
  onOpenFunctions: () => void;
  onResizeUp: () => void;
  onResizeDown: () => void;
  onLoadPreviousCommand: (code: string) => void;
  codeRef: React.RefObject<TextareaRenderable | null>;
  code: string;
}

export function CodeEditor({
  status,
  popupMode,
  history,
  inputHeight,
  onCodeChange,
  onSubmit,
  onRequestCompletion,
  onOpenHistory,
  onOpenCommLog,
  onOpenFunctions,
  onResizeUp,
  onResizeDown,
  onLoadPreviousCommand,
  codeRef,
  code,
}: CodeEditorProps) {
  useSyntaxHighlight(codeRef, code);

  useKeyboard((key) => {
    if (popupMode !== "none") return;

    if (key.name === "tab" && status === "ready") {
      onRequestCompletion();
      return;
    }

    if ((key.name === "return" && key.ctrl) || (key.name === "j" && key.ctrl)) {
      onSubmit();
      return;
    }

    if (key.name === "r" && key.ctrl) {
      onOpenHistory();
      return;
    }

    if (key.name === "l" && key.ctrl) {
      onOpenCommLog();
      return;
    }

    if (key.name === "f" && key.ctrl) {
      onOpenFunctions();
      return;
    }

    if (key.name === "up" && key.ctrl) {
      onResizeUp();
      return;
    }

    if (key.name === "down" && key.ctrl) {
      onResizeDown();
      return;
    }

    if (code === "" && history.length > 0 && key.name === "up") {
      const prev = history[history.length - 1];
      if (prev) onLoadPreviousCommand(prev.code);
    }
  });

  return (
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
        ref={codeRef}
        placeholder="Type your Scala code here..."
        focused={status === "ready" && popupMode === "none"}
        syntaxStyle={syntaxStyle}
        style={{
          marginTop: 1,
          marginLeft: 1,
        }}
        onContentChange={() => {
          onCodeChange(codeRef.current?.plainText ?? "");
        }}
      />
    </scrollbox>
  );
}
