# Pack 351 Website — AGENTS.md

## What this project is
A static marketing website for Cub Scout Pack 351 in Lindale, TX. Five pages: Home, About, Events, Join, and Resources. Built with Vite + React, hosted on GitHub Pages (migrated off Netlify 2026-07-15 — see "Hosting & deployment" below).

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
    index.html                 ← app entry HTML
    package.json
    vite.config.js             ← sets base '/pack-351/' for the production build
  project/                     ← original Claude Design prototype (reference only)
  .github/workflows/deploy.yml ← builds site/ + publishes to GitHub Pages on push to main
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
Hash-based routing is used for the site pages: #/home, #/about, #/events, #/join, and #/resources. No server config or SPA fallback is required — all navigation lives in the URL hash, so the host only serves the base index.html. Works on GitHub Pages as-is.

## Adding or replacing photos
1. Put the file in site/public/photos/ with the exact filename from PHOTOS-NEEDED.md.
2. Commit the photo and push to main — the GitHub Pages workflow rebuilds and redeploys automatically.
3. No code changes are needed; PhotoSlot displays it automatically. Asset paths go through src/asset.js so they resolve under the /pack-351/ base.

## Updating content
- Contact email: search nickagnos@gmail.com; it appears in multiple files and is documented in CONTACT-INFO.md.
- Leader names: update the placeholders in src/pages/AboutPage.jsx.
- Events: edit the EVENTS array in src/pages/EventsPage.jsx and the featured event summary in src/pages/HomePage.jsx.
- Meeting time/location: update the shared footer in src/components/SiteFooter.jsx and the sidebar cards in src/pages/JoinPage.jsx.
- Contact email for the Join page: the CONTACT_EMAIL constant in src/pages/JoinPage.jsx.

## The join form → now a contact CTA (Netlify Forms removed)

The old join form posted to Netlify's form handler, which does not work on GitHub Pages (static hosting, no form backend), so it was removed (2026-07-15). The Join page now offers two no-backend paths: drop in to a Monday meeting, or email us via a prefilled mailto: link (CONTACT_EMAIL in src/pages/JoinPage.jsx). The hidden Netlify form + data-netlify markup are gone from index.html. If a real form is wanted again, add a form service (Formspree/Getform/Basin), a Google Form, or a serverless endpoint.

## Hosting & deployment

Hosted on GitHub Pages (migrated off Netlify 2026-07-15). Deploy is automatic: pushing to main runs .github/workflows/deploy.yml, which builds site/ and publishes site/dist/ to Pages. Served as a project page at `https://nickagnos.github.io/pack-351/`, so vite.config.js sets base '/pack-351/' for the build; runtime asset URLs go through src/asset.js (import.meta.env.BASE_URL) so they resolve under the subpath. Local npm run dev stays at /.

Two one-time GitHub settings are still required for the site to go live: (1) the repo must be public (or on a plan that allows Pages on private repos) — it is currently private; (2) Settings → Pages → Source must be set to "GitHub Actions". Optional: a custom domain (CNAME + DNS) with the build base changed back to '/' gives a clean root URL.

## Tech stack
- React 18, Vite 6
- CSS custom properties with no CSS framework
- Google Fonts: Barlow Condensed and Nunito
- Deployment: GitHub Pages via GitHub Actions (.github/workflows/deploy.yml)
