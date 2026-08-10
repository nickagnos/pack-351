# Pack 351 Website — CLAUDE.md

## What this project is
A static marketing website for **Cub Scout Pack 351** in Lindale, TX. Five pages: Home, About, Events, Join, Resources. Built with Vite + React, **live on GitHub Pages** at <https://pack351tx.org/> (went live 2026-08-03 at the github.io URL, custom domain 2026-08-09) — see [Hosting & deployment](#hosting--deployment).

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
      CNAME                    ← the custom domain, shipped in the Pages artifact — don't delete
    index.html                 ← app entry HTML
    package.json
    vite.config.js             ← Vite config; no `base` (site is served from the domain root)
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
3. No code changes needed — `PhotoSlot` automatically shows the image when `src` resolves (asset paths go through `src/asset.js`, which prefixes Vite's base URL)

## Updating content
- **Contact email**: search `txcspack351@gmail.com` — appears in 4 files (`SiteFooter.jsx`,
  `JoinPage.jsx`, `ResourcesPage.jsx` ×2, `EventsPage.jsx`)
- **Events**: `src/pages/EventsPage.jsx` — the `EVENTS` array (the year list) and `FEATURED`
  (the three signature-event cards). The page deliberately carries **no fixed dates**: each
  row has a season or frequency (`when: 'Most Tuesdays'`, `'Spring'`), and a note under the
  list points people to email/Facebook for actual dates. Keep it that way when editing.
  The Home page no longer lists events at all — it's the scrolling cinematic.
- **Meeting day/time/location**: hardcoded as prose in **7 files** — there's no shared constant,
  so change all of them or the site contradicts itself. As of 2026-08-04 it's *most Tuesdays,
  6:00 – 7:00 PM* at Central Baptist Church:
  `components/QuickFacts.jsx` (the `FACTS` array), `components/SiteFooter.jsx` (the Meetings
  column), `components/ScrollWorld.jsx` (last scene's `body`), `pages/JoinPage.jsx` (×4: hero
  `sub`, the "Drop in to a meeting" card, and two sidebar cards), `pages/EventsPage.jsx` (×2:
  the first `EVENTS` row and the hero `sub`), `pages/ResourcesPage.jsx` (the "Come to your
  first meeting" step), and `site/index.html` (the `og:description` meta tag — easy to miss,
  it's the Facebook/iMessage link-preview text). Verify with
  `grep -rniE 'monday|tuesday|6:00|7:00' site/src site/index.html`.
- **Contact email for the Join page**: `CONTACT_EMAIL` in `src/pages/JoinPage.jsx`

## The join form → now a contact CTA (Netlify Forms removed)

The old join form POSTed to Netlify's form handler, which doesn't work on GitHub Pages (static hosting, no form backend), so it was **removed** (2026-07-15). The Join page now offers two no-backend paths: **drop in to a Tuesday meeting**, or **email us** via a prefilled `mailto:` link (`CONTACT_EMAIL` in `src/pages/JoinPage.jsx`). The hidden Netlify `<form>` + `data-netlify` markup are gone from `index.html`.

If a real form is ever wanted again, add a third-party handler (Formspree, Getform, Basin), a Google Form, or a serverless endpoint hosted elsewhere.

## Hosting & deployment

**Live on GitHub Pages** at <https://pack351tx.org/> — a custom domain since 2026-08-09; before that it was the project-page URL <https://nickagnos.github.io/pack-351/> (live 2026-08-03, migrated off Netlify 2026-07-15). The old URL still 301-redirects, so links shared with families before the move keep working.

Because the site is served from the **root** of its own domain, `vite.config.js` sets no `base` (Vite's default `/` is correct) and dev, preview and production all agree. Runtime asset URLs still go through `src/asset.js` (`import.meta.env.BASE_URL`) rather than hardcoding `/`, so moving back under a subpath would be a one-line change in `vite.config.js` and nowhere else.

**The domain lives in two places** and both must agree:
- **DNS at Porkbun** — four `A` records on the apex (`185.199.108-111.153`), four `AAAA`
  (`2606:50c0:800{0,1,2,3}::153`), and a `CNAME` for `www` → `nickagnos.github.io.`
- **`site/public/CNAME`** — one line, `pack351tx.org`. Vite copies `public/` verbatim and
  `stripDocsFromBuild` only deletes `*.md`, so this extensionless file rides along in the
  Pages artifact and is what tells GitHub which domain to serve. **Don't delete it** — a
  deploy without it can reset the custom domain back to the github.io URL.

**Publishing a change:** commit to `main` and push. `.github/workflows/deploy.yml` builds `site/` and publishes `site/dist/` to Pages — a run takes ~40 seconds. Check it with `gh run list` and confirm the live bundle with:

```bash
ASSET=$(curl -s https://pack351tx.org/ | grep -o '/assets/index-[^"]*\.js' | head -1)
curl -s "https://pack351tx.org$ASSET" | grep -o 'some text you changed'
```

The repo is **public**; treat anything committed here as published. Pushing workflow changes needs the `workflow` scope on the token.

**If the domain ever changes again**, `og:url` and `og:image` in `site/index.html` are the two
things that won't adapt on their own — the Open Graph spec requires absolute URLs, so they
hardcode the origin. Update both, update `site/public/CNAME`, then re-scrape the new URL in
Facebook's Sharing Debugger or the Pack's Facebook group will keep rendering the old card.

## Tech stack
- React 18, Vite 6
- CSS custom properties (no CSS framework)
- Google Fonts: Barlow Condensed + Nunito
- Deployment: **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)
