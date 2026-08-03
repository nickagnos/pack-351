# Pack 351 Website — CLAUDE.md

## What this project is
A static marketing website for **Cub Scout Pack 351** in Lindale, TX. Five pages: Home, About, Events, Join, Resources. Built with Vite + React, **set up for GitHub Pages** (migrated off Netlify 2026-07-15; not live yet) — see [Hosting & deployment](#hosting--deployment).

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
      ranks/                   ← official Cub Scout rank emblems (see that folder's README)
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
- **Contact email**: search `txcspack351@gmail.com` — appears in 4 files (see CONTACT-INFO.md)
- **Leader names**: search `[Name]` in `src/pages/AboutPage.jsx`
- **Events**: `src/pages/EventsPage.jsx` — the `EVENTS` array (the year list) and `FEATURED`
  (the three signature-event cards). The page deliberately carries **no fixed dates**: each
  row has a season or frequency (`when: 'Most Mondays'`, `'Spring'`), and a note under the
  list points people to email/Facebook for actual dates. Keep it that way when editing.
  The Home page no longer lists events at all — it's the scrolling cinematic.
- **Meeting time/location**: `src/components/SiteFooter.jsx` and the sidebar cards in `src/pages/JoinPage.jsx`
- **Contact email for the Join page**: `CONTACT_EMAIL` in `src/pages/JoinPage.jsx`

## The join form → now a contact CTA (Netlify Forms removed)

The old join form POSTed to Netlify's form handler, which doesn't work on GitHub Pages (static hosting, no form backend), so it was **removed** (2026-07-15). The Join page now offers two no-backend paths: **drop in to a Monday meeting**, or **email us** via a prefilled `mailto:` link (`CONTACT_EMAIL` in `src/pages/JoinPage.jsx`). The hidden Netlify `<form>` + `data-netlify` markup are gone from `index.html`.

If a real form is ever wanted again, add a third-party handler (Formspree, Getform, Basin), a Google Form, or a serverless endpoint hosted elsewhere.

## Hosting & deployment

**Set up for GitHub Pages** (migrated off Netlify 2026-07-15) — the code is ready but the site is **not live yet** (see the go-live steps below). Target is a **project page** at `https://nickagnos.github.io/pack-351/`, so `vite.config.js` sets `base: '/pack-351/'` for the build and every runtime asset URL goes through `src/asset.js` (`import.meta.env.BASE_URL`) to resolve under that subpath. Local `npm run dev` stays at `/`.

**To go live (all still to do):**

- [x] **Deploy workflow committed** — `.github/workflows/deploy.yml` builds `site/` and publishes `site/dist/` to Pages on push to `main` (fires once Pages is enabled below). (Pushing it required adding the `workflow` scope to the token.)
- [ ] **Make the repo public** — currently **private**; free Pages needs a public repo (or a paid plan).
- [ ] **Settings → Pages → Source = "GitHub Actions".**
- [ ] **Push `main`** — this is what actually fires the first deploy.

Optional: for a clean root URL, add a **custom domain** (`CNAME` + DNS) and change the build
`base` back to `'/'`. The `asset()` helper adapts automatically, but **two things won't**:
`og:url` and `og:image` in `site/index.html` are absolute URLs (the Open Graph spec requires it)
and hardcode `https://nickagnos.github.io/pack-351/`. Update both by hand, or Facebook link
previews will keep pointing at the old origin.

## Tech stack
- React 18, Vite 6
- CSS custom properties (no CSS framework)
- Google Fonts: Barlow Condensed + Nunito
- Deployment: **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)
