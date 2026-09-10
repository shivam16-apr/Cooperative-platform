#!/usr/bin/env bash
# FixMate Admin Dashboard - Startup Script for Linux / macOS

set -e

echo "========================================================"
echo "      Starting FixMate Admin Dashboard (Vite/React)   "
echo "========================================================"
echo ""

# Check node
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in PATH."
    exit 1
fi

# Check node_modules
if [ ! -d "node_modules" ]; then
    echo "[INFO] node_modules not found. Installing dependencies..."
    npm install
fi

echo "[INFO] Starting dev server on http://localhost:3000 ..."
npm run dev
