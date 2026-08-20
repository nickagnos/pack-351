# Pack 351 — Cub Scouts, Lindale TX

The website for **Cub Scout Pack 351** in Lindale, Texas. Six pages — Home, About, Events,
Hideaway Candy Canes, Join and Resources — built with Vite and React, and prerendered to
static HTML so every page is a real URL.

**Live at:** https://pack351tx.org/

## Running it locally

Everything happens in `site/`:

```bash
cd site
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → site/dist/
npm run preview  # serve the production build locally
```

The site is served from the root of its own domain, so dev, preview and production all
share the same URL structure — there's no base-path difference to check for.

## How it's laid out

```
site/
  src/
    pages/       one file per page
    components/  shared UI — HomeHero (the whole home page), nav, footer, page hero, photo slot
    routes.js    the route manifest — slug, title, description, og:image for all six pages
    App.jsx      picks the page component for a slug. There is no router
    styles.css   the CSS, except HomeHero's — that ships as HERO_CSS inside the component
  prerender.js   writes dist/*.html, sitemap.xml and robots.txt after the build
  public/
    photos/      site photography (see PHOTOS.md)
    ranks/       official Cub Scout rank emblems
    hero/        the four home-page cinematic stills
```

`npm run build` renders every page to its own HTML file — `/about` is `dist/about.html`, and
GitHub Pages serves it at `/about` with no redirect. React then hydrates that markup for the
interactive parts (the nav menu, the FAQ accordion, the home cinematic). Search engines and
link previews see a real page per URL, and `#anchors` are free for linking to sections.

Adding or renaming a page means editing `src/routes.js` — it feeds the nav, the footer, the
prerender loop and the sitemap.

**Every image on the site is official Scouting America photography**, licensed from the
Brand Center for unit use — real, but not pictures of *our* Scouts. Good photos of Pack 351
beat them: drop a file into `site/public/photos/` (or `site/public/hero/`) with the exact
filename that's already there and it appears, no code changes. Each folder's markdown file
lists the filenames, what each shot shows, where it came from, and the licensing rules that
any replacement has to follow.

## Deploying

Push to `main`. That's it — `.github/workflows/deploy.yml` builds `site/` and publishes it
to GitHub Pages automatically.

## More detail

`CLAUDE.md` has the maintenance notes: where the contact email and meeting times live, how
the Events page is meant to work, what the Join page does instead of a form, and the
hosting setup. Start there before changing content.
