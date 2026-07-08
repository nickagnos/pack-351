// Inner page wireframes — About, Events, Join, Resources

const PW = 1100;

const PageAbout = () => (
  <div className="wf col" style={{ width: PW }}>
    <div className="p-20" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="About" />
    </div>

    {/* hero strip */}
    <div className="p-32 col gap-12">
      <span className="wf-eyebrow">ABOUT</span>
      <h1 className="wf-h1">Who we are</h1>
      <div className="wf-hand" style={{ fontSize: 22, color: '#444', maxWidth: 720 }}>
        Pack 351 is a family-run Cub Scout pack in [Town]. We're parents, kids,
        and leaders who like getting outside, building stuff, and helping out.
      </div>
    </div>

    {/* split: photo + body */}
    <div className="row gap-24 p-24" style={{ borderTop: '1.75px solid #1a1a1a' }}>
      <Photo label="pack group photo" w={420} h={300} />
      <div className="col gap-12" style={{ flex: 1 }}>
        <h3 className="wf-h3">Our story</h3>
        <Lines count={4} />
        <h3 className="wf-h3">What we believe</h3>
        <Lines count={3} />
      </div>
    </div>

    {/* dens grid */}
    <div className="p-32 col gap-12" style={{ borderTop: '1.75px solid #1a1a1a' }}>
      <h2 className="wf-h2">Our dens</h2>
      <span className="wf-scribble" style={{ color: '#666' }}>kids are grouped by grade · each den has 6–10 scouts</span>
      <div className="row gap-12" style={{ marginTop: 8 }}>
        {[
          ['Lion', 'K'], ['Tiger', '1st'], ['Wolf', '2nd'],
          ['Bear', '3rd'], ['Webelos', '4th'], ['Arrow of Light', '5th'],
        ].map(([den, gr]) => (
          <div key={den} className="wf-box col gap-6 p-12" style={{ flex: 1, textAlign: 'center' }}>
            <div className="wf-hand" style={{ fontSize: 22 }}>{den}</div>
            <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>{gr} grade</div>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '1.75px solid #1a1a1a', background: 'var(--accent)',
              alignSelf: 'center', marginTop: 4,
            }} />
          </div>
        ))}
      </div>
    </div>

    {/* leaders */}
    <div className="p-32 col gap-12" style={{ borderTop: '1.75px solid #1a1a1a', background: 'rgba(0,0,0,.03)' }}>
      <h2 className="wf-h2">Meet the leaders</h2>
      <div className="row gap-16">
        {['Cubmaster', 'Asst. Cubmaster', 'Treasurer', 'Outdoor Chair'].map(role => (
          <div key={role} className="col gap-6" style={{ flex: 1, alignItems: 'flex-start' }}>
            <Photo label="portrait" w={120} h={120} />
            <div className="wf-hand" style={{ fontSize: 20 }}>[Name]</div>
            <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>{role}</div>
          </div>
        ))}
      </div>
    </div>

    <Footer />
  </div>
);

const PageEvents = () => (
  <div className="wf col" style={{ width: PW }}>
    <div className="p-20" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="Events" />
    </div>

    <div className="row p-24" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="col gap-4">
        <span className="wf-eyebrow">EVENTS</span>
        <h1 className="wf-h1">What's coming up</h1>
      </div>
      <div className="row gap-8">
        <Btn ghost sm>All</Btn>
        <Btn ghost sm>Pack</Btn>
        <Btn ghost sm>Den</Btn>
        <Btn ghost sm>Outdoor</Btn>
        <Btn primary sm>+ Google Cal</Btn>
      </div>
    </div>

    {/* featured event */}
    <div className="row gap-20 p-24" style={{ background: 'rgba(0,0,0,.04)', borderTop: '1.75px solid #1a1a1a', borderBottom: '1.75px solid #1a1a1a' }}>
      <Photo label="🏁 pinewood derby" w={360} h={240} />
      <div className="col gap-8" style={{ flex: 1 }}>
        <span className="wf-pill">⭐ Featured · pack-wide</span>
        <h2 className="wf-h2">Pinewood Derby 2026</h2>
        <div className="wf-hand" style={{ fontSize: 20, color: '#444' }}>SAT MAY 24 · 9:00am · Lodge Hall</div>
        <Lines count={3} />
        <div className="row gap-8" style={{ marginTop: 4 }}>
          <Btn primary sm>RSVP</Btn>
          <Btn ghost sm>+ Add to calendar</Btn>
          <Btn ghost sm>Rules PDF</Btn>
        </div>
      </div>
    </div>

    {/* list */}
    <div className="p-24 col gap-12">
      <h3 className="wf-h3">All upcoming</h3>
      {[
        ['MON JUN 9', 'Pack Meeting', '6:30pm · Lodge Hall', 'Weekly'],
        ['FRI JUN 6', 'Family Campout', 'Fri–Sun · Camp Wilderness', 'Overnight'],
        ['SAT JUN 21', 'Hike + BBQ', '10am · Bear Trail', 'Outdoor'],
        ['WED JUL 4', 'Parade marching', '11am · Main St', 'Service'],
        ['SAT JUL 12', 'Range day', '9am · Sportsman\'s club', 'Pack'],
        ['SAT AUG 16', 'Back-to-school picnic', '11am · Park', 'Family'],
      ].map(([date, title, meta, tag]) => (
        <div key={date} className="row gap-12 wf-box p-12" style={{ alignItems: 'center' }}>
          <div className="wf-hand" style={{ fontSize: 18, width: 110 }}>{date}</div>
          <div className="col gap-2" style={{ flex: 1 }}>
            <div className="wf-hand" style={{ fontSize: 22 }}>{title}</div>
            <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>{meta}</div>
          </div>
          <Chip>{tag}</Chip>
          <Btn ghost sm>Details →</Btn>
        </div>
      ))}
    </div>

    <Footer />
  </div>
);

