#!/bin/bash
set -e

echo "Building SparkSH..."

# Build Scala backend for all Spark versions
echo "→ Building Scala backends..."
cd spark

# Create a directory to collect JARs
mkdir -p ../dist/jars

echo "  Building for Spark 3.4..."
sbt "set sparkVersion := \"3.4.4\"" clean assembly
cp target/scala-2.12/sparksh-backend-spark34.jar ../dist/jars/

echo "  Building for Spark 3.5..."
sbt "set sparkVersion := \"3.5.4\"" clean assembly
cp target/scala-2.12/sparksh-backend-spark35.jar ../dist/jars/

echo "  Building for Spark 4.0..."
sbt "set sparkVersion := \"4.0.0\"" clean assembly
cp target/scala-2.13/sparksh-backend-spark40.jar ../dist/jars/

# Copy JARs back for embedding
mkdir -p target/scala-2.12
mkdir -p target/scala-2.13
cp ../dist/jars/sparksh-backend-spark34.jar target/scala-2.12/
cp ../dist/jars/sparksh-backend-spark35.jar target/scala-2.12/
cp ../dist/jars/sparksh-backend-spark40.jar target/scala-2.13/

cd ..

# Embed JARs as base64 in TypeScript
echo "→ Embedding JARs..."
cd tui
bun run scripts/embed-jar.ts
cd ..

# Embed configs data
echo "→ Embedding configs..."
cd tui
bun run scripts/embed-configs.ts
cd ..

# Build standalone binary
echo "→ Compiling binary..."
cd tui
bun build --compile --minify src/index.tsx --outfile ../dist/sparksh
cd ..

# Restore placeholder (keeps repo clean)
cat > tui/src/jarData.ts << 'EOF'
// Placeholder for dev mode - replaced during build
// Run ./build.sh to generate the real embedded JARs
export const JARS: Record<string, string> = {};
EOF

echo ""
echo "✓ Build complete!"
echo ""
echo "Output: ./dist/sparksh ($(du -h dist/sparksh | cut -f1))"
echo ""
echo "Install:"
echo "  sudo cp dist/sparksh /usr/local/bin/"
