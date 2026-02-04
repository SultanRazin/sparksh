import type { Progress } from "../types";

export function getProgressBar(progress: Progress, width: number = 20): string {
  if (!progress) return "";
  const { completedTasks, activeTasks, totalTasks } = progress;
  if (totalTasks <= 0) return `[${"\u2591".repeat(width)}] (${completedTasks} + ${activeTasks}) / ${totalTasks}`;
  const filled = Math.min(width, Math.max(0, Math.round((completedTasks / totalTasks) * width)));
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(width - filled);
  return `[${bar}] (${completedTasks} + ${activeTasks}) / ${totalTasks}`;
}
