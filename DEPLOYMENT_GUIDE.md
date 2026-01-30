# Deployment Guide

## Pre-Deployment Checklist

Before deploying your authentication system, verify:

- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables set correctly
- [ ] API endpoints verified
- [ ] localStorage working
- [ ] Token handling secure
- [ ] Forms validate correctly
- [ ] Error messages clear
- [ ] Loading states visible
- [ ] Responsive design tested
- [ ] Cross-browser compatibility checked

---

## Build for Production

### Step 1: Build the Project
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 2: Preview Build Locally
```bash
npm run preview
```

This serves the production build locally for testing.

### Step 3: Verify Build
1. Open `http://localhost:4173`
2. Test all features:
   - Register
   - Login
   - View profile
   - Logout
3. Check DevTools for errors

---

## Deployment Platforms

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero-config deployment
- Free tier available
- Automatic HTTPS
- CI/CD included
- Environment variables support

**Steps:**

1. **Prepare repository:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Push to GitHub:**
```bash
git remote add origin https://github.com/yourusername/Login-page.git
git branch -M main
git push -u origin main
```

3. **Connect to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Click "Deploy"

4. **Set environment variables:**
- Project Settings → Environment Variables
- Add any needed variables
- Redeploy

**Result:** Your app is live at `https://your-project.vercel.app`

---

### Option 2: Netlify

**Advantages:**
- Simple deployment
- Free tier available
- Good performance
- Environment variables support

**Steps:**

1. **Prepare build:**
```bash
npm run build
```

