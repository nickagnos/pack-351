// Shared design components for Pack 351

// ── Logo ──────────────────────────────────────────────────
const PackLogo = ({ dark = false, onClick }) => (
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
      <div style={{ fontFamily: 'Nunito', fontSize: 11, color: dark ? 'rgba(255,255,255,.55)' : 'var(--muted)', marginTop: 1 }}>
        Cub Scouts · Lindale, TX
      </div>
    </div>
  </button>
);

// ── Nav ───────────────────────────────────────────────────
const SiteNav = ({ current, go }) => {
  const [open, setOpen] = React.useState(false);
  const links = [['about','About'],['events','Events'],['resources','Resources']];
  const nav = (p) => { go(p); setOpen(false); };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#fff', borderBottom: '1px solid var(--border)',
      boxShadow: '0 1px 6px rgba(0,0,0,.07)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68,
      }}>
        <PackLogo onClick={() => nav('home')} />

        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => nav(id)} style={{
              fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 18,
              color: current === id ? 'var(--navy)' : 'var(--muted)',
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
            style={{
              display: 'none', flexDirection: 'column', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: 22, height: 2, background: 'var(--navy)', borderRadius: 1 }} />
            ))}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', background: '#fff', padding: '8px 16px 16px' }}>
          {[...links, ['join','Join Now']].map(([id, label]) => (
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
};

// ── Footer ────────────────────────────────────────────────
const SiteFooter = ({ go }) => (
  <footer style={{ background: 'var(--navy-dark)', color: '#fff', padding: '60px 0 32px' }}>
    <div className="container">
      <div className="footer-grid" style={{
        display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48,
      }}>
        <div>
          <PackLogo dark onClick={() => go('home')} />
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.7, marginTop: 14, maxWidth: 260 }}>
            A family-run Cub Scout pack building friendships, skills, and memories for K–5th graders in Lindale.
          </p>
        </div>

        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--gold)', marginBottom: 14 }}>Quick Links</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[['About','about'],['Events','events'],['Resources','resources'],['Join Us','join']].map(([l,id]) => (
              <button key={id} onClick={() => go(id)} style={{
                fontFamily: 'Nunito', fontSize: 14, color: 'rgba(255,255,255,.7)',
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', padding: 0, transition: 'color .12s',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--gold)', marginBottom: 14 }}>Meetings</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 1.9 }}>
            <div>Most Monday nights</div>
            <div style={{ fontWeight: 600 }}>6:30 – 7:30 PM</div>
            <div style={{ marginTop: 6 }}>Central Baptist Church</div>
            <div>Lindale, TX</div>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--gold)', marginBottom: 14 }}>Contact</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 2 }}>
            <div>cubmaster@pack351.org</div>
            <div>Facebook Group</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => go('join')} style={{ marginTop: 16 }}>
            Join Pack 351 →
          </button>
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

// ── PhotoSlot ─────────────────────────────────────────────
const PhotoSlot = ({ label, caption, bg = '#b8c6d8', style = {}, captionSize = 20 }) => (
  <div className="ps" style={{ background: bg, ...style }}>
    <div className="ps-indicator">{label}</div>
    {caption && (
      <div className="ps-caption">
        <div className="ps-caption-text" style={{ fontSize: captionSize }}>{caption}</div>
      </div>
    )}
  </div>
);

// ── SectionHeader ─────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, sub, center }) => (
  <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 36 }}>
    {eyebrow && <span className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</span>}
    <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 'clamp(28px,3vw,46px)', color: 'var(--navy)' }}>{title}</h2>
    {sub && <p style={{ fontSize: 17, color: 'var(--muted)', marginTop: 10, maxWidth: center ? 600 : '100%', margin: center ? '10px auto 0' : '10px 0 0' }}>{sub}</p>}
  </div>
);

// ── EventRow ──────────────────────────────────────────────
const EventRow = ({ month, day, title, time, location, tag, tagBg }) => (
  <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: 18, alignItems: 'center' }}>
    <div style={{
      minWidth: 52, textAlign: 'center',
      background: 'var(--navy-light)', borderRadius: 7,
      padding: '6px 0', border: '1.5px solid var(--navy)',
      flexShrink: 0,
    }}>
      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 12, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: 1 }}>{month}</div>
      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 28, color: 'var(--navy)', lineHeight: 1.1 }}>{day}</div>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20 }}>{title}</span>
        {tag && (
          <span style={{
            fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, letterSpacing: .8,
            textTransform: 'uppercase', background: tagBg || 'var(--navy-light)',
            color: tagBg ? '#fff' : 'var(--navy)', padding: '2px 9px', borderRadius: 99,
          }}>{tag}</span>
        )}
      </div>
      <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {time && <span>⏰ {time}</span>}
        {location && <span>📍 {location}</span>}
      </div>
    </div>
  </div>
);

Object.assign(window, { PackLogo, SiteNav, SiteFooter, PhotoSlot, SectionHeader, EventRow });
