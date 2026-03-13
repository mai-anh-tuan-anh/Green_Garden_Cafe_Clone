# Vercel Deployment Guide for Green Garden Café Website

## Fixed Issues ✅
The following issues have been resolved to ensure successful deployment:

1. **vercel.json Configuration**:
   - Updated rewrite rule to properly handle SPA routing
   - Fixed asset path from `/static/` to `/assets/`
   - Improved regex pattern to avoid conflicts with API routes

2. **vite.config.ts Configuration**:
   - Changed base path from `/` to `./` for better Vercel compatibility
   - Simplified path alias configuration to avoid TypeScript errors

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. Push your changes to GitHub
2. Vercel will automatically detect the changes and redeploy
3. The build should now succeed with the fixed configuration

### Option 2: Manual Redeployment
1. Go to your Vercel dashboard
2. Find your project: `green-garden-cafe-website-1gnh98bas-mai-anh-tuan-anhs-projects.vercel.app`
3. Click on "Redeploy" or trigger a new deployment
4. The build should now complete successfully

### Option 3: Local Testing Before Deployment
```bash
# Clean build
npm run build

# Test locally
npm run preview
```

## Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci --omit=optional",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### vite.config.ts
```typescript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  base: "./",
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
```

## Troubleshooting

If deployment still fails:

1. **Check Build Logs**: Look for specific error messages in Vercel build logs
2. **Node Version**: Ensure Node.js >= 18.0.0 (already specified in package.json)
3. **Dependencies**: Run `npm ci` locally to ensure all dependencies install correctly
4. **Environment Variables**: If your app uses environment variables, add them in Vercel dashboard

## After Deployment

Once deployed successfully:
- Your site will be available at: `https://green-garden-cafe-website-1gnh98bas-mai-anh-tuan-anhs-projects.vercel.app`
- All routes should work correctly (/, /menu, /login, /admin, /order-history)
- Static assets will be properly cached for performance

## Support

If you encounter any issues after deployment:
1. Check the browser console for JavaScript errors
2. Verify all routes are accessible
3. Test the functionality on both desktop and mobile devices
