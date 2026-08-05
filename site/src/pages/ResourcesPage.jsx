import React from 'react';
import SiteFooter from '../components/SiteFooter';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import { asset } from '../asset';

// Every link here was checked on 2026-08-02, and each PDF was opened to confirm it is the
// document it claims to be (the old Part C link had been 404ing for who knows how long).
// `kind` drives the badge and icon: 'pdf' downloads a file, 'web' opens a site.
//
// Deliberately NOT linked: BSA's "Publicity Waiver and Release"
// (filestore.scouting.org/filestore/marketing/pdf/talent.pdf). It's a real national form,
// but it grants BSA a perpetual exclusive commercial licence over a child's likeness - not
// permission for the Pack to post photos here. Anyone adding a photo-release link later
// should write a Pack form instead. AHMR Part A already covers council and BSA use.
const LINKS = [
  {
    name: 'Annual Health & Medical Record',
    note: 'Parts A & B for every Scout, yearly. Part C needs a doctor and is only for resident camp',
    kind: 'pdf',
    href: 'https://filestore.scouting.org/filestore/HealthSafety/pdf/680-001_ABC.pdf',
  },
  {
    name: 'Activity Consent Form (permission slip)',
    note: 'A parent signs one per trip or outing. English & Spanish',
    kind: 'pdf',
    href: 'https://filestore.scouting.org/filestore/pdf/680-673.pdf',
  },
  {
    name: 'Campout Packing Checklist',
    note: 'Scouting America’s pack-overnighter gear list. Print it and tick things off',
    kind: 'pdf',
    href: 'https://filestore.scouting.org/filestore/pdf/34-49.pdf',
  },
  {
    name: 'my.Scouting account',
    note: 'Register your Scout, pay dues, and take Youth Protection Training',
    kind: 'web',
    href: 'https://my.scouting.org/',
  },
  {
    name: 'Scoutbook',
    note: 'Track your Scout’s adventures and rank progress online',
    kind: 'web',
    href: 'https://scoutbook.scouting.org/',
  },
  {
    name: 'Scout Shop',
    note: 'The blue shirt, patches, and Pinewood Derby kits. Official store',
    kind: 'web',
    href: 'https://www.scoutshop.org/',
  },
  {
    name: 'Cub Scout Adventures',
    note: 'What your Scout actually works on, rank by rank, Lion through Arrow of Light',
    kind: 'web',
    href: 'https://www.scouting.org/programs/cub-scouts/adventures/',
  },
  {
    name: 'East Texas Area Council',
    note: 'Our council in Tyler. Summer camps, district events, and financial assistance',
    kind: 'web',
    href: 'https://etacbsa.org/',
  },
];

const FAQS = [
  { q: "What does my scout actually do at a pack meeting?",
    a: "Every meeting has an opening ceremony, den time (scouts work on rank adventures with their leader), and a closing. Most meetings include a hands-on activity or game. It's structured but fun, about 45–60 minutes." },
  { q: "How much does it cost, and what if we can't afford it?",
    a: "$175/year covers BSA national dues, council fees, and your scout's Handbook. Uniform and special events are extra. If cost is a barrier, just ask. We have scholarships and no one is ever turned away for finances." },
  { q: "Do we have to camp? Do parents have to come?",
    a: "Camping is encouraged but never required. Parents are always welcome, and we actually need adult volunteers for overnights. Many parents say it's their favorite part of Scouting." },
  { q: "What do we actually need for the uniform?",
    a: "The blue Cub Scout shirt with your rank badge is the main piece. Pants, belt, and neckerchief are optional for most meetings. Don't buy anything before your first meeting. We'll walk you through it and often have used gear to share." },
  { q: "Can both boys and girls join?",
    a: "Yes! Cub Scouts has welcomed all genders since 2018. All kids in Kindergarten through 5th grade are welcome in Pack 351." },
  { q: "My kid has an allergy or accommodation. Is that okay?",
    a: "Absolutely. Let us know during sign-up and we'll make sure your den leader is informed. All scouts are welcome." },
  { q: "How is Pack 351 organized? Who's in charge?",
    a: "The Cubmaster leads pack-wide meetings. Den leaders run each den. A Pack Committee (parent volunteers) handles finances, events, and logistics. It's truly a community effort." },
  { q: "What's the real time commitment?",
    a: "Most families spend 1–2 hours per week on meetings. Big events like campouts and the derby require more, but they're entirely optional. We work hard to make every hour worth it." },
];

