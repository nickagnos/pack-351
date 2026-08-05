import React from 'react';
import { asset } from '../asset';

// Scroll-scrubbed clay-diorama cinematic. Scroll drives a deterministic "camera":
// each scene pushes in (Ken Burns) + drifts (parallax) and cross-fades to the next
// through the shared cream field. Stills live in site/public/scroll-world/.
//
// Scene compositions are deliberately simple: 2-4 scouts, large in frame, seen from
// behind. Crowds of small figures render badly, and the copy below sits bottom-left,
// so each still keeps its lower-left third open and light.
const SCENES = [
  { img: '/scroll-world/trail.jpg', eyebrow: 'Pack 351 · Lindale, TX', title: 'It starts outside.',
    body: 'Cub Scouts for kids Kindergarten through 5th grade, right here in Lindale. Here’s a year with Pack 351.' },
  { img: '/scroll-world/campground.jpg', eyebrow: 'Into the woods', title: 'First campout, first s’more.',
    body: 'Campouts, hikes, and nights under the pines. The whole family comes along.' },
  { img: '/scroll-world/creek.jpg', eyebrow: 'Down by the creek', title: 'Creek days.',
    body: 'Exploring, fishing, and getting muddy. The best part of the year happens outside.' },
  { img: '/scroll-world/overlook.jpg', eyebrow: 'Ready to get started?', title: 'Your kid’s next adventure.',
    body: 'Open to all K–5th graders. Drop in to any Tuesday meeting first, no pressure.', cta: true },
];
const VH_PER_SCENE = 118; // scroll distance (in vh) per scene

