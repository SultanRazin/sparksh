export type PopupMode = "none" | "completions" | "history" | "commlog";
export type Status = "starting" | "ready" | "executing" | "error" | "stopped";

export type HistoryEntry = {
  code: string;
  output: string;
  isError: boolean;
};

export type Progress = {
  stageId: number;
  stageName: string;
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
} | null;

export type SparkInfo = {
  sparkVersion: string;
  scalaVersion: string;
  master: string;
} | null;

export type DebugInfo = {
  detectedSparkVersion: string;
  jarPath: string;
  sparkHome: string;
  javaHome: string;
  command: string;
  stderr: string;
};

export type CommLog = {
  direction: "send" | "recv";
  timestamp: number;
  data: string;
};
