import { resolve } from "path";
import { spawnSync } from "bun";

const CACHE_DIR = resolve(process.env.HOME || "", ".sparksh");
const HASH_FILE = resolve(CACHE_DIR, ".hash");

const SUPPORTED_VERSIONS = ["34", "35", "40"];

const DEV_JARS: Record<string, string> = {
  "34": resolve(import.meta.dir, "../../../spark/target/scala-2.12/sparksh-backend-spark34.jar"),
  "35": resolve(import.meta.dir, "../../../spark/target/scala-2.12/sparksh-backend-spark35.jar"),
  "40": resolve(import.meta.dir, "../../../spark/target/scala-2.13/sparksh-backend-spark40.jar"),
};

function detectSparkVersion(): string {
  try {
    const result = spawnSync(["spark-submit", "--version"], {
      stderr: "pipe",
      stdout: "pipe",
    });

    const output = result.stderr.toString() + result.stdout.toString();
    const match = output.match(/version\s+(\d+)\.(\d+)/i);

    if (match && match[1] && match[2]) {
      const majorMinor = `${match[1]}${match[2]}`;
      if (SUPPORTED_VERSIONS.includes(majorMinor)) {
        return majorMinor;
      }
      // Fall back to closest supported version
      const major = parseInt(match[1]);
      if (major >= 4) return "40";
      if (major === 3) {
        const minor = parseInt(match[2]);
        if (minor >= 5) return "35";
        return "34";
      }
    }
  } catch {}

  // Default to 3.5 if detection fails
  return "35";
}

export async function getJarPath(): Promise<string> {
  const sparkVersion = detectSparkVersion();

  // Try dev JAR first
  try {
    const devJar = DEV_JARS[sparkVersion];
    if (devJar) {
      const devFile = Bun.file(devJar);
      if (await devFile.exists()) {
        return devJar;
      }
    }
  } catch {}

  // Extract from embedded
  try {
    const { JARS } = await import("./jarData.ts");

    const jarBase64 = JARS[sparkVersion];
    if (!jarBase64) {
      throw new Error(`No embedded JAR for Spark ${sparkVersion}`);
    }

    const { mkdirSync } = await import("fs");
    try {
      mkdirSync(CACHE_DIR, { recursive: true });
    } catch {}

    const cachedJar = resolve(CACHE_DIR, `sparksh-backend-spark${sparkVersion}.jar`);

    // Use hash for cache validation
    const hasher = new Bun.CryptoHasher("md5");
    hasher.update(jarBase64.slice(0, 1000));
    const currentHash = `${sparkVersion}-${hasher.digest("hex")}`;

    let needsExtract = true;
    try {
      const cachedHash = await Bun.file(HASH_FILE).text();
      const cachedJarExists = await Bun.file(cachedJar).exists();
      if (cachedHash.trim() === currentHash && cachedJarExists) {
        needsExtract = false;
      }
    } catch {}

    if (needsExtract) {
      const jarBytes = Buffer.from(jarBase64, "base64");
      await Bun.write(cachedJar, jarBytes);
      await Bun.write(HASH_FILE, currentHash);
    }

    return cachedJar;
  } catch (e) {
    throw new Error(
      `Could not find JAR for Spark ${sparkVersion}. Error: ${e}`,
    );
  }
}

export { detectSparkVersion };
