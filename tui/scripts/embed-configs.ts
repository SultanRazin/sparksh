import { resolve } from "path";
import type { ConfigInfo } from "../src/types";

const csvPath = resolve(import.meta.dir, "../../data/spark_configuration_properties.csv");
const outputPath = resolve(import.meta.dir, "../src/lib/configsData.ts");

const file = Bun.file(csvPath);
const data = await file.text();
const lines = data.split("\n").filter((line) => line.trim());

const configs: ConfigInfo[] = lines.slice(1).map((line) => {
  const [propertyName, defaultValue, meaning, sinceVersion] = line.split("|");
  return {
    propertyName: (propertyName || "").trim(),
    defaultValue: (defaultValue || "").trim(),
    meaning: (meaning || "").trim(),
    sinceVersion: (sinceVersion || "").trim(),
  };
});

const output = `// Auto-generated - do not edit
// Contains embedded Spark configuration documentation
import type { ConfigInfo } from "../types";

export const CONFIGS: ConfigInfo[] = ${JSON.stringify(configs, null, 2)};
`;

await Bun.write(outputPath, output);

console.log(`Embedded ${configs.length} configs into configsData.ts`);
