import { appendFileSync } from "fs";

const log = (...args: unknown[]) =>
  appendFileSync(
    "debug.log",
    args
      .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
      .join(" ") + "\n",
  );

export default log;
