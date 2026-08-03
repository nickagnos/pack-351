# Pack 351 Website — To-Do

## 🎬 NEXT: Scroll-world landing page — LOCAL (Draw Things) ✅ chosen

Full spec: `~/.claude/plans/i-want-to-use-wiggly-iverson.md`. Using `~/Repos/scroll-world-drawthings` (skill) + `~/Repos/drawthings-mcp` (MCP server, registered ✓). Architecture A (continuous forward take, no connectors). Draw Things is single-GPU → strictly sequential.

**PIVOT (2026-07-13):** Wan 2.2 video was tested across 7 legs and **always bobs in place** (no committed forward camera) — a model-level limit. So: **no AI video.** New approach = **code-driven scroll camera on the FLUX stills** (deterministic push-in + parallax + cross-fade through the shared cream background). Stills are excellent; motion is authored in CSS/JS. Reliable, free, full control.

- [x] Draw Things API live; FLUX.1 schnell stills excellent; Wan video rejected (bobs)
- [x] Camera-motion approach decided: code-driven, not AI video
- [x] Generated + refined all 7 stills (no platforms, girls throughout, WoHaLi flag via PIL text composite, awards-ceremony blue&gold, ranks-in-order finale, 4-lane-ish derby, straight regatta gutters)
- [x] Built scroll-cinematic engine → **ported to React** (`site/src/components/ScrollWorld.jsx`)
- [x] **Integrated**: HomePage = the cinematic; SiteNav overlays on Home only; stills → `site/public/scroll-world/*.webp`; CTA → `#/join`
- [x] Verified end-to-end on Vite dev server (7 scenes, nav overlay both ways, CTA nav); `npm run build` passes
- [x] **Restyled About / Events / Join / Resources** — shared warm cream `PageHero` (image-forward) replaces the flat navy heroes; clay images on each; whole site now matches the landing
- [x] **Moved old Home content** — quick-facts strip (`QuickFacts.jsx`) rehomed on About; events already live on Events; CTAs on About/Join
- [x] **Tweaked all 8 images** (2026-07-15) — Cub Scout accuracy pass: navy WoHaLi flag w/ real logo, straight 4-lane derby, straw regatta, blue&gold banner+awards, warm camping, corrected uniforms (blue+tan mix, leaders in tan, co-ed/diverse), clean group photo, fleur-de-lis + rank-badge finale. Committed `b5679ec`, pushed to `origin/main`.
- [x] **Rebuilt the home scenes** (2026-08-01) — the 5 old stills were wide establishing shots packed with 15–25 tiny figures, which is what diffusion renders worst (bald gray heads, melted faces, garbled logo text on the finale). Replaced with **4 simple outdoor scenes** — trail, campfire, creek, overlook — each 2–4 scouts, large in frame, seen from behind, with nature carrying the frame and no text/logos/engineered props. Scene 4 doubles as the finale and carries the Join CTA. Derby + regatta still have their own images on the Events page. Stills are now `.jpg` (no `cwebp`/`ffmpeg` on this machine, and `sips` can't write webp).
- [ ] **Favicon** + redeploy `dist/` to Netlify (only remaining launch item here)

### Local AI video — CLOSED (2026-07-15)

Tested LTX-2 / LTX-2.3 as a Wan replacement. Verdict: **Draw Things' HTTP API can't do first-last-frame conditioning** (end frame ignored) and **LTX shows the same near-static camera as Wan**. Local AI video for the camera is dropped for good — the shipped code-driven scroll camera stays. See memory `drawthings-flf-api-limit`. (Also fixed the `drawthings-mcp` image-model bug: it now guards against rendering stills on a video checkpoint.)

### Backup — Higgsfield cloud (only if we ever want a true AI fly-through)

- [ ] Buy credits + install `higgsfield` CLI + `higgsfield auth login` → original skill, architecture B (dive + connector), `seedance_2_0`

## Before showing to anyone

- [x] **GitHub Pages migration — code done** (2026-07-15) — removed Netlify (`netlify.toml`, hidden form), set Vite `base: '/pack-351/'`, routed all asset URLs through `src/asset.js`, verified the built site loads at the `/pack-351/` base.
- [x] **Join form removed** — replaced with a no-backend contact CTA (drop-in + `mailto:` email) since Pages has no form backend.
- [ ] **Go live on GitHub Pages — NOT live yet.** Three steps (details in `CLAUDE.md` → "Hosting & deployment"):
  - [x] **Deploy workflow committed** (`.github/workflows/deploy.yml`) — runs on push to `main` once Pages is enabled.
  - [ ] **Make the repo public** — currently private; free Pages needs a public repo (or a paid plan).
  - [ ] **Settings → Pages → Source = "GitHub Actions".**
- [ ] **(Optional) custom domain** for a clean root URL — add a `CNAME` + DNS and set the build `base` back to `'/'`.

## Content to fill in

- [ ] **Remove the em dashes.** The site copy leans on `—` heavily and it reads as AI-written. **35 left** across `site/src/`, of which **31 are user-visible** (the other 4 are in code comments and can stay). Rewrite each sentence rather than substituting punctuation: usually a period or a comma works, and some clauses just want dropping. Don't swap `—` for ` - `.
  - `pages/ResourcesPage.jsx` (15, by far the worst)
  - `pages/JoinPage.jsx` (5), `pages/EventsPage.jsx` (5), `pages/AboutPage.jsx` (5)
  - `pages/HomePage.jsx`, `components/QuickFacts.jsx`, `components/PageHero.jsx`, `styles.css` (1 each)
  - Find them with: `grep -rn '—' site/src/`
  - **Leave the 15 en dashes (`–`) alone.** Those are ranges like `K–5th graders` and are correct.
  - Already done: the 4 home-page scene strings in `components/ScrollWorld.jsx` (2026-08-01).
- [ ] **Leader names** — replace the four `[Name]` placeholders on the About page (`src/pages/AboutPage.jsx:126`)
- [x] **Leader headshots** — generated as clay-style busts (`leader-*.jpg` in `site/public/photos/`); swap for real photos anytime
- [x] **Activity photos** — all 11 generated in the clay style (5 reused from the landing, 6 new incl. candy-cane, group shot, 4 leaders); swap for real photos anytime
- [ ] **Charter year** — "Pack 351 has been part of the Lindale community for years" → replace with the actual charter year (`src/pages/AboutPage.jsx:63`)
- [ ] **Copyright year** — footer shows © 2026; update if needed (`src/components/SiteFooter.jsx:66`)

## Events

- [ ] **Verify event dates** — the dates in EventsPage and HomePage are approximate; update when you have the real schedule
  - EventsPage full list: `src/pages/EventsPage.jsx` lines 4–17
  - HomePage preview (4 events): `src/pages/HomePage.jsx` lines 124–127
- [ ] **Pack meeting dates** — currently shows every Monday in June as placeholders; replace with actual scheduled dates

## Forms / Documents (Resources page)

- [ ] **Activity Permission Slip** — upload to `site/public/` and link in `src/pages/ResourcesPage.jsx:21`
- [ ] **Talent Release (photo permission)** — same, link at line 26
- [ ] **Scholarship Request form** — same, link at line 31
- [ ] **Pinewood Derby Car Rules** — same, link at line 36
- [ ] **Raingutter Regatta Boat Rules** — same, link at line 41
- [ ] **Campout Packing Checklist** — same, link at line 46
*(The two BSA health forms already link directly to scouting.org — no action needed)*

## Nice to have (not blocking)

- [ ] **Custom domain** — buy `pack351.com` (or similar) and add in Netlify settings
- [ ] **Pack description** — personalize the "Our story" section with real history and anecdotes (`src/pages/AboutPage.jsx` lines 63–70)
- [ ] **Adjust annual cost** — currently shows $175/year; confirm this is accurate for your council (`src/pages/HomePage.jsx:103`, `src/pages/JoinPage.jsx:152`, `src/pages/ResourcesPage.jsx:55`)
- [ ] **Facebook group URL** — currently `https://www.facebook.com/groups/351cubscouts`; confirm this is correct (`src/components/SiteFooter.jsx:49`)
- [ ] **Favicon** — add a `site/public/favicon.ico` or `favicon.svg`
