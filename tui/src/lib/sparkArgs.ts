export function parseSparkArgs(): string[] {
  const args = process.argv.slice(2);
  const sparkArgs: string[] = [];

  let i = 0;
  while (i < args.length) {
    const arg = args[i]!;
    if (
      arg.startsWith("--conf") ||
      arg.startsWith("--jars") ||
      arg.startsWith("--packages") ||
      arg.startsWith("--driver-memory") ||
      arg.startsWith("--executor-memory") ||
      arg.startsWith("--master") ||
      arg.startsWith("--deploy-mode") ||
      arg.startsWith("--driver-class-path") ||
      arg.startsWith("--driver-java-options") ||
      arg.startsWith("--files") ||
      arg.startsWith("--py-files") ||
      arg.startsWith("--archives") ||
      arg.startsWith("--keytab") ||
      arg.startsWith("--principal")
    ) {
      if (arg.includes("=")) {
        sparkArgs.push(arg);
        i++;
      } else if (i + 1 < args.length) {
        sparkArgs.push(arg, args[i + 1]!);
        i += 2;
      } else {
        i++;
      }
    } else if (arg === "--help" || arg === "-h") {
      console.log(`SparkSH - Interactive Spark Shell with TUI

Usage: sparksh [options]

Options (passed to spark-submit):
  --master MASTER_URL     spark://host:port, local, yarn, etc.
  --conf KEY=VALUE        Spark configuration property
  --jars JARS             Comma-separated list of JARs
  --packages PACKAGES     Comma-separated list of Maven coordinates
  --driver-memory MEM     Memory for driver (e.g., 1g, 2g)
  --executor-memory MEM   Memory per executor (e.g., 1g, 2g)
  --files FILES           Comma-separated list of files
  --driver-class-path     Extra classpath for driver
  --driver-java-options   Extra Java options for driver

Examples:
  sparksh --master local[4]
  sparksh --conf spark.sql.shuffle.partitions=10
  sparksh --jars /path/to/custom.jar
  sparksh --packages org.apache.spark:spark-avro_2.13:4.0.0
`);
      process.exit(0);
    } else {
      i++;
    }
  }

  return sparkArgs;
}

export const sparkArgs = parseSparkArgs();
