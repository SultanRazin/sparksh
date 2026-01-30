import { resolve } from "path";

const CACHE_DIR = resolve(process.env.HOME || "", ".sparksh");
const CACHED_JAR = resolve(CACHE_DIR, "sparksh-backend.jar");
const HASH_FILE = resolve(CACHE_DIR, ".hash");

const DEV_JAR = resolve(
  import.meta.dir,
  "../../spark/target/scala-2.13/sparksh-backend.jar",
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

    const hasher = new Bun.CryptoHasher("md5");
    hasher.update(JAR_BASE64.slice(0, 1000));
    const currentHash = hasher.digest("hex");

    let needsExtract = true;
    try {
      const cachedHash = await Bun.file(HASH_FILE).text();
      const cachedJarExists = await Bun.file(CACHED_JAR).exists();
      if (cachedHash.trim() === currentHash && cachedJarExists) {
        needsExtract = false;
      }
    } catch {}

    if (needsExtract) {
      const jarBytes = Buffer.from(JAR_BASE64, "base64");
      await Bun.write(CACHED_JAR, jarBytes);
      await Bun.write(HASH_FILE, currentHash);
    }

    return CACHED_JAR;
  } catch (e) {
    throw new Error(
      `Could not find JAR. In dev mode, run 'sbt assembly' first. Error: ${e}`,
    );
  }
}