2. **Connect to Netlify:**
- Go to [netlify.com](https://netlify.com)
- Click "New site from Git"
- Connect GitHub account
- Select repository
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Click "Deploy site"

3. **Configure environment:**
- Site settings → Environment
- Add environment variables if needed

**Result:** Your app is live at `https://your-site.netlify.app`

---

### Option 3: GitHub Pages

**Advantages:**
- Free hosting
- Integrated with GitHub

**Steps:**

1. **Update vite.config.js:**
```javascript
export default {
  base: '/Login-page/', // Replace with your repo name
  // ... rest of config
}
```

2. **Update router base path:**

In `src/App.jsx`:
```javascript
<BrowserRouter basename="/Login-page/">
  {/* ... routes ... */}
</BrowserRouter>
```

3. **Add deploy script to package.json:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

4. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

5. **Deploy:**
```bash
npm run deploy
```

**Result:** Your app is live at `https://yourusername.github.io/Login-page`

---

### Option 4: Traditional Hosting (Shared/VPS)

**Steps:**

1. **Build project:**
```bash
npm run build
```

2. **Upload `dist/` folder:**
- Use FTP/SFTP
- Upload all files from `dist/` to public_html

3. **Configure server:**
- Ensure `index.html` is served for all routes
- Example nginx config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

4. **Set up HTTPS:**
- Use Let's Encrypt (free)
- Or purchase SSL certificate

---

## Environment Variables

### Create .env File
```
VITE_API_BASE_URL=https://e-commerce-mega-kart.vercel.app/api
```

### Update AuthContext.jsx
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const response = await fetch(`${API_BASE_URL}/users/register`, {
  // ...
});
```

### Platform-Specific Setup

**Vercel:**
- Project Settings → Environment Variables
- Add `VITE_API_BASE_URL`

**Netlify:**
- Site settings → Environment
- Add `VITE_API_BASE_URL`

**GitHub Pages:**
- Actions → Secrets and variables
- Add as repository variable

---

## Performance Optimization

### 1. Code Splitting
```javascript
import { lazy, Suspense } from 'react';

const Profile = lazy(() => import('./pages/Profile'));

<Suspense fallback={<LoadingSpinner />}>
  <Profile />
</Suspense>
```

### 2. Image Optimization
- Use WebP format
- Compress images
- Lazy load images

### 3. Bundle Analysis
```bash
npm install --save-dev rollup-plugin-visualizer
```

### 4. Minification
- Already handled by Vite
- Build produces minified files

### 5. Caching Strategy
- Static assets: Long cache (1 year)
- HTML: No cache or short cache (5 minutes)
- API responses: Cache strategically

---

## Security Considerations

### 1. HTTPS
✅ Always use HTTPS in production
- Vercel: Automatic
- Netlify: Automatic
- Traditional: Use Let's Encrypt

### 2. CORS
✅ Verify API CORS headers
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### 3. Environment Variables
✅ Never commit `.env` files
✅ Use platform-specific secret management

### 4. Token Security
✅ JWT stored in localStorage
✅ Consider moving to httpOnly cookies (requires backend support)
✅ Implement token refresh mechanism

### 5. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

### 6. X-Frame-Options
```
X-Frame-Options: DENY
```

---

## Monitoring & Analytics

### Setup Sentry (Error Tracking)
```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

### Setup Google Analytics
```bash
npm install react-ga
```

```javascript
import ReactGA from 'react-ga';

ReactGA.initialize('GA_MEASUREMENT_ID');
```

### Setup LogRocket (Session Replay)
```bash
npm install logrocket
```

```javascript
import LogRocket from 'logrocket';

LogRocket.init('app-id');
```

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Rollback Strategy

### Keep Previous Versions
- Vercel: Automatic (keeps last 10 deployments)
- Netlify: Automatic (keeps history)
- GitHub Pages: Manual git revert

### Rollback Steps
1. Identify problematic deployment
2. Revert to previous version
3. Monitor for issues
4. Fix and redeploy

---

## Maintenance

### Regular Tasks
- ✅ Update dependencies: `npm update`
- ✅ Check for vulnerabilities: `npm audit`
- ✅ Monitor error tracking
- ✅ Review analytics
- ✅ Test API endpoints monthly

### Update Dependencies
```bash
npm outdated
npm update
npm install @latest
```

### Security Audits
```bash
npm audit
npm audit fix
```

---

## Troubleshooting Deployment

### Issue: "Cannot find module"
**Solution:**
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### Issue: "Build fails"
**Solution:**
- Check build logs
- Verify all dependencies installed
- Check for TypeScript errors
- Verify environment variables set

### Issue: "Blank page on load"
**Solution:**
- Check browser console for errors
- Verify index.html served correctly
- Check SPA routing configuration
- Verify asset paths (may need base path)

### Issue: "API calls fail in production"
**Solution:**
- Verify API endpoint URLs
- Check CORS headers
- Verify environment variables
- Check API authentication

### Issue: "localStorage not working"
**Solution:**
- Check privacy/incognito mode
- Verify browser settings
- Check for storage quota
- Consider alternative storage (sessionStorage)

---

## Post-Deployment Checklist

After deployment:
- [ ] Site loads without errors
- [ ] Register works
- [ ] Login works
- [ ] Profile displays correctly
- [ ] Logout works
- [ ] Token persists on refresh
- [ ] Protected routes work
- [ ] Forms validate
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] HTTPS working
- [ ] Performance acceptable (< 3s load)
- [ ] No console errors
- [ ] Analytics configured
- [ ] Error tracking configured

---

## Performance Metrics

Target metrics:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time To First Byte): < 600ms
- **Total Size**: < 200KB (gzipped)

Check with:
- Google PageSpeed Insights
- WebPageTest.org
- Lighthouse (Chrome DevTools)

---

## Scaling Considerations

### When to Optimize
- [ ] Page load > 3s
- [ ] Build size > 300KB
- [ ] API responses slow
- [ ] High 401 errors
- [ ] High server errors

### Optimization Strategies
1. Code splitting
2. Image optimization
3. Lazy loading
4. Caching strategies
5. CDN usage
6. Database optimization
7. API rate limiting

---

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

---

**Deployment ready! 🚀**
