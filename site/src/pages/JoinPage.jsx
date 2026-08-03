import React from 'react';
import SiteFooter from '../components/SiteFooter';
import PageHero from '../components/PageHero';
import { asset } from '../asset';

const CONTACT_EMAIL = 'txcspack351@gmail.com';
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Joining Pack 351')}` +
  `&body=${encodeURIComponent(
    "Hi! We'd like to learn about joining Pack 351.\n\n" +
    "Scout's name:\nScout's grade:\nParent name:\nBest phone (optional):\n"
  )}`;

export default function JoinPage({ go }) {
  return (
    <div>
      <PageHero
        eyebrow="Join Pack 351"
        title="Let's get your scout started."
        sub="No application, no payment up front. Drop in to any Monday meeting, or send us a quick email and a leader will walk your family through the next steps."
        image={asset('/photos/photo-camping.jpg')}
        imageAlt="Cub Scouts around a campfire"
      />

      {/* Get started + sidebar */}
      <div className="section">
        <div className="container">
          <div className="join-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'start' }}>

            {/* Two ways to join */}
            <div>
              <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 32, color: 'var(--navy)', marginBottom: 16 }}>
                Two easy ways to join
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 28 }}>
                There's no form to fill out. Come see us in person, or reach out and we'll help you
                with everything: your scout's den, gear, cost, and when to show up.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card" style={{ padding: 22 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 22, color: 'var(--navy)', marginBottom: 6 }}>
                    1 · Drop in to a meeting
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>
                    Most Monday nights, 6:30–7:30 PM at Central Baptist Church in Lindale. No sign-up
                    needed. Just show up and see if it's a fit.
                  </p>
                  <button className="btn btn-ghost" onClick={() => go('events')}>See what we do →</button>
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
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '💸', title: "What does it cost?", body: "$175/year covers dues, activity fees, and your scout's Handbook. Uniform is extra but we'll guide you. Scholarships are available, and no scout is ever turned away for finances." },
                { icon: '📅', title: "When do we meet?", body: 'Most Monday nights, 6:30–7:30 PM at Central Baptist Church in Lindale.' },
                { icon: '👀', title: "Can we visit before joining?", body: "Absolutely. Drop in to any Monday meeting. No sign-up needed. Just show up and see if it's a fit." },
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

      <SiteFooter go={go} />
    </div>
  );
}
