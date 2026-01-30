import { resolve } from "path";

// Spark version -> Scala version mapping
const SPARK_CONFIGS = [
  { spark: "34", scala: "2.12" },
  { spark: "35", scala: "2.12" },
  { spark: "40", scala: "2.13" },
];

const SPARK_DIR = resolve(import.meta.dir, "../../spark/target");
const outputPath = resolve(import.meta.dir, "../src/jarData.ts");

const jars: Record<string, string> = {};
let totalSize = 0;

for (const { spark, scala } of SPARK_CONFIGS) {
  const jarPath = resolve(SPARK_DIR, `scala-${scala}`, `sparksh-backend-spark${spark}.jar`);
  const jarFile = Bun.file(jarPath);

  if (!(await jarFile.exists())) {
    console.error(`JAR not found: ${jarPath}`);
    console.error(`Run build.sh to build all versions`);
    process.exit(1);
  }

  const jarBytes = await jarFile.arrayBuffer();
  jars[spark] = Buffer.from(jarBytes).toString("base64");
  totalSize += jarBytes.byteLength;
  console.log(`  Spark ${spark} (Scala ${scala}): ${(jarBytes.byteLength / 1024 / 1024).toFixed(2)} MB`);
}

const output = `// Auto-generated - do not edit
// Contains embedded sparksh-backend JARs for multiple Spark versions
export const JARS: Record<string, string> = {
${Object.entries(jars).map(([v, b64]) => `  "${v}": "${b64}",`).join("\n")}
};
`;

await Bun.write(outputPath, output);

console.log(`\nEmbedded ${SPARK_CONFIGS.length} JARs (${(totalSize / 1024 / 1024).toFixed(2)} MB total) into jarData.ts`);
