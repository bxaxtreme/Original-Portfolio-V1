# Xtreme — Multilingual Developer Portfolio

A responsive static portfolio built with **HTML, CSS and vanilla JavaScript**. It includes animated visuals, project cards, a language selector (English, Hindi and Hinglish), and live public GitHub repository/language information.

## Hosting on Vercel
1. Push the contents of this folder to a GitHub repository.
2. Import that repository into Vercel.
3. Choose **Other** as the framework preset if asked.
4. Leave **Build Command** and **Output Directory** empty/default (the site is static and `index.html` is at the root).
5. Deploy.

No Node.js build, npm install, API key, or environment variables are required. `vercel.json` is included for simple static hosting. The GitHub public API can rate-limit anonymous requests; if it does, the page shows an unavailable message rather than made-up statistics.

## Files
- `index.html` — page content
- `style.css` — layout, responsive styles and animations
- `script.js` — language selector, interactions, project cards and GitHub API calls
- `assets/` — profile and project logos
