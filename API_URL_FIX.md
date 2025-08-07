# 🔧 Fix Registration Error - API URL Issue

## ❌ **Root Cause:**
The error `Http failure response for http://localhost:4000/api/accounts/register: 0 Unknown Error` shows that your frontend is still trying to connect to `localhost:4000` instead of your deployed backend at `https://backdep.onrender.com`.

## ✅ **Fixes Applied:**

### **1. Fixed Environment Configuration:**
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://backdep.onrender.com'  // Direct URL, no process.env
};
```

### **2. Enhanced Build Script:**
```bash
#!/bin/bash
# Clean Angular cache
rm -rf .angular

# Build with production configuration
npm run build --prod --configuration=production

# Verify backend URL is correct
if grep -q "backdep.onrender.com" dist/angular-signup-verification-boilerplate/main.js; then
    echo "✅ Backend URL correctly configured"
fi
```

### **3. Updated render.yaml:**
```yaml
buildCommand: chmod +x build.sh && ./build.sh
staticPublishPath: ./dist/angular-signup-verification-boilerplate
envVars:
  - key: API_URL
    value: https://backdep.onrender.com
  - key: NODE_ENV
    value: production
```

## 🎯 **Why This Fixes It:**

✅ **Correct Backend URL**: Production build now uses `https://backdep.onrender.com`
✅ **Cache Cleared**: Angular cache cleared to prevent old configurations
✅ **Environment Replacement**: File replacement works correctly in production
✅ **Build Verification**: Script checks if backend URL is correctly included

## 📋 **Manual Render Configuration:**

If using manual settings in Render dashboard:

**Build Command:**
```
chmod +x build.sh && ./build.sh
```

**Publish Directory:**
```
dist/angular-signup-verification-boilerplate
```

**Environment Variables:**
- `API_URL`: `https://backdep.onrender.com`
- `NODE_ENV`: `production`

## 🧪 **Testing Steps:**

### **1. After Deployment:**
- Visit: `https://frontdep.onrender.com/`
- Try to register a new account
- Should connect to: `https://backdep.onrender.com/api/accounts/register`

### **2. Check Network Tab:**
- Open browser dev tools
- Go to Network tab
- Try registration
- Should see requests to `backdep.onrender.com`, not `localhost:4000`

### **3. Expected Behavior:**
- ✅ Registration form loads
- ✅ Form submits to correct backend
- ✅ No "localhost:4000" errors
- ✅ Backend responds correctly

## 🚨 **If Still Having Issues:**

### **Alternative Build Command:**
```
npm ci --legacy-peer-deps && npm run build --prod --aot
```

### **Check Build Logs:**
Look for these messages:
```
✅ Backend URL correctly configured
✅ Build successful!
```

## 📞 **Next Steps:**

1. **Redeploy** with these fixes
2. **Monitor** build logs for success
3. **Test** registration functionality
4. **Verify** backend connection

The registration error should now be fixed! 🎯
