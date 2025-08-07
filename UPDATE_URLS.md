# Frontend URL Update Guide

## ✅ Configuration Updated!
Your frontend is now configured to connect to your actual backend:
- **Backend URL**: `https://backdep.onrender.com`

## Current Configuration
The frontend configuration has been updated with your real backend URL:
- **Backend URL**: `https://backdep.onrender.com`

## Files Updated
1. **`src/environments/environment.prod.ts`** - Updated with your backend URL
2. **`render.yaml`** - Updated environment variable with your backend URL

## Next Steps

### 1. **Redeploy Your Frontend**
Your frontend should now be ready to connect to your backend. Redeploy it on Render:
1. Go to your frontend service in Render dashboard
2. Click "Manual Deploy" or wait for automatic deployment
3. Wait for the build to complete

### 2. **Test the Connection**
After deployment, test that your frontend can connect to your backend:
1. Visit your frontend URL
2. Try to register or login
3. Check the browser console for any connection errors

### 3. **Verify Backend is Running**
Make sure your backend is running:
1. Visit `https://backdep.onrender.com/api-docs` to see API documentation
2. Check if the backend is responding

## Expected Behavior
- ✅ Frontend should load without errors
- ✅ API calls should go to `https://backdep.onrender.com`
- ✅ Registration/login should work if backend is connected
- ✅ Database functionality should work if backend is connected

## Troubleshooting
If you see connection errors:
1. Check if your backend is running at `https://backdep.onrender.com`
2. Verify the backend logs in Render dashboard
3. Test the backend health endpoint: `https://backdep.onrender.com/api/health`

Your frontend is now properly configured! 🎉
