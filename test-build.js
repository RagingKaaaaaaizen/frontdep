const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing build process...');

try {
  // Clean install
  console.log('📦 Installing dependencies...');
  execSync('npm ci --legacy-peer-deps', { stdio: 'inherit' });
  
  // Build
  console.log('🔨 Building application...');
  execSync('npm run build --prod', { stdio: 'inherit' });
  
  // Check if files exist
  const distPath = path.join(__dirname, 'dist', 'angular-signup-verification-boilerplate');
  const indexPath = path.join(distPath, 'index.html');
  const redirectsPath = path.join(distPath, '_redirects');
  
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists');
  } else {
    console.log('❌ index.html missing');
  }
  
  if (fs.existsSync(redirectsPath)) {
    console.log('✅ _redirects exists');
  } else {
    console.log('❌ _redirects missing');
  }
  
  // List all files
  console.log('📁 Files in dist:');
  const files = fs.readdirSync(distPath);
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
  
  console.log('🎉 Build test completed!');
  
} catch (error) {
  console.error('❌ Build test failed:', error.message);
  process.exit(1);
}
