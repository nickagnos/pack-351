import React from 'react';
import SiteFooter from '../components/SiteFooter';
import PageHero from '../components/PageHero';
import { asset, pageHref } from '../asset';
import { ROUTES } from '../routes.js';

// Served by GitHub Pages for any path that doesn't resolve to a file. Since every page is
// now a real URL, a typo or a stale link reaches the server instead of quietly falling
// through to the home page, so this is the page that has to catch it — and it carries the
// full nav and footer so nobody is stranded.
export default function NotFoundPage() {
  return (
    <div>
      <PageHero
        eyebrow="404"
        title="We can't find that page."
        sub="The link may be old, or there may be a typo in the address. Everything on the site is one click away below."
        image={asset('/photos/photo-hiking.jpg')}
        imageAlt="Cub Scouts walking a sunlit wooded trail"
        actions={<a className="btn btn-primary" href={pageHref('home')}>Back to the home page →</a>}
      />

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 640 }}>
            {ROUTES.filter(r => r.slug !== 'home').map(r => (
              <a key={r.slug} className="card" href={pageHref(r.slug)}
                 style={{ display: 'block', padding: '16px 20px' }}>
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20, color: 'var(--navy)', marginBottom: 4 }}>
                  {r.footerLabel || r.navLabel}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{r.description}</div>
              </a>
            ))}
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 24 }}>
            Still stuck?{' '}
            <a href="mailto:txcspack351@gmail.com" style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}>
              Email us
            </a>{' '}and we'll point you at the right page.
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
