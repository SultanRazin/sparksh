#!/bin/bash
set -e

REPO="SultanRazin/sparksh"
INSTALL_DIR="/usr/local/bin"
BINARY_NAME="sparksh"

# Detect OS
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
case "$OS" in
    darwin) OS="darwin" ;;
    linux) OS="linux" ;;
    *)
        echo "Error: Unsupported operating system: $OS"
        exit 1
        ;;
esac

# Detect architecture
ARCH=$(uname -m)
case "$ARCH" in
    x86_64) ARCH="x64" ;;
    amd64) ARCH="x64" ;;
    arm64) ARCH="arm64" ;;
    aarch64) ARCH="arm64" ;;
    *)
        echo "Error: Unsupported architecture: $ARCH"
        exit 1
        ;;
esac

ARTIFACT="sparksh-${OS}-${ARCH}"

echo "Installing SparkSH for ${OS}-${ARCH}..."

# Get latest release URL
RELEASE_INFO=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" 2>/dev/null) || {
    echo "Error: No releases found. Please check https://github.com/${REPO}/releases"
    exit 1
}

DOWNLOAD_URL=$(echo "$RELEASE_INFO" | grep "browser_download_url.*${ARTIFACT}" | cut -d '"' -f 4)

if [ -z "$DOWNLOAD_URL" ]; then
    echo "Error: Could not find binary for ${ARTIFACT}"
    echo "Available binaries can be found at: https://github.com/${REPO}/releases"
    exit 1
fi

# Create temp directory
TMP_DIR=$(mktemp -d)
trap "rm -rf $TMP_DIR" EXIT

# Download binary
echo "Downloading from: ${DOWNLOAD_URL}"
curl -fsSL "$DOWNLOAD_URL" -o "${TMP_DIR}/${BINARY_NAME}"

# Make executable
chmod +x "${TMP_DIR}/${BINARY_NAME}"

# Install (may require sudo)
if [ -w "$INSTALL_DIR" ]; then
    mv "${TMP_DIR}/${BINARY_NAME}" "${INSTALL_DIR}/${BINARY_NAME}"
else
    echo "Installing to ${INSTALL_DIR} (requires sudo)..."
    sudo mv "${TMP_DIR}/${BINARY_NAME}" "${INSTALL_DIR}/${BINARY_NAME}"
fi

rm -rf $HOME/.sparksh

echo ""
echo "SparkSH installed successfully!"
echo ""
echo "Prerequisites:"
echo "  - Java 11 or higher"
echo "  - Apache Spark (SPARK_HOME environment variable)"
echo ""
echo "Run 'sparksh --help' to get started."


