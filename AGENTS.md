# Pack 351 Website — AGENTS.md

## What this project is
A static marketing website for Cub Scout Pack 351 in Lindale, TX. Five pages: Home, About, Events, Join, and Resources. Built with Vite + React and deployed to Netlify.

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
  CLAUDE.md                    ← project context file
  AGENTS.md                    ← this file
```

## Dev commands (run from site/)
```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → site/dist/
npm run preview  # preview the production build locally
```

## Routing
Hash-based routing is used for the site pages: #/home, #/about, #/events, #/join, and #/resources. No server config is required for static hosting. The redirects rule in netlify.toml handles direct URL loads.

## Adding or replacing photos
1. Put the file in site/public/photos/ with the exact filename from PHOTOS-NEEDED.md.
2. Run npm run build to regenerate the build output.
3. No code changes are needed when the image path resolves correctly because the PhotoSlot component will display it automatically.

## Updating content
- Contact email: search nickagnos@gmail.com; it appears in multiple files and is documented in CONTACT-INFO.md.
- Leader names: update the placeholders in src/pages/AboutPage.jsx.
- Events: edit the EVENTS array in src/pages/EventsPage.jsx and the featured event summary in src/pages/HomePage.jsx.
- Meeting time/location: update the shared footer in src/components/SiteFooter.jsx and the join page details in src/pages/JoinPage.jsx.

## Netlify Forms
The join form posts to Netlify's form handler. The hidden form in site/index.html lets Netlify discover the form during build. Submissions appear in the Netlify dashboard under Forms and trigger email notifications to the site owner. No backend code is required.

## Tech stack
- React 18, Vite 6
- CSS custom properties with no CSS framework
- Google Fonts: Barlow Condensed and Nunito
- Deployment: Netlify (free tier)
