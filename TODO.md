# Pack 351 Website — To-Do

## Before showing to anyone

- [ ] **Deploy to Netlify** — drag `site/dist/` to netlify.com, or connect the GitHub repo
- [ ] **Confirm notification email** — in Netlify dashboard → Forms → set where Join submissions are emailed

## Content to fill in

- [ ] **Leader names** — replace the four `[Name]` placeholders on the About page (`src/pages/AboutPage.jsx:126`)
- [ ] **Leader headshots** — add `leader-cubmaster.jpg`, `leader-assistant.jpg`, `leader-treasurer.jpg`, `leader-outdoor.jpg` to `site/public/photos/`
- [ ] **Activity photos** — 7 photos needed (see `site/public/photos/PHOTOS-NEEDED.md` for exact filenames and sizes)
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
