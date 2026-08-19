# Home-hero stills

The four full-screen images behind the scrolling home page, wired up in
`site/src/components/HomeHero.jsx` (the `SCENES` array). Replace a file here with one of
the same name and the site picks it up with no code changes.

As of 2026-08-15 these are **official Scouting America photography** from the Brand Center,
replacing the AI-generated clay-miniature stills that used to live here.

| # | File | Copy over it | What it shows |
|---|---|---|---|
| 1 | `trail.jpg` | *It starts outside.* | Leaders and Scouts carrying camp gear across a sunlit meadow |
| 2 | `campground.jpg` | *First campout, first s'more.* | Scouts roasting marshmallows over a campfire ring, golden hour |
| 3 | `creek.jpg` | *Creek days.* | Scouts fishing along a grassy creek bank |
| 4 | `overlook.jpg` | *Your kid's next adventure.* + Join buttons | Four Scouts grinning at camera, backlit |

## Rules any replacement must follow

1. **Keep the lower-left third empty, and keep people out of it.** The headline is navy,
   sitting on the photo behind a cream radial scrim (`.hh-scene::after`). The scrim is strong
   enough to carry any of these with no CSS change, but it works by washing that corner out to
   near-solid cream — so anything you care about seeing there disappears. The first `creek.jpg`
   put a canoe full of paddlers exactly there and they were bleached to ghosts. Put your
   subject right of centre and let the scrim land on water, grass, or ground.
2. **Keep subjects away from the frame edges.** Each image scales 1.02 → 1.17 as you scroll
   (Ken Burns, origin `50% 52%`), so up to ~13% of the edges is cropped at peak zoom.
3. **Wide and large: 1536x832 or bigger.** These are `position: fixed` full-viewport
   backgrounds; anything smaller looks soft on a retina display. All four here are 1800px on
   the long edge.
4. **No other unit's pack number.** See below — this is the single most common reason a
   good-looking candidate had to be rejected.
5. **Scene 1 must show a Pack, not just kids: adult leaders and Scouts in the same frame.**
   The first `trail.jpg` from real photography was seven Cub Scouts on a wooded trail who all
   read as girls, with no adult anywhere in it — so the first thing a prospective family saw
   said "girls' unit, no grown-ups." It's also the `og:image`, so it was the link-preview card
   too. A mixed group with leaders in it is worth giving up a prettier frame for; see below,
   almost nothing in the library has both.

## Where these came from

The **Scouting America Brand Center**, <https://scouting.webdamdb.com/bp/>. No login needed.
See `../photos/PHOTOS.md` for the JSON API, the search gotchas, and the
downscale-don't-crop licensing rule — all of it applies here too.

| File | Brand Center folder | Original asset | web_id | Shipped |
|---|---|---|---|---|
| `trail.jpg` | Camping | `AT4A6850-photo-CSBC.JPG` | `gd1lFHUWloQ01M4x` | 1800x1200 |
| `campground.jpg` | Camping | `AT4A3607-edited-photo-CSBC.JPG` | `cUy9BWxDZsM01AiZ` | 1800x1174 |
| `creek.jpg` | Fishing | `AT4A5915-photo-CSBC.JPG` | `kOkUX46Wt657cSF9` | 1800x1129 |
| `overlook.jpg` | General | `AR1A4041-photo-CSBC.jpg` | `qW0YI8cCdV642otx` | 1800x1200 |

`trail.jpg` is also the `og:image` — the picture that shows up when someone shares the site
on Facebook or in a text. Its dimensions are hardcoded in `site/index.html` (`og:image:width`
/ `og:image:height`), so **if you replace this file, update those two numbers** and re-scrape
the URL in Facebook's Sharing Debugger or the old card keeps showing.

## What to watch for when picking replacements

- **Other units' numbers.** The first `trail.jpg` candidate was a lovely shot of four kids on
  a trail — and full-bleed at 1440px you could plainly read "PACK 799", "608" and "PACK 510"
  on their shirts. On Pack 351's own home page that reads as careless. All four finals wear
  only the generic Cub Scouts diamond. Check at full size, not in a thumbnail grid; the
  numbers are invisible at thumbnail scale and obvious at hero scale.
- **Only ~15% of the library serves a rendition above 1280px** — 244 of the 1,602 Cub Scouts
  assets. Availability is per-asset and unrelated to the catalog dimensions the API reports
  (plenty of 8192x5464 originals only serve `1280`). The first pass silently upscaled a 1280px
  file to 1800px; verify the source is at least as large as your target before resizing.
  **Pre-filter on `web_id` length: the assets that serve `2000` are exactly the ones with
  16-character ids**, and the short-id ones never do. That one check cuts the download list by
  six-sevenths before you fetch anything.
- **Almost every group shot with adults in it is burned by a pack number.** Searching the whole
  catalog for scene 1's replacement turned up one usable frame. The recurring offenders are the
  shoots wearing Pack 726, 799, 738, 192, 489, 608 and 152 shirts — if you recognise those
  hoodies in a thumbnail, skip the asset rather than open it. Everything that survived both the
  size floor and the number rule was children-only, which is what makes `AT4A6850` worth
  keeping: two leaders, a mixed group of Scouts, and clean shirts.
- **The old "scene 2 must have no people" rule is retired.** It existed because diffusion
  models mangled figures, so an empty landscape was the only safe option. With real
  photography that constraint is gone — scene 2 is now the warmest, most people-full frame
  of the four, and it's the better image for it.
- **Program and era.** The library spans Venturing, Scouts BSA and Cub Scouts, and both the
  "Boy Scouts of America" and "Scouting America" brand eras. A bare `"hiking"` search returns
  adults in winter coats from a Venturing crew. Scope searches with `query:"cub scouts"` and
  confirm the uniforms visually.
