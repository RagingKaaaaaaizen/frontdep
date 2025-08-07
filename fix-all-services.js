const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'src', 'app', '_services');
const services = [
  'pc-component.service.ts',
  'dispose.service.ts',
  'room-location.service.ts',
  'pc.service.ts',
  'department.service.ts',
  'storage-location.service.ts',
  'brand.service.ts',
  'category.service.ts',
  'stock.service.ts',
  'workflow.service.ts',
  'alert.service.ts'
];

console.log('🔧 Fixing all service files to use hardcoded production URLs...');

services.forEach(serviceFile => {
  const filePath = path.join(servicesDir, serviceFile);
  
  if (fs.existsSync(filePath)) {
    console.log(`📝 Fixing ${serviceFile}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace environment import
    content = content.replace(
      /import\s+\{\s*environment\s*\}\s+from\s+['"]@environments\/environment['"];?/g,
      '// import { environment } from \'@environments/environment\';'
    );
    
    // Replace baseUrl definitions
    content = content.replace(
      /(private\s+)?baseUrl\s*=\s*`\$\{environment\.apiUrl\}\/api\/([^`]+)`/g,
      '// TEMPORARY FIX: Hardcode the production URL to ensure it works\n  private baseUrl = \'https://backdep.onrender.com/api/$2\''
    );
    
    // Replace const baseUrl definitions
    content = content.replace(
      /const\s+baseUrl\s*=\s*`\$\{environment\.apiUrl\}\/api\/([^`]+)`/g,
      '// TEMPORARY FIX: Hardcode the production URL to ensure it works\nconst baseUrl = \'https://backdep.onrender.com/api/$1\''
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${serviceFile}`);
  } else {
    console.log(`⚠️  File not found: ${serviceFile}`);
  }
});

console.log('🎉 All service files have been updated!');
console.log('📋 Services updated:');
services.forEach(service => console.log(`  - ${service}`));
