import { t, fg } from "@opentui/core";
import type { Status, Progress, SparkInfo } from "../types";
import { getProgressBar } from "../utils/progressBar";

interface StatusBarProps {
  status: Status;
  error: string;
  progress: Progress;
  sparkInfo: SparkInfo;
}

function getStatusText(status: Status, error: string, progress: Progress) {
  switch (status) {
    case "starting":
      return t`${fg("#888")("\u23F3 Starting...")}`;
    case "ready":
      return t`${fg("#4a4")("\u26A1 Ready")}`;
    case "executing":
      if (progress) {
        const progressBar = getProgressBar(progress);
        return t`${fg("#fa0")(`\u2699 Stage ${progress.stageId}: ${progressBar}`)}`;
      }
      return t`${fg("#fa0")("\u2699 Running...")}`;
    case "error":
      return t`${fg("#f44")(`\u2717 Error: ${error}`)}`;
    case "stopped":
      return t`${fg("#888")("\u23F9 Stopped")}`;
  }
}

export function StatusBar({ status, error, progress, sparkInfo }: StatusBarProps) {
  return (
    <box
      style={{
        height: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <text content={getStatusText(status, error, progress)} />
      {sparkInfo && (
        <text
          content={t`${fg("#888")(`Spark ${sparkInfo.sparkVersion} \u00B7 Scala ${sparkInfo.scalaVersion} \u00B7 ${sparkInfo.master}`)}`}
        />
      )}
    </box>
  );
}
