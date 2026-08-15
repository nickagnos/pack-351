# Cub Scout rank emblems

The six official rank emblems shown in the "Our dens" grid on the About page
(`site/src/pages/AboutPage.jsx`, the `dens` array).

| File | Rank | Grade |
|---|---|---|
| `lion.jpg` | Lion | Kindergarten |
| `tiger.jpg` | Tiger | 1st |
| `wolf.jpg` | Wolf | 2nd |
| `bear.jpg` | Bear | 3rd |
| `webelos.jpg` | Webelos | 4th |
| `arrow-of-light.jpg` | Arrow of Light | 5th |

## Where these came from

Downloaded from the **Scouting America Brand Center**, <https://scouting.webdamdb.com/bp/>,
which is the official distribution point for unit-usable brand assets. Search `cub scout
rank` and filter **Types of Insignia → Badges of Rank** (18 assets). Each rank has a
black-and-white and an embroidered-patch variant alongside the flat colour one; these are
the flat colour versions:

`Lion-insignia`, `TIGER-color-insignia`, `Wolf rank-color-insignia`, `CS_bear-insignia`,
`Webelos Oval-color-insignia`, `Arrow of Light-insignia`.

These are the real, official emblems and shouldn't be swapped for anything else — not a
redraw, not a lookalike.

## Notes for anyone replacing or re-downloading these

- **They're trademarks.** The artwork carries ® and ™ marks, which are part of the image and
  must not be cropped out. The About page carries an attribution line under the den grid.
- **White background, no transparency.** The source files are JPEGs on white, which is
  exactly why the den cards need no image treatment: `.card` is `#fff`, so the background
  disappears. If you swap in a transparent PNG the layout still works, but on the cream
  section background rather than white it would look different.
- **Aspect ratios are not uniform.** Four are square, Webelos is a tall oval, and Arrow of
  Light is a 2.5:1 rectangle. The den grid caps **both** width and height and uses
  `object-fit: contain` — height alone renders Arrow of Light two and a half times wider
  than its neighbours.
- Originals were 1280px on the long side; resized here to 320px (`sips -Z 320`) at JPEG
  quality 90. Higher quality than the photos in `../photos/` (82) on purpose: these are flat
  colour with hard edges, where JPEG ringing is far more visible than it is in a photograph.
