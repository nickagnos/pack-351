# Pack 351 — Cub Scouts, Lindale TX

The website for **Cub Scout Pack 351** in Lindale, Texas. Five pages — Home, About, Events,
Join and Resources — built as a static site with Vite and React.

**Live at:** https://nickagnos.github.io/pack-351/

## Running it locally

Everything happens in `site/`:

```bash
cd site
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → site/dist/
npm run preview  # serve the production build at the real /pack-351/ base
```

Use `npm run preview` rather than `npm run dev` when you want to check something that
depends on the deployed URL structure — the dev server runs at `/`, the real site runs
under `/pack-351/`.

## How it's laid out

```
site/
  src/
    pages/       one file per page
    components/  shared UI — nav, footer, page hero, photo slot
    App.jsx      hash router (#/home, #/about, …)
    styles.css   all the CSS
  public/
    photos/      site photography (see PHOTOS-NEEDED.md)
    ranks/       official Cub Scout rank emblems
    scroll-world/  the four home-page cinematic stills
```

Routing is hash-based, so there's no server config or SPA fallback to worry about — the
host only ever serves one `index.html`.

**Every image on the site is AI-generated placeholder art**, waiting on real photos of the
Pack. `site/public/photos/PHOTOS-NEEDED.md` lists what's needed and the exact filename each
one should use; drop a file in with the right name and it appears, no code changes.

## Deploying

Push to `main`. That's it — `.github/workflows/deploy.yml` builds `site/` and publishes it
to GitHub Pages automatically.

## More detail

`CLAUDE.md` has the maintenance notes: where the contact email and meeting times live, how
the Events page is meant to work, what the Join page does instead of a form, and the
hosting setup. Start there before changing content.
