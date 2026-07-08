// Four homepage wireframe variants — desktop, 1200 wide

const W = 1200;

// ─────────────────────────────────────────────────────────
// A. Classic Recruiter — big hero, "what is it" cards, events strip
// ─────────────────────────────────────────────────────────
const HomeA = () => (
  <div className="wf col" style={{ width: W }}>
    <div className="p-20" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="Home" />
    </div>

    {/* HERO */}
    <div style={{ position: 'relative' }}>
      <Photo label="HERO PHOTO  ·  kids at campout, smiling" h={460} style={{ borderRadius: 0, border: 'none', borderBottom: '1.75px solid #1a1a1a' }} />
      <div style={{
        position: 'absolute', left: 40, bottom: 40,
        background: 'var(--paper)', border: '1.75px solid #1a1a1a',
        padding: '20px 28px', maxWidth: 580,
        boxShadow: '6px 6px 0 #1a1a1a',
      }}>
        <div className="wf-eyebrow">Welcome to</div>
        <h1 className="wf-h1" style={{ fontSize: 64 }}>Pack 351</h1>
        <div className="wf-hand" style={{ fontSize: 26, marginTop: 6 }}>
          Adventure starts here. <span className="wf-accent">K–5th grade.</span>
        </div>
        <div className="row gap-12" style={{ marginTop: 16 }}>
          <Btn primary>Join Our Pack →</Btn>
          <Btn ghost>See what we do</Btn>
        </div>
      </div>
      <StickyNote rotate={4} color="#ffe98a">
        💡 photo rotates<br/>seasonally (4-6 hero shots)
      </StickyNote>
    </div>

    {/* QUICK Q's */}
    <div className="p-32 col gap-20">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h2 className="wf-h2">What every parent asks first</h2>
        <span className="wf-scribble" style={{ color: '#666' }}>answers in 1 click ↓</span>
      </div>
      <div className="row gap-16">
        <FAQCard q="Who can join?" a="Kids in K–5th grade. All genders." />
        <FAQCard q="When do you meet?" a="Mondays, 6:30pm · Lodge Hall" />
        <FAQCard q="What does it cost?" a="$175/yr + uniform. Scholarships available." />
        <FAQCard q="How much time?" a="2–3 hrs/week. Family events monthly." />
      </div>
    </div>

    {/* EVENTS STRIP */}
    <div className="p-32 col gap-16" style={{ background: 'rgba(0,0,0,.04)', borderTop: '1.75px solid #1a1a1a', borderBottom: '1.75px solid #1a1a1a' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h2 className="wf-h2">Upcoming adventures</h2>
        <span className="wf-pill">📅 Full calendar →</span>
      </div>
      <div className="row gap-16">
        <EventCard date="SAT MAY 24" title="Pinewood Derby" meta="9am · Lodge Hall" tag="Pack-wide" />
        <EventCard date="FRI JUN 6" title="Family Campout" meta="Fri–Sun · Camp Wilderness" tag="Overnight" />
        <EventCard date="MON JUN 9" title="Pack Meeting" meta="6:30pm · Lodge Hall" tag="Weekly" />
        <EventCard date="SAT JUN 21" title="Hike + BBQ" meta="10am · Bear Trail" tag="Outdoor" />
      </div>
    </div>

    {/* SHOW DON'T TELL — photo strip */}
    <div className="p-32 col gap-16">
      <h2 className="wf-h2">A year in the life of a Cub Scout</h2>
      <div className="row gap-12" style={{ height: 200 }}>
        <Photo label="derby cars" rotate={-1} />
        <Photo label="campfire" rotate={1} />
        <Photo label="hike summit" rotate={-1} />
        <Photo label="blue & gold" rotate={1} />
        <Photo label="service day" rotate={-1} />
      </div>
    </div>

    {/* BIG JOIN BANNER */}
    <div className="p-32 row gap-24" style={{
      background: 'var(--accent)', color: '#fff',
      borderTop: '1.75px solid #1a1a1a', alignItems: 'center',
    }}>
      <div className="col gap-8" style={{ flex: 1 }}>
        <h2 className="wf-h2" style={{ color: '#fff' }}>Ready to join the adventure?</h2>
        <div className="wf-scribble" style={{ fontSize: 16 }}>Open to all kids K–5. New families welcome year-round.</div>
      </div>
      <Btn style={{ background: '#fff', color: 'var(--accent)' }}>Sign Up Today →</Btn>
    </div>

    <Footer />
  </div>
);

// ─────────────────────────────────────────────────────────
// B. Calendar-First — for current families; events front & center
// ─────────────────────────────────────────────────────────
const HomeB = () => (
  <div className="wf col" style={{ width: W }}>
    <div className="p-16" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="Home" items={['Home', 'Calendar', 'Den Pages', 'Resources', 'Photos', 'Join']} />
    </div>

    {/* announcement banner */}
    <div className="row p-12 gap-12" style={{ background: '#ffe98a', borderBottom: '1.75px solid #1a1a1a', alignItems: 'center' }}>
      <span className="wf-stamp" style={{ transform: 'rotate(-3deg)' }}>📣 THIS WEEK</span>
      <div className="wf-hand" style={{ fontSize: 22, flex: 1 }}>
        Pack meeting moved to <u>Tuesday 6:30pm</u> — bring derby cars for weigh-in.
      </div>
      <Btn ghost sm>Details →</Btn>
    </div>

    <div className="row" style={{ alignItems: 'stretch' }}>
      {/* LEFT — big calendar */}
      <div className="col gap-16 p-24" style={{ flex: 2, borderRight: '1.75px solid #1a1a1a' }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 className="wf-h2">May 2026</h2>
          <div className="row gap-6">
            <Btn ghost sm>← Apr</Btn>
            <Btn ghost sm>Today</Btn>
            <Btn ghost sm>Jun →</Btn>
          </div>
        </div>
        {/* simple month grid */}
        <div className="wf-box" style={{ padding: 8 }}>
          <div className="row" style={{ borderBottom: '1.5px solid #1a1a1a', paddingBottom: 4 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="wf-hand" style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>{d}</div>
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="row" style={{ borderBottom: r < 4 ? '1px dashed #888' : 'none' }}>
              {Array.from({ length: 7 }).map((_, c) => {
                const day = r * 7 + c - 3;
                const hasEvent = [4, 12, 19, 24, 27].includes(day);
                const hasEvent2 = [6].includes(day);
                return (
                  <div key={c} className="col" style={{ flex: 1, padding: 6, height: 64, borderRight: c < 6 ? '1px dashed #ccc' : 'none' }}>
                    <div className="wf-scribble" style={{ fontSize: 12, color: '#666' }}>
                      {day > 0 && day <= 31 ? day : ''}
                    </div>
                    {hasEvent && <div style={{ background: 'var(--accent)', color: '#fff', fontSize: 10, padding: '1px 4px', borderRadius: 2, marginTop: 2, fontFamily: 'Patrick Hand' }}>Pack mtg</div>}
                    {hasEvent2 && <div style={{ background: '#b03a2e', color: '#fff', fontSize: 10, padding: '1px 4px', borderRadius: 2, marginTop: 2, fontFamily: 'Patrick Hand' }}>Derby</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="row gap-12">
          <span className="wf-scribble" style={{ fontSize: 13 }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--accent)', marginRight: 4 }} /> Pack
          </span>
          <span className="wf-scribble" style={{ fontSize: 13 }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, background: '#b03a2e', marginRight: 4 }} /> Big event
          </span>
          <span className="wf-scribble" style={{ fontSize: 13 }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, background: '#888', marginRight: 4 }} /> Den
          </span>
          <span className="wf-pill" style={{ marginLeft: 'auto' }}>+ Subscribe to Google Cal</span>
        </div>
      </div>

      {/* RIGHT — upcoming + announcements */}
      <div className="col gap-16 p-24" style={{ flex: 1, minWidth: 0 }}>
        <h3 className="wf-h3">Next up ↓</h3>
        <EventCard date="SAT MAY 24" title="Pinewood Derby" meta="9am · Lodge Hall" tag="Pack" />
        <EventCard date="MON JUN 9" title="Pack Meeting" meta="6:30pm · Lodge Hall" tag="Weekly" />
        <EventCard date="FRI JUN 6" title="Family Campout" meta="Fri–Sun" tag="Overnight" />
        <div className="wf-dashed p-12 col gap-6" style={{ background: 'rgba(0,0,0,.03)' }}>
          <div className="wf-hand" style={{ fontSize: 18 }}>📌 Reminders</div>
          <Lines count={3} />
        </div>
      </div>
    </div>

    {/* RECAP photos + small join */}
    <div className="p-24 col gap-12" style={{ borderTop: '1.75px solid #1a1a1a' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h3 className="wf-h3">Recent recap · April hike</h3>
        <span className="wf-pill">📷 All photos →</span>
      </div>
      <div className="row gap-8" style={{ height: 140 }}>
        {Array.from({ length: 6 }).map((_, i) => <Photo key={i} label={`pic ${i+1}`} />)}
      </div>
    </div>

    <Footer />
  </div>
);

// ─────────────────────────────────────────────────────────
// C. Activity Showcase — photo grid leads, then narrative
// ─────────────────────────────────────────────────────────
const HomeC = () => (
  <div className="wf col" style={{ width: W }}>
    <div className="p-20" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="Home" />
    </div>

    {/* tagline strip — no big hero photo, photos ARE the hero */}
    <div className="p-24 col gap-8 center" style={{ textAlign: 'center', borderBottom: '1.75px solid #1a1a1a' }}>
      <span className="wf-eyebrow">PACK 351 · est. 1962</span>
      <h1 className="wf-h1" style={{ fontSize: 60 }}>
        We <span className="wf-accent wf-squig">build memories</span> outside.
      </h1>
      <div className="wf-hand" style={{ fontSize: 22, color: '#444' }}>
        Cub Scouts for K–5th grade in [Town]. Here's a year with us:
      </div>
    </div>

    {/* MASONRY GRID */}
    <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 120, gap: 12 }}>
      <Photo label="🏁 Pinewood Derby" style={{ gridColumn: 'span 2', gridRow: 'span 2' }} />
      <Photo label="🏕️ Spring campout" />
      <Photo label="🪵 Whittling chip" />
      <Photo label="🏞️ Summit hike" style={{ gridColumn: 'span 2' }} />
      <Photo label="🎯 Range day" />
      <Photo label="🎤 Blue & Gold" />
      <Photo label="🚒 Fire station visit" />
      <Photo label="🥾 Service day" style={{ gridColumn: 'span 2' }} />
      <Photo label="🍂 Fall hike" />
      <Photo label="🦅 Crossover" />
    </div>

    {/* short value props */}
    <div className="p-32 row gap-24" style={{ borderTop: '1.75px solid #1a1a1a' }}>
      <div className="col gap-8" style={{ flex: 1 }}>
        <div className="wf-hand wf-accent" style={{ fontSize: 38, lineHeight: 1 }}>1×</div>
        <div className="wf-hand" style={{ fontSize: 22 }}>weekly pack mtg</div>
        <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>Mondays 6:30pm at the Lodge.</div>
      </div>
      <div className="col gap-8" style={{ flex: 1 }}>
        <div className="wf-hand wf-accent" style={{ fontSize: 38, lineHeight: 1 }}>10+</div>
        <div className="wf-hand" style={{ fontSize: 22 }}>big events / year</div>
        <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>Campouts, derby, service, more.</div>
      </div>
      <div className="col gap-8" style={{ flex: 1 }}>
        <div className="wf-hand wf-accent" style={{ fontSize: 38, lineHeight: 1 }}>$175</div>
        <div className="wf-hand" style={{ fontSize: 22 }}>annual dues</div>
        <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>Scholarships available, just ask.</div>
      </div>
      <div className="col gap-8" style={{ flex: 1 }}>
        <div className="wf-hand wf-accent" style={{ fontSize: 38, lineHeight: 1 }}>K–5</div>
        <div className="wf-hand" style={{ fontSize: 22 }}>all kids welcome</div>
        <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>Boys and girls.</div>
      </div>
    </div>

    {/* events teaser */}
    <div className="p-32 col gap-16" style={{ borderTop: '1.75px solid #1a1a1a', background: 'rgba(0,0,0,.04)' }}>
      <h2 className="wf-h2">Up next</h2>
      <div className="row gap-16">
        <EventCard date="SAT MAY 24" title="Pinewood Derby" meta="9am · Lodge Hall" tag="Pack" />
        <EventCard date="FRI JUN 6" title="Family Campout" meta="Fri–Sun" tag="Overnight" />
        <EventCard date="MON JUN 9" title="Pack Meeting" meta="6:30pm" tag="Weekly" />
      </div>
    </div>

    {/* big join */}
    <div className="p-32 center col gap-12" style={{ background: 'var(--accent)', color: '#fff', textAlign: 'center' }}>
      <h2 className="wf-h2" style={{ color: '#fff', fontSize: 48 }}>Your kid's next adventure is one click away.</h2>
      <Btn style={{ background: '#fff', color: 'var(--accent)', fontSize: 26, padding: '12px 28px' }}>Join Pack 351 →</Btn>
      <span className="wf-scribble" style={{ fontSize: 14, opacity: .85 }}>Or come check out a meeting first — drop in anytime.</span>
    </div>

    <Footer />
  </div>
);

// ─────────────────────────────────────────────────────────
// D. Storybook / Adventure Narrative — long scroll
// ─────────────────────────────────────────────────────────
const HomeD = () => (
  <div className="wf col" style={{ width: W }}>
    <div className="p-20" style={{ borderBottom: '1.75px solid #1a1a1a' }}>
      <Nav current="Home" />
    </div>

    {/* chapter 1 — intro */}
    <div className="row p-32 gap-24" style={{ alignItems: 'center' }}>
      <div className="col gap-12" style={{ flex: 1.1 }}>
        <span className="wf-eyebrow">CHAPTER ONE</span>
        <h1 className="wf-h1" style={{ fontSize: 64 }}>Every Cub Scout<br/>has a story.</h1>
        <div className="wf-hand" style={{ fontSize: 22, color: '#444' }}>
          And it usually starts with mud on the boots, a flashlight, and a really
          good s'more. Here's what a year with Pack 351 looks like.
        </div>
        <div className="row gap-12" style={{ marginTop: 8 }}>
          <Btn primary>Start your story →</Btn>
          <Btn ghost>Skim it ↓</Btn>
        </div>
      </div>
      <Photo label="kid w/ flashlight, dusk" h={340} w={420} rotate={2} />
    </div>

    {/* chapter 2 — fall */}
    <div className="row p-32 gap-24" style={{ background: '#e8efe6', borderTop: '1.75px solid #1a1a1a', borderBottom: '1.75px solid #1a1a1a', alignItems: 'center' }}>
      <Photo label="🍂 fall hike" h={300} w={380} rotate={-2} />
      <div className="col gap-12" style={{ flex: 1 }}>
        <span className="wf-eyebrow">CHAPTER TWO · FALL</span>
        <h2 className="wf-h2" style={{ fontSize: 44 }}>We learn the woods.</h2>
        <Lines count={3} />
        <div className="row gap-6">
          <Chip>hikes</Chip><Chip>first campout</Chip><Chip>compass</Chip><Chip>knife safety</Chip>
        </div>
      </div>
    </div>

    {/* chapter 3 — winter */}
    <div className="row p-32 gap-24" style={{ alignItems: 'center' }}>
      <div className="col gap-12" style={{ flex: 1 }}>
        <span className="wf-eyebrow">CHAPTER THREE · WINTER</span>
        <h2 className="wf-h2" style={{ fontSize: 44 }}>We build (and race) something.</h2>
        <Lines count={3} />
        <div className="row gap-6">
          <Chip>pinewood derby</Chip><Chip>workshops</Chip><Chip>blue & gold banquet</Chip>
        </div>
      </div>
      <Photo label="🏁 derby cars on track" h={300} w={380} rotate={2} />
    </div>

    {/* chapter 4 — spring */}
    <div className="row p-32 gap-24" style={{ background: '#efe6d6', borderTop: '1.75px solid #1a1a1a', borderBottom: '1.75px solid #1a1a1a', alignItems: 'center' }}>
      <Photo label="🏕️ spring campout" h={300} w={380} rotate={-2} />
      <div className="col gap-12" style={{ flex: 1 }}>
        <span className="wf-eyebrow">CHAPTER FOUR · SPRING</span>
        <h2 className="wf-h2" style={{ fontSize: 44 }}>We get really, really muddy.</h2>
        <Lines count={3} />
        <div className="row gap-6">
          <Chip>family campout</Chip><Chip>fishing</Chip><Chip>service day</Chip>
        </div>
      </div>
    </div>

    {/* small calendar peek */}
    <div className="p-32 col gap-16" style={{ borderTop: '1.75px solid #1a1a1a' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h2 className="wf-h2">…and right now, this is happening:</h2>
        <span className="wf-pill">Full calendar →</span>
      </div>
      <div className="row gap-16">
        <EventCard date="SAT MAY 24" title="Pinewood Derby" meta="9am · Lodge Hall" tag="Pack" />
        <EventCard date="FRI JUN 6" title="Family Campout" meta="Fri–Sun" tag="Overnight" />
        <EventCard date="MON JUN 9" title="Pack Meeting" meta="6:30pm" tag="Weekly" />
      </div>
    </div>

    {/* epilogue */}
    <div className="p-32 center col gap-12" style={{ background: 'var(--accent)', color: '#fff', textAlign: 'center' }}>
      <span className="wf-eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>EPILOGUE</span>
      <h2 className="wf-h2" style={{ color: '#fff', fontSize: 48 }}>Want your kid in the next chapter?</h2>
      <Btn style={{ background: '#fff', color: 'var(--accent)' }}>Join Pack 351 →</Btn>
    </div>

    <Footer />
  </div>
);

Object.assign(window, { HomeA, HomeB, HomeC, HomeD });
