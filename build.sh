#!/bin/bash

echo "🚀 Starting build process..."

# Clean Angular cache
echo "🧹 Cleaning Angular cache..."
rm -rf .angular

# Clean install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the application with production configuration
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
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
