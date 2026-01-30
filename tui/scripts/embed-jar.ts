import { resolve } from "path";

const jarPath = resolve(
  import.meta.dir,
  "../../spark/target/scala-2.13/sparksh-backend-assembly-0.1.4.jar",
);
const outputPath = resolve(import.meta.dir, "../src/jarData.ts");

const jarFile = Bun.file(jarPath);

if (!(await jarFile.exists())) {
  console.error("JAR not found at:", jarPath);
  console.error("Run 'sbt assembly' in the spark directory first.");
  process.exit(1);
}

const jarBytes = await jarFile.arrayBuffer();
const base64 = Buffer.from(jarBytes).toString("base64");

const output = `// Auto-generated - do not edit
// Contains embedded sparksh-backend.jar as base64
export const JAR_BASE64 = "${base64}";
export const JAR_SIZE = ${jarBytes.byteLength};
`;

await Bun.write(outputPath, output);

console.log(
  `Embedded JAR (${(jarBytes.byteLength / 1024 / 1024).toFixed(2)} MB) into jarData.ts`,
);
