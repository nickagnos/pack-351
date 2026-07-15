# Pack 351 Website — CLAUDE.md

## What this project is
A static marketing website for **Cub Scout Pack 351** in Lindale, TX. Five pages: Home, About, Events, Join, Resources. Built with Vite + React, **hosted on GitHub Pages** (migrated off Netlify 2026-07-15) — see [Hosting & deployment](#hosting--deployment).

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
  CLAUDE.md                    ← this file
```

## Dev commands (run from `site/`)
```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → site/dist/
npm run preview  # preview the production build locally
```

## Routing
Hash-based (`#/home`, `#/about`, `#/events`, `#/join`, `#/resources`). No server config or SPA fallback needed — all navigation lives in the URL hash, so the host only ever serves the base `index.html`. Works on GitHub Pages (and any static host) as-is.

## Adding or replacing photos
1. Put the file in `site/public/photos/` with the exact filename from `PHOTOS-NEEDED.md`
2. Commit the photo and push to `main` — GitHub Pages rebuilds & redeploys automatically (Actions)
3. No code changes needed — `PhotoSlot` automatically shows the image when `src` resolves (asset paths go through `src/asset.js` so they work under the `/pack-351/` base)

## Updating content
- **Contact email**: search `nickagnos@gmail.com` — appears in 3 files (see CONTACT-INFO.md)
- **Leader names**: search `[Name]` in `src/pages/AboutPage.jsx`
- **Events**: `src/pages/EventsPage.jsx` lines 4–17 (EVENTS array) and `src/pages/HomePage.jsx` lines 124–127
- **Meeting time/location**: `src/components/SiteFooter.jsx` and the sidebar cards in `src/pages/JoinPage.jsx`
- **Contact email for the Join page**: `CONTACT_EMAIL` in `src/pages/JoinPage.jsx`

## The join form → now a contact CTA (Netlify Forms removed)

The old join form POSTed to Netlify's form handler, which doesn't work on GitHub Pages (static hosting, no form backend), so it was **removed** (2026-07-15). The Join page now offers two no-backend paths: **drop in to a Monday meeting**, or **email us** via a prefilled `mailto:` link (`CONTACT_EMAIL` in `src/pages/JoinPage.jsx`). The hidden Netlify `<form>` + `data-netlify` markup are gone from `index.html`.

If a real form is ever wanted again, add a third-party handler (Formspree, Getform, Basin), a Google Form, or a serverless endpoint hosted elsewhere.

## Hosting & deployment

**Hosted on GitHub Pages** (migrated off Netlify 2026-07-15). Deploy is automatic: pushing to `main` runs `.github/workflows/deploy.yml`, which builds `site/` and publishes `site/dist/` to Pages. Served as a **project page** at `https://nickagnos.github.io/pack-351/`, so `vite.config.js` sets `base: '/pack-351/'` for the build; every runtime asset URL goes through `src/asset.js` (`import.meta.env.BASE_URL`) so it resolves under that subpath. Local `npm run dev` stays at `/`.

**Two one-time GitHub settings are still required for the site to go live:**

- [ ] **Repo must be public** (or on a plan that allows Pages on private repos) — this repo is currently private.
- [ ] **Settings → Pages → Source = "GitHub Actions"** — lets the workflow deploy.

Optional: for a clean root URL, add a **custom domain** (`CNAME` file + DNS) and change the build `base` back to `'/'` — the `asset()` helper adapts automatically.

## Tech stack
- React 18, Vite 6
- CSS custom properties (no CSS framework)
- Google Fonts: Barlow Condensed + Nunito
- Deployment: **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)
