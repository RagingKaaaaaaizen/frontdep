# Frontend Deployment Guide for Render

## Prerequisites
- Render account
- Backend API already deployed on Render

## Deployment Steps

1. **Connect your GitHub repository to Render**
   - Go to Render Dashboard
   - Click "New +" and select "Static Site"
   - Connect your GitHub repository
   - Select the `introprogfrontt` directory

2. **Configure Build Settings**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: Static Site

3. **Configure Environment Variables**
   In Render dashboard, add this environment variable:
   ```
   API_URL=https://your-backend-app-name.onrender.com
   ```
   Replace `your-backend-app-name` with your actual backend app name on Render.

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your Angular application

## Important Notes

1. **Update API URL**: After deploying the backend, update the `API_URL` environment variable in Render dashboard to point to your actual backend URL.

2. **CORS Configuration**: The backend is already configured to allow CORS from any origin, so the frontend should work without additional configuration.

3. **Build Output**: The Angular build will create a `dist` folder containing the static files that Render will serve.

## Accessing Your Application
Your frontend will be available at: `https://your-frontend-app-name.onrender.com`

## Troubleshooting
- If you see CORS errors, make sure your backend URL is correctly set in the environment variables
- If the build fails, check that all dependencies are properly listed in `package.json`
- Make sure your backend is running before testing the frontend
