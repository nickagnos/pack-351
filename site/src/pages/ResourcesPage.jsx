import React from 'react';
import SiteFooter from '../components/SiteFooter';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import { asset, pageHref } from '../asset';
import { BEASCOUT_REGISTER_URL } from '../routes.js';

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
    name: 'Register with Pack 351',
    note: "Scouting America's official registration for our pack. You'll need a my.Scouting account — it asks you to sign in or create one first",
    kind: 'web',
    href: BEASCOUT_REGISTER_URL,
  },
  {
    name: 'Annual Health & Medical Record',
    note: 'Parts A & B for every Scout, yearly. Part C needs a doctor and is only for resident camp. Background and FAQ at scouting.org/health-and-safety/ahmr',
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
  // The four below were on the old Google Sites page and were lost in the rebuild.
  {
    name: 'Pinewood Derby rules',
    note: 'Official car specs and race rules. Read before you start cutting',
    kind: 'web',
    href: 'https://www.scoutshop.org/pwd-rules',
  },
  {
    name: 'Cub Scout uniform guide',
    note: "Scouting America's own guide to what goes where, rank by rank",
    kind: 'web',
    href: 'https://www.scouting.org/programs/cub-scouts/cub-scout-uniform/',
  },
  {
    name: 'Council event registration',
    note: 'Sign up for East Texas Area Council camps and district events',
    kind: 'web',
    href: 'https://scoutingevent.com/?OrgKey=BSA585',
  },
  {
    name: 'New family Welcome Packet',
    note: "What to expect in your first months of Cub Scouting. Good to read before you join. Large file (9 MB), so use wifi",
    kind: 'pdf',
    href: 'https://www.scouting.org/wp-content/uploads/2023/07/512-73523WelcomeNewCSFamily_WEB.pdf',
  },
  {
    name: 'Family Talent Survey',
    note: 'Tell us what you can help with. Every parent has something the Pack needs',
    kind: 'web',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScmC5-pxZ7VKXeuQZ0srvcCO5ZJxrxoaFvMFMZaTD7KcU9Ewg/viewform',
  },
];

