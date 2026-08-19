# Page photos

The photographs used on About, Events, Join and Resources. As of 2026-08-15 these are
**official Scouting America photography** from the Brand Center, not placeholders — the
AI-generated stand-ins that used to live here are gone.

They are still not photos of *our* Scouts. If you have good pictures of Pack 351, they beat
these: drop yours in with the exact filename below and the site picks it up with no code
changes. Update the `alt` text at the same time — see "Alt text" below, it matters.

| Filename | Used on | What it shows |
|---|---|---|
| `photo-den-meeting.jpg` | About (hero) | Scouts and a leader working on a project around a table |
| `photo-hiking.jpg` | About ("Our story") | A Scout walking a pine-woods trail |
| `photo-candy-cane.jpg` | About + Events (card) | Scouts carrying bags door to door from a pickup |
| `photo-pack-year.jpg` | Events (hero) | Scouts and leaders setting up a tent together in a meadow |
| `photo-pinewood-derby.jpg` | Events (card) | A Scout painting a pinewood derby car |
| `photo-regatta.jpg` | Events (card) | Scouts racing boats down a water trough — a real raingutter regatta |
| `photo-camping.jpg` | Join (hero) | Scouts around a campsite in a grassy meadow |
| `photo-handbook.jpg` | Resources (hero) | Scouts and adults working through an activity at a table |

> The Home page uses none of these. It's the full-screen scrolling cinematic, whose four
> stills live in `site/public/hero/` — see that folder's README.

## Where these came from

The **Scouting America Brand Center**, <https://scouting.webdamdb.com/bp/> — the same source
as the rank emblems in `../ranks/`. No login is needed to browse or download.

| File | Brand Center folder | Original asset | web_id | Shipped |
|---|---|---|---|---|
| `photo-den-meeting.jpg` | Day Camp / Den or Pack Meeting | `AL6I6054_photo_CSBC.jpg` | `M78MdrM1NRP6` | 1280x853 |
| `photo-hiking.jpg` | Hiking | `_DSC7558 treated_photo_CSBC.jpg` | `539yW2XiFJ3T` | 1000x665 |
| `photo-candy-cane.jpg` | Scouting For Food | `20231227-13-55-12-10-photo-CSBC.jpg` | `wxmzJExHlOn83YPQ` | 1000x667 |
| `photo-pack-year.jpg` | Camping | `AT4A8317-photo-CSBC.JPG` | `MN8YNLRviCc31EpP` | 1400x949 |
| `photo-pinewood-derby.jpg` | Pinewood Derby | `AT4A1326-photo-CSBC.JPG` | `ch0Ea1gKhFg61snE` | 1000x667 |
| `photo-regatta.jpg` | Day Camp / Den or Pack Meeting | `20231203-13-05-10-07-photo-CSBC.jpg` | `UMrYXyOz26L032tj` | 1000x666 |
| `photo-camping.jpg` | Camping | `193A5000-photo-CSBC.JPG` | `UpO5V64wlKO11gmQ` | 1400x937 |
| `photo-handbook.jpg` | Day Camp / Den or Pack Meeting | `193A3180-photo-CSBC.JPG` | `gj5X2KhbB1y11U3E` | 1400x960 |

## Rules that come with these files

- **Downscaled, never cropped.** The Brand Center terms permit units to use these to promote
  their own program but forbid derivative works: *"not edit or create any derivative work
  based on the asset unless it is labeled as an 'editable template'."* Resizing for the web
  is not an edit; re-cropping is. It costs us nothing to comply, because `PhotoSlot` is
  `object-fit: cover` — the framing is cropped at display time by CSS, not baked into the
  file. **Keep it that way.** Run `sips -Z <px> in.jpg -s format jpeg -s formatOptions 78
  --out out.jpg` and nothing else.
- **Alt text must not claim these are our Scouts.** They're children from other units. Every
  `alt` and `label` here describes only what is literally in the frame — no "Pack 351
  Scouts", no place names. The old copy asserted things like *"Pack 351 Scouts selling
  popcorn"* and *"candy cane fundraiser in the Hideaway neighborhood"* about pictures that
  showed neither. If you swap in a real Pack 351 photo, then and only then can the alt say so.
- **Watch for other units' numbers.** A lot of these show pack numbers on t-shirts. Prefer
  frames wearing only the generic Cub Scouts diamond — a hero reading "PACK 608" on Pack
  351's own site looks careless. Three candidates were rejected for exactly this.

## Two slots that are approximations

The Brand Center has no photograph of either of these, so the nearest honest analogue is in
place and the alt text describes what's actually shown, not the event named on the card:

- **`photo-candy-cane.jpg`** — no candy-cane-fundraiser imagery exists. This is a
  Scouting For Food drive: Scouts carrying bags door to door, which is at least the same
  *shape* of activity as the Hideaway candy cane run.
- **`photo-pack-year.jpg`** — replaces the old `photo-popcorn.jpg`. There is **no popcorn
  photography in the Brand Center at all** (searched: popcorn, fundraising, sales, Trail's
  End, camp card — zero image results; popcorn is Trail's End branding, not Scouting
  America's). The Events hero is now a general campout scene, which suits the page title
  "A year with Pack 351" better than a fundraiser did. It changed frames again on 2026-08-19:
  it used to be `AT4A6850-cropped`, and the home hero's scene 1 is now the *uncropped* original
  of that same photograph — the same people on the same afternoon would have been on two pages.
  Whenever you swap one of these, check the other slots for the same shoot; the Brand Center
  publishes several crops of one frame under different names.

## Getting more from the Brand Center

Browse <https://scouting.webdamdb.com/bp/> and search, or drive its JSON API directly:

```
POST https://scouting.webdamdb.com/webdamws/v2/brandportalsearch/34
{"query":"cub scouts","rows":200,"offset":0,"source":"BP","sort_field":"filename",
 "sort_direction":"asc","facet":{"with_field_name":false,"enabled":1,"fields":[]},
 "filters":{"fields":[{"field_name":"published_assets","filter_type":"exact","value":"34"},
                      {"field_name":"affiliateid","filter_type":"exact","value":"12292"}]}}
```

Responses are prefixed with `for(;;);` — strip 8 characters before parsing. Each item gives
`web_id`, `width`, `height` and a topical `folder.name`; download with
`https://cdn2.webdamdb.com/{size}_{web_id}.jpg`, size ∈ `310th_sm`, `md`, `1280`, `2000`, `6000`.

Two things that will bite you:

1. **Search is strict-AND.** `"popcorn sale fundraiser"` returns nothing; `"popcorn"` works.
   Browse by folder (page `query:"cub scouts"` and group by `folder.name`) rather than by phrase.
2. **Not every asset has every rendition.** Plenty of assets whose catalog size says
   8192x5464 only serve `1280` — the larger URLs return an HTML error page, not a JPEG.
   Always check the bytes really start with `\xff\xd8` and **never upscale**: two of these
   files shipped soft on the first pass for exactly that reason. `photo-den-meeting.jpg` and
   `photo-hiking.jpg` are capped at their source's 1280px for this reason.