const PageJoin = () => (
  <div className="wf col" style={{ width: PW }}>
    <div className="p-20" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="Join" />
    </div>

    <div className="row" style={{ alignItems: 'stretch' }}>
      {/* LEFT — form */}
      <div className="col gap-16 p-32" style={{ flex: 1.4, borderRight: '1.75px solid #1a1a1a' }}>
        <span className="wf-eyebrow">JOIN PACK 351 · STEP 2 of 3</span>
        <h1 className="wf-h1">Tell us about your scout</h1>

        {/* stepper */}
        <div className="row gap-8" style={{ marginTop: -4, marginBottom: 8 }}>
          {['Family', 'Scout', 'Review'].map((s, i) => (
            <div key={s} className="row gap-6" style={{ alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                border: '1.75px solid #1a1a1a',
                background: i <= 1 ? 'var(--accent)' : 'var(--paper)',
                color: i <= 1 ? '#fff' : '#1a1a1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Caveat', fontWeight: 700, fontSize: 18,
              }}>{i + 1}</div>
              <span className="wf-hand" style={{ fontSize: 20 }}>{s}</span>
              {i < 2 && <div style={{ width: 30, height: 2, background: '#1a1a1a', margin: '0 6px' }} />}
            </div>
          ))}
        </div>

        {[
          ['Scout\'s first name', 'e.g. Theo'],
          ['Scout\'s last name', ''],
          ['Date of birth', 'mm/dd/yyyy'],
          ['Current grade', '▾ K, 1st, 2nd, 3rd, 4th, 5th'],
          ['School', ''],
          ['Anything we should know? (allergies, accommodations…)', ''],
        ].map(([lbl, ph]) => (
          <div key={lbl} className="col gap-4">
            <div className="wf-hand" style={{ fontSize: 18 }}>{lbl}</div>
            <div className="wf-box" style={{ height: 38, padding: '8px 12px', color: '#aaa', fontFamily: 'Patrick Hand' }}>
              {ph}
            </div>
          </div>
        ))}

        <div className="row gap-12" style={{ marginTop: 12, alignItems: 'center' }}>
          <Btn ghost>← Back</Btn>
          <Btn primary>Continue →</Btn>
          <span className="wf-scribble" style={{ fontSize: 13, color: '#666', marginLeft: 'auto' }}>
            ~2 min to finish · no payment yet
          </span>
        </div>
      </div>

      {/* RIGHT — sidebar context */}
      <div className="col gap-16 p-24" style={{ flex: 1, background: 'rgba(0,0,0,.03)' }}>
        <div className="wf-box col gap-6 p-12">
          <div className="wf-hand" style={{ fontSize: 20 }}>💬 What happens next?</div>
          <Lines count={3} />
        </div>
        <div className="wf-box col gap-6 p-12">
          <div className="wf-hand" style={{ fontSize: 20 }}>💰 What does it cost?</div>
          <div className="wf-scribble" style={{ fontSize: 14, color: '#444' }}>
            $175 / year · scholarships available · no pressure to buy a uniform on day 1
          </div>
        </div>
        <div className="wf-box col gap-6 p-12">
          <div className="wf-hand" style={{ fontSize: 20 }}>🤝 Prefer to chat first?</div>
          <Btn ghost sm>Email cubmaster</Btn>
          <Btn ghost sm>Come to a meeting</Btn>
        </div>
        <StickyNote rotate={2}>"It only takes 5 min — we follow up by email."</StickyNote>
      </div>
    </div>

    <Footer />
  </div>
);

