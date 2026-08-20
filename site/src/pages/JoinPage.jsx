import React from 'react';
import { BEASCOUT_REGISTER_URL } from '../routes.js';

// /join is not a content page: it IS the join action, so it forwards to Scouting America's
// registration for Pack 351 (2026-08-20 — the two-path chooser it used to hold collapsed
// once "Join" came to mean exactly this; the interest form lives on /info now).
//
// The forward happens three ways, fastest first: a meta refresh that prerender.js writes
// into the head (route.redirect in routes.js), the script below, and a visible link for
// anything that blocks both. location.replace, not assign, so the stub doesn't land in the
// back button and trap people bouncing back from my.Scouting.
//
// dangerouslySetInnerHTML for the same reason HomeHero's <style> uses it: renderToString
// escapes text children and <script> is a raw-text element, so an escaped quote would ship
// as &quot; and break the statement. The URL is a module constant, never input.
export default function JoinPage() {
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: `location.replace("${BEASCOUT_REGISTER_URL}")` }} />
      <div className="container" style={{ padding: '90px 0 120px', maxWidth: 640 }}>
        <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 34, color: 'var(--navy)', marginBottom: 12 }}>
          Taking you to registration…
        </div>
        <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 20 }}>
          Joining Pack 351 happens on Scouting America's site: you'll sign in or create a
          my.Scouting account (the screen won't mention Pack 351 — that's normal), register
          your scout, and pay the national and council fees.
        </p>
        <a className="btn btn-primary" href={BEASCOUT_REGISTER_URL}>
          Continue to Scouting America →
        </a>
      </div>
    </div>
  );
}
