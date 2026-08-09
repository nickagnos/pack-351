import React from 'react';

// onPhoto: the logo is sitting on the home cinematic rather than a solid bar. --muted only
// clears 4.5:1 on white; over a photo the tagline measured 1.9:1, so it takes the same navy
// the wordmark uses.
export default function PackLogo({ dark = false, onPhoto = false, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    }}>
      <div style={{
        width: 42, height: 42, background: dark ? 'var(--gold)' : 'var(--navy)',
        borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 17,
          color: dark ? 'var(--navy-dark)' : 'var(--gold)', letterSpacing: .5,
        }}>351</span>
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{
          fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 20,
          color: dark ? '#fff' : 'var(--navy)', lineHeight: 1.1,
        }}>Pack 351</div>
        <div style={{ fontFamily: 'Nunito', fontSize: 11, marginTop: 1,
          color: dark ? 'rgba(255,255,255,.55)' : (onPhoto ? 'var(--navy)' : 'var(--muted)') }}>
          Cub Scouts · Lindale, TX
        </div>
      </div>
    </button>
  );
}
