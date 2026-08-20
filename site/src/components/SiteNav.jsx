import React from 'react';
import PackLogo from './PackLogo';
import { pageHref, JOIN_CTA_HREF } from '../asset';
import { NAV_LINKS } from '../routes.js';

export default function SiteNav({ current }) {
  const [open, setOpen] = React.useState(false);
  // "Hideaway Candy Canes" renders at 185px, against 74/80/104 for the other three. That puts
  // the whole desktop row at 755px, which clears the 772px available at the old 820px
  // breakpoint by just 18px - fine until Barlow Condensed fails to load and a wider fallback
  // renders. styles.css switches to the hamburger at 900px instead of 820px to cover that.
  //
  // The link list comes from routes.js rather than being spelled out here: the nav and the
  // footer used to keep separate hardcoded arrays, with the tuples in opposite orders.
  const links = NAV_LINKS;
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
        <PackLogo href={pageHref('home')} onPhoto={isHome} />

        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(({ slug, navLabel }) => (
            <a key={slug} href={pageHref(slug)} style={{
              fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 18,
              // --muted only clears 4.5:1 on a solid white bar; over the scenes it needs navy
              color: (current === slug || isHome) ? 'var(--navy)' : 'var(--muted)',
              textDecoration: 'none',
              padding: '8px 18px', borderRadius: 6,
              borderBottom: current === slug ? '2px solid var(--gold)' : '2px solid transparent',
              transition: 'color .12s',
            }}>{navLabel}</a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a className="btn btn-primary nav-desktop-links" href={JOIN_CTA_HREF}>
            Join Now →
          </a>
          <button
            className="nav-hamburger-btn"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            aria-expanded={open}
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
          {/* Join carries its own href so it lands on the interest form like the desktop
              button does; the four nav links take the plain page path. */}
          {[...links, { slug: 'join', navLabel: 'Join Now', href: JOIN_CTA_HREF }].map(({ slug, navLabel, href }) => (
            <a key={slug} href={href || pageHref(slug)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22,
              color: slug === 'join' ? '#fff' : 'var(--navy)',
              background: slug === 'join' ? 'var(--gold)' : 'transparent',
              textDecoration: 'none',
              padding: '10px 14px', borderRadius: 6, marginTop: 4,
            }}>{navLabel}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
