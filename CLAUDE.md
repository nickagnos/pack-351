# Pack 351 Website — CLAUDE.md

## What this project is
A static marketing website for **Cub Scout Pack 351** in Lindale, TX. Five pages — Home, About, Events, Hideaway Candy Canes, Info — plus `/join`, a redirect stub that forwards to Scouting America's registration. Built with Vite + React and **prerendered to static HTML** (real URLs like `/about`, not `#/about`), **live on GitHub Pages** at <https://pack351tx.org/> (went live 2026-08-03 at the github.io URL, custom domain 2026-08-09) — see [Hosting & deployment](#hosting--deployment).

## Project layout
```
pack-351/
  site/                        ← the production website (Vite + React)
    src/
      components/              ← shared UI (nav, footer, photo slot, etc.)
      pages/                   ← one file per page
      routes.js                ← THE route manifest: slug, title, description, og:image
      App.jsx                  ← picks the page component for a slug; no router
      main.jsx                 ← browser entry point (hydrates the prerendered HTML)
      entry-server.jsx         ← build-time entry point (renders a slug to a string)
      styles.css               ← all CSS (global vars, utilities, responsive)
    public/
      photos/                  ← page photography (see PHOTOS.md)
      hero/                    ← the home hero still + the og:image still (see that folder's README)
      ranks/                   ← official Cub Scout rank emblems (see that folder's README)
      CNAME                    ← the custom domain, shipped in the Pages artifact — don't delete
    index.html                 ← the shared HTML template (see the head markers inside)
    prerender.js               ← writes dist/*.html, sitemap.xml, robots.txt after the build
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

## Routing — real URLs, prerendered

Each page is a real document at a real path: `/`, `/about`, `/events`, `/candy-canes`,
`/info`, plus `/404.html`, plus `/join` — a **redirect stub** that forwards to
`BEASCOUT_REGISTER_URL` (see the joining section below). (`/info` was `/resources` until
2026-08-20 — renamed with **no redirect**, so old `/resources` links 404; only the legacy
hash shim maps `#/resources` → `/info`.) **There is no router.** Navigation is a plain
`<a href="/about">` and a full page load; `App.jsx` just picks a page component for the slug
it's given.