// Most of the policy detail below (camping rules, the school-closure rule, snacks, pack trips,
// the volunteer roles) was recovered from the Pack's old Google Sites FAQ, which the rebuild
// had dropped. Two answers here previously contradicted it and have been corrected: parents
// are required to stay at meetings, not merely welcome, and the belt and hat are required
// uniform parts rather than optional.
const FAQS = [
  { q: "What does my scout actually do at a pack meeting?",
    a: "Every meeting has an opening ceremony, den time (scouts work on rank adventures with their leader), and a closing. Most meetings include a hands-on activity or game. It's structured but fun, about 45–60 minutes. We meet three to four times a month, most Tuesdays." },
  { q: "How much does it cost, and what if we can't afford it?",
    a: "Scouting America's national fee is $85/year, plus a fee from the East Texas Area Council. That covers registration, the awards your scout earns, a Pinewood Derby car kit, a Raingutter Regatta boat kit, and insurance for all official Scouting events. Pack 351 charges no dues of its own, which keeps us among the most affordable packs around. Uniform and camping food are the only other costs. If money is a barrier, just ask — we have scholarships, it stays confidential, and no scout is ever turned away." },
  { q: "Do parents have to stay at meetings?",
    a: "Yes. Scouting is a family program, and a parent or guardian is expected to stay for the whole meeting, for every age group. You'll help your scout and pitch in with the other parents to keep the den running. Pack meetings are for the whole family." },
  { q: "When does my scout get to go camping, and what are the rules?",
    a: "We camp about twice a year. Kindergarten through 3rd grade go family camping, where a parent comes along, at BSA-approved or council-run camps. Webelos may camp as a den, but each scout still needs a parent or guardian there — if that's impossible, guardianship can be transferred in writing to another parent on the trip, though not to the den or pack leader running it. Arrow of Light dens can camp with a Scouts BSA troop as part of their rank requirements, again with a parent present. Camping is encouraged but never required, and we always need adult volunteers for overnights." },
  { q: "What do we actually need for the uniform?",
    a: "Scouts are uniformed from the waist up, so what you buy is the hat, the blue Cub Scout shirt, and the belt. Neckerchiefs and slides are gifted to scouts at the end-of-year advancement ceremony when they earn their next rank, so don't buy those. Pants and shorts are optional. Don't buy anything before your first meeting — we'll walk you through exactly what your scout needs and often have gently used gear to share." },
  { q: "Can both boys and girls join? How old do they need to be?",
    a: "Yes! Cub Scouts has welcomed all genders since 2018. It's for kids in Kindergarten through 5th grade, roughly ages 5 to 10. A youth older than 10 who has finished 5th grade can't join Cub Scouts, but may be eligible for Scouts BSA. Citizenship isn't required for youth or adults; families living outside the US can find their national Scouting organization at scout.org." },
  { q: "My kid has an allergy or accommodation. Is that okay?",
    a: "Definitely, yes. The Cub Scout program adapts to a wide range of needs, and there are training materials to help leaders do it well. Please tell your den leader and the Cubmaster what we need to know so we're ready to support your scout properly." },
  { q: "What about holidays and bad weather?",
    a: "Rule of thumb: if school is closed for the day, or closes early because of weather, we don't meet. There are one or two other dates each year that experience says aren't worth holding — the day before Thanksgiving, for one. You'll hear about those ahead of time." },
  { q: "Are there snacks?",
    a: "Each den decides for itself, and most run a rotating list — one family brings a snack each week, so over a school year your turn comes around once or twice. Nothing fancy. A juice box and a shared bag of pretzels is exactly right. Find a sale and stock up." },
  { q: "What are Pack trips?",
    a: "Things the whole family does together outside the weekly meetings — a bowling night, a skating party, marching in a parade, sometimes building a float. We're limited mostly by imagination, and the one rule is that it has to be fun." },
  { q: "How is Pack 351 organized? Who's in charge?",
    a: "The Cubmaster leads pack-wide meetings and den leaders run each den — ideally two leaders per den plus a rotating parent assistant. A Pack Committee of parent volunteers handles finances, events, and logistics, alongside the chartered organization representative. There's also a uniform coordinator who quietly helps families who need it." },
  { q: "How can I help? I've never done anything like this.",
    a: "Every parent has something worth sharing, and it doesn't have to be leading a den — running one activity at a campout, setting up tables, or helping clean up all count. Leader manuals, apps, and training make stepping up easier than it looks, and there are monthly Roundtable meetings where leaders swap ideas. As we say: many hands make light work. Tell any leader you're interested, or fill in the Family Talent Survey linked above." },
  { q: "What's the real time commitment?",
    a: "Most families spend 1–2 hours per week on meetings. Big events like campouts and the derby require more, but they're entirely optional. We work hard to make every hour worth it." },
];

// Ordered by what actually blocks a scout, not by how easy each one is. The medical form comes
// before the Scouting app because a den leader needs Parts A & B on file before your scout goes
// anywhere; the app is a convenience. `n` is the number in the circle and the React key, so it
// has to be edited alongside any reordering - the array position alone doesn't drive it.
const NEW_STEPS = [
  { n: '1', title: 'Come to your first meeting', body: "Show up any Tuesday at 6:00 PM at Central Baptist Church. No paperwork, no uniform. Just you and your scout. We'll take it from there. The Welcome Packet linked above is a good read beforehand if you like knowing what you're walking into." },
  { n: '2', title: 'Register online', body: (
    <>
      After your visit,{' '}
      <a href={BEASCOUT_REGISTER_URL} target="_blank" rel="noopener noreferrer"
         style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}>
        register your scout with Pack 351
      </a>{' '}
      — that link goes straight to our pack on Scouting America's site. You'll pay the national
      and council fees through the BSA portal. While you're at it, fill in the Family Talent
      Survey linked above so we know what you'd enjoy helping with.
    </>
  ) },
  { n: '3', title: "Get your scout's shirt",    body: "Order the hat, blue Cub Scout shirt, and belt from ScoutShop.org, or pick them up at the East Texas Area Council Scout Shop in Tyler. The shirt is the only thing you truly need on day one. We'll help you with patches at your next meeting." },
  { n: '4', title: 'Complete the medical form', body: "Download and fill out Parts A & B of the Annual Health & Medical Record. Your den leader needs this on file. Grab it from the links at the top of this page." },
  { n: '5', title: 'Download the Scouting app', body: 'The free Scouting America app has your scout\'s handbook, advancement tracker, and event notifications. Available on iOS and Android.' },
];

