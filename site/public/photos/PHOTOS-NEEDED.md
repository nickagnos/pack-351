# Photos Needed for Pack 351 Website

Drop real photos into this folder (`site/public/photos/`) with the exact filenames below.
The site automatically shows the photo once the file exists — no code changes needed.

---

## Activity Photos (About / Events / Join / Resources)

| Filename | Used on | Description |
|---|---|---|
| `photo-camping.jpg` | Join page (hero) | Family camping trip — ideally scouts at camp, tents, or outdoors |
| `photo-popcorn.jpg` | Events page (hero) | Scouts selling popcorn at a table outside a store |
| `photo-pinewood-derby.jpg` | Events page (featured card) | Scouts building their Pinewood Derby cars |
| `photo-regatta.jpg` | Events page (featured card) | Scouts building balsa sailboats for the Regatta |
| `photo-hiking.jpg` | About page | Scouts on a hiking trail |
| `photo-candy-cane.jpg` | About page, Events page | Candy cane fundraiser in the Hideaway neighborhood |
| `photo-handbook.jpg` | Resources page (hero) | A Scout and a parent with the handbook and forms at a table |
| `photo-den-meeting.jpg` | About page (large hero) | A den meeting — scouts around a table working on a project with their leader |

> **Note:** the Home page uses none of these. It's the full-screen scrolling cinematic,
> whose four stills live in `site/public/scroll-world/` — see that folder's README.

---

## About the current placeholders

Everything here is AI-generated stand-in art, meant to be replaced by real photos. The
About-page images (`photo-hiking`, `photo-candy-cane`, `photo-den-meeting`) were regenerated
2026-08-02 in Draw Things / FLUX.1 schnell, in the same isometric-clay-miniature style the
rest of the set uses. Two things worth knowing if you ever regenerate them:

- **Keep the backdrop plain cream.** These sit directly on the page's `--cream` (#faf7f0),
  so a miniature floating on a cream field blends in; a full-frame environment doesn't.
  An early hero attempt asked for a plain cream backdrop *and* an overhead view of a grassy
  clearing. Those can't both be true, and the grass won - it came back as a photoreal drone
  shot that looked like it belonged to a different website. This bites hardest on indoor
  subjects: `photo-den-meeting.jpg` is a table-and-chairs vignette standing on nothing,
  with `room, walls, ceiling, floor, interior` in the negative prompt, precisely so no room
  ever gets built around it.
- **Figure count drives uniform accuracy, not prompt wording.** Cub Scout neckerchiefs are
  solid rank colors, but the model reliably adds a contrasting border. Across 22 candidates
  the only two that came back correct were the two with just *two* scouts in frame; every
  multi-figure candidate failed, no matter how much anti-border language the prompt carried.
  `photo-den-meeting.jpg` has six figures and so still shows faint edges on some
  neckerchiefs - about a pixel wide at display size. Fewer figures is the only real fix.
  Watch for bald gray heads too: they reappeared in three of the eight den candidates,
  which is the same defect that ruined the original home-page `den.webp`.
- **Name the engineered prop by its geometry, not its name.** "Raingutter" is not a word the
  model knows in this sense — ask for one and you get a kiddie pool, every time. Describing
  it as *a slim U-shaped trough roughly ten times longer than it is wide, raised on
  trestles* worked on the first try. Same for the derby track: "a ramp that starts high at
  the back and slopes down to a flat run-out" beats "pinewood derby track".
- **If the model keeps drawing text, take away the surface it writes on.** The popcorn
  scene took four rounds. Kraft boxes produced zero text; asking for "bags", and especially
  "like a bag of potato chips", made garbled words appear on the packaging *and* on the
  storefront — with every anti-text term already in the negative prompt. The reason is that
  real snack bags are printed objects, so the positive prompt was requesting printing while
  the negative forbade it. What fixed it was **clear** bags: transparent plastic with the
  popcorn visible through it and a twist tie on top. A see-through bag has no label area to
  fill in, so there is nothing for text to attach to. Prefer changing the object over adding
  another negative term.
- **Negate the near-miss colour, not just the wrong one.** The negative list covered tan,
  khaki, beige, olive and green shirts but never teal or turquoise — which is precisely
  where "navy blue" drifts. Adding those, plus a concrete referent (*"dark navy like dark
  denim or a midnight sky"*), fixed the shirts. It did **not** fix neckerchief colour:
  green and teal neckerchiefs still appeared with those exact words in the negative. Treat
  negatives as reducing a defect's frequency, never as eliminating it — generate a batch
  and reject, don't trust the prompt.

See `site/public/scroll-world/README.md` for the fuller set of prompt lessons (neckerchief
geometry and size, why "diverse" has to be spelled out per child, why every scout wears navy).

## Photo tips
- **Format**: JPG or PNG works. JPG is preferred for photos.
- **Size**: Aim for 1200px on the longest side. Larger is fine; smaller may look blurry.
- **Cropping**: these all display as rectangles, roughly 16:9 or wider.
- **BSA Brand Center**: For stock/filler photos while you gather real ones, visit https://www.scouting.org/programs/cub-scouts/ or search for Cub Scout imagery in the BSA Media Resources.

## After adding photos
Commit the new photo and push to `main` — the site is on GitHub Pages and the
deploy workflow rebuilds and republishes automatically. (To preview locally first:
`npm run build` then `npm run preview` from the `site/` folder.)