It was hash-based (`#/about`) until **2026-08-19**. That cost three things: Google saw all
six pages as one URL (fragments aren't distinct URLs), every share rendered the home-page
card, and section anchors were impossible because the hash *was* the router.

**How a page gets built.** `npm run build` runs three steps:

1. `vite build` → the normal client bundle and `dist/index.html`
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` → the same React tree, renderable in Node
3. `node prerender.js` → for each entry in `src/routes.js`, renders the page to HTML, drops it
   into the `dist/index.html` template, swaps the per-page head block, writes `dist/<slug>.html`.
   Then writes `sitemap.xml` and `robots.txt`.

`src/main.jsx` then **hydrates** that markup in the browser (`hydrateRoot`, not `createRoot` —
`createRoot` would throw the prerendered HTML away). React still runs everything interactive:
the nav hamburger, the Info page's FAQ accordion.

**Adding or renaming a page** is one edit to `src/routes.js` plus a page component and an entry
in `PAGES` in `App.jsx`. The manifest feeds the nav, the footer, the prerender loop and the
sitemap, so nothing else needs touching.

### Things that will bite you

- **`site/index.html` is a template.** Everything between `<!--head-->` and `<!--/head-->` is
  regenerated per page from `routes.js` — title, description, canonical, og: card. Editing it
  there only changes the home page and the dev server. Edit `routes.js`.
- **Prerendering means no browser APIs during render.** `window`, `document`, `localStorage`
  and `Date.now()` in a render body (or a `useState` initialiser) will crash the build or
  cause a hydration mismatch. Effects are fine — they don't run in Node.
- **`<style>` content needs `dangerouslySetInnerHTML`.** `renderToString` escapes text
  children, and `<style>` is a raw-text element the HTML parser won't unescape, so an
  apostrophe in CSS ships as a literal `&#x27;` and silently breaks the rule. `HomeHero.jsx`
  hit exactly this. Same applies to inline `<script>`.
- **The dev server doesn't prerender.** `npm run dev` serves the template for every route
  (see `devCleanUrls` in `vite.config.js`) and client-renders it, so in dev every tab reads
  the home page's `<title>` and the head tags are the home page's. That's dev-only; check
  titles against `npm run preview` or `dist/`.
- **Legacy `#/about` links are shimmed**, not dead — see the script at the top of
  `site/index.html`. Those URLs were live from 2026-08-03 to 2026-08-19 and are in the wild.
  Don't remove it.

## The two logos

`site/public/pack-logo.png` and `site/public/cub-scouts-logo.jpg` are **not** interchangeable,
and the difference is legal, not aesthetic:

- **`pack-logo.png`** is the Pack's own artwork — a customisable template that packs personalise.
  That's why it could be keyed transparent. It's 166×125, so **46px tall is its ceiling** before
  it softens on a retina screen. Rendered by `components/PackLogo.jsx` (nav + footer) and again
  in the home hero's ghost button.
- **`cub-scouts-logo.jpg`** is the official Cub Scouts diamond, a Scouting America trademark.
  From the Brand Center, folder *Program Logos*, `web_id` **`0bNcE8JnHR5q`**
  (`CubScoutsLogo-FullColor-CSBC.jpg`, 7500×7500 at source; the 2000px rendition downscaled to
  320 at quality 90, matching `ranks/README.md`).

  ⚠️ **Don't key its white background transparent, and don't crop the ®.** The Brand Center
  licence forbids derivative works — *"not edit or create any derivative work based on the asset
  unless it is labeled as an 'editable template'"* — and `ranks/README.md` says the ® and ™ "are
  part of the image and must not be cropped out." That's why it sits on a white clear-space chip
  (`.hh-btn-mark` in `HomeHero.jsx`) rather than being cut out. Downscale only.

Both marks live **inside** the home hero's two call-to-action buttons, not in a row of
their own. The chip does double duty there: it's what makes the white-backed Cub Scouts JPEG
sit legibly on the gold button, and it's what keeps the navy-lettered Pack mark visible when
the ghost button flips to navy on hover. Their `alt` is empty on purpose — the button text
already names them, so a real alt would have a screen reader say it twice.

There is **no plain Scouting America corporate logo** in the Cub Scouts Brand Portal — its
`Logos` folder holds only "A250" 250th-anniversary lockups, which would date the page. The Cub
Scouts diamond is the right mark for a Cub Scout pack anyway.

Displaying these marks is what the About page attribution line covers (`AboutPage.jsx`); it
names the Cub Scouts logo explicitly because that mark is on the home page, away from the line.

## The candy cane scene (original artwork)

`site/public/candy-cane-scene.svg` is the one image on the site that is **not** a photograph:
a hand-drawn winter scene — house, lit windows, falling snow, and five large candy canes
planted along the front lawn. It replaced a Brand Center stand-in (a Scouting For Food
door-to-door shot) because the library has no candy-cane-fundraiser photography at all, so
nothing in it could show the thing the page actually sells.

- **It animates**, and it does so with CSS *inside* the SVG. That works from a plain
  `<img src>` — an SVG in an `<img>` runs its own CSS but loads no external resources and
  executes no JS. That's why one file serves all three placements with no component changes,
  and why nothing in it may reference an external font or image.
- **It honours `prefers-reduced-motion`** via a media query inside the SVG's own `<style>`.
- **Drawn at 1600×1000 (16:10)** to match `.page-hero-img-wrap`. Every container crops it with
  `object-fit: cover`, so the house and the middle three canes sit inside the centre 60% and
  survive the narrower crops on the About column (165px tall) and the Events card (200px).

### The share card is a separate file

`candy-cane-scene.png` (1200×800) is a still rendered from the SVG, because `og:image` must be
a static raster — Facebook won't animate an SVG, and most scrapers won't accept one at all.
**The two must be regenerated together** or the share card drifts from the page. To re-render
after editing the SVG:

```bash
npm run build && npm run preview          # serve it
cat > site/dist/_ogshot.html <<'EOF'
<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;overflow:hidden}img{display:block;width:1200px;height:800px}</style>
<img src="/candy-cane-scene.svg" alt="">
EOF
# screenshot http://localhost:4173/_ogshot.html at exactly 1200x800, save as
# site/public/candy-cane-scene.png, then delete the temp file.
```

`routes.js` hardcodes `imageWidth: 1200` / `imageHeight: 800`, so change those too if the
canvas ratio ever changes — `npm run build` fails if they don't match the PNG you rendered.

## Adding or replacing photos
1. Put the file in `site/public/photos/` with the exact filename from `PHOTOS.md` (or in
   `site/public/hero/` for the two home-page stills (the hero + the share card) — that folder's README has the
   composition rules the scroll camera and the cream scrim impose)
2. Commit the photo and push to `main` — GitHub Pages rebuilds & redeploys automatically (Actions)
3. No code changes needed — `PhotoSlot` automatically shows the image when `src` resolves (asset paths go through `src/asset.js`, which prefixes Vite's base URL)

## Updating content
- **Contact email**: search `txcspack351@gmail.com` — appears in 5 files (`SiteFooter.jsx`,
  `InfoPage.jsx` ×2, `EventsPage.jsx`, `NotFoundPage.jsx`, and `CandyCanesPage.jsx`'s
  `CONTACT_EMAIL` const). The Join page dropped its email path 2026-08-20.
- **Events**: `src/pages/EventsPage.jsx` — the `EVENTS` array (the year list) and `FEATURED`
  (the three signature-event cards). The page deliberately carries **no fixed dates**: each
  row has a season or frequency (`when: 'Most Tuesdays'`, `'Spring'`), and a note under the
  list points people to email/Facebook for actual dates. Keep it that way when editing.
  The Home page no longer lists events at all — it's a single full-screen hero.
- **Meeting day/time/location**: hardcoded as prose in **6 files** — there's no shared constant,
  so change all of them or the site contradicts itself. As of 2026-08-04 it's *most Tuesdays,
  6:00 – 7:00 PM* at Central Baptist Church:
  `components/QuickFacts.jsx` (the `FACTS` array), `components/SiteFooter.jsx` (the Meetings
  column), `components/HomeHero.jsx` (the hero `body`), `pages/EventsPage.jsx` (×2: the first
  `EVENTS` row and the hero `sub`), `pages/InfoPage.jsx` (×2: the "What happens at a meeting?"
  FAQ answer and the "Come to your first meeting" step), and `src/routes.js` (×2: the home
  entry's `shareDescription` — easy to miss, it's the Facebook/iMessage link-preview text —
  and the events entry's `description`). The Join page no longer mentions the meeting time
  (its drop-in path was removed 2026-08-20). Verify with
  `grep -rniE 'monday|tuesday|6:00|7:00' site/src`.
- **Official registration link**: `BEASCOUT_REGISTER_URL` in `src/routes.js` — one constant,
  used everywhere a "Join"-labelled action appears (the nav's "Join Now →", desktop +
  hamburger; the home hero's gold button; the footer's "Join Pack 351 →"; two About-page
  buttons; the Info links grid and step 2 of "Your first 30 days"; and the `/join` redirect
  itself — `grep -rn BEASCOUT_REGISTER_URL site/src` for the current list). The Info links
  grid also carries `https://beascout.scouting.org/` ("Be A Scout") — Scouting America's
  *general* join page for families new to Scouting; don't confuse the two.
  The `unitId` is Pack-specific, so **don't copy one from another pack's site**. To re-verify
  it, search ZIP 75771 on <https://beascout.scouting.org> — our listing reads "Pack 0351
  Central Baptist Church, Lindale, TX" and its "Apply Now" carries the id. Note the link
  redirects to a my.scouting.org sign-in that never names Pack 351, which is why every place
  it appears warns families they'll be asked to make an account.
- **Candy cane ordering**: `ORDERING_OPEN` in `src/pages/CandyCanesPage.jsx` — a single
  boolean, flipped by hand each season. Ordering opens in **October**; the canes go out in
  December and are collected in January. The flag drives the status banner and the height of
  the embedded Google Form, because a cross-origin iframe can't report whether the form is
  open. Flip it to `true` when the Pack opens the form, and back to `false` when it closes,
  or the page will tell families the wrong thing. The Events page card deliberately names no
  month so there's only one place to update.

## The join form → a Google Form (Netlify Forms removed)

The original join form POSTed to Netlify's form handler, which doesn't work on GitHub Pages (static hosting, no form backend), so it was **removed** (2026-07-15) and the hidden Netlify `<form>` + `data-netlify` markup came out of `index.html`. Joining then went through several 2026-08-20 simplifications and ended at two things, neither needing a backend, with deliberate labels — **"Join" is only ever the Scouting America registration; the interest form is "get info", never "join"**:

1. **Join** — `BEASCOUT_REGISTER_URL` (create a my.Scouting account, register, pay fees).
   **`/join` itself is a redirect stub** to that URL, not a content page — see below.
2. **Get info: the Pack 351 Interest Form** — a Google Form embedded on `/info#interest-form`,
   directly below the Info hero (`INTEREST_FORM_URL` + `INTEREST_FORM_HEIGHT` in
   `src/routes.js`; the section id is `INTEREST_FORM_ID`, also there)

The interest form was recovered from the old Google Sites joining page, where it was *embedded* rather than linked — which is why the 2026-08-15 content audit, which worked off that page's visible links, missed it. **Responses land in the Pack's own Google account**, so if submissions stop arriving that's a Google-side problem, not a code one. The form has no open/closed flag because it stays open year-round; if it ever gets closed the embed will read "no longer accepting responses" with nothing explaining why, so add a status banner like `CandyCanesPage.jsx` has.

Both this form and the candy cane one go through `components/FormEmbed.jsx`, which owns the `?embedded=true` suffix, the a11y `title`, and the "open in a new tab" fallback for browsers that block third-party frames. **Heights are hardcoded per form** — a cross-origin iframe can't size itself — so re-measure if either form's questions change. The interest form passes `loading="eager"` (it's the first thing under the Info hero; a deferred 1490px frame would blank the first view); the candy cane form keeps the default `lazy` — it sits below that page's hero and status banner, so most visits scroll to it or not at all, and deferring the frame keeps the initial load light. `styles.css` turns off smooth scrolling under `prefers-reduced-motion`.

### /join is a redirect; the label decides where every link goes

Since the 2026-08-20 messaging split, **anything labelled "Join" performs the join** — it
goes to `BEASCOUT_REGISTER_URL`, Scouting America's registration for this pack — and
**anything labelled "Get Info" goes to the interest form** at `/info#interest-form`
(`pageHref('info', INTEREST_FORM_ID)`). No link says one thing and does the other; that
mismatch is the confusion this rework removed.

**`/join` itself forwards to the registration** (the route's `redirect` field): GitHub Pages
can't 301, so `prerender.js` writes a `<meta http-equiv="refresh">` into its head,
`JoinPage.jsx` backs it with a `location.replace` script, and a visible "Continue →" link
catches anything that blocks both. The route is `noindex`, out of the sitemap, and has no
nav/footer label — internal "Join" links go **directly** to `BEASCOUT_REGISTER_URL` rather
than through the stub, so `/join` exists only for links already in the wild.
`PAGE_ANCHORS` in `src/routes.js` is empty; `NotFoundPage.jsx` filters unlabelled routes out
of its cards so the stub never shows up as an empty card there.

⚠️ **`pagePath`, not `pageHref`, is what `prerender.js` uses** for `canonical`, `og:url` and
`sitemap.xml` — don't "fix" an anchor into `pagePath`.

**Section anchors work now.** This used to be forbidden — the hash was the router, so
`<a href="#form">` resolved to a nonexistent route and rendered a blank screen, and
`JoinPage.jsx` carried a `scrollToForm` JS shim instead. Since the move to real URLs
(2026-08-19) a fragment is just a fragment: `<a href="#interest-form">` is the right way, and
the prerendered HTML means the target element exists before any JavaScript runs, so a cold
load of `/candy-canes#form` lands correctly.

The anchors that exist (used by the short links — see below):

| Page | Anchors |
|---|---|
| `/about` | `#story` `#dens` `#facts` `#charter` |
| `/events` | `#signature` `#calendar` |
| `/candy-canes` | `#status` `#form` `#how-it-works` |
| `/info` | `#interest-form` `#links` `#uniform` `#new-families` `#band` `#faq` |

Clearance under the 68px sticky nav comes from one `html { scroll-padding-top: 88px }` in
`styles.css`, not per-element `scroll-margin`. Deep-linking a *single* FAQ item won't work —
they're gated behind `openFaq === i` state, so the accordion would have to read the fragment.

## SEO

Generated by `prerender.js` from `src/routes.js`, so there's nothing to keep in sync by hand:

- **Per-page `<title>`, description, `<link rel="canonical">` and og: card**, each with its own
  `og:image` (every page's hero photo is already distinct). ⚠️ Four of those photos are only
  1000–1400px wide and Facebook prefers ≥1200×630, so those cards render smaller than home's
  1800×1200. `PHOTOS.md` covers pulling larger renditions — only ~15% of the Brand Center
  library serves above 1280px, so this may not be fixable for every page.
- **`og:image:width`/`height` are verified against the actual files at build time.** Those
  two numbers are hand-written in `routes.js`, Facebook lays the card out from them *before*
  downloading the picture, and the Brand Center licence pushes every photo replacement
  through a downscale — the one operation that changes them. So `prerender.js` reads the real
  size out of each JPEG/PNG header (~20 dependency-free lines) and **throws** on a
  disagreement, naming the file, both sizes and the page. Don't "fix" a failure by editing
  the check; fix the number, then re-scrape in the Sharing Debugger.
- **`sitemap.xml`** — the five content pages (`noindex` routes, i.e. the `/join` redirect
  stub, are filtered out), no `lastmod` (nothing here tracks when a page's
  content actually changed, and a build timestamp would claim they all changed on every deploy).
- **`robots.txt`** — allow-all, points at the sitemap.
- **`404.html`** — GitHub Pages serves it for any unmatched path. Newly load-bearing: with real
  URLs a typo reaches the server instead of falling through to home. It's the same React app
  (`pages/NotFoundPage.jsx`) so it keeps the nav and footer, and it carries `noindex` and no
  canonical — it's served under whatever bad URL was requested, not at `/404`.

**If the domain changes**, `SITE_URL` in `src/routes.js` is the only place the origin lives
for anything that ships — prerender.js derives every page's canonical, `og:url` and `og:image`
from it (absolute per the Open Graph spec). Update it, update `site/public/CNAME`, then
re-scrape in Facebook's Sharing Debugger. The hardcoded origin in `site/index.html`'s head
block is the home page's copy inside the `<!--head-->` markers — prerendering replaces it, so
it only affects the dev server; update it too for tidiness, not correctness.

## Short links (short.io)

`go.pack351tx.org` is configured outside this repo and needs its own DNS record at Porkbun —
a separate subdomain from the apex, so it doesn't disturb the A/AAAA records or `public/CNAME`.
The destinations it points at:

| Short link | Destination |
|---|---|
| `go.pack351tx.org/cc` | `https://pack351tx.org/candy-canes#form` |
| `go.pack351tx.org/join` | `https://pack351tx.org/join#interest-form` — ⚠️ stale: /join now redirects to registration and drops the fragment. Re-point to `https://pack351tx.org/info#interest-form` (the form) or straight to `BEASCOUT_REGISTER_URL` (registration), whichever the printed material promises |
| `go.pack351tx.org/forms` | `https://pack351tx.org/info#links` |
| `go.pack351tx.org/uniform` | `https://pack351tx.org/info#uniform` |
| `go.pack351tx.org/faq` | `https://pack351tx.org/info#faq` |
| `go.pack351tx.org/new` | `https://pack351tx.org/info#new-families` |
| `go.pack351tx.org/band` | `https://pack351tx.org/info#band` |
| `go.pack351tx.org/calendar` | `https://pack351tx.org/events#calendar` |
| `go.pack351tx.org/dens` | `https://pack351tx.org/about#dens` |

⚠️ The five `/info#…` destinations reflect the 2026-08-20 rename of `/resources` → `/info`
(no redirect). The short.io side is configured outside this repo and must be re-pointed by
hand — until it is, those five short links 404.

Flat files, not directories, is what keeps these one hop: GitHub Pages serves `about.html` for
`/about` directly, whereas `about/index.html` would 301 `/about` → `/about/`.

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

**Publishing a change:** commit to `main` and push. `.github/workflows/deploy.yml` builds `site/` and publishes `site/dist/` to Pages — a run takes ~40 seconds. Check it with `gh run list`. Page content is now *in* the HTML, so confirming a change no longer means digging through the JS bundle:

```bash
curl -s https://pack351tx.org/info | grep -o 'some text you changed'
# and that every real path is a 200 with no redirect hop:
for p in / /about /events /candy-canes /join /info; do
  echo "$p $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://pack351tx.org$p)"
done
curl -s -o /dev/null -w '%{http_code}\n' https://pack351tx.org/definitely-not-a-page   # expect 404
```

`npm run preview` resolves extensionless paths the same way GitHub Pages does, but it falls
back to `index.html` for *unknown* paths instead of serving `404.html` — that one only proves
out on the real deploy.

The repo is **public**; treat anything committed here as published. Pushing workflow changes needs the `workflow` scope on the token.

**If the domain ever changes again**, see "If the domain changes" in the SEO section above:
`SITE_URL` in `src/routes.js` + `site/public/CNAME`, then re-scrape the new URL in Facebook's
Sharing Debugger or the Pack's Facebook group will keep rendering the old card.

## Tech stack
- React 18 (prerendered with `react-dom/server`, hydrated in the browser), Vite 6
- CSS custom properties (no CSS framework)
- Google Fonts: Barlow Condensed + Nunito
- Deployment: **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)
