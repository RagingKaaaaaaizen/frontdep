# API Connection Guide

## Problem
Your frontend is getting a 404 error when trying to connect to your backend API at `https://inventory-backend-api-cr3z.onrender.com/accounts/register`.

## Solution Steps

### 1. Test Backend Connection
Navigate to your deployed frontend and go to: `https://frontdep.onrender.com/api-test`

This will show you:
- Whether your backend is reachable
- Which API URL structure works
- What endpoints are available

### 2. Check Backend API Structure
Your frontend expects these endpoints:
- `/accounts/register` - User registration
- `/accounts/authenticate` - User login
- `/stocks/public` - Get public stocks
- `/items/public` - Get public items
- `/categories/public` - Get public categories

### 3. Possible Issues and Solutions

#### Issue 1: Backend has different URL structure
If your backend uses `/api/` prefix:
```typescript
// Update environment.ts and environment.prod.ts
apiUrl: 'https://inventory-backend-api-cr3z.onrender.com/api'
```

#### Issue 2: Backend has different endpoint names
If your backend uses different endpoint names, update the service files accordingly.

#### Issue 3: CORS issues
Make sure your backend allows requests from `https://frontdep.onrender.com`

### 4. Debug Information
The updated code includes:
- Enhanced error logging
- API request/response logging (when debugApi is true)
- Alternative API URL testing
- Health check functionality

### 5. Environment Configuration
Current configuration in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://inventory-backend-api-cr3z.onrender.com',
  apiUrlAlt1: 'https://inventory-backend-api-cr3z.onrender.com/api',
  apiUrlAlt2: 'https://inventory-backend-api-cr3z.onrender.com/v1',
  debugApi: true
};
```

### 6. Testing Steps
1. Deploy the updated frontend
2. Visit `https://frontdep.onrender.com/api-test`
3. Click "Run API Tests" to see which URLs work
4. Check browser console for detailed error messages
5. Update the `apiUrl` in environment files based on test results

### 7. Common Backend URL Structures
- `https://your-backend.com/` (no prefix)
- `https://your-backend.com/api/` (with /api prefix)
- `https://your-backend.com/v1/` (with version prefix)

### 8. Backend Health Check
The API test component will also test these health endpoints:
- `/health`
- `/api/health`
- `/v1/health`
- `/status`

## Next Steps
1. Deploy this updated frontend
2. Test the API connection using the `/api-test` route
3. Check the browser console for detailed error messages
4. Update the API URL configuration based on the test results
5. If needed, update the backend to match the expected endpoints
