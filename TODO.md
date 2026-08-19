# Pack 351 Website — To-Do

## Go live (the only blocking work)

The site is built, audited and ready; it is **not live yet**. Three steps, in order —
the push is what actually triggers the first deploy. Details in `CLAUDE.md` →
"Hosting & deployment".

- [x] **Deploy workflow committed** — `.github/workflows/deploy.yml`, runs on push to `main`.
- [ ] **Make the repo public** — currently private; free Pages needs a public repo.
- [ ] **Settings → Pages → Source = "GitHub Actions".**
- [ ] **`git push origin main`** — fires the workflow. Watch it under the Actions tab.
- [ ] **Check the Facebook link preview** at https://developers.facebook.com/tools/debug/ —
      it caches hard, so prime it before sharing the link in the Pack's group.

## Real content to replace

The site is complete but several details are stand-ins. None block launch.

- [ ] **Photos of our own Pack.** The site now ships real, licensed Scouting America
      photography (2026-08-15), so this no longer blocks anything — but they're other units'
      Scouts. `site/public/photos/PHOTOS.md` lists each filename and what it should show;
      drop a Pack 351 photo in with the matching name and it appears, no code changes.
      Update the `alt` text at the same time. Same for the four home-page cinematic stills
      in `site/public/hero/`, which have tighter composition rules — see that folder's README.
- [ ] **Charter year** — "Pack 351 has been part of the Lindale community for years" wants
      the real founding year (`src/pages/AboutPage.jsx`, "Our story").
- [ ] **East Texas Area Council fee** — the site now shows Scouting America's published
      national fee ($85/year, effective May 2024) "+ council fee", because ETAC does not
      publish its council fee anywhere public and the old $175 figure was unsourced. Get the
      real council number from the committee and fill it in
      (`components/QuickFacts.jsx`, `pages/JoinPage.jsx`, `pages/ResourcesPage.jsx`).
      The old Google Sites FAQ said $80 national + $20 council, but that $80 predates the
      May 2024 increase, so the $20 may be stale too.
- [ ] **Copyright year** — footer shows © 2026.

## Copy polish

- [ ] **Last 3 em dashes.** Down from 35. Rewrite the sentence rather than swapping
      punctuation. Remaining: `pages/ResourcesPage.jsx` (2, in the Band section) and the
      screen-reader `<h1>` in `components/HomeHero.jsx`. Find them with
      `grep -rn '—' site/src/`. **Leave en dashes (`–`) alone** — those are ranges like
      `K–5th graders` and are correct.
- [ ] **"Our story"** — personalize with real Pack history and anecdotes (`pages/AboutPage.jsx`).

## If the leaders section comes back

Removed 2026-08-02 because the names were placeholders and the portraits were generated
stand-ins; the four `leader-*.jpg` files were deleted 2026-08-03. Rebuilding it means real
names and real headshots — the section isn't worth restoring without both.

## Nice to have

- [ ] **Custom domain** — buy `pack351.com` or similar, add a `CNAME` + DNS, and set the
      Vite build `base` back to `'/'`. **Also update `og:url` and `og:image` in
      `site/index.html`** — those are absolute by spec and won't follow the base change.

---

## Done

- [x] **Pre-launch audit** (2026-08-03) — all asset paths and external links verified, alt
      text complete, no mobile overflow, no console errors, no secrets in history. Fixed:
      Open Graph/Twitter cards, favicon, per-page `<title>`, home-page heading structure
      (four competing `<h1>`s → one), and internal `.md` notes no longer ship to the live site.
- [x] **Repo cleanup** (2026-08-03) — untracked `node_modules/` and `dist/`; deleted the
      Claude Design handoff bundle (`project/`, `example-pics/`), the stale `CONTACT-INFO.md`,
      and the orphaned leader portraits.
- [x] **Contact email** → `txcspack351@gmail.com` (was a personal address).
- [x] **Resources page** — "Forms & Docs" became a Links section pointing at eight verified
      Cub Scouting resources, replacing six PDFs that were never going to be uploaded. Tabs
      flattened into stacked sections. Added a Band app section.
- [x] **Events page** — all fixed dates removed; it describes a typical Pack year by season,
      and points to email and Facebook for real dates.
- [x] **About page** — den-meeting hero, official rank emblems on the den cards, leaders
      section removed.
- [x] **Home page** (2026-08-01) — the five crowded stills became four simple outdoor scenes
      (trail, campground, creek, overlook), each with 2–4 scouts large in frame and seen from
      behind. The old ones were wide shots packed with 15–25 tiny figures, which is what
      diffusion renders worst.
- [x] **GitHub Pages migration** (2026-07-15) — Netlify removed, Vite `base` set to
      `/pack-351/`, all asset URLs routed through `src/asset.js`.
- [x] **Custom domain** (2026-08-09) — the site moved to <https://pack351tx.org/> (Porkbun
      DNS → GitHub Pages). Vite `base` dropped back to the default `/`, `og:url`/`og:image`
      repointed, and `site/public/CNAME` added so the domain ships in the Pages artifact.
      The old `nickagnos.github.io/pack-351/` URL 301-redirects, so shared links still work.
- [x] **Join form removed** — replaced with a no-backend contact CTA (drop in to a meeting,
      or a prefilled `mailto:`), since Pages has no form backend. **Superseded 2026-08-19**: the
      Pack's own Interest Form, recovered from the old Google Sites joining page, is now embedded
      on the Join page as a third path. Still no backend — Google collects the responses.
- [x] **Local AI video — closed** (2026-07-15). Wan 2.2 and LTX both bob in place rather than
      committing to forward camera motion, and Draw Things' HTTP API can't do first-last-frame
      conditioning. The shipped scroll camera is code-driven CSS/JS over stills, which is
      deterministic and free. (Those stills were FLUX renders at the time; replaced with real
      Brand Center photography 2026-08-15 — the camera didn't change.) Don't reopen this
      without new models.