const NEW_STEPS = [
  { n: '1', title: 'Come to your first meeting', body: "Show up any Tuesday at 6:00 PM at Central Baptist Church. No paperwork, no uniform. Just you and your scout. We'll take it from there." },
  { n: '2', title: 'Register online',            body: "After your visit, register through BeAScout.org or our Join page. You'll pay annual dues ($175) through the BSA portal." },
  { n: '3', title: "Get your scout's shirt",    body: "Order a blue Cub Scout shirt from ScoutShop.org. That's all you need to start. We'll help you with patches at your next meeting." },
  { n: '4', title: 'Download the Scouting app', body: 'The free Scouting America app has your scout\'s handbook, advancement tracker, and event notifications. Available on iOS and Android.' },
  { n: '5', title: 'Complete the medical form', body: "Download and fill out Parts A & B of the Annual Health & Medical Record. Your den leader needs this on file. Grab it from the links at the top of this page." },
];

export default function ResourcesPage({ go }) {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Everything in one place."
        sub={'Links, forms, FAQs, the uniform guide. Bookmark this page. It answers 95% of new family questions and saves a lot of "quick question" emails.'}
        image={asset("/photos/photo-handbook.jpg")}
        imageAlt="A Cub Scout and a parent going through the handbook and forms at the kitchen table"
      />

      {/* Everything below used to sit behind a four-tab switcher. It's now stacked, with
          alternating cream/white backgrounds doing the work the tab bar used to do:
          telling you where one topic ends and the next begins. */}

      {/* LINKS */}
      <div className="section">
        <div className="container">
              <SectionHeader
                eyebrow="The useful stuff"
                title="Links & forms"
                sub="Everything a Pack 351 family needs, straight from Scouting America. Nothing here is hosted by us, so you always get the current version."
              />
              <div className="links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {LINKS.map(f => (
                  <div key={f.name} className="card" style={{ padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
                    {/* Badge says what's on the other end so the arrow isn't a surprise:
                        PDF downloads a file, WEB opens a site in a new tab. */}
                    <div style={{
                      width: 44, height: 52, background: 'var(--navy)', borderRadius: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'var(--gold)', fontFamily: 'Barlow Condensed',
                      fontWeight: 800, fontSize: 14,
                    }}>{f.kind === 'web' ? 'WEB' : 'PDF'}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 3 }}>{f.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{f.note}</div>
                    </div>
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                      style={{ flexShrink: 0 }}
                      aria-label={f.kind === 'web' ? `Open ${f.name} in a new tab` : `Download ${f.name} (PDF)`}
                    >{f.kind === 'web' ? '↗' : '↓'}</a>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>
                Looking for our Pinewood Derby or Regatta rules, or help with fees? Those are handled
                inside the Pack, so just email{' '}
                <a href="mailto:txcspack351@gmail.com" style={{ color: 'var(--navy)' }}>txcspack351@gmail.com</a>{' '}
                and we'll sort you out. No Scout is ever turned away over money.
              </p>
        </div>
      </div>

      {/* UNIFORM */}
      <div className="section" style={{ background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
              <SectionHeader eyebrow="What to wear" title="The Cub Scout uniform" sub="Here's what's actually needed, what's optional, and a few money-saving tips." />
              <div className="uniform-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                <div>
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 24, color: 'var(--navy)', marginBottom: 14 }}>Required</h3>
                  {['Blue Cub Scout shirt (with rank badge)', 'Pack 351 numeral patch', 'BSA patch (left shoulder)', 'Council shoulder patch'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                      <span style={{ fontSize: 15 }}>{item}</span>
                    </div>
                  ))}
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 24, color: 'var(--navy)', margin: '28px 0 14px' }}>Optional (but nice)</h3>
                  {['Blue Cub Scout pants / shorts', 'Scout belt & buckle', 'Neckerchief & slide', 'Activity shirt (for events)'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)', flexShrink: 0 }} />
                      <span style={{ fontSize: 15, color: 'var(--muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="card" style={{ padding: 24, background: 'var(--gold-light)', border: '1px solid #fde68a' }}>
                    <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 14 }}>💡 Pro tips from Pack 351</div>
                    {[
                      "Don't buy anything before your first meeting. We'll tell you exactly what your scout needs.",
                      "We often have gently used uniforms available from families whose scouts have aged out. Just ask!",
                      "ScoutShop.org has everything. The shirt is the only thing you need on day one.",
                      "Iron-on patches work fine. Sewn patches are more durable but not required.",
                    ].map((tip, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                        <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, color: 'var(--gold-dark)', flexShrink: 0 }}>{i + 1}.</span>
                        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
        </div>
      </div>

      {/* NEW FAMILIES */}
      <div className="section">
        <div className="container">
              <SectionHeader eyebrow="You're new here, welcome" title="Your first 30 days" sub="Five steps to get your scout settled in. Takes about a week." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {NEW_STEPS.map(s => (
                  <div key={s.n} style={{ display: 'flex', gap: 20 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'var(--navy)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 22,
                      flexShrink: 0,
                    }}>{s.n}</div>
                    <div className="card" style={{ flex: 1, padding: 20 }}>
                      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 8 }}>{s.title}</div>
                      <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, margin: 0 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section" style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
              <SectionHeader eyebrow="Common questions" title="Frequently asked" sub="If your question isn't here, just email our Cubmaster." />
              <div style={{ maxWidth: 800, display: 'flex', flexDirection: 'column' }}>
                {FAQS.map((f, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                      width: '100%', textAlign: 'left', padding: '20px 0',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}>
                      <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>{f.q}</span>
                      <span style={{
                        fontSize: 24, color: 'var(--gold)', flexShrink: 0,
                        transition: 'transform .2s',
                        transform: openFaq === i ? 'rotate(45deg)' : 'none',
                        display: 'inline-block',
                      }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ paddingBottom: 20 }}>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: 15, margin: 0 }}>{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 40, background: 'var(--navy-light)', borderRadius: 10,
                padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)' }}>Still have a question?</div>
                  <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>Our Cubmaster usually replies within a day.</div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href="mailto:txcspack351@gmail.com" className="btn btn-ghost btn-sm">Email Cubmaster</a>
                  <button className="btn btn-navy btn-sm" onClick={() => go('join')}>Join & we'll reach out</button>
                </div>
              </div>
        </div>
      </div>

      {/* Band closes the page: it's the one thing every family has to do, so it gets the
          last word and the only full-colour block. */}
      {/* Gold rule at the foot: this navy band sits directly on the navy-dark footer, and
          without it the two blocks read as one undifferentiated slab of blue. */}
      <div style={{
        background: 'var(--navy)', padding: 'clamp(44px,6vw,68px) 0',
        borderBottom: '3px solid var(--gold)',
      }}>
        <div className="container">
          <div className="band-grid" style={{
            display: 'grid', gridTemplateColumns: '1.15fr .85fr',
            gap: 'clamp(28px,5vw,56px)', alignItems: 'center',
          }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 12 }}>
                How we stay in touch
              </span>
              <h2 style={{
                fontFamily: 'Barlow Condensed', fontWeight: 800,
                fontSize: 'clamp(30px,3.4vw,46px)', color: '#fff', lineHeight: 1.05, marginBottom: 16,
              }}>
                The Pack runs on Band.
              </h2>
              <p style={{ color: 'rgba(255,255,255,.82)', lineHeight: 1.75, marginBottom: 14 }}>
                Band is a free group app, and it's where Pack 351 actually lives day to day.
                Meeting reminders, campout packing lists, last-minute weather calls, and all the
                photos from the weekend go there first. If a plan changes, it changes on Band.
              </p>
              <p style={{ color: 'rgba(255,255,255,.82)', lineHeight: 1.75 }}>
                Our group is private, so searching the app won't find us. Ask any leader for the
                invite link at your first meeting and we'll get you added the same night.
              </p>
            </div>

            <div className="card" style={{ padding: 26, background: '#fff' }}>
              <div style={{
                fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 21,
                color: 'var(--navy)', marginBottom: 6,
              }}>Get the app</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18 }}>
                Free on both stores. Search “BAND — App for all groups” by NAVER, or use these links.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="https://apps.apple.com/us/app/band-app-for-all-groups/id542613198"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-navy"
                  style={{ width: '100%' }}
                >Download for iPhone →</a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.nhn.android.band"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ width: '100%' }}
                >Download for Android →</a>
              </div>
              {/* Band is rated 13+, which surprises parents of K-5 kids. Say it up front. */}
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 16, lineHeight: 1.6 }}>
                Band is rated 13+, so accounts are for parents and leaders — not for your Scout.
                One parent per family is plenty.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter go={go} />
    </div>
  );
}
