import React from 'react';
import SiteFooter from '../components/SiteFooter';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import FormEmbed from '../components/FormEmbed';
import { asset } from '../asset';
import { JOIN_FORM_ID, BEASCOUT_REGISTER_URL, INTEREST_FORM_URL, INTEREST_FORM_HEIGHT } from '../routes.js';

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
        sub="Joining happens through Scouting America: create an account and register your scout with our direct link below. Want to learn more first? Leave your details on the interest form and a leader will reach out."
        image={asset('/photos/photo-camping.jpg')}
        imageAlt="Cub Scouts sitting around a campsite in a grassy meadow"
      />

      {/* Get started + sidebar */}
      <div className="section" id="ways-to-join">
        <div className="container">
          <div className="join-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'start' }}>

            {/* Two paths, and the labels are deliberate: "Join" is the real enrolment -
                creating a my.Scouting account and registering at Scouting America - and the
                interest form is "get info", never "join", because it doesn't enrol anyone. */}
            <div>
              <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 32, color: 'var(--navy)', marginBottom: 16 }}>
                Two ways to get started
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 28 }}>
                Joining Pack 351 happens through Scouting America — you create a my.Scouting
                account and register your scout at our direct Be A Scout link. Not ready to
                register yet? Leave your details on the interest form and a leader will reach
                out with everything you need.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* The card that actually enrols a scout. It leaves the site for Scouting
                    America, and the note is deliberate: the link bounces to a my.Scouting sign-in
                    that never mentions Pack 351, so being told to expect that beats meeting it
                    cold. The unit is ours - see BEASCOUT_REGISTER_URL in routes.js. */}
                <div className="card" style={{ padding: 22 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 6 }}>
                    1 · Join: register with Scouting America
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>
                    This is our pack's direct Be A Scout registration link. You'll create a
                    my.Scouting account (the sign-in screen won't mention Pack 351 — that's
                    normal), register your scout, and pay the national and council fees.
                  </p>
                  <a className="btn btn-primary" href={BEASCOUT_REGISTER_URL}
                     target="_blank" rel="noopener noreferrer">
                    Join Pack 351 →
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

                <div className="card" style={{ padding: 22 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 6 }}>
                    2 · Get info: fill out the interest form
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
              </div>
            </div>

            {/* Sidebar */}
            <div id="questions" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '💸', title: "What does it cost?", body: "Scouting America's national fee is $85/year, plus an East Texas Area Council fee. That covers registration, the awards your scout earns, a Pinewood Derby kit, a Raingutter Regatta boat kit, and insurance for official Scouting events. The Pack charges no dues of its own. Uniform and camping food are the only other costs. Scholarships are available, and no scout is ever turned away for finances." },
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
            height={INTEREST_FORM_HEIGHT}
            loading="eager"
          />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
