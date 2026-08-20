import React from 'react';
import SiteFooter from '../components/SiteFooter';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import FormEmbed from '../components/FormEmbed';
import { asset, pageHref } from '../asset';
import { JOIN_FORM_ID, BEASCOUT_REGISTER_URL } from '../routes.js';

const CONTACT_EMAIL = 'txcspack351@gmail.com';
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Joining Pack 351')}` +
  `&body=${encodeURIComponent(
    "Hi! We'd like to learn about joining Pack 351.\n\n" +
    "Scout's name:\nScout's grade:\nParent name:\nBest phone (optional):\n"
  )}`;

// The Pack's own interest form, recovered from the old Google Sites joining page where it was
// embedded rather than linked - which is why the 2026-08-15 content audit missed it. Responses
// land in the Pack's Google account, so if it ever stops working that's a Google-side fix, not
// a code one.
const INTEREST_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSebpfiiOkjATRM82sql_qjqakCm2iDDT7Fmywpu1_so7iL8qA/viewform';
// The old Google Sites page embedded this same form at 1392, but that clips Google's own
// "Never submit passwords" footer and leaves the frame with an internal scrollbar, so this runs
// slightly taller. Re-measure if questions are added or removed - the whole form has to fit,
// footer included, or families get a scrollbar inside a scrollbar.
// Unlike the candy cane order form there's no open/closed flag here: this one stays open year
// round. If it ever does get closed, the embed will read "no longer accepting responses" with
// nothing explaining why, so add a status banner like the candy canes page has.
const FORM_HEIGHT = 1490;

// Scouting America's general join page (scouting.org/join redirects here): what scouts do,
// programs by age, fees FAQ, and a ZIP unit finder. Distinct from BEASCOUT_REGISTER_URL in
// routes.js, which is our pack's own registration. Linked directly because the scouting.org
// redirect adds a hop and sits behind a bot challenge.
const BEASCOUT_HOME_URL = 'https://beascout.scouting.org/';

export default function JoinPage() {
  return (
    <div>
      <PageHero
        eyebrow="Join Pack 351"
        title="Let's get your scout started."
        sub="Drop in to any Tuesday meeting, send us a quick email, or leave your details on our interest form — a leader will walk your family through the next steps. When you're ready, register with us online. Nothing to pay to come and look."
        image={asset('/photos/photo-camping.jpg')}
        imageAlt="Cub Scouts sitting around a campsite in a grassy meadow"
      />

      {/* Get started + sidebar */}
      <div className="section" id="ways-to-join">
        <div className="container">
          <div className="join-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'start' }}>

            {/* Ways to join. The first three are ways to reach us and can be taken in any
                order; the fourth is the official registration, which is where families end up
                once they've decided - hence the "when you're ready" framing rather than
                "pick whichever is easiest". */}
            <div>
              <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 32, color: 'var(--navy)', marginBottom: 16 }}>
                Four easy ways to join
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 28 }}>
                Start with whichever of the first three is easiest — however you reach us, we'll
                help you with everything: your scout's den, gear, cost, and when to show up. The
                last one is the official registration, for when you're ready to make it formal.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card" style={{ padding: 22 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 6 }}>
                    1 · Drop in to a meeting
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>
                    Most Tuesday nights, 6:00–7:00 PM at Central Baptist Church in Lindale. No sign-up
                    needed. Just show up and see if it's a fit.
                  </p>
                  <a className="btn btn-ghost" href={pageHref('events')}>See what we do →</a>
                </div>

                <div className="card" style={{ padding: 22 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 6 }}>
                    2 · Email us
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>
                    Tell us your scout's grade and we'll reply with everything you need to get started.
                    No payment now. We'll cover dues and gear when you're ready.
                  </p>
                  <a className="btn btn-primary btn-lg" href={MAILTO}>
                    Email us to get started →
                  </a>
                </div>

                <div className="card" style={{ padding: 22 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 6 }}>
                    3 · Fill out the interest form
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>
                    Leave your name, your scout's grade, and how you'd like to be reached. A leader
                    follows up with information about events and how to join. It also asks whether
                    you'd like to help out — "maybe" is a perfectly good answer.
                  </p>
                  {/* A real fragment link now that the hash is no longer the router, and the
                      form is in the HTML at parse time, so the browser's own scroll handles it. */}
                  <a className="btn btn-ghost" href={`#${JOIN_FORM_ID}`}>Go to the form ↓</a>
                </div>

                {/* The one card that actually enrols a scout. It leaves the site for Scouting
                    America, and the note is deliberate: the link bounces to a my.Scouting sign-in
                    that never mentions Pack 351, so being told to expect that beats meeting it
                    cold. The unit is ours - see BEASCOUT_REGISTER_URL in routes.js. */}
                <div className="card" style={{ padding: 22 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 6 }}>
                    4 · Register officially
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>
                    Ready to make it official? This goes straight to Pack 351 on Scouting America's
                    site, where you'll register your scout and pay the national and council fees.
                    You'll be asked to sign in or create a my.Scouting account first. No need to do
                    this before your first visit.
                  </p>
                  <a className="btn btn-primary" href={BEASCOUT_REGISTER_URL}
                     target="_blank" rel="noopener noreferrer">
                    Register with Pack 351 →
                  </a>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginTop: 14, marginBottom: 0 }}>
                    Brand new to Scouting? Scouting America's{' '}
                    <a href={BEASCOUT_HOME_URL} target="_blank" rel="noopener noreferrer"
                       style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}>
                      Be A Scout
                    </a>{' '}
                    site explains what scouts do, the programs for every age, and what it costs.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div id="questions" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '💸', title: "What does it cost?", body: "Scouting America's national fee is $85/year, plus an East Texas Area Council fee. That covers registration, the awards your scout earns, a Pinewood Derby kit, a Raingutter Regatta boat kit, and insurance for official Scouting events. The Pack charges no dues of its own. Uniform and camping food are the only other costs. Scholarships are available, and no scout is ever turned away for finances." },
                { icon: '📅', title: "When do we meet?", body: 'Most Tuesday nights, 6:00–7:00 PM at Central Baptist Church in Lindale.' },
                { icon: '👀', title: "Can we visit before joining?", body: "Absolutely. Drop in to any Tuesday meeting. No sign-up needed. Just show up and see if it's a fit." },
                { icon: '👕', title: "Do we need a uniform right away?", body: "Nope. Wear whatever for the first meeting. We'll walk you through exactly what to get, and often have gently used gear available." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 19, color: 'var(--navy)', marginBottom: 6 }}>{title}</div>
                      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Full width rather than inside the column above: the form is natively 640px and the
          left column is only ~650px at the widest, which leaves it cramped from 900px down.
          The sticky nav is cleared by scroll-padding-top on <html> in styles.css, which does
          the same job for every anchor on the site.

          The id comes from routes.js because it's a published URL, not a local detail: every
          "Join" button on the site lands here, and so does go.pack351tx.org/join. */}
      <div className="section" id={JOIN_FORM_ID} style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            eyebrow="Interest form"
            title="Tell us about your scout"
            sub="Thanks for your interest in our Pack! We'll reach out with information about events and how to join."
          />
          <FormEmbed
            url={INTEREST_FORM_URL}
            title="Pack 351 Interest Form"
            height={FORM_HEIGHT}
            loading="eager"
          />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
