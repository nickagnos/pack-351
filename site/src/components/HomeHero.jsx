import React from 'react';
import { asset, pageHref } from '../asset';
import { BEASCOUT_REGISTER_URL, INTEREST_FORM_ID } from '../routes.js';

// The home hero: one full-viewport still with the join actions on it. It used to be a
// four-scene scroll-scrubbed cinematic (see git history for the camera), but families found
// the scroll-through confusing, so it was cut down to what the last scene already was: the
// photo, the pitch, and the two buttons. No state, no effects - this renders the same at
// build time and in the browser.
//
// The still must keep its lower-left third open and light. The copy sits there, navy on a
// cream radial scrim that washes that corner to near-solid cream - so anything worth seeing
// in it disappears. See site/public/hero/README.md for the replacement rules.
const HERO = {
  img: '/hero/overlook.jpg',
  eyebrow: 'Ready to get started?',
  title: 'Your kid’s next adventure.',
  body: 'Open to all K–5th graders. Drop in to any Tuesday meeting first, no pressure.',
};

export default function HomeHero() {
  return (
    <div className="hh-root">
      {/* dangerouslySetInnerHTML, not a text child: this page is prerendered, and
          renderToString escapes text content - it turns every apostrophe in the CSS into
          &#x27;. The HTML parser doesn't decode entities inside <style> (it's a raw-text
          element), so what the browser actually got was `content: &#x27;&#x27;` and
          `font-family: &#x27;Nunito&#x27;` - invalid declarations that dropped the scrim
          and the display font until React re-rendered, plus a hydration mismatch that threw
          the whole prerendered page away. The CSS here is a module constant, never input. */}
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />
      {/* The visible title is a mood line, not a page heading - it doesn't name the Pack.
          The real heading lives here, off-screen but read by screen readers and search
          engines; the title below is an <h2>. */}
      <h1 className="hh-sr-only">Cub Scout Pack 351 — Lindale, Texas</h1>
      <section className="hh-hero">
        <div className="hh-img" style={{ backgroundImage: `url('${asset(HERO.img)}')` }} />
        <div className="hh-copy">
          <div className="hh-eyebrow">{HERO.eyebrow}</div>
          <h2 className="hh-title">{HERO.title}</h2>
          <p className="hh-body">{HERO.body}</p>
          {/* Two actions, in decreasing order of commitment. "Join" is the real enrolment -
              Scouting America's registration for this pack, where a family creates a
              my.Scouting account (it leaves the site, so it takes target/rel like every
              other external link here). "Get Info" is our own interest form. The labels are
              deliberate: the form doesn't join anyone, so it must not say "Join". Each
              button carries its own mark, which is what makes the hand-off to Scouting
              America credible.

              Both marks sit on a white chip. The Cub Scouts diamond has to: it's a Brand
              Center JPEG on solid white and the licence forbids keying it transparent (see
              CLAUDE.md), so a chip is the only compliant way to put it on a gold button.
              The Pack mark doesn't have to, but takes one anyway - it's dark navy lettering
              and the ghost button turns navy on hover, where it would vanish. PackLogo
              makes the same concession for the footer.

              alt="" because these are decorative here: the button text already carries the
              meaning, and a real alt would have a screen reader announce the marks' names
              on top of it. */}
          <div className="hh-cta">
            <a className="hh-btn hh-btn-primary hh-btn-marked" href={BEASCOUT_REGISTER_URL}
               target="_blank" rel="noopener noreferrer">
              <span className="hh-btn-mark"><img src={asset('/cub-scouts-logo.jpg')} alt="" /></span>
              Join Pack 351
            </a>
            <a className="hh-btn hh-btn-ghost hh-btn-marked" href={pageHref('info', INTEREST_FORM_ID)}>
              <span className="hh-btn-mark"><img src={asset('/pack-logo.png')} alt="" /></span>
              Get Info →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const HERO_CSS = `
.hh-root { --hh-bg: var(--cream); }
/* lvh so mobile browser chrome collapsing doesn't resize the hero mid-gesture; the vh
   declaration is the fallback for browsers that don't parse lvh and drop the one after it. */
.hh-hero { position: relative; overflow: hidden; background: var(--hh-bg);
  height: 100vh; height: 100lvh; }
.hh-img { position: absolute; inset: 0; background: var(--hh-bg) center/cover no-repeat; }
/* Cream scrim behind the copy. The navy text sits directly on the photo, and a backlit
   still never clears 3:1 on its own, so this floors the contrast regardless of what image
   is dropped in. Sits above .hh-img, below .hh-copy.

   Centred on the copy block, not the bottom-left corner - the cream goes where the text is
   instead of smearing across the corner. */
.hh-hero::after { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(46% 36% at 23% 77%,
    rgba(250,247,240,.97) 0%, rgba(250,247,240,.95) 50%,
    rgba(250,247,240,.64) 78%, rgba(250,247,240,0) 100%); }
.hh-copy { position: absolute; z-index: 2; left: clamp(24px,6vw,110px);
  bottom: clamp(60px,14vh,150px); max-width: min(560px,80vw); }
/* The eyebrow sits at the top of the copy block, highest up the image and least covered by
   the scrim - a text-shadow halo wasn't enough against a bright sky, so it gets a solid
   cream chip instead. Guaranteed legible wherever the photo is bright. */
.hh-eyebrow { display: inline-block; font-family: 'Nunito', sans-serif; font-weight: 800;
  font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold-text);
  background: rgba(250,247,240,.92); border-radius: 5px; padding: 5px 10px 4px 12px;
  margin-bottom: 14px; }
/* Off-screen but still in the accessibility tree - not display:none, which would hide it
   from screen readers too. */
.hh-sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.hh-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; line-height: .98; color: var(--navy);
  font-size: clamp(44px,6.4vw,92px); letter-spacing: -.5px; margin-bottom: 16px; text-shadow: 0 2px 30px var(--hh-bg); }
.hh-body { font-size: clamp(16px,1.5vw,20px); line-height: 1.6; color: var(--muted); max-width: 460px; }
/* Grid, not flex, so the two buttons are the same width. Flex sized each to its own text,
   which left a ragged edge - obvious once they stack on a phone. auto-fit does the responsive
   work without a media query: two 244px columns while the block is wide, one full-width column
   below ~430px. The 210px floor forces that switch before a column gets too narrow for the
   wider chip-and-label button (wider again if Barlow Condensed fails to load). */
.hh-cta { margin-top: 26px; display: grid; gap: 12px; max-width: 500px;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
.hh-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: .5px;
  padding: 13px 26px; border-radius: 9px; border: 2px solid transparent; cursor: pointer;
  text-decoration: none; line-height: 1; white-space: nowrap;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  transition: transform .12s, background .12s; }
.hh-btn:active { transform: translateY(1px); }
/* A button carrying a mark. The chip is taller than the 18px text line, so the vertical
   padding comes down to keep the button from ballooning. Padding is symmetric because the
   content is centred - an asymmetric gutter would throw the centring off. */
.hh-btn-marked { padding: 7px 16px; gap: 10px; }
/* White clear-space chip. The Cub Scouts artwork is a JPEG on solid white that the licence
   forbids editing, so rather than key the white out we lean into it - a white rounded box on
   the gold reads as a deliberate badge where a bare square would read as a rendering bug. It
   also stays white when the ghost button flips to navy on hover, which is what keeps the
   navy-lettered Pack mark legible there. */
.hh-btn-mark { background: #fff; border-radius: 6px; padding: 3px; display: inline-flex;
  align-items: center; justify-content: center; flex-shrink: 0; }
/* Height-driven with width auto so neither mark can ever be distorted. 28px against
   pack-logo.png's 125px source is ~4.5x density; the Cub Scouts file is 320px, ~11x. */
.hh-btn-mark img { height: 28px; width: auto; display: block; }
.hh-btn-primary { background: var(--gold); color: var(--navy-dark); border-color: var(--gold); }
.hh-btn-primary:hover { background: var(--gold-dark); border-color: var(--gold-dark); }
.hh-btn-ghost { background: transparent; color: var(--navy); border-color: var(--navy); }
.hh-btn-ghost:hover { background: var(--navy); color: #fff; }
/* Portrait phones get a photo band over copy on cream rather than a full-bleed frame.
   Full-bleed caps out at about a quarter of the picture: the still is 1.85:1, so covering
   a ~0.46:1 viewport means scaling it ~4x and throwing away the sides, and no amount of
   scrim tuning gets that back - the photo has to occupy less height.

   The band is sized from viewport *width*, because that (against the band's height) is
   what sets how much of the frame survives: visible fraction = 100vw / (height x 1.846),
   so 108vw shows ~50%. The % cap keeps it from eating a short phone alive, and
   flex-shrink lets the copy - which won't go below its own content height - claw back
   room on small screens, so the two buttons always fit. */
@media (max-width: 700px) {
  .hh-hero { display: flex; flex-direction: column; }
  .hh-hero::after { background: none; }
  .hh-img { position: static; flex: 0 1 auto; height: min(108vw, 46%);
    -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 64px), transparent 100%);
    mask-image: linear-gradient(to bottom, #000 calc(100% - 64px), transparent 100%); }
  /* The copy sits on cream now - no scrim, and the eyebrow chip melts into the background. */
  .hh-copy { position: static; flex: 1 1 auto; bottom: auto; max-width: none;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 clamp(24px,6vw,110px) calc(28px + env(safe-area-inset-bottom, 0px)); }
  .hh-eyebrow { background: none; border-radius: 0; padding: 0; }
  .hh-body { max-width: none; }
}
`;
