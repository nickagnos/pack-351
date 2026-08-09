import React from 'react';
import PackLogo from './PackLogo';

export default function SiteNav({ current, go }) {
  const [open, setOpen] = React.useState(false);
  const links = [['about', 'About'], ['events', 'Events'], ['resources', 'Resources']];
  const nav = (p) => { go(p); setOpen(false); };
  // On the home cinematic the nav floats over the scene (transparent overlay); everywhere
  // else it's the solid sticky bar.
  const isHome = current === 'home' && !open;

  return (
    // On Home the bar floats over the photo and its cream fade lives in .nav-home (styles.css),
    // not inline - the fade has to be shorter on phones, and an inline background would beat
    // the media query. Everywhere else it's the solid sticky bar.
    <nav className={isHome ? 'nav-home' : undefined} style={{
      position: isHome ? 'fixed' : 'sticky', top: 0, left: 0, right: 0, zIndex: 100,
      ...(isHome ? {} : { background: '#fff', paddingBottom: 0 }),
      borderBottom: isHome ? 'none' : '1px solid var(--border)',
      boxShadow: isHome ? 'none' : '0 1px 6px rgba(0,0,0,.07)',
      transition: 'background .2s',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68,
      }}>
        <PackLogo onClick={() => nav('home')} onPhoto={isHome} />

        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => nav(id)} style={{
              fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 18,
              // --muted only clears 4.5:1 on a solid white bar; over the scenes it needs navy
              color: (current === id || isHome) ? 'var(--navy)' : 'var(--muted)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px 18px', borderRadius: 6,
              borderBottom: current === id ? '2px solid var(--gold)' : '2px solid transparent',
              transition: 'color .12s',
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-primary nav-desktop-links" onClick={() => nav('join')}>
            Join Now →
          </button>
          <button
            className="nav-hamburger-btn"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            style={{
              display: 'none', flexDirection: 'column', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: 22, height: 2, background: 'var(--navy)', borderRadius: 1 }} />
            ))}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', background: '#fff', padding: '8px 16px 16px' }}>
          {[...links, ['join', 'Join Now']].map(([id, label]) => (
            <button key={id} onClick={() => nav(id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22,
              color: id === 'join' ? '#fff' : 'var(--navy)',
              background: id === 'join' ? 'var(--gold)' : 'transparent',
              border: 'none', cursor: 'pointer',
              padding: '10px 14px', borderRadius: 6, marginTop: 4,
            }}>{label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
