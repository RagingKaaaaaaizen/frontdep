#!/bin/bash

echo "🚀 Starting aggressive build process..."

# Clean everything
echo "🧹 Cleaning all caches and build artifacts..."
rm -rf .angular
rm -rf node_modules
rm -rf dist
rm -f package-lock.json

# Fresh install
echo "📦 Fresh install of dependencies..."
npm install --legacy-peer-deps

# Build with production configuration
echo "🔨 Building application with production config..."
npm run build --prod --configuration=production

# Check if build was successful
if [ -f "dist/angular-signup-verification-boilerplate/index.html" ]; then
    echo "✅ Build successful!"
    echo "📁 Files created in dist/angular-signup-verification-boilerplate/"
    ls -la dist/angular-signup-verification-boilerplate/
    
    # Check if environment was replaced correctly
    if grep -q "backdep.onrender.com" dist/angular-signup-verification-boilerplate/main.js; then
        echo "✅ Backend URL correctly configured"
    else
        echo "⚠️  Backend URL might not be correct"
        echo "🔍 Checking for localhost references..."
        grep -r "localhost:4000" dist/angular-signup-verification-boilerplate/ || echo "✅ No localhost references found"
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
