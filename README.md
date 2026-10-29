# Anurag — Full Stack Developer Portfolio

Animated, responsive static portfolio. It works on both **Vercel** and **GitHub Pages** without a build step or server runtime.

## Files
- `index.html` — page structure and metadata
- `style.css` — design, responsive layout and animations
- `script.js` — portfolio content and interactions
- `assets/profile-photo.jpg` — profile photo
- `assets/battlexa-esports-logo.png` — Battlexa Esports Arena logo
- `.nojekyll` — disables GitHub Pages Jekyll processing
- `vercel.json` — static deployment configuration

## Deploy to GitHub Pages
1. Upload the **contents** of this folder to the root of your GitHub repository (so `index.html` is at the repository root).
2. Commit and push.
3. Open **Settings → Pages** and select **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save and wait for the Pages deployment to finish.

## Deploy to Vercel
1. Import the GitHub repository into Vercel.
2. Choose **Other** as the framework preset.
3. Leave Build Command and Output Directory empty/default; this is a static site.
4. Deploy. `index.html` is served from the project root.

## Edit personal links
Edit `portfolioConfig` near the top of `script.js`. Replace placeholder email/social URLs with your real details. GitHub contribution and language cards currently use illustrative demo data and are not live GitHub analytics.
