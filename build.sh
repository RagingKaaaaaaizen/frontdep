#!/bin/bash

echo "🚀 Starting build process..."

# Clean install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the application (skip linting)
echo "🔨 Building application..."
npm run build --prod

# Check if build was successful
if [ -f "dist/angular-signup-verification-boilerplate/index.html" ]; then
    echo "✅ Build successful!"
    echo "📁 Files created in dist/angular-signup-verification-boilerplate/"
    ls -la dist/angular-signup-verification-boilerplate/
else
    echo "❌ Build failed!"
    exit 1
fi
