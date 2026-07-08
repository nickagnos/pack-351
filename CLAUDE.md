# Pack 351 Website — CLAUDE.md

## What this project is
A static marketing website for **Cub Scout Pack 351** in Lindale, TX. Five pages: Home, About, Events, Join, Resources. Built with Vite + React, deployed to Netlify.

## Project layout
```
pack-351/
  site/                        ← the production website (Vite + React)
    src/
      components/              ← shared UI (nav, footer, photo slot, etc.)
      pages/                   ← one file per page
      App.jsx                  ← hash router (#/home, #/about, etc.)
      main.jsx                 ← React entry point
      styles.css               ← all CSS (global vars, utilities, responsive)
    public/
      photos/                  ← drop real photos here (see PHOTOS-NEEDED.md)
    index.html                 ← Netlify Forms hidden form lives here
    package.json
    vite.config.js
  project/                     ← original Claude Design prototype (reference only)
  netlify.toml                 ← Netlify build config (base=site, publish=dist)
  CLAUDE.md                    ← this file
```

## Dev commands (run from `site/`)
```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → site/dist/
npm run preview  # preview the production build locally
```

## Routing
Hash-based (`#/home`, `#/about`, `#/events`, `#/join`, `#/resources`). No server config needed — works on any static host. The `[[redirects]]` rule in `netlify.toml` catches direct URL loads.

## Adding or replacing photos
1. Put the file in `site/public/photos/` with the exact filename from `PHOTOS-NEEDED.md`
2. Run `npm run build` → redeploy `dist/`
3. No code changes needed — `PhotoSlot` automatically shows the image when `src` resolves

## Updating content
- **Contact email**: search `nickagnos@gmail.com` — appears in 3 files (see CONTACT-INFO.md)
- **Leader names**: search `[Name]` in `src/pages/AboutPage.jsx`
- **Events**: `src/pages/EventsPage.jsx` lines 4–17 (EVENTS array) and `src/pages/HomePage.jsx` lines 124–127
- **Meeting time/location**: `src/components/SiteFooter.jsx` lines 32–37 and `src/pages/JoinPage.jsx` line 155

## Netlify Forms
The join form POSTs to Netlify's form handler. The hidden `<form>` in `index.html` lets Netlify discover the form at build time. Submissions appear in the Netlify dashboard under **Forms** and trigger email notifications to the site owner. No backend code required.

## Tech stack
- React 18, Vite 6
- CSS custom properties (no CSS framework)
- Google Fonts: Barlow Condensed + Nunito
- Deployment: Netlify (free tier)
