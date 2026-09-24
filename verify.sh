#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting Full Automated Verification..."

echo "----------------------------------------"
echo "🔍 1. Running TypeScript Type Check..."
npx -y typescript --noEmit
echo "✅ TypeScript Passed!"

echo "----------------------------------------"
echo "🧹 2. Running ESLint..."
npm run lint
echo "✅ Linter Passed!"

echo "----------------------------------------"
echo "🔨 3. Creating Production Build Test..."
npm run build
echo "✅ Build Passed!"

echo "----------------------------------------"
echo "🎉 SUCCESS: Everything runs properly automatically!"
