# SparkSH

A modern terminal UI for Apache Spark with syntax highlighting, auto-completion, and a better interactive experience.

![SparkSH Demo](demo.gif)

## Prerequisites

- **Java 11+** - Required to run Spark
- **Apache Spark** - Set `SPARK_HOME` environment variable

## Installation

### One-liner install (macOS/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/SultanRazin/sparksh/master/install.sh | bash
```

This automatically detects your OS and architecture, then downloads the correct binary.

### Manual download

Download the binary for your platform from [GitHub Releases](https://github.com/SultanRazin/sparksh/releases):

| Platform | Binary |
|----------|--------|
| macOS (Apple Silicon) | `sparksh-darwin-arm64` |
| macOS (Intel) | `sparksh-darwin-x64` |
| Linux (x86_64) | `sparksh-linux-x64` |
| Linux (ARM64) | `sparksh-linux-arm64` |

Then install it:

```bash
chmod +x sparksh-*
sudo mv sparksh-* /usr/local/bin/sparksh
```

## Usage

```bash
# Start SparkSH with default settings
sparksh

# Specify master
sparksh --master local[4]
sparksh --master spark://host:7077

# Pass Spark configuration
sparksh --conf spark.sql.shuffle.partitions=10

# Show help
sparksh --help
```

## Building from Source

### Requirements

- [Bun](https://bun.sh/) (latest)
- [sbt](https://www.scala-sbt.org/) (for Scala backend)
- Java 11+

### Build

```bash
# Clone the repository
git clone https://github.com/SultanRazin/sparksh.git
cd sparksh

# Build everything (Scala backends + TypeScript TUI)
./build.sh

# Binary will be at dist/sparksh
sudo cp dist/sparksh /usr/local/bin/
```

### Development

```bash
# Install TUI dependencies
cd tui
bun install

# Run in dev mode (requires pre-built JAR)
bun run dev
```

## Supported Spark Versions

SparkSH automatically detects your Spark version and uses the appropriate backend:

- Spark 3.4.x
- Spark 3.5.x
- Spark 4.0.x

## License

MIT
