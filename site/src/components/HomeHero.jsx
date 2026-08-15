import React from 'react';
import { asset } from '../asset';

// The home hero: a scroll-scrubbed photographic cinematic. Scroll drives a deterministic
// "camera": each scene pushes in (Ken Burns) + drifts (parallax) and cross-fades to the
// next through the shared cream field. Stills live in site/public/hero/.
//
// Every still must keep its lower-left third open and light. The copy below sits there,
// navy on a cream radial scrim that washes that corner to near-solid cream — so anything
// worth seeing in it disappears. See that folder's README for the full replacement rules.
const SCENES = [
  { img: '/hero/trail.jpg', eyebrow: 'Pack 351 · Lindale, TX', title: 'It starts outside.',
    body: 'Cub Scouts for kids Kindergarten through 5th grade, right here in Lindale. Here’s a year with Pack 351.' },
  { img: '/hero/campground.jpg', eyebrow: 'Into the woods', title: 'First campout, first s’more.',
    body: 'Campouts, hikes, and nights under the pines. The whole family comes along.' },
  { img: '/hero/creek.jpg', eyebrow: 'Down by the creek', title: 'Creek days.',
    body: 'Exploring, fishing, and getting muddy. The best part of the year happens outside.' },
  { img: '/hero/overlook.jpg', eyebrow: 'Ready to get started?', title: 'Your kid’s next adventure.',
    body: 'Open to all K–5th graders. Drop in to any Tuesday meeting first, no pressure.', cta: true },
];
const VH_PER_SCENE = 118; // scroll distance (in vh) per scene
// Phones get a still camera: the stills are wide landscape (1.85:1) and a portrait viewport
// already crops ~3/4 of each frame under background-cover, so pushing in another 1.17x throws
// away what little is left. Same breakpoint as the mobile scrim block in HERO_CSS.
const NARROW_MQ = '(max-width: 700px)';
// On a touch device the gesture that advances the scenes is a swipe *up*, so "scroll down"
// with a down arrow points the opposite way from the finger.
const TOUCH_MQ = '(hover: none) and (pointer: coarse)';

// One large-viewport height in px, read off the track rather than window.innerHeight. The
// track is sized in lvh, which mobile browsers hold constant while their URL bar collapses;
// innerHeight is not, so dividing by it made the scene timing lurch mid-gesture.
function metrics(track) {
  const h = track.offsetHeight;
  const unit = h / (SCENES.length * VH_PER_SCENE / 100);
  // innerHeight <= lvh always, so the real scroll range is never shorter than this - the
  // last scene stays reachable even with the URL bar hidden.
  return { unit, max: h - unit };
}

