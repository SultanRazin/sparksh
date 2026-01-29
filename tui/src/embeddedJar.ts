import { resolve } from "path";

const CACHE_DIR = resolve(process.env.HOME || "", ".sparksh");
const CACHED_JAR = resolve(CACHE_DIR, "sparksh-backend.jar");
const VERSION = "0.1.0";
const VERSION_FILE = resolve(CACHE_DIR, ".version");

const DEV_JAR = resolve(
  import.meta.dir,
  "../../spark/target/scala-2.13/sparksh-backend-assembly-0.1.0.jar",
);

export async function getJarPath(): Promise<string> {
  try {
    const devFile = Bun.file(DEV_JAR);
    if (await devFile.exists()) {
      return DEV_JAR;
    }
  } catch {}

  try {
    const { JAR_BASE64 } = await import("./jarData.ts");

    const { mkdirSync } = await import("fs");
    try {
      mkdirSync(CACHE_DIR, { recursive: true });
    } catch {}

    let needsExtract = true;
    try {
      const cachedVersion = await Bun.file(VERSION_FILE).text();
      const cachedJarExists = await Bun.file(CACHED_JAR).exists();
      if (cachedVersion.trim() === VERSION && cachedJarExists) {
        needsExtract = false;
      }
    } catch {}

    if (needsExtract) {
      const jarBytes = Buffer.from(JAR_BASE64, "base64");
      await Bun.write(CACHED_JAR, jarBytes);
      await Bun.write(VERSION_FILE, VERSION);
    }

    return CACHED_JAR;
  } catch (e) {
    throw new Error(
      `Could not find JAR. In dev mode, run 'sbt assembly' first. Error: ${e}`,
    );
  }
}