export default function ScrollWorld({ go }) {
  const stageRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const railRef = React.useRef(null);
  const hintRef = React.useRef(null);

  React.useEffect(() => {
    const stage = stageRef.current, track = trackRef.current, rail = railRef.current, hint = hintRef.current;
    const els = Array.from(stage.querySelectorAll('.sw-scene')).map((sc) => ({
      sc, img: sc.querySelector('.sw-img'), copy: sc.querySelector('.sw-copy'),
    }));
    const dots = Array.from(rail.children);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const smooth = (e0, e1, x) => { x = clamp((x - e0) / (e1 - e0), 0, 1); return x * x * (3 - 2 * x); };
    let ticking = false;

    function frame() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      const t = p * (SCENES.length - 1);
      const active = Math.round(t);
      els.forEach((e, i) => {
        const x = t - i, a = Math.abs(x);
        const op = a < 0.34 ? 1 : (a > 0.72 ? 0 : 1 - smooth(0.34, 0.72, a));
        const scale = reduce ? 1 : (1.02 + (clamp(x, -1, 1) + 1) * 0.075); // ~1.02 -> 1.17
        const ty = reduce ? 0 : (x * -1.6);
        e.sc.style.opacity = op.toFixed(3);
        e.img.style.transform = `translateY(${ty}vh) scale(${scale.toFixed(3)})`;
        const co = a < 0.22 ? 1 : (a > 0.5 ? 0 : 1 - smooth(0.22, 0.5, a));
        e.copy.style.opacity = co.toFixed(3);
        e.copy.style.transform = `translateY(${(x * 26).toFixed(0)}px)`;
        e.sc.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
      });
      dots.forEach((d, i) => d.classList.toggle('sw-on', i === active));
      if (hint) hint.style.opacity = p > 0.02 ? 0 : 0.9;
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    function onResize() { if (trackRef.current) trackRef.current.style.height = (SCENES.length * VH_PER_SCENE) + 'vh'; frame(); }

    window.scrollTo(0, 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    frame();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const goto = (i) => window.scrollTo({ top: i * window.innerHeight * VH_PER_SCENE / 100, behavior: 'smooth' });

  return (
    <div className="sw-root">
      <style>{SW_CSS}</style>
      {/* The four scene titles are mood lines, not page headings - as <h1>s they gave the
          home page four competing top-level headings, none of which named the Pack. The
          real heading lives here, off-screen but read by screen readers and search
          engines; the scene titles below are <h2>s. */}
      <h1 className="sw-sr-only">Cub Scout Pack 351 — Lindale, Texas</h1>
      <div className="sw-stage" ref={stageRef}>
        {SCENES.map((s, i) => (
          <div className="sw-scene" style={{ zIndex: i + 1 }} key={i}>
            <div className="sw-img" style={{ backgroundImage: `url('${asset(s.img)}')` }} />
            <div className="sw-copy">
              <div className="sw-eyebrow">{s.eyebrow}</div>
              <h2 className="sw-title">{s.title}</h2>
              <p className="sw-body">{s.body}</p>
              {s.cta && (
                <div className="sw-cta">
                  <button className="sw-btn sw-btn-primary" onClick={() => go('join')}>Join Pack 351 →</button>
                  <button className="sw-btn sw-btn-ghost" onClick={() => go('events')}>Come to a meeting</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sw-track" ref={trackRef} style={{ height: (SCENES.length * VH_PER_SCENE) + 'vh' }} />
      <div className="sw-rail" ref={railRef}>
        {SCENES.map((_, i) => (<button key={i} onClick={() => goto(i)} aria-label={`Go to scene ${i + 1}`} />))}
      </div>
      <div className="sw-hint" ref={hintRef}>Scroll to explore<span className="sw-arrow">↓</span></div>
    </div>
  );
}

const SW_CSS = `
.sw-root { --sw-bg: var(--cream); }
.sw-stage { position: fixed; inset: 0; overflow: hidden; background: var(--sw-bg); z-index: 1; }
.sw-scene { position: absolute; inset: 0; opacity: 0; will-change: opacity; }
.sw-scene .sw-img { position: absolute; inset: 0; background: var(--sw-bg) center/cover no-repeat;
  transform-origin: 50% 52%; will-change: transform; backface-visibility: hidden; }
/* Cream scrim behind the copy. The navy text sits directly on the photo, and golden-hour
   and firelight scenes never clear 3:1 on their own, so this floors the contrast regardless
   of what image is dropped in. Sits above .sw-img, below .sw-copy; not scaled by Ken Burns. */
.sw-scene::after { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(135% 118% at 0% 100%,
    rgba(250,247,240,.95) 0%, rgba(250,247,240,.90) 30%,
    rgba(250,247,240,.60) 52%, rgba(250,247,240,0) 78%); }
.sw-copy { position: absolute; z-index: 2; left: clamp(24px,6vw,110px); bottom: clamp(60px,14vh,150px);
  max-width: min(560px,80vw); will-change: opacity, transform; }
/* The eyebrow sits at the top of the copy block, highest up the image and least covered by
   the scrim, so it gets the same cream halo the title uses. */
.sw-eyebrow { font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--gold-text); margin-bottom: 14px;
  text-shadow: 0 0 10px var(--sw-bg), 0 0 22px var(--sw-bg); }
/* Off-screen but still in the accessibility tree - not display:none, which would hide it
   from screen readers too. */
.sw-sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.sw-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; line-height: .98; color: var(--navy);
  font-size: clamp(44px,6.4vw,92px); letter-spacing: -.5px; margin-bottom: 16px; text-shadow: 0 2px 30px var(--sw-bg); }
.sw-body { font-size: clamp(16px,1.5vw,20px); line-height: 1.6; color: var(--muted); max-width: 460px; }
.sw-cta { margin-top: 26px; display: flex; gap: 12px; flex-wrap: wrap; }
.sw-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: .5px;
  padding: 13px 26px; border-radius: 9px; border: 2px solid transparent; cursor: pointer;
  display: inline-flex; align-items: center; gap: 6px; transition: transform .12s, background .12s; }
.sw-btn:active { transform: translateY(1px); }
.sw-btn-primary { background: var(--gold); color: var(--navy-dark); border-color: var(--gold); }
.sw-btn-primary:hover { background: var(--gold-dark); border-color: var(--gold-dark); }
.sw-btn-ghost { background: transparent; color: var(--navy); border-color: var(--navy); }
.sw-btn-ghost:hover { background: var(--navy); color: #fff; }
.sw-track { position: relative; z-index: 2; pointer-events: none; }
.sw-rail { position: fixed; right: 26px; top: 50%; transform: translateY(-50%); z-index: 40;
  display: flex; flex-direction: column; gap: 12px; }
.sw-rail button { width: 9px; height: 9px; border-radius: 50%; border: none; cursor: pointer; padding: 0;
  background: rgba(27,48,104,.22); transition: background .2s, transform .2s; }
.sw-rail button.sw-on { background: var(--gold); transform: scale(1.35); }
.sw-hint { position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%); z-index: 40;
  font-family: 'Barlow Condensed', sans-serif; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  font-size: 12px; color: var(--muted); opacity: .9; transition: opacity .3s; pointer-events: none; }
.sw-hint .sw-arrow { display: block; text-align: center; font-size: 18px; margin-top: 4px; animation: sw-bob 1.6s ease-in-out infinite; }
@keyframes sw-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
@media (max-width: 640px) { .sw-rail { display: none; } }
/* Narrow viewports: the copy spans nearly the full width and sits higher in the frame,
   so a corner-anchored radial doesn't reach it. Sweep straight up from the bottom instead. */
@media (max-width: 700px) {
  .sw-scene::after { background: linear-gradient(to top,
    rgba(250,247,240,.96) 0%, rgba(250,247,240,.92) 34%,
    rgba(250,247,240,.62) 54%, rgba(250,247,240,0) 76%); }
}
@media (prefers-reduced-motion: reduce) { .sw-scene .sw-img { transform: none !important; } .sw-hint .sw-arrow { animation: none; } }
`;