export default function ResourcesPage() {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Everything in one place."
        sub={'Links, forms, FAQs, the uniform guide. Bookmark this page. It answers 95% of new family questions and saves a lot of "quick question" emails.'}
        image={asset("/photos/photo-handbook.jpg")}
        imageAlt="Cub Scouts and parents working through an activity together at a table"
      />

      {/* Everything below used to sit behind a four-tab switcher. It's now stacked, with
          alternating cream/white backgrounds doing the work the tab bar used to do:
          telling you where one topic ends and the next begins. */}

      {/* LINKS */}
      <div className="section" id="links">
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
              {/* Derby rules used to be an "email us" - they're linked in the grid above now. */}
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>
                Need help with fees, or not sure where to start? Just email{' '}
                <a href="mailto:txcspack351@gmail.com" style={{ color: 'var(--navy)' }}>txcspack351@gmail.com</a>{' '}
                and we'll sort you out. No Scout is ever turned away over money.
              </p>
        </div>
      </div>

      {/* UNIFORM */}
      <div className="section" id="uniform" style={{ background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
              <SectionHeader eyebrow="What to wear" title="The Cub Scout uniform" sub="Scouts are uniformed from the waist up. Here's what you buy, what's optional, what you never need to buy, and a few money-saving tips." />
              <div className="uniform-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                <div>
                  {/* Hat and belt belong in Required - the Pack uniforms scouts waist-up, which
                      is what the old site spelled out. They were listed as optional here. */}
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 24, color: 'var(--navy)', marginBottom: 14 }}>Required</h3>
                  {['Blue Cub Scout shirt (with rank badge)', 'Cub Scout hat (matches your scout’s den)', 'Scout belt & buckle', 'Pack 351 numeral patch', 'BSA patch (left shoulder)', 'Council shoulder patch'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                      <span style={{ fontSize: 15 }}>{item}</span>
                    </div>
                  ))}
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 24, color: 'var(--navy)', margin: '28px 0 14px' }}>Optional (but nice)</h3>
                  {['Blue Cub Scout pants / shorts', 'Activity shirt (for events)'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)', flexShrink: 0 }} />
                      <span style={{ fontSize: 15, color: 'var(--muted)' }}>{item}</span>
                    </div>
                  ))}
                  {/* Called out separately so nobody buys one: these are earned, not purchased. */}
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 24, color: 'var(--navy)', margin: '28px 0 14px' }}>Don’t buy — these are gifts</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                    Neckerchiefs and slides are given to scouts at the end-of-year advancement
                    ceremony when they earn their next rank. Save your money.
                  </p>
                </div>
                <div>
                  <div className="card" style={{ padding: 24, background: 'var(--gold-light)', border: '1px solid #fde68a' }}>
                    <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 14 }}>💡 Pro tips from Pack 351</div>
                    {[
                      "Don't buy anything before your first meeting. We'll tell you exactly what your scout needs.",
                      "We often have gently used uniforms available from families whose scouts have aged out. Just ask!",
                      "ScoutShop.org has everything, or visit the East Texas Area Council Scout Shop at 1331 E. 5th Street in Tyler, across from Tyler Junior College. Tell them your scout's den level and Pack 351 and they'll sort you out.",
                      "The shirt is the only thing you truly need on day one. Iron-on patches work fine; sewn patches last longer but aren't required.",
                      "If a uniform is a financial stretch, speak to our uniform coordinator or any pack leader. We'll help, and it stays confidential.",
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
      <div className="section" id="new-families">
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

      {/* BAND — moved above the FAQ. It follows "Your first 30 days" because it's the last
          thing a newly-settled family needs: the checklist gets them registered and kitted
          out, this is how the Pack then actually talks to them. Below thirteen FAQ entries it
          was the last thing anyone found. The FAQ closes the page now.

          No bottom rule: it used to carry a 3px gold one purely to separate this navy block
          from the navy-dark footer directly beneath it, which would otherwise have read as one
          slab of blue. Against the white FAQ that problem doesn't exist, and the rule would
          have stacked on top of the FAQ's own borderTop. */}
      <div id="band" style={{
        background: 'var(--navy)', padding: 'clamp(44px,6vw,68px) 0',
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

      {/* FAQ */}
      <div className="section" id="faq" style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
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
                  <a className="btn btn-navy btn-sm" href={pageHref('join')}>Join &amp; we'll reach out</a>
                </div>
              </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
