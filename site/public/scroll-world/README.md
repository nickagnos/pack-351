# Home-page scroll-world stills

The four full-screen images behind the scrolling home page. They're wired up in
`site/src/components/ScrollWorld.jsx` (the `SCENES` array) — replace a file here with a
real photo of the same name and the site picks it up with no code changes.

| # | File | Scene | Copy over it |
|---|---|---|---|
| 1 | `trail.jpg` | 3 scouts from behind, walking away up a pine trail, morning light | *It starts outside.* |
| 2 | `campground.jpg` | Overhead aerial of a lakeside campground, tents and a campfire, a fish jumping. No people | *First campout, first s'more.* |
| 3 | `creek.jpg` | Scouts walking the bank alongside a shallow creek, empty hands, dappled light | *Creek days.* |
| 4 | `overlook.jpg` | 4 scouts on a grassy hill crest at golden hour | *Your kid's next adventure.* + Join buttons |

## Two rules any replacement image must follow

1. **Keep the lower-left third open and light.** The headline sits bottom-left in navy
   with only a soft cream text-shadow behind it — there is no dark scrim. Busy or dark
   pixels there make the copy unreadable.
2. **Keep subjects away from the frame edges.** Each image is scaled from 1.02 to 1.17 as
   you scroll (Ken Burns, origin `50% 52%`), so up to ~13% of the edges gets cropped at
   peak zoom.

Wide and large: **1536x832 or bigger**. These are `position: fixed` full-viewport
backgrounds, so anything small looks soft on a retina display.

## How these were generated

Locally in [Draw Things](https://drawthings.ai) via its HTTP API (`127.0.0.1:7860`),
FLUX.1 schnell, 4 steps, guidance 1.0, 1536x832.

The compositions are deliberately simple. The previous five stills were wide establishing
shots with 15–25 tiny figures each, and diffusion models render that badly: bald gray
heads, melted faces, garbled logo text. So every scene here is **2–5 scouts, large in the
frame, seen from behind**, with nature carrying the rest and no text, logos, or engineered
props anywhere.

Four details the model gets wrong unless you spell them out, all learned the hard way:

1. **The neckerchief shape.** Ask for a "neckerchief" or "scarf" and you get a bandana knotted
   at the throat. Describe the real garment instead: *a triangle draped over both shoulders,
   covering the tops of the shoulders and tapering to a point between the shoulder blades,
   rolled and fastened at the throat with a slide.* Put
   `bandana, cowboy scarf, thin scarf knotted at the throat, ascot, bib` in the negative.
2. **Its size.** Left alone it draws them cape-sized, down to the waist. Say *"small, neat,
   modestly sized, ending high between the shoulder blades, well above the waist, not
   covering the whole back"* and negative-prompt `oversized neckerchief, cape, poncho, shawl`.
3. **Solid means solid.** It adds contrast piping around every edge. Needs both the positive
   (*"one single flat unbroken color edge to edge, a plain raw cut edge"*) and a long negative
   (`trim, piping, contrasting border, contrasting edging, topstitching, blanket stitch,
   hemmed edge, stitched border`). Saying it once is not enough.
4. **A diverse cast.** The word "diverse" is largely ignored. Name each child specifically
   ("one Black child with deep brown skin and short black curly hair, one Hispanic child…")
   or you get an all-white group every time.

### Why scene 2 has no people

`campground.jpg` is deliberately empty of figures. Every recurring defect in this set —
mangled uniforms, headless bodies, two neckerchiefs on one child, two hairstyles on one
head — is a *figure* rendering failure. A scene with no figures cannot have any of them,
and an overhead landscape is something diffusion models render very reliably. If you
replace it, keep it people-free for the same reason. Its extra negative prompt
(`people, person, human, child, figures, silhouettes, campers…`) enforces that.

### Why every scout wears navy

Real Cub Scouting keys the neckerchief to rank: navy shirt for Lion/Tiger/Wolf/Bear with a
solid rank color (red / orange / gold / light blue), tan shirt for Webelos and Arrow of Light
with the plaid. We tried encoding that as a conditional — *"scouts in navy shirts wear solid,
scouts in tan shirts wear plaid"* — and the model bound it correctly only about **30–40% of
the time per figure**. Across eight candidates, not one scene came out fully correct; there
was always a tan shirt with a solid neckerchief or a navy shirt with plaid.

This is a general limitation: diffusion models can't reliably bind a conditional attribute
across several subjects in one frame. **So every scout here wears navy with a solid
neckerchief — one rule, nothing to mis-bind.** If you ever want the plaid back, expect to
generate many candidates and hand-pick the rare compliant ones.

Shared style suffix:

> handcrafted polymer clay figures, claymation stop-motion diorama, matte clay texture,
> miniature model scene, soft natural light, shallow depth of field, cinematic wide shot,
> warm East Texas palette, no faces visible

Shared negative prompt:

> crowd, many people, background people, facing camera, face, portrait, eyes, text, letters,
> words, logo, watermark, signage, banner, extra limbs, deformed hands, bald head, gray skin,
> duplicated figures, smeared figures, floating objects, blurry, lowres, jpeg artifacts

Per-scene prompts live in the generator script alongside these notes in the project history
(`gen.py`, scratchpad) — the four scene descriptions in the table above plus the style suffix
reproduce them.
