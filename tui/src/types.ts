export type PopupMode =
  | "none"
  | "completions"
  | "history"
  | "commlog"
  | "functions"
  | "function_info"
  | "configs"
  | "config_info"
  | "tail_stderr";

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

export type FunctionInfo = {
  name: string;
  usage: string;
  extended: string;
  examples: string;
};

export type ConfigInfo = {
  propertyName: string;
  defaultValue: string;
  meaning: string;
  sinceVersion: string;
};

export type DebugInfo = {
  detectedSparkVersion: string;
  jarPath: string;
  sparkHome: string;
  javaHome: string;
  command: string;
  stderr: string;
};

export type CommLog = {
  direction: "send" | "recv" | "debug";
  timestamp: number;
  data: string;
};
