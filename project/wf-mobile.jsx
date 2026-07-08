// Mobile homepage wireframes — phone-frame view

const PHW = 340;
const PHH = 700;

const PhoneFrame = ({ children }) => (
  <div className="wf-phone" style={{ width: PHW, height: PHH }}>
    <div className="wf-phone-notch" />
    <div style={{ paddingTop: 26, height: '100%', overflow: 'hidden' }}>
      <div style={{ height: '100%', overflowY: 'auto' }}>{children}</div>
    </div>
  </div>
);

const MobileHome = () => (
  <PhoneFrame>
    <div className="col" style={{ background: 'var(--paper)' }}>
      {/* top bar */}
      <div className="row p-12" style={{ alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #1a1a1a' }}>
        <Logo />
        <div style={{ width: 24, height: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ height: 2.5, background: '#1a1a1a', borderRadius: 2 }} />
          <div style={{ height: 2.5, background: '#1a1a1a', borderRadius: 2 }} />
          <div style={{ height: 2.5, background: '#1a1a1a', borderRadius: 2 }} />
        </div>
      </div>

      {/* hero photo */}
      <Photo label="hero photo" h={180} style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />

      {/* tagline */}
      <div className="col gap-8 p-16">
        <div className="wf-eyebrow" style={{ fontSize: 12 }}>WELCOME</div>
        <h1 className="wf-h1" style={{ fontSize: 38 }}>Pack 351</h1>
        <div className="wf-hand" style={{ fontSize: 17 }}>Cub Scouts · K–5 · [Town]</div>
        <Btn primary style={{ width: '100%', fontSize: 20 }}>Join Our Pack →</Btn>
        <Btn ghost sm>What is Cub Scouts?</Btn>
      </div>

      {/* quick facts strip */}
      <div className="row gap-6 p-12" style={{ borderTop: '1.5px solid #1a1a1a', borderBottom: '1.5px solid #1a1a1a', background: 'rgba(0,0,0,.04)' }}>
        <div className="col" style={{ flex: 1, textAlign: 'center' }}>
          <div className="wf-hand wf-accent" style={{ fontSize: 22 }}>Mon</div>
          <div className="wf-scribble" style={{ fontSize: 11 }}>6:30pm</div>
        </div>
        <div className="col" style={{ flex: 1, textAlign: 'center', borderLeft: '1px dashed #888', borderRight: '1px dashed #888' }}>
          <div className="wf-hand wf-accent" style={{ fontSize: 22 }}>K–5</div>
          <div className="wf-scribble" style={{ fontSize: 11 }}>all kids</div>
        </div>
        <div className="col" style={{ flex: 1, textAlign: 'center' }}>
          <div className="wf-hand wf-accent" style={{ fontSize: 22 }}>$175</div>
          <div className="wf-scribble" style={{ fontSize: 11 }}>/ year</div>
        </div>
      </div>

      {/* next event */}
      <div className="col gap-8 p-16">
        <div className="wf-hand" style={{ fontSize: 20 }}>📅 This week</div>
        <EventCard date="SAT MAY 24" title="Pinewood Derby" meta="9am · Lodge Hall" tag="Pack" />
        <EventCard date="MON JUN 9" title="Pack Meeting" meta="6:30pm" tag="Weekly" />
        <Btn ghost sm>See full calendar →</Btn>
      </div>

      {/* photo strip */}
      <div className="col gap-8 p-16" style={{ borderTop: '1.5px solid #1a1a1a' }}>
        <div className="wf-hand" style={{ fontSize: 20 }}>What we do</div>
        <div className="row gap-6" style={{ height: 90 }}>
          <Photo label="derby" />
          <Photo label="camp" />
          <Photo label="hike" />
        </div>
      </div>

      {/* bottom join */}
      <div className="p-16 center col gap-6" style={{ background: 'var(--accent)', color: '#fff', textAlign: 'center' }}>
        <div className="wf-hand" style={{ fontSize: 22, color: '#fff' }}>Adventure starts here.</div>
        <Btn style={{ background: '#fff', color: 'var(--accent)', width: '100%' }}>Join Now →</Btn>
      </div>
    </div>
  </PhoneFrame>
);

const MobileResources = () => (
  <PhoneFrame>
    <div className="col" style={{ background: 'var(--paper)' }}>
      <div className="row p-12" style={{ alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #1a1a1a' }}>
        <span style={{ fontFamily: 'Caveat', fontWeight: 700, fontSize: 22 }}>← Resources</span>
        <Btn primary sm>Join</Btn>
      </div>

      <div className="col gap-6 p-16">
        <h2 className="wf-h2" style={{ fontSize: 30 }}>Forms & FAQs</h2>
        <div className="wf-box p-8" style={{ color: '#888', fontFamily: 'Patrick Hand' }}>🔍 Search…</div>
      </div>

      <div className="row gap-6" style={{ padding: '0 12px', overflow: 'auto' }}>
        {['Forms', 'Uniform', 'New', 'FAQ', 'Pay'].map((c, i) => (
          <span key={c} className="wf-pill" style={{
            background: i === 0 ? 'var(--accent)' : 'var(--paper)',
            color: i === 0 ? '#fff' : '#1a1a1a',
            whiteSpace: 'nowrap',
          }}>{c}</span>
        ))}
      </div>

      <div className="col gap-8 p-16">
        {[
          ['Medical Record (A&B)', 'PDF'],
          ['Permission Slip', 'PDF'],
          ['Scholarship Request', 'PDF'],
          ['Derby Rules', 'PDF'],
          ['Packing List', 'PDF'],
        ].map(([t, m]) => (
          <div key={t} className="row gap-8 wf-box p-12" style={{ alignItems: 'center' }}>
            <div style={{
              width: 30, height: 36,
              border: '1.75px solid #1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Caveat', fontWeight: 700, fontSize: 11,
            }}>{m}</div>
            <div className="wf-hand" style={{ flex: 1, fontSize: 17 }}>{t}</div>
            <span style={{ fontSize: 20 }}>↓</span>
          </div>
        ))}
      </div>
    </div>
  </PhoneFrame>
);

const MobileJoin = () => (
  <PhoneFrame>
    <div className="col" style={{ background: 'var(--paper)' }}>
      <div className="row p-12" style={{ alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #1a1a1a' }}>
        <span style={{ fontFamily: 'Caveat', fontWeight: 700, fontSize: 22 }}>← Join</span>
        <span className="wf-scribble" style={{ fontSize: 12, color: '#666' }}>step 1/3</span>
      </div>

      <div className="col gap-12 p-16">
        <h2 className="wf-h2" style={{ fontSize: 30 }}>Tell us about your family</h2>
        {/* progress */}
        <div className="row" style={{ height: 6, background: 'rgba(0,0,0,.1)', borderRadius: 3 }}>
          <div style={{ width: '33%', background: 'var(--accent)', borderRadius: 3 }} />
        </div>

        {[
          'Parent / guardian name',
          'Email',
          'Phone',
          'How did you hear about us? ▾',
        ].map(lbl => (
          <div key={lbl} className="col gap-4">
            <div className="wf-hand" style={{ fontSize: 16 }}>{lbl}</div>
            <div className="wf-box" style={{ height: 36 }} />
          </div>
        ))}

        <Btn primary style={{ width: '100%', fontSize: 20, marginTop: 8 }}>Continue →</Btn>
        <span className="wf-scribble" style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
          We'll never spam. A leader follows up within 24h.
        </span>
      </div>

      <StickyNote rotate={-1} color="#ffe98a">
        Prefer to come to a meeting first?<br/>
        Tap "Visit before you join" →
      </StickyNote>
    </div>
  </PhoneFrame>
);

Object.assign(window, { MobileHome, MobileResources, MobileJoin });
