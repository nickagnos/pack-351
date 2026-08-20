import React from 'react';
import PackLogo from './PackLogo';
import { pageHref } from '../asset';
import { FOOTER_LINKS } from '../routes.js';

export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--navy-dark)', color: '#fff', padding: '60px 0 32px' }}>
      <div className="container">
        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48,
        }}>
          <div>
            <PackLogo dark href={pageHref('home')} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.7, marginTop: 14, maxWidth: 260 }}>
              A family-run Cub Scout pack building friendships, skills, and memories for K–5th graders in Lindale.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--gold)', marginBottom: 14 }}>Quick Links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {/* Same list routes.js gives the nav, so the two bars can no longer drift. */}
              {FOOTER_LINKS.map(({ slug, footerLabel }) => (
                <a key={slug} href={pageHref(slug)} style={{
                  fontFamily: 'Nunito', fontSize: 14, color: 'rgba(255,255,255,.7)',
                  textDecoration: 'none', textAlign: 'left', transition: 'color .12s',
                }}>{footerLabel}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--gold)', marginBottom: 14 }}>Meetings</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 1.9 }}>
              <div>Most Tuesday nights</div>
              <div style={{ fontWeight: 600 }}>6:00 – 7:00 PM</div>
              <div style={{ marginTop: 6 }}>Central Baptist Church</div>
              <div>Lindale, TX</div>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--gold)', marginBottom: 14 }}>Contact</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 2 }}>
              <a href="mailto:txcspack351@gmail.com" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                txcspack351@gmail.com
              </a>
              <div>
                {/* The numeric group ID, taken off the old Google Sites page, which linked
                    it twice. The previous vanity URL (/groups/351cubscouts) was a guess and
                    did not resolve. The group is private, so a family who clicks gets a join
                    prompt - hence the label. */}
                <a
                  href="https://www.facebook.com/groups/1094659333885105/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}
                >
                  Facebook Group (private)
                </a>
              </div>
            </div>
            <a className="btn btn-primary btn-sm" href={pageHref('join')} style={{ marginTop: 16 }}>
              Join Pack 351 →
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>
            © 2026 Pack 351 · Chartered by Central Baptist Church, Lindale, TX
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>Scouting America</div>
        </div>
      </div>
    </footer>
  );
}
