import type { CommLog } from "../types";

const commLogs: CommLog[] = [];
const MAX_LOGS = 100;

export function getCommLogs(): CommLog[] {
  return commLogs;
}

export function addCommLog(direction: "send" | "recv" | "debug", data: string) {
  commLogs.push({ direction, timestamp: Date.now(), data });
  if (commLogs.length > MAX_LOGS) {
    commLogs.shift();
  }
}
