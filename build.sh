#!/bin/bash
set -e

echo "Building SparkSH..."

# Build Scala backend
echo "→ Building Scala backend..."
cd spark
sbt assembly
cd ..

# Embed JAR as base64 in TypeScript
echo "→ Embedding JAR..."
cd tui
bun run scripts/embed-jar.ts
cd ..

# Build standalone binary
echo "→ Compiling binary..."
cd tui
bun build --compile --minify src/index.tsx --outfile ../dist/sparksh
cd ..

# Restore placeholder (keeps repo clean)
cat > tui/src/jarData.ts << 'EOF'
// Placeholder for dev mode - replaced during build
// Run ./build.sh to generate the real embedded JAR
export const JAR_BASE64 = "";
export const JAR_SIZE = 0;
EOF

echo ""
echo "✓ Build complete!"
echo ""
echo "Output: ./dist/sparksh ($(du -h dist/sparksh | cut -f1))"
echo ""
echo "Install:"
echo "  sudo cp dist/sparksh /usr/local/bin/"
echo ""
echo "Usage:"
echo "  sparksh"
echo "  sparksh --master local[4]"
echo "  sparksh --conf spark.sql.shuffle.partitions=10"
echo "  sparksh --help"