export default function HomeHero({ go }) {
  const stageRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const railRef = React.useRef(null);
  const hintRef = React.useRef(null);
  const [touch, setTouch] = React.useState(() => window.matchMedia(TOUCH_MQ).matches);

  React.useEffect(() => {
    const mq = window.matchMedia(TOUCH_MQ);
    const onChange = () => setTouch(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  React.useEffect(() => {
    const stage = stageRef.current, track = trackRef.current, rail = railRef.current, hint = hintRef.current;
    const els = Array.from(stage.querySelectorAll('.hh-scene')).map((sc) => ({
      sc, img: sc.querySelector('.hh-img'), copy: sc.querySelector('.hh-copy'),
    }));
    const dots = Array.from(rail.children);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrowMq = window.matchMedia(NARROW_MQ);
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const smooth = (e0, e1, x) => { x = clamp((x - e0) / (e1 - e0), 0, 1); return x * x * (3 - 2 * x); };
    let ticking = false;
    let max = metrics(track).max;

    function frame() {
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      const t = p * (SCENES.length - 1);
      const active = Math.round(t);
      // The parallax drift has to go whenever the zoom does: it rides on the scale overscan,
      // so translating an unscaled image would expose the cream stage at the top/bottom edge.
      const still = reduce || narrowMq.matches;
      els.forEach((e, i) => {
        const x = t - i, a = Math.abs(x);
        const op = a < 0.34 ? 1 : (a > 0.72 ? 0 : 1 - smooth(0.34, 0.72, a));
        const scale = 1.02 + (clamp(x, -1, 1) + 1) * 0.075; // ~1.02 -> 1.17
        const ty = x * -1.6;
        e.sc.style.opacity = op.toFixed(3);
        e.img.style.transform = still ? 'none' : `translateY(${ty}vh) scale(${scale.toFixed(3)})`;
        const co = a < 0.22 ? 1 : (a > 0.5 ? 0 : 1 - smooth(0.22, 0.5, a));
        e.copy.style.opacity = co.toFixed(3);
        e.copy.style.transform = `translateY(${(x * 26).toFixed(0)}px)`;
        e.sc.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
      });
      dots.forEach((d, i) => d.classList.toggle('hh-on', i === active));
      if (hint) hint.style.opacity = p > 0.02 ? 0 : 0.9;
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    // Cached rather than read per frame - offsetHeight forces layout.
    function onResize() { max = metrics(track).max; frame(); }

    window.scrollTo(0, 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    narrowMq.addEventListener('change', frame);
    frame();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      narrowMq.removeEventListener('change', frame);
    };
  }, []);

  // Scene i sits at i/(n-1) of the scroll range - the same mapping frame() reads back out.
  const goto = (i) => {
    if (!trackRef.current) return;
    const { max } = metrics(trackRef.current);
    window.scrollTo({ top: (i / (SCENES.length - 1)) * max, behavior: 'smooth' });
  };

  return (
    <div className="hh-root">
      <style>{HERO_CSS}</style>
      {/* The four scene titles are mood lines, not page headings - as <h1>s they gave the
          home page four competing top-level headings, none of which named the Pack. The
          real heading lives here, off-screen but read by screen readers and search
          engines; the scene titles below are <h2>s. */}
      <h1 className="hh-sr-only">Cub Scout Pack 351 — Lindale, Texas</h1>
      <div className="hh-stage" ref={stageRef}>
        {SCENES.map((s, i) => (
          <div className="hh-scene" style={{ zIndex: i + 1 }} key={i}>
            <div className="hh-img" style={{ backgroundImage: `url('${asset(s.img)}')` }} />
            <div className="hh-copy">
              <div className="hh-eyebrow">{s.eyebrow}</div>
              <h2 className="hh-title">{s.title}</h2>
              <p className="hh-body">{s.body}</p>
              {s.cta && (
                <div className="hh-cta">
                  <button className="hh-btn hh-btn-primary" onClick={() => go('join')}>Join Pack 351 →</button>
                  <button className="hh-btn hh-btn-ghost" onClick={() => go('events')}>Come to a meeting</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Height lives in HERO_CSS, not here - an inline px/vh value would beat the lvh rule. */}
      <div className="hh-track" ref={trackRef} />
      <div className="hh-rail" ref={railRef}>
        {SCENES.map((_, i) => (<button key={i} onClick={() => goto(i)} aria-label={`Go to scene ${i + 1}`} />))}
      </div>
      <div className={'hh-hint' + (touch ? ' hh-hint-up' : '')} ref={hintRef}>
        {touch ? 'Swipe up to explore' : 'Scroll to explore'}
        <span className="hh-arrow">{touch ? '↑' : '↓'}</span>
      </div>
    </div>
  );
}

const HERO_CSS = `
.hh-root { --hh-bg: var(--cream); }
.hh-stage { position: fixed; inset: 0; overflow: hidden; background: var(--hh-bg); z-index: 1; }
.hh-scene { position: absolute; inset: 0; opacity: 0; will-change: opacity; }
.hh-scene .hh-img { position: absolute; inset: 0; background: var(--hh-bg) center/cover no-repeat;
  transform-origin: 50% 52%; will-change: transform; backface-visibility: hidden; }
/* Cream scrim behind the copy. The navy text sits directly on the photo, and golden-hour
   and firelight scenes never clear 3:1 on their own, so this floors the contrast regardless
   of what image is dropped in. Sits above .hh-img, below .hh-copy; not scaled by Ken Burns.

   Centred on the copy block, not the bottom-left corner. Anchored at the corner it had to be
   enormous to reach text sitting ~330px above that corner, and lifted 67% of the frame to do
   it; centred, it lifts 34% and every run of copy measures *better* than it did, because the
   cream goes where the text is instead of smearing across the corner. It stays on this
   full-viewport layer rather than moving onto .hh-copy (as the mobile scrim does) - scoped to
   that box the fade gets clipped into a hard-edged rectangle. */
.hh-scene::after { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(46% 36% at 23% 77%,
    rgba(250,247,240,.97) 0%, rgba(250,247,240,.95) 50%,
    rgba(250,247,240,.64) 78%, rgba(250,247,240,0) 100%); }
.hh-copy { position: absolute; z-index: 2; left: clamp(24px,6vw,110px);
  --hh-copy-bottom: clamp(60px,14vh,150px); bottom: var(--hh-copy-bottom);
  max-width: min(560px,80vw); will-change: opacity, transform; }
/* The eyebrow sits at the top of the copy block, highest up the image and least covered by
   the scrim, so it gets the same cream halo the title uses. */
.hh-eyebrow { font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--gold-text); margin-bottom: 14px;
  text-shadow: 0 0 10px var(--hh-bg), 0 0 22px var(--hh-bg); }
/* Off-screen but still in the accessibility tree - not display:none, which would hide it
   from screen readers too. */
.hh-sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.hh-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; line-height: .98; color: var(--navy);
  font-size: clamp(44px,6.4vw,92px); letter-spacing: -.5px; margin-bottom: 16px; text-shadow: 0 2px 30px var(--hh-bg); }
.hh-body { font-size: clamp(16px,1.5vw,20px); line-height: 1.6; color: var(--muted); max-width: 460px; }
.hh-cta { margin-top: 26px; display: flex; gap: 12px; flex-wrap: wrap; }
.hh-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: .5px;
  padding: 13px 26px; border-radius: 9px; border: 2px solid transparent; cursor: pointer;
  display: inline-flex; align-items: center; gap: 6px; transition: transform .12s, background .12s; }
.hh-btn:active { transform: translateY(1px); }
.hh-btn-primary { background: var(--gold); color: var(--navy-dark); border-color: var(--gold); }
.hh-btn-primary:hover { background: var(--gold-dark); border-color: var(--gold-dark); }
.hh-btn-ghost { background: transparent; color: var(--navy); border-color: var(--navy); }
.hh-btn-ghost:hover { background: var(--navy); color: #fff; }
/* The scroll runway. Sized in lvh so mobile browser chrome collapsing doesn't resize it
   mid-scroll; the vh declaration is the fallback for browsers that don't parse lvh and drop
   the one after it. metrics() reads this height back to derive the viewport unit, so both
   sides of the progress math come from the same place. */
.hh-track { position: relative; z-index: 2; pointer-events: none;
  height: ${SCENES.length * VH_PER_SCENE}vh; height: ${SCENES.length * VH_PER_SCENE}lvh; }
.hh-rail { position: fixed; right: 26px; top: 50%; transform: translateY(-50%); z-index: 40;
  display: flex; flex-direction: column; gap: 12px; }
.hh-rail button { width: 9px; height: 9px; border-radius: 50%; border: none; cursor: pointer; padding: 0;
  background: rgba(27,48,104,.22); transition: background .2s, transform .2s; }
.hh-rail button.hh-on { background: var(--gold); transform: scale(1.35); }
.hh-hint { position: fixed; left: 50%; bottom: calc(26px + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%); z-index: 40;
  font-family: 'Barlow Condensed', sans-serif; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  font-size: 12px; color: var(--muted); opacity: .9; transition: opacity .3s; pointer-events: none; }
.hh-hint .hh-arrow { display: block; text-align: center; font-size: 18px; margin-top: 4px; animation: hh-bob 1.6s ease-in-out infinite; }
/* The arrow bobs the way it points, so the up-arrow needs its own keyframe. */
.hh-hint-up .hh-arrow { animation-name: hh-bob-up; }
@keyframes hh-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
@keyframes hh-bob-up { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
/* Phones: the side rail has nowhere to go, so lay the dots out along the bottom instead of
   hiding them - otherwise there's no sign the page has four scenes. The 9px dot moves into
   ::before so the button itself can be a 44px touch target. */
@media (max-width: 640px) {
  .hh-rail { right: auto; left: 50%; top: auto; bottom: calc(10px + env(safe-area-inset-bottom, 0px));
    transform: translateX(-50%); flex-direction: row; gap: 0; }
  .hh-rail button { width: 44px; height: 44px; border-radius: 0; background: none;
    display: flex; align-items: center; justify-content: center; }
  .hh-rail button.hh-on { background: none; transform: none; }
  .hh-rail button::before { content: ''; width: 9px; height: 9px; border-radius: 50%;
    background: rgba(27,48,104,.28); transition: background .2s, transform .2s; }
  .hh-rail button.hh-on::before { background: var(--gold); transform: scale(1.35); }
  /* The bottom of the screen stacks dots (10-54px) then the hint (56-100px); the copy's
     104px of bottom padding in the block below keeps it clear of both. */
  .hh-hint { bottom: calc(56px + env(safe-area-inset-bottom, 0px)); }
}
/* Narrow viewports. The scene-wide sweep is the wrong shape here: to reach copy that sits a
   third of the way up the screen it has to be tall, and on a portrait phone the bottom
   three-quarters of the frame is most of what survives the crop in the first place. It also
   can't adapt - the last scene's copy is twice the height of the first's, so any fixed
   percentage either starves that scene or drowns the others.

   So the scrim moves onto the copy block itself, where it sizes to whatever that scene's copy
   needs. It runs to the bottom of the viewport and far past both sides (the stage clips it),
   which leaves only one edge to hide: a fixed 132px ramp above the text, in px rather than %
   so the fade is identical whatever the block height. Everything above that ramp is photo. */
@media (max-width: 700px) {
  .hh-scene::after { background: none; }
  .hh-body { text-shadow: none; max-width: none; }
  /* No Ken Burns here, so nothing to promote. */
  .hh-scene .hh-img { will-change: auto; }

  /* Portrait phones get a photo band over copy on cream rather than a full-bleed frame.
     Full-bleed caps out at about a quarter of the picture: the stills are 1.85:1, so
     covering a ~0.46:1 viewport means scaling them ~4x and throwing away the sides, and no
     amount of scrim or zoom tuning gets that back - the photo has to occupy less height.

     The band is sized from viewport *width*, because that (against the band's height) is
     what sets how much of the frame survives: visible fraction = 100vw / (height x 1.846),
     so 108vw shows ~50%. The % cap keeps it from eating a short phone alive, and
     flex-shrink lets the copy - which won't go below its own content height - claw back
     room on small screens, so the last scene's two buttons always fit. */
  .hh-scene { display: flex; flex-direction: column; }
  .hh-scene .hh-img { position: static; flex: 0 1 auto; height: min(108vw, 46%);
    -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 64px), transparent 100%);
    mask-image: linear-gradient(to bottom, #000 calc(100% - 64px), transparent 100%); }
  .hh-copy { position: static; flex: 1 1 auto; bottom: auto; max-width: none;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 clamp(24px,6vw,110px) calc(104px + env(safe-area-inset-bottom, 0px)); }
  /* The copy sits on cream now, so it no longer needs a scrim of its own. */
  .hh-copy::before { display: none; }
}
@media (prefers-reduced-motion: reduce) { .hh-scene .hh-img { transform: none !important; } .hh-hint .hh-arrow { animation: none; } }
`;
