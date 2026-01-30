# SparkSH

A better spark-shell with a modern terminal UI.

## Prerequisites

- **Java 11+** - Required to run Spark
- **Apache Spark** - Set `SPARK_HOME` environment variable

## Installation

### One-liner install (macOS/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/SultanRazin/sparksh/main/install.sh | bash
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