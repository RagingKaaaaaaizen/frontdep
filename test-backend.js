const https = require('https');

const backendUrl = 'https://inventory-backend-api-cr3z.onrender.com';

const testEndpoints = [
  '/api/accounts/register',
  '/api/accounts/authenticate',
  '/api/stocks/public',
  '/api/items/public',
  '/api/categories/public',
  '/api/health',
  '/api/status'
];

const alternativeUrls = [
  backendUrl,
  `${backendUrl}/api`,
  `${backendUrl}/v1`
];

function testEndpoint(url, endpoint) {
  return new Promise((resolve) => {
    const fullUrl = `${url}${endpoint}`;
    
    https.get(fullUrl, (res) => {
      console.log(`✅ ${fullUrl} - Status: ${res.statusCode}`);
      resolve({ url: fullUrl, status: res.statusCode, success: true });
    }).on('error', (err) => {
      console.log(`❌ ${fullUrl} - Error: ${err.message}`);
      resolve({ url: fullUrl, status: 'error', success: false, error: err.message });
    });
  });
}

async function runTests() {
  console.log('🔍 Testing Backend API Connection with updated endpoints...\n');
  
  for (const baseUrl of alternativeUrls) {
    console.log(`\n📡 Testing base URL: ${baseUrl}`);
    console.log('─'.repeat(50));
    
    for (const endpoint of testEndpoints) {
      await testEndpoint(baseUrl, endpoint);
    }
  }
  
  console.log('\n🎯 Test Summary:');
  console.log('─'.repeat(50));
  console.log('✅ = Endpoint accessible');
  console.log('❌ = Endpoint not accessible or error');
  console.log('\n💡 If all endpoints return ❌, check:');
  console.log('   1. Backend is deployed and running');
  console.log('   2. Backend URL is correct');
  console.log('   3. Backend has the expected endpoints');
  console.log('   4. CORS is properly configured');
}

runTests().catch(console.error);