const PageResources = () => (
  <div className="wf col" style={{ width: PW }}>
    <div className="p-20" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="Resources" />
    </div>

    <div className="p-32 col gap-8">
      <span className="wf-eyebrow">RESOURCES</span>
      <h1 className="wf-h1">Everything in one place</h1>
      <div className="wf-hand" style={{ fontSize: 22, color: '#444', maxWidth: 720 }}>
        Forms, FAQs, the uniform guide — bookmark this page.
      </div>
      <div className="row gap-8 wf-box p-8" style={{ marginTop: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 18, padding: '0 8px' }}>🔍</span>
        <div className="wf-scribble" style={{ color: '#888', flex: 1 }}>Search forms, FAQs, uniform parts…</div>
      </div>
    </div>

    {/* category nav */}
    <div className="row gap-8 p-16" style={{ borderTop: '1.75px solid #1a1a1a', borderBottom: '1.75px solid #1a1a1a', overflow: 'auto' }}>
      {['Forms', 'Uniform', 'New families', 'Payments', 'Calendar', 'Outdoor', 'FAQ', 'Leaders only'].map((c, i) => (
        <span key={c} className="wf-pill" style={{ background: i === 0 ? 'var(--accent)' : 'var(--paper)', color: i === 0 ? '#fff' : '#1a1a1a' }}>{c}</span>
      ))}
    </div>

    {/* forms section */}
    <div className="p-24 col gap-12">
      <h2 className="wf-h2">📄 Forms & permissions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          ['Annual Health & Medical Record (A&B)', 'PDF · req. for all scouts'],
          ['Activity Consent / Permission Slip', 'PDF · per event'],
          ['Talent Release (photo permission)', 'PDF · optional'],
          ['Scholarship Request', 'PDF · confidential'],
          ['Pinewood Derby Rules', 'PDF · annual'],
          ['Campout Packing List', 'PDF · checklist'],
        ].map(([t, m]) => (
          <div key={t} className="row gap-12 wf-box p-12" style={{ alignItems: 'center' }}>
            <div style={{
              width: 36, height: 44,
              border: '1.75px solid #1a1a1a',
              background: 'var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Caveat', fontWeight: 700, fontSize: 14,
            }}>PDF</div>
            <div className="col" style={{ flex: 1 }}>
              <div className="wf-hand" style={{ fontSize: 20 }}>{t}</div>
              <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>{m}</div>
            </div>
            <Btn ghost sm>↓</Btn>
          </div>
        ))}
      </div>
    </div>

    {/* FAQ section */}
    <div className="p-24 col gap-12" style={{ borderTop: '1.75px solid #1a1a1a', background: 'rgba(0,0,0,.03)' }}>
      <h2 className="wf-h2">❓ Frequently asked</h2>
      {[
        'What does my scout actually do at a pack meeting?',
        'How much does it cost — and what if we can\'t afford it?',
        'Do we have to camp? Do parents have to camp?',
        'What about the uniform — what do we really need?',
        'How is Pack 351 organized? Who runs it?',
        'My kid has [allergy / accommodation] — can they still join?',
      ].map(q => (
        <div key={q} className="row gap-8 wf-box p-12" style={{ alignItems: 'center' }}>
          <div className="wf-hand" style={{ flex: 1, fontSize: 20 }}>{q}</div>
          <span style={{ fontSize: 22, fontFamily: 'Caveat', fontWeight: 700 }}>+</span>
        </div>
      ))}
    </div>

    {/* still have questions */}
    <div className="p-24 center col gap-8" style={{ borderTop: '1.75px solid #1a1a1a', textAlign: 'center' }}>
      <div className="wf-hand" style={{ fontSize: 22 }}>Still have a question?</div>
      <div className="row gap-8">
        <Btn ghost sm>Email cubmaster</Btn>
        <Btn primary sm>Join now & we'll follow up</Btn>
      </div>
    </div>

    <Footer />
  </div>
);

Object.assign(window, { PageAbout, PageEvents, PageJoin, PageResources });
