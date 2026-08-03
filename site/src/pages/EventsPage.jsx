import React from 'react';
import SiteFooter from '../components/SiteFooter';
import PhotoSlot from '../components/PhotoSlot';
import SectionHeader from '../components/SectionHeader';
import EventRow from '../components/EventRow';
import PageHero from '../components/PageHero';
import { asset } from '../asset';

// No fixed dates. This describes a typical Pack year rather than a live calendar, so the
// left column carries a season or a frequency and the exact dates go out by email and in
// the Facebook group. The three separate weekly Pack Meeting rows collapsed into one -
// listing the same meeting three times was only ever a side effect of having dates.
const EVENTS = [
  { when: 'Most Mondays', title: 'Pack Meeting',          time: '6:30–7:30 PM', loc: 'Central Baptist Church', tag: 'Weekly',     tagBg: 'var(--navy)' },
  { when: 'Summer',       title: 'Summer Campout',        time: 'Fri–Sun',      loc: 'Camp Pirtle, Lindale',   tag: 'Overnight',  tagBg: '#166534' },
  { when: 'Early fall',   title: 'Fall Kickoff Meeting',  time: 'Evening',      loc: 'Central Baptist Church', tag: 'Pack-wide',  tagBg: 'var(--navy)' },
  // Added alongside the popcorn hero image - the page shouldn't show a popcorn sale and
  // then never mention one. Remove this row if the Pack doesn't run a popcorn fundraiser.
  { when: 'Fall',         title: 'Popcorn Sale',          time: 'Weekends',     loc: 'Around Lindale',         tag: 'Fundraiser', tagBg: '#b91c1c' },
  { when: 'Fall',         title: 'Raingutter Regatta',    time: 'Morning',      loc: 'Central Baptist Church', tag: 'Pack-wide',  tagBg: '#0369a1' },
  { when: 'Fall',         title: 'Fall Campout',          time: 'Sat–Sun',      loc: 'Local campsite',         tag: 'Overnight',  tagBg: '#166534' },
  { when: 'December',     title: 'Candy Cane Fundraiser', time: 'All day',      loc: 'Hideaway Community',     tag: 'Fundraiser', tagBg: '#b91c1c' },
  { when: 'Winter',       title: 'Blue & Gold Banquet',   time: 'Evening',      loc: 'Central Baptist Church', tag: 'Pack-wide',  tagBg: '#92400e' },
  { when: 'Spring',       title: 'Pinewood Derby',        time: 'Morning',      loc: 'Central Baptist Church', tag: 'Pack-wide',  tagBg: '#92400e' },
];

const FEATURED = [
  {
    src: '/photos/photo-pinewood-derby.jpg',
    alt: 'Scouts building pinewood derby cars at a workbench',
    label: 'photo: scouts building pinewood derby cars',
    bg: '#c9a86c',
    title: 'Pinewood Derby',
    when: 'Every spring',
    desc: "Build a car. Race it. It's that simple, and that exciting. Scouts and parents spend weeks in the garage perfecting their design. The whole Pack comes out to watch.",
  },
  {
    src: '/photos/photo-regatta.jpg',
    alt: 'Scouts building balsa wood sailboats for the Raingutter Regatta',
    label: 'photo: scouts building regatta sailboats',
    bg: '#6a9fb5',
    title: 'Raingutter Regatta',
    when: 'Every fall',
    desc: 'Scouts build balsa wood sailboats and race them down a water-filled rain gutter. The only motor allowed? Lung power. Expect soggy sleeves and big grins.',
  },
  {
    src: '/photos/photo-candy-cane.jpg',
    alt: 'Candy cane fundraiser in the Hideaway neighborhood',
    label: 'photo: candy cane fundraiser in Hideaway neighborhood',
    bg: '#b87878',
    title: 'Candy Cane Fundraiser',
    when: 'Every December',
    desc: 'Our Scouts "plant" giant 3-foot lawn candy canes at homes all across the Hideaway community. A beloved Lindale tradition, and our biggest fundraiser of the year.',
  },
];

export default function EventsPage({ go }) {
  return (
    <div>
      {/* "Events & Calendar" / "What's coming up" both promised a dated schedule this page
          no longer carries, so the framing shifts to a typical year. */}
      <PageHero
        eyebrow="Events"
        title="A year with Pack 351"
        sub="We meet most Monday nights, and the big events come around every year: campouts, the Pinewood Derby, the Raingutter Regatta, and our famous Hideaway candy cane fundraiser."
        image={asset("/photos/photo-popcorn.jpg")}
        imageAlt="Pack 351 Scouts selling popcorn at a table outside a grocery store"
      />

      {/* Signature events */}
      <div className="section">
        <div className="container">
          <SectionHeader eyebrow="Signature events" title="The big ones" />
          <div className="events-featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 64 }}>
            {FEATURED.map(e => (
              <div key={e.title} className="card" style={{ overflow: 'hidden' }}>
                <PhotoSlot src={asset(e.src)} alt={e.alt} label={e.label} bg={e.bg} style={{ height: 200 }} />
                <div style={{ padding: 20 }}>
                  <span className="eyebrow" style={{ marginBottom: 8 }}>{e.when}</span>
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 26, color: 'var(--navy)', marginBottom: 10 }}>{e.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Full list */}
          <SectionHeader eyebrow="Through the year" title="What a Pack year looks like" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EVENTS.map((e, i) => (
              <EventRow key={i} when={e.when} title={e.title} time={e.time} location={e.loc} tag={e.tag} tagBg={e.tagBg} />
            ))}
          </div>
          {/* Dates came off this page, so it has to say where to actually get them. */}
          <p style={{ fontSize: 14, color: 'var(--muted)', textAlign: 'center', marginTop: 24 }}>
            Exact dates are set each year and go out by email and in our Facebook group.{' '}
            <a href="mailto:txcspack351@gmail.com" style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}>
              Email us
            </a>{' '}
            and we'll keep you in the loop.
          </p>
        </div>
      </div>

      <SiteFooter go={go} />
    </div>
  );
}
