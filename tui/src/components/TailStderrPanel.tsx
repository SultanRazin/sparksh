import { t, fg } from "@opentui/core";
import type { Status, Progress, SparkInfo, DebugInfo } from "../types";
import { getProgressBar } from "../utils/progressBar";
import { useKeyboard } from "@opentui/react";

interface TailStderrPanelProps {
  debugInfo: DebugInfo;
  onClose: () => void;
}

export function TailStderrPanel({ debugInfo, onClose }: TailStderrPanelProps) {
  useKeyboard((key) => {
    if (key.name === "escape") {
      onClose();
    }
  });
  return (
    <box
      style={{
        position: "absolute",
        top: 1,
        left: 2,
        right: 2,
        bottom: 2,
        borderColor: "#6cf",
        backgroundColor: "#111",
        flexDirection: "column",
      }}
    >
      <scrollbox
        style={{
          stickyScroll: true,
          stickyStart: "bottom",
          flexGrow: 1,
        }}
        focused={true}
      >
        <text content={t`${fg("#888")("\u2500".repeat(37))}`} />
        <text content={t`${fg("#f44")("stderr:")}`} />
        {debugInfo.stderr
          .slice(-2000)
          .split("\n")
          .map((line, i) => (
            <text key={i} content={t`${fg("#888")(line)}`} />
          ))}
      </scrollbox>
    </box>
  );
}
