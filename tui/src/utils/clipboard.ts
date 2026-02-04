import { platform } from "os";

function getCopyMethod() {
  const os = platform();

  if (os === "linux") {
    if (process.env["WAYLAND_DISPLAY"] && Bun.which("wl-copy")) {
      return async (text: string) => {
        const proc = Bun.spawn(["wl-copy"], {
          stdin: "pipe",
          stdout: "ignore",
          stderr: "ignore",
        });
        proc.stdin.write(text);
        proc.stdin.end();
        await proc.exited.catch(() => {});
      };
    }
    if (Bun.which("xclip")) {
      return async (text: string) => {
        const proc = Bun.spawn(["xclip", "-selection", "clipboard"], {
          stdin: "pipe",
          stdout: "ignore",
          stderr: "ignore",
        });
        proc.stdin.write(text);
        proc.stdin.end();
        await proc.exited.catch(() => {});
      };
    }
  }

  if (os === "darwin" && Bun.which("pbcopy")) {
    return async (text: string) => {
      const proc = Bun.spawn(["pbcopy"], {
        stdin: "pipe",
        stdout: "ignore",
        stderr: "ignore",
      });
      proc.stdin.write(text);
      proc.stdin.end();
      await proc.exited.catch(() => {});
    };
  }

  return async (_text: string) => {};
}

const copyMethod = getCopyMethod();

export async function copyToClipboard(text: string): Promise<void> {
  await copyMethod(text);
}
