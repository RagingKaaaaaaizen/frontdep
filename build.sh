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

# Show current environment files
echo "📁 Checking environment files..."
echo "Development environment:"
cat src/environments/environment.ts
echo ""
echo "Production environment:"
cat src/environments/environment.prod.ts
echo ""

# Build with explicit production configuration
echo "🔨 Building application with explicit production config..."
npm run build --prod --configuration=production --verbose

# Check if build was successful
if [ -f "dist/angular-signup-verification-boilerplate/index.html" ]; then
    echo "✅ Build successful!"
    echo "📁 Files created in dist/angular-signup-verification-boilerplate/"
    ls -la dist/angular-signup-verification-boilerplate/
    
    # Check if environment was replaced correctly
    echo "🔍 Checking main.js for backend URL..."
    if grep -q "backdep.onrender.com" dist/angular-signup-verification-boilerplate/main.js; then
        echo "✅ Backend URL correctly configured"
    else
        echo "⚠️  Backend URL might not be correct"
    fi
    
    echo "🔍 Checking for localhost references..."
    if grep -r "localhost:4000" dist/angular-signup-verification-boilerplate/; then
        echo "❌ Found localhost:4000 references!"
    else
        echo "✅ No localhost references found"
    fi
    
    # Show all URLs found in main.js
    echo "🔍 All URLs found in main.js:"
    grep -o 'https\?://[^"'\''\s]*' dist/angular-signup-verification-boilerplate/main.js | sort | uniq
else
    echo "❌ Build failed!"
    exit 1
fi
