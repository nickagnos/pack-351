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
- [ ] **Tweak some images** (user flagged — e.g. group-shot re-roll on cream, derby crispness) — next
- [ ] **Optional derby re-roll** if the 4-lane look isn't crisp enough
- [ ] **Favicon** + redeploy `dist/` to Netlify

### Backup — Higgsfield cloud (only if we later want the true AI fly-through)
- [ ] Buy credits + install `higgsfield` CLI + `higgsfield auth login` → original skill, architecture B (dive + connector), `seedance_2_0`

## Before showing to anyone

- [ ] **Deploy to Netlify** — drag `site/dist/` to netlify.com, or connect the GitHub repo
- [ ] **Confirm notification email** — in Netlify dashboard → Forms → set where Join submissions are emailed

## Content to fill in

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
