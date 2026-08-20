import React from 'react';
import SiteFooter from '../components/SiteFooter';
import PhotoSlot from '../components/PhotoSlot';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import QuickFacts from '../components/QuickFacts';
import { asset, pageHref } from '../asset';

// Official rank emblems from the Scouting America Brand Center (scouting.webdamdb.com).
// They ship as JPEGs on a white field, which is why they sit on the white `.card` with no
// treatment - the background disappears. Aspect ratios vary a lot (Arrow of Light is a wide
// rectangle, Webelos a tall oval, the rest square), so they're laid out with object-fit.
const dens = [
  { name: 'Lion',           grade: 'Kindergarten', img: '/ranks/lion.jpg' },
  { name: 'Tiger',          grade: '1st Grade',    img: '/ranks/tiger.jpg' },
  { name: 'Wolf',           grade: '2nd Grade',    img: '/ranks/wolf.jpg' },
  { name: 'Bear',           grade: '3rd Grade',    img: '/ranks/bear.jpg' },
  { name: 'Webelos',        grade: '4th Grade',    img: '/ranks/webelos.jpg' },
  { name: 'Arrow of Light', grade: '5th Grade',    img: '/ranks/arrow-of-light.jpg' },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title={<>A Pack built by<br />families, for families.</>}
        sub="Pack 351 is chartered by Central Baptist Church in Lindale, TX. We're parents, kids, and leaders who believe the best childhood memories are made outside, with a little mud on your boots."
        image={asset("/photos/photo-den-meeting.jpg")}
        imageAlt="Cub Scouts and a leader working on a project together around a table at a den meeting"
        actions={<a className="btn btn-primary" href={pageHref('join')}>Join Pack 351 →</a>}
      />
      <QuickFacts id="facts" />

      {/* Pack story */}
      <div className="section" id="story">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 12 }}>Our story</span>
              <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 'clamp(28px,3vw,44px)', color: 'var(--navy)', marginBottom: 20 }}>
                Lindale Scouts,<br />through and through.
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
                Pack 351 has been part of the Lindale community for years, meeting at Central Baptist Church and
                doing the things that make Scouting worth it: camping under East Texas stars, building and racing
                pinewood derby cars, sailing balsa boats down rain gutters, and leaving places better than we found them.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
                Every December you'll find our Scouts planting hundreds of five-foot candy canes in
                yards across the Hideaway community. It's become one of our most beloved traditions,
                and a great fundraiser for the Pack.
              </p>
              <a className="btn btn-ghost btn-sm" href={pageHref('candy-canes')}>
                Order candy canes →
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PhotoSlot
                src={asset("/photos/photo-hiking.jpg")}
                alt="Cub Scouts walking a sunlit wooded trail"
                label="photo: cub scouts on a wooded trail"
                bg="#8ab58a"
                style={{ height: 210, borderRadius: 8 }}
              />
              <PhotoSlot
                src={asset("/candy-cane-scene.svg")}
                alt="Illustration of a house on a winter night with large candy canes planted in a row along the front lawn"
                label="illustration: candy canes on a snowy front lawn"
                bg="#c09090"
                style={{ height: 165, borderRadius: 8 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dens */}
      {/* No borderBottom: the charter strip below now follows directly and brings its own
          borderTop, so keeping both would draw a doubled 2px line. */}
      <div className="section-sm" id="dens" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader eyebrow="How we're organized" title="Our dens" sub="Scouts are grouped by grade. Each den has 6–10 kids and its own dedicated leader." center />
          <div className="den-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 12 }}>
            {dens.map(d => (
              <div key={d.name} className="card" style={{ padding: '20px 12px', textAlign: 'center' }}>
                <img
                  src={asset(d.img)}
                  alt={`${d.name} rank emblem`}
                  // Capped on BOTH axes. Height alone isn't enough: Arrow of Light is a 2.5:1
                  // rectangle while the other five are square-ish, so a shared height renders
                  // it two and a half times wider than its neighbours. The max-width reins it
                  // in and lets the diamonds grow a little.
                  style={{
                    display: 'block', width: '100%', maxWidth: 104, height: 66,
                    objectFit: 'contain', margin: '0 auto 12px',
                  }}
                />
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20, color: 'var(--navy)', marginBottom: 4 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{d.grade}</div>
              </div>
            ))}
          </div>
          {/* The emblems are registered Scouting America marks, and the site's photographs
              come from the Scouting America Brand Center under its unit-use terms, so both
              get an attribution line. Kept small and muted - it's a legal courtesy, not page
              content. The photos show Scouts from other units, not Pack 351; the alt text
              throughout is written so nothing claims otherwise.

              Deliberately says "marks" rather than naming the rank emblems: the Cub Scouts
              diamond now appears on the home page too, and this line is the site's only
              attribution, so it has to cover every Scouting America mark we display - not
              just the six on this page. */}
          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 18 }}>
            The Cub Scouts logo and the rank emblems are trademarks of Scouting America, used by
            Pack 351 as a chartered unit. Photography courtesy of the Scouting America Brand Center.
          </p>
        </div>
      </div>

      {/* Charter org strip */}
      <div id="charter" style={{ background: 'var(--navy-light)', borderTop: '1px solid var(--border)', padding: '36px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: 8 }}>Our chartering organization</span>
            <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 28, color: 'var(--navy)' }}>Central Baptist Church</h3>
            <p style={{ color: 'var(--muted)', marginTop: 6 }}>Lindale, TX · Our home base</p>
          </div>
          <a className="btn btn-primary" href={pageHref('join')}>Join Pack 351 →</a>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
