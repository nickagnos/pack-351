// About page

const AboutPage = ({ go }) => {
  const dens = [
    { name: 'Lion',          grade: 'Kindergarten', color: '#fde68a' },
    { name: 'Tiger',         grade: '1st Grade',    color: '#fed7aa' },
    { name: 'Wolf',          grade: '2nd Grade',    color: '#ddd6fe' },
    { name: 'Bear',          grade: '3rd Grade',    color: '#bbf7d0' },
    { name: 'Webelos',       grade: '4th Grade',    color: '#bae6fd' },
    { name: 'Arrow of Light',grade: '5th Grade',    color: '#fca5a5' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 12 }}>About Us</span>
          <h1 style={{
            fontFamily: 'Barlow Condensed', fontWeight: 800, color: '#fff',
            fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1, marginBottom: 20,
          }}>
            A Pack built by<br />families, for families.
          </h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 17, maxWidth: 560, lineHeight: 1.7 }}>
            Pack 351 is chartered by Central Baptist Church in Lindale, TX. We're parents, kids,
            and leaders who believe the best childhood memories are made outside — with a little mud on your boots.
          </p>
        </div>
      </div>

      {/* Group photo */}
      <div className="container" style={{ paddingTop: 40 }}>
        <PhotoSlot
          label="photo: full pack group shot — all scouts & leaders"
          bg="#b0c4d8"
          style={{ height: 380, borderRadius: 10 }}
        />
      </div>

      {/* Pack story */}
      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 12 }}>Our story</span>
              <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 'clamp(28px,3vw,44px)', color: 'var(--navy)', marginBottom: 20 }}>
                Lindale Scouts,<br />through and through.
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
                Pack 351 has been part of the Lindale community for years, meeting at Central Baptist Church and
                doing the things that make Scouting worth it — camping under East Texas stars, building and racing
                pinewood derby cars, sailing balsa boats down rain gutters, and leaving places better than we found them.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
                Every December you'll find our Scouts planting hundreds of three-foot candy canes in
                yards across the Hideaway community. It's become one of our most beloved traditions —
                and a great fundraiser for the Pack.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PhotoSlot label="photo: scouts hiking a trail" bg="#8ab58a" style={{ height: 210, borderRadius: 8 }} />
              <PhotoSlot label="photo: candy cane fundraiser — Hideaway neighborhood" bg="#c09090" style={{ height: 165, borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Dens */}
      <div className="section-sm" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader eyebrow="How we're organized" title="Our dens" sub="Scouts are grouped by grade. Each den has 6–10 kids and its own dedicated leader." center />
          <div className="den-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 12 }}>
            {dens.map(d => (
              <div key={d.name} className="card" style={{ padding: '20px 12px', textAlign: 'center' }}>
                <div style={{
                  width: 46, height: 46, background: d.color, borderRadius: '50%',
                  margin: '0 auto 12px', border: '2px solid rgba(0,0,0,.08)',
                }} />
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20, color: 'var(--navy)', marginBottom: 4 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{d.grade}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaders */}
      <div className="section">
        <div className="container">
          <SectionHeader eyebrow="Who runs the show" title="Our leaders" sub="All volunteers. All parents. All in." />
          <div className="leaders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {['Cubmaster','Asst. Cubmaster','Pack Treasurer','Outdoor Chair'].map(role => (
              <div key={role} className="card" style={{ padding: '24px 16px', textAlign: 'center' }}>
                <PhotoSlot label="portrait" bg="#c8d0e0" style={{ width: 76, height: 76, borderRadius: '50%', margin: '0 auto 14px' }} />
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>[Name]</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charter org strip */}
      <div style={{ background: 'var(--navy-light)', borderTop: '1px solid var(--border)', padding: '36px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: 8 }}>Our chartering organization</span>
            <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 28, color: 'var(--navy)' }}>Central Baptist Church</h3>
            <p style={{ color: 'var(--muted)', marginTop: 6 }}>Lindale, TX · Our home base</p>
          </div>
          <button className="btn btn-primary" onClick={() => go('join')}>Join Pack 351 →</button>
        </div>
      </div>

      <SiteFooter go={go} />
    </div>
  );
};

Object.assign(window, { AboutPage });
