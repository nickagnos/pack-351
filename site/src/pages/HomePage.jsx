import React from 'react';
import SiteFooter from '../components/SiteFooter';
import PhotoSlot from '../components/PhotoSlot';
import SectionHeader from '../components/SectionHeader';
import EventRow from '../components/EventRow';

export default function HomePage({ go }) {
  return (
    <div>
      {/* Tagline strip */}
      <div style={{ background: 'var(--cream)', padding: '56px 0 44px' }}>
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 12 }}>Pack 351 · Lindale, TX</span>
          <h1 style={{
            fontFamily: 'Barlow Condensed', fontWeight: 800, lineHeight: 1,
            fontSize: 'clamp(52px,7vw,96px)', color: 'var(--navy)', marginBottom: 18,
          }}>
            We build<br />
            memories<br />
            <span style={{ color: 'var(--gold)' }}>outside.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 500, marginBottom: 28, lineHeight: 1.65 }}>
            Cub Scouts for kids in Kindergarten through 5th grade — right here in Lindale.
            Here's a year with Pack 351:
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-navy btn-lg" onClick={() => go('join')}>Join Our Pack →</button>
            <button className="btn btn-ghost" onClick={() => go('events')}>See what's coming up</button>
          </div>
        </div>
      </div>

      {/* Activity photo grid */}
      <div style={{ background: '#fff', paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div
            className="home-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 200px)',
              gap: 8,
            }}
          >
            <PhotoSlot
              src="/photos/photo-camping.jpg"
              alt="Scouts on a family camping trip"
              label="photo: family camping"
              caption="Family Camping"
              bg="#7a9ebd"
              captionSize={26}
              style={{ gridColumn: '1 / span 2', gridRow: '1 / span 2', borderRadius: '8px 0 0 0' }}
            />
            <PhotoSlot
              src="/photos/photo-pinewood-derby.jpg"
              alt="Pinewood Derby cars on the track"
              label="photo: pinewood derby cars on track"
              caption="Pinewood Derby"
              bg="#c9a86c"
              style={{ borderRadius: '0 8px 0 0' }}
            />
            <PhotoSlot
              src="/photos/photo-regatta.jpg"
              alt="Raingutter Regatta boats racing"
              label="photo: raingutter regatta boats racing"
              caption="Raingutter Regatta"
              bg="#6a9fb5"
            />
            <PhotoSlot
              src="/photos/photo-hiking.jpg"
              alt="Scouts hiking a trail"
              label="photo: hiking trail with scouts"
              caption="Hiking & Trails"
              bg="#7faa7a"
              style={{ borderRadius: '0 0 0 8px' }}
            />
            <PhotoSlot
              src="/photos/photo-candy-cane.jpg"
              alt="Candy cane fundraiser in Hideaway"
              label="photo: candy cane fundraiser in Hideaway"
              caption="Candy Cane Fundraiser"
              bg="#b87878"
            />
            <PhotoSlot
              src="/photos/photo-blue-gold.jpg"
              alt="Blue and Gold Banquet"
              label="photo: blue & gold banquet"
              caption="Blue & Gold Banquet"
              bg="#9a88c4"
              style={{ borderRadius: '0 0 8px 0' }}
            />
          </div>
        </div>
      </div>

      {/* Quick facts bar */}
      <div style={{ background: 'var(--navy)', padding: '36px 0' }}>
        <div className="container">
          <div className="facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              { icon: '📅', head: 'Most Mondays', sub: '6:30 – 7:30 PM' },
              { icon: '📍', head: 'Central Baptist Church', sub: 'Lindale, TX' },
              { icon: '🎓', head: 'Kindergarten – 5th Grade', sub: 'Boys & girls welcome' },
              { icon: '💰', head: '$175 / year', sub: 'Scholarships available' },
            ].map(({ icon, head, sub }) => (
              <div key={head} style={{ textAlign: 'center', padding: '4px 8px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 19, color: '#fff', marginBottom: 4 }}>{head}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming events */}
      <div className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <SectionHeader eyebrow="What's coming up" title="Upcoming adventures" />
            <button className="btn btn-ghost btn-sm" onClick={() => go('events')}>Full calendar →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <EventRow month="Jun" day="2" title="Pack Meeting" time="6:30–7:30 PM" location="Central Baptist Church" tag="Weekly" />
            <EventRow month="Jul" day="14" title="Summer Campout" time="Fri–Sun · Camp Pirtle" location="Lindale, TX" tag="Overnight" tagBg="var(--navy)" />
            <EventRow month="Oct" day="11" title="Raingutter Regatta" time="10:00 AM" location="Central Baptist Church" tag="Pack-wide" tagBg="#0369a1" />
            <EventRow month="Dec" day="6" title="Candy Cane Fundraiser" time="All day" location="Hideaway Community" tag="Fundraiser" tagBg="var(--gold-dark)" />
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="btn btn-ghost" onClick={() => go('events')}>See all events</button>
          </div>
        </div>
      </div>

      {/* Join CTA banner */}
      <div style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 16, display: 'block' }}>Ready to get started?</span>
          <h2 style={{
            fontFamily: 'Barlow Condensed', fontWeight: 800,
            fontSize: 'clamp(36px,5vw,72px)', color: '#fff', lineHeight: 1, marginBottom: 20,
          }}>
            Your kid's next adventure<br />is one click away.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.7)', maxWidth: 500, margin: '0 auto 32px' }}>
            Open to all K–5th graders. Drop in to any Monday meeting first if you'd like — no pressure.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => go('join')}>Sign Up for Pack 351</button>
            <button className="btn btn-ghost-white" onClick={() => go('events')}>Come to a meeting first</button>
          </div>
        </div>
      </div>

      <SiteFooter go={go} />
    </div>
  );
}
