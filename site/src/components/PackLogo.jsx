import React from 'react';
import { asset } from '../asset';

// The mark is artwork (public/pack-logo.png), not the CSS square it used to be, so it carries
// the "PACK 351" wording itself - only the tagline is rendered as text beside it.
//
// The PNG's background is keyed to transparent because this sits on three different surfaces:
// the white interior nav, the cream-over-photo gradient on the home cinematic, and the navy
// footer. A flat-background image would show a box on two of them.
//
// dark: the footer's navy-dark background. The artwork is dark blue lettering, which all but
// disappears there, so it gets a white chip - the print convention of a clear-space box - rather
// than a recolored second copy of the file.
//
// onPhoto: the logo is sitting on the home cinematic rather than a solid bar. --muted only
// clears 4.5:1 on white; over a photo the tagline measured 1.9:1, so it takes navy instead.
export default function PackLogo({ dark = false, onPhoto = false, onClick }) {
  const logo = (
    <img
      src={asset('/pack-logo.png')}
      alt="Cub Scout Pack 351"
      // Height-driven with width auto so the 1.33:1 artwork can never be stretched. 46 against
      // a 125px-tall source is ~2.7x density, so it stays sharp on retina without upscaling.
      style={{ height: 46, width: 'auto', display: 'block', flexShrink: 0 }}
    />
  );

  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    }}>
      {dark
        ? <div style={{ background: '#fff', borderRadius: 8, padding: '6px 9px', flexShrink: 0 }}>{logo}</div>
        : logo}
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontFamily: 'Nunito', fontSize: 11,
          color: dark ? 'rgba(255,255,255,.55)' : (onPhoto ? 'var(--navy)' : 'var(--muted)') }}>
          Cub Scouts · Lindale, TX
        </div>
      </div>
    </button>
  );
}
