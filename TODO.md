# Pack 351 Website — To-Do

The site is **live** at <https://pack351tx.org/> (GitHub Pages, custom domain since
2026-08-09). Pushing to `main` deploys in under a minute — treat every content edit as
publishing, not drafting.

## Real content to replace

None of these block anything; they're the gap between "real, licensed" and "actually ours".

- [ ] **Photos of our own Pack.** Everything shipped is official Scouting America
      photography (2026-08-15) — real, but other units' Scouts.
      `site/public/photos/PHOTOS.md` lists each filename and what it should show; drop a
      Pack 351 photo in with the matching name and it appears, no code changes. Update the
      `alt` text at the same time. Same for the two home-page stills in `site/public/hero/`
      (the hero and the share card) — that folder's README has the composition rules.
- [ ] **Charter year** — "Pack 351 has been part of the Lindale community for years" wants
      the real founding year (`src/pages/AboutPage.jsx`, "Our story").
- [ ] **East Texas Area Council fee** — the site shows Scouting America's published national
      fee ($85/year, effective May 2024) "+ council fee", because ETAC does not publish its
      council fee anywhere public and the old $175 figure was unsourced. Get the real council
      number from the committee and fill it in (`components/QuickFacts.jsx`,
      `pages/InfoPage.jsx`). The old Google Sites FAQ said $80 national + $20 council, but
      that $80 predates the May 2024 increase, so the $20 may be stale too.
- [ ] **Copyright year** — footer shows © 2026; bump it each January (`SiteFooter.jsx`).

## Copy polish

- [ ] **Last 3 em dashes in visible copy.** Down from 35. Rewrite the sentence rather than
      swapping punctuation. Remaining: `pages/InfoPage.jsx` (2, in the Band section — note
      one is inside the app's own store title "BAND — App for all groups", which may be a
      proper name best left alone) and the screen-reader `<h1>` in `components/HomeHero.jsx`.
      Find them with `grep -rn '—' site/src/`; most other hits are code comments, which
      don't ship. **Leave en dashes (`–`) alone** — those are ranges like `K–5th graders`.
- [ ] **"Our story"** — personalize with real Pack history and anecdotes (`pages/AboutPage.jsx`).

## If the leaders section comes back

Removed 2026-08-02 because the names were placeholders and the portraits were generated
stand-ins; the four `leader-*.jpg` files were deleted 2026-08-03 (recoverable from git
history). Rebuilding it means real names and real headshots — the section isn't worth
restoring without both.

---

## Done (abridged — details in git history)

- [x] **Site cleanup audit** (2026-08-20) — stale docs/comments swept after the day's
      restructures, orphan `photo-candy-cane.jpg` deleted, `.mcp.json` untracked, CI
      hardened (Node 22, no cancel-in-progress, dist sanity guard).
- [x] **Joining rework** (2026-08-20) — home cinematic cut to a single static hero;
      `/resources` renamed `/info` (hard cut; short links re-pointed by hand);
      `/join` became a redirect to Scouting America registration; every "Join" button goes
      to registration, "Get Info" goes to the interest form on `/info`.
- [x] **Icon set completed** (2026-08-20) — favicon.ico, apple-touch-icon, manifest icons,
      theme-color.
- [x] **Interest form recovered** (2026-08-19) from the old Google Sites page; embedded via
      `FormEmbed` (now on `/info`).
- [x] **Real URLs** (2026-08-19) — hash routing replaced with prerendered pages; legacy
      `#/route` links shimmed in `index.html`.
- [x] **Real photography** (2026-08-15) — Brand Center photos replaced the AI stand-ins
      sitewide; licensing rules recorded in `PHOTOS.md` / `ranks/README.md` / `hero/README.md`.
- [x] **Custom domain** (2026-08-09) — <https://pack351tx.org/> via Porkbun DNS;
      old github.io URL 301s.
- [x] **Went live** (2026-08-03) — repo public, GitHub Pages via Actions, pre-launch audit
      passed.
- [x] **GitHub Pages migration** (2026-07-15) — Netlify and its form handler removed.
- [x] **Local AI video — closed** (2026-07-15; don't reopen without new models). The scroll
      camera it fed was itself removed 2026-08-20, so this is doubly closed.
