# Deployment Guide - Air Quality Dashboard

## Deploy to Vercel (Recommended)

Vercel offers free hosting for static sites with instant deployments from GitHub.

### Method 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Prepare Your GitHub Repository

The code is already pushed to:
```
https://github.com/sunriseyouthinternational-arch/airqualitymonitor_dashboard
```

Branch: `claude/air-quality-dashboard-5QgON`

#### Step 2: Sign Up / Log In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" (or "Log In" if you have an account)
3. Choose "Continue with GitHub" to connect your GitHub account
4. Authorize Vercel to access your GitHub repositories

#### Step 3: Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"airqualitymonitor_dashboard"** in the list
4. Click **"Import"** next to it

#### Step 4: Configure Project Settings

Vercel will auto-detect the configuration from `vercel.json`. You can accept the defaults:

**Project Name:** `monash-air-quality-dashboard` (or your preferred name)

**Framework Preset:** Select **"Other"**

**Root Directory:** `./` (keep as root - vercel.json handles the rest)

**Build Settings:**
- **Build Command:** Leave empty (automatically configured)
- **Output Directory:** Leave empty (automatically configured from vercel.json)
- **Install Command:** Leave empty

✅ **No need to configure anything else!** The `vercel.json` file handles all the configuration automatically.

#### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 30-60 seconds for deployment to complete
3. You'll see "Congratulations!" when done
4. Click **"Visit"** to see your live dashboard!

#### Step 6: Get Your Live URL

Your dashboard will be live at:
```
https://monash-air-quality-dashboard.vercel.app
```
(or whatever project name you chose)

You can also add a custom domain in Vercel settings!

---

### Method 2: Deploy via Vercel CLI

If you prefer using the command line:

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Deploy

```bash
cd /home/user/airqualitymonitor_dashboard
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (unless you already created one)
- **Project name?** → monash-air-quality-dashboard
- **Directory?** → `./dashboard`

#### Step 4: Deploy to Production

```bash
vercel --prod
```

Your dashboard is now live!

---

## Alternative Deployment Options

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Configure:
   - **Build command:** Leave empty
   - **Publish directory:** `dashboard`
6. Click "Deploy"

### Deploy to GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under "Source", select your branch: `claude/air-quality-dashboard-5QgON`
4. Set folder to `/ (root)`
5. Click Save
6. Your site will be live at:
   ```
   https://sunriseyouthinternational-arch.github.io/airqualitymonitor_dashboard/dashboard/
   ```

Note: You may need to update paths in your HTML if using GitHub Pages.

### Deploy to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up/login
3. Click "Create a project"
4. Connect your GitHub account
5. Select your repository
6. Configure:
   - **Production branch:** `claude/air-quality-dashboard-5QgON`
   - **Build command:** Leave empty
   - **Build output directory:** `dashboard`
7. Click "Save and Deploy"

---

## Post-Deployment Checklist

After deploying, verify these features work:

- [ ] Dashboard loads correctly
- [ ] Campus map image displays (if uploaded)
- [ ] Charts render properly
- [ ] Sensor markers appear on map
- [ ] Click on sensors opens modal
- [ ] Test smoke alert button works
- [ ] Smoke warning appears on map
- [ ] Alert sound plays (check browser permissions)
- [ ] Responsive design works on mobile
- [ ] All 8 sensor locations display
- [ ] Real-time data updates work

---

## Troubleshooting

### Issue: 404 Error or Blank Page

**Solutions:**

1. **Redeploy after latest changes:**
   - The `vercel.json` has been updated to fix this
   - Go to your Vercel project dashboard
   - Click "Deployments" tab
   - Click the three dots (•••) on the latest deployment
   - Click "Redeploy"

2. **If still getting 404:**
   - Go to Project Settings → General
   - Under "Build & Development Settings"
   - Set **Output Directory** to: `dashboard`
   - Click "Save"
   - Redeploy

3. **Alternative - Use Root Directory setting:**
   - Go to Project Settings → General
   - Under "Root Directory"
   - Click "Edit" and set to: `dashboard`
   - Click "Save"
   - Redeploy

### Issue: Campus Map Not Showing

**Solution:**
1. Verify the image file is in `dashboard/assets/campus-map/`
2. Check the filename matches one of: `monash-campus-map.png`, `monash-campus-map.jpg`, `campus-map.png`, `campus-map.jpg`
3. Ensure the image was committed and pushed to Git

### Issue: Charts Not Displaying

**Solution:**
1. Check browser console for errors
2. Verify Chart.js CDN is accessible
3. Try clearing browser cache

### Issue: Paths Not Working

**Solution:** If deploying to a subdirectory, update these in `index.html`:
```html
<!-- Change from: -->
<link rel="stylesheet" href="css/styles.css">

<!-- To: -->
<link rel="stylesheet" href="/dashboard/css/styles.css">
```

---

## Custom Domain Setup (Optional)

### On Vercel:

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Click "Add"
4. Enter your domain (e.g., `airquality.monash.edu.my`)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (5-30 minutes)

### Recommended Custom Domains:

- `airquality.monash.edu.my`
- `nosmoking.monash.edu.my`
- `campus-air-quality.com`

---

## Environment Variables (Future Use)

If you add backend integration later, you can set environment variables in Vercel:

1. Go to Project Settings → Environment Variables
2. Add variables like:
   - `API_URL` - Your backend API endpoint
   - `API_KEY` - API authentication key

---

## Continuous Deployment

Once set up, any push to your GitHub branch will automatically trigger a new deployment on Vercel!

```bash
# Make changes to your code
git add .
git commit -m "Update dashboard features"
git push origin claude/air-quality-dashboard-5QgON

# Vercel automatically deploys the changes!
```

---

## Performance Optimization Tips

1. **Enable Gzip Compression** (Vercel does this automatically)
2. **Use CDN** (Vercel provides this)
3. **Optimize Images:**
   - Compress campus map image before uploading
   - Use WebP format for better compression
   - Recommended tools: TinyPNG, ImageOptim

4. **Browser Caching** (Already configured in vercel.json)

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

Add to `dashboard/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Vercel Analytics

Vercel provides built-in analytics:
1. Go to your project dashboard
2. Click "Analytics" tab
3. View visitor stats, page views, performance metrics

---

## Support

**Deployment Issues?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

**Dashboard Issues?**
- Check `dashboard/README.md`
- Review browser console for errors

---

**Deployed by:** Monash Smokers - No Smoking Team
**Last Updated:** January 2026
