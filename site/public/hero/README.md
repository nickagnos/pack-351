# Home-hero stills

Two files, two jobs, wired up in `site/src/components/HomeHero.jsx`. Replace a file here
with one of the same name and the site picks it up with no code changes.

The home page used to be a four-scene scroll-driven cinematic; it was cut to a single
static hero on 2026-08-20 because families found the scroll-through confusing. The two
retired scenes (`campground.jpg`, `creek.jpg`) were deleted — git history has them, and
"Where these came from" below still lists their Brand Center ids if they're ever wanted
back.

| File | Job | What it shows |
|---|---|---|
| `overlook.jpg` | The hero — *Your kid's next adventure.* + the two Join buttons | Four Scouts grinning at camera, backlit |
| `trail.jpg` | The `og:image` (home + 404 link-preview card) — **not on the page** | Leaders and Scouts carrying camp gear across a sunlit meadow |

Both are **official Scouting America photography** from the Brand Center (as of
2026-08-15), replacing the AI-generated clay-miniature stills that used to live here.

## Rules any replacement must follow

1. **`overlook.jpg`: keep the lower-left third empty, and keep people out of it.** The
   headline is navy, sitting on the photo behind a cream radial scrim (`.hh-hero::after`).
   The scrim is strong enough to carry any still with no CSS change, but it works by washing
   that corner out to near-solid cream — so anything you care about seeing there disappears.
   An earlier still put a canoe full of paddlers exactly there and they were bleached to
   ghosts. Put your subject right of centre and let the scrim land on water, grass, or ground.
2. **Wide and large: 1536x832 or bigger.** The hero is a full-viewport background; anything
   smaller looks soft on a retina display. Both files are 1800px on the long edge.
3. **No other unit's pack number.** See below — this is the single most common reason a
   good-looking candidate had to be rejected.
4. **`trail.jpg` must show a Pack, not just kids: adult leaders and Scouts in the same
   frame.** It's the link-preview card on Facebook and in texts — the first thing a
   prospective family sees. A children-only frame reads as incomplete; a mixed group with
   leaders is worth giving up a prettier frame for, and almost nothing in the library has
   both (see below).

## Where these came from

The **Scouting America Brand Center**, <https://scouting.webdamdb.com/bp/>. No login needed.
See `../photos/PHOTOS.md` for the JSON API, the search gotchas, and the
downscale-don't-crop licensing rule — all of it applies here too.

| File | Brand Center folder | Original asset | web_id | Shipped |
|---|---|---|---|---|
| `trail.jpg` | Camping | `AT4A6850-photo-CSBC.JPG` | `gd1lFHUWloQ01M4x` | 1800x1200 |
| `overlook.jpg` | General | `AR1A4041-photo-CSBC.jpg` | `qW0YI8cCdV642otx` | 1800x1200 |
| *(retired)* `campground.jpg` | Camping | `AT4A3607-edited-photo-CSBC.JPG` | `cUy9BWxDZsM01AiZ` | 1800x1174 |
| *(retired)* `creek.jpg` | Fishing | `AT4A5915-photo-CSBC.JPG` | `kOkUX46Wt657cSF9` | 1800x1129 |

`trail.jpg`'s dimensions are hardcoded in `site/src/routes.js` (`imageWidth`/`imageHeight`
on the home and 404 entries) and in `site/index.html`'s fallback og: block, so **if you
replace it, update those numbers** and re-scrape the URL in Facebook's Sharing Debugger or
the old card keeps showing.

## What to watch for when picking replacements

- **Other units' numbers.** One rejected candidate was a lovely shot of four kids on a
  trail — and full-bleed at 1440px you could plainly read "PACK 799", "608" and "PACK 510"
  on their shirts. On Pack 351's own home page that reads as careless. Both finals wear
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
  catalog for `trail.jpg`'s replacement turned up one usable frame. The recurring offenders are
  the shoots wearing Pack 726, 799, 738, 192, 489, 608 and 152 shirts — if you recognise those
  hoodies in a thumbnail, skip the asset rather than open it. Everything that survived both the
  size floor and the number rule was children-only, which is what makes `AT4A6850` worth
  keeping: two leaders, a mixed group of Scouts, and clean shirts.
- **Program and era.** The library spans Venturing, Scouts BSA and Cub Scouts, and both the
  "Boy Scouts of America" and "Scouting America" brand eras. A bare `"hiking"` search returns
  adults in winter coats from a Venturing crew. Scope searches with `query:"cub scouts"` and
  confirm the uniforms visually.
