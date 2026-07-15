import React from 'react';
import SiteFooter from '../components/SiteFooter';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import { asset } from '../asset';

const FORMS = [
  {
    name: 'Annual Health & Medical Record (A & B)',
    note: 'Required for all scouts — complete annually',
    href: 'https://filestore.scouting.org/filestore/HealthSafety/pdf/680-001_AB.pdf',
  },
  {
    name: 'Annual Health & Medical Record (C)',
    note: 'Required for overnight events',
    href: 'https://filestore.scouting.org/filestore/HealthSafety/pdf/680-001_C.pdf',
  },
  {
    name: 'Activity Permission Slip',
    note: 'Required per event — ask your den leader for the current form',
    href: null,
  },
  {
    name: 'Talent Release (Photo permission)',
    note: 'Optional — allows Pack to use photos',
    href: null,
  },
  {
    name: 'Scholarship Request',
    note: 'Confidential — no scout turned away',
    href: null,
  },
  {
    name: 'Pinewood Derby Car Rules',
    note: 'Read before you start building!',
    href: null,
  },
  {
    name: 'Raingutter Regatta Boat Rules',
    note: 'Official construction guidelines',
    href: null,
  },
  {
    name: 'Campout Packing Checklist',
    note: 'Printable checklist for families',
    href: null,
  },
];

const FAQS = [
  { q: "What does my scout actually do at a pack meeting?",
    a: "Every meeting has an opening ceremony, den time (scouts work on rank adventures with their leader), and a closing. Most meetings include a hands-on activity or game. It's structured but fun — about 45–60 minutes." },
  { q: "How much does it cost — and what if we can't afford it?",
    a: "$175/year covers BSA national dues, council fees, and your scout's Handbook. Uniform and special events are extra. If cost is a barrier, just ask — we have scholarships and no one is ever turned away for finances." },
  { q: "Do we have to camp? Do parents have to come?",
    a: "Camping is encouraged but never required. Parents are always welcome — we actually need adult volunteers for overnights. Many parents say it's their favorite part of Scouting." },
  { q: "What about the uniform — what do we actually need?",
    a: "The blue Cub Scout shirt with your rank badge is the main piece. Pants, belt, and neckerchief are optional for most meetings. Don't buy anything before your first meeting — we'll walk you through it and often have used gear to share." },
  { q: "Can both boys and girls join?",
    a: "Yes! Cub Scouts has welcomed all genders since 2018. All kids in Kindergarten through 5th grade are welcome in Pack 351." },
  { q: "My kid has an allergy or accommodation — is that okay?",
    a: "Absolutely. Let us know during sign-up and we'll make sure your den leader is informed. All scouts are welcome." },
  { q: "How is Pack 351 organized? Who's in charge?",
    a: "The Cubmaster leads pack-wide meetings. Den leaders run each den. A Pack Committee (parent volunteers) handles finances, events, and logistics. It's truly a community effort." },
  { q: "What's the real time commitment?",
    a: "Most families spend 1–2 hours per week on meetings. Big events like campouts and the derby require more, but they're entirely optional. We work hard to make every hour worth it." },
];

const NEW_STEPS = [
  { n: '1', title: 'Come to your first meeting', body: "Show up any Monday at 6:30 PM at Central Baptist Church. No paperwork, no uniform — just you and your scout. We'll take it from there." },
  { n: '2', title: 'Register online',            body: "After your visit, register through BeAScout.org or our Join page. You'll pay annual dues ($175) through the BSA portal." },
  { n: '3', title: "Get your scout's shirt",    body: "Order a blue Cub Scout shirt from ScoutShop.org — that's all you need to start. We'll help you with patches at your next meeting." },
  { n: '4', title: 'Download the Scouting app', body: 'The free Scouting America app has your scout\'s handbook, advancement tracker, and event notifications. Available on iOS and Android.' },
  { n: '5', title: 'Complete the medical form', body: "Download and fill out Parts A & B of the Annual Health & Medical Record. Your den leader needs this on file. Download it from the Forms tab." },
];

export default function ResourcesPage({ go }) {
  const [tab, setTab] = React.useState('forms');
  const [openFaq, setOpenFaq] = React.useState(null);

  const tabs = [
    { id: 'forms',        label: 'Forms & Docs' },
    { id: 'uniform',      label: 'Uniform Guide' },
    { id: 'new-families', label: 'New Families' },
    { id: 'faq',          label: 'FAQ' },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Everything in one place."
        sub={'Forms, FAQs, the uniform guide — bookmark this page. It answers 95% of new family questions and saves a lot of "quick question" emails.'}
        image={asset("/photos/photo-blue-gold.jpg")}
        imageAlt="Blue & Gold awards ceremony"
      />

      {/* Tab bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', position: 'sticky', top: 68, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 18,
              padding: '16px 22px', border: 'none', background: 'none', cursor: 'pointer',
              color: tab === t.id ? 'var(--navy)' : 'var(--muted)',
              borderBottom: tab === t.id ? '3px solid var(--gold)' : '3px solid transparent',
              transition: 'all .12s', whiteSpace: 'nowrap',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="section">
        <div className="container">

          {/* FORMS */}
          {tab === 'forms' && (
            <div>
              <SectionHeader eyebrow="Download & print" title="Forms & documents" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {FORMS.map(f => (
                  <div key={f.name} className="card" style={{ padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{
                      width: 44, height: 52, background: 'var(--navy)', borderRadius: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'var(--gold)', fontFamily: 'Barlow Condensed',
                      fontWeight: 800, fontSize: 14,
                    }}>PDF</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 3 }}>{f.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{f.note}</div>
                    </div>
                    {f.href ? (
                      <a
                        href={f.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                        style={{ flexShrink: 0 }}
                      >↓</a>
                    ) : (
                      <span
                        className="btn btn-ghost btn-sm"
                        style={{ flexShrink: 0, opacity: 0.4, cursor: 'default', pointerEvents: 'none' }}
                        title="Coming soon"
                      >↓</span>
                    )}
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>
                Pack-specific forms (permission slip, derby rules, etc.) will be posted here. Email{' '}
                <a href="mailto:nickagnos@gmail.com" style={{ color: 'var(--navy)' }}>nickagnos@gmail.com</a>{' '}
                if you need one now.
              </p>
            </div>
          )}

          {/* UNIFORM */}
          {tab === 'uniform' && (
            <div>
              <SectionHeader eyebrow="What to wear" title="The Cub Scout uniform" sub="Here's what's actually needed, what's optional, and a few money-saving tips." />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
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
          )}

          {/* NEW FAMILIES */}
          {tab === 'new-families' && (
            <div>
              <SectionHeader eyebrow="You're new here — welcome" title="Your first 30 days" sub="Five steps to get your scout settled in. Takes about a week." />
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
          )}

          {/* FAQ */}
          {tab === 'faq' && (
            <div>
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
                  <a href="mailto:nickagnos@gmail.com" className="btn btn-ghost btn-sm">Email Cubmaster</a>
                  <button className="btn btn-navy btn-sm" onClick={() => go('join')}>Join & we'll reach out</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <SiteFooter go={go} />
    </div>
  );
}
