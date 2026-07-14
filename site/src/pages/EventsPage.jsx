import React from 'react';
import SiteFooter from '../components/SiteFooter';
import PhotoSlot from '../components/PhotoSlot';
import SectionHeader from '../components/SectionHeader';
import EventRow from '../components/EventRow';
import PageHero from '../components/PageHero';

const EVENTS = [
  { month: 'Jun', day: '2',  title: 'Pack Meeting',          time: '6:30–7:30 PM', loc: 'Central Baptist Church', tag: 'Weekly',    tagBg: 'var(--navy)' },
  { month: 'Jun', day: '9',  title: 'Pack Meeting',          time: '6:30–7:30 PM', loc: 'Central Baptist Church', tag: 'Weekly',    tagBg: 'var(--navy)' },
  { month: 'Jun', day: '16', title: 'Pack Meeting',          time: '6:30–7:30 PM', loc: 'Central Baptist Church', tag: 'Weekly',    tagBg: 'var(--navy)' },
  { month: 'Jul', day: '14', title: 'Summer Campout',        time: 'Fri–Sun',      loc: 'Camp Pirtle, Lindale',   tag: 'Overnight', tagBg: '#166534' },
  { month: 'Sep', day: '8',  title: 'Fall Kickoff Meeting',  time: '6:30 PM',      loc: 'Central Baptist Church', tag: 'Pack-wide', tagBg: 'var(--navy)' },
  { month: 'Oct', day: '11', title: 'Raingutter Regatta',    time: '10:00 AM',     loc: 'Central Baptist Church', tag: 'Pack-wide', tagBg: '#0369a1' },
  { month: 'Nov', day: '3',  title: 'Fall Campout',          time: 'Sat–Sun',      loc: 'Local campsite TBD',     tag: 'Overnight', tagBg: '#166534' },
  { month: 'Dec', day: '6',  title: 'Candy Cane Fundraiser', time: 'All day',      loc: 'Hideaway Community',     tag: 'Fundraiser',tagBg: '#b91c1c' },
  { month: 'Feb', day: '14', title: 'Blue & Gold Banquet',   time: '6:00 PM',      loc: 'Central Baptist Church', tag: 'Pack-wide', tagBg: '#92400e' },
  { month: 'Mar', day: '7',  title: 'Pinewood Derby',        time: '9:00 AM',      loc: 'Central Baptist Church', tag: 'Pack-wide', tagBg: '#92400e' },
];

const FEATURED = [
  {
    src: '/photos/photo-pinewood-derby.jpg',
    alt: 'Pinewood Derby race — cars on the track',
    label: 'photo: pinewood derby race — cars on the track',
    bg: '#c9a86c',
    title: 'Pinewood Derby',
    when: 'March · Annual',
    desc: "Build a car. Race it. It's that simple — and that exciting. Scouts and parents spend weeks in the garage perfecting their design. The whole Pack comes out to watch.",
  },
  {
    src: '/photos/photo-regatta.jpg',
    alt: 'Raingutter Regatta boats racing',
    label: 'photo: raingutter regatta boats racing',
    bg: '#6a9fb5',
    title: 'Raingutter Regatta',
    when: 'October · Annual',
    desc: 'Scouts build balsa wood sailboats and race them down a water-filled rain gutter. The only motor allowed? Lung power. Expect soggy sleeves and big grins.',
  },
  {
    src: '/photos/photo-candy-cane.jpg',
    alt: 'Candy cane fundraiser in the Hideaway neighborhood',
    label: 'photo: candy cane fundraiser in Hideaway neighborhood',
    bg: '#b87878',
    title: 'Candy Cane Fundraiser',
    when: 'December · Annual',
    desc: 'Our Scouts "plant" giant 3-foot lawn candy canes at homes all across the Hideaway community. A beloved Lindale tradition — and our biggest fundraiser of the year.',
  },
];

export default function EventsPage({ go }) {
  return (
    <div>
      <PageHero
        eyebrow="Events & Calendar"
        title="What's coming up"
        sub="We meet most Monday nights. Big events happen year-round — campouts, the Pinewood Derby, the Raingutter Regatta, and our famous Hideaway candy cane fundraiser."
        image="/photos/photo-pinewood-derby.jpg"
        imageAlt="Pinewood Derby race day"
      />

      {/* Signature events */}
      <div className="section">
        <div className="container">
          <SectionHeader eyebrow="Signature events" title="The big ones" />
          <div className="events-featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 64 }}>
            {FEATURED.map(e => (
              <div key={e.title} className="card" style={{ overflow: 'hidden' }}>
                <PhotoSlot src={e.src} alt={e.alt} label={e.label} bg={e.bg} style={{ height: 200 }} />
                <div style={{ padding: 20 }}>
                  <span className="eyebrow" style={{ marginBottom: 8 }}>{e.when}</span>
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 26, color: 'var(--navy)', marginBottom: 10 }}>{e.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Full list */}
          <SectionHeader eyebrow="Full schedule" title="All upcoming events" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EVENTS.map((e, i) => (
              <EventRow key={i} month={e.month} day={e.day} title={e.title} time={e.time} location={e.loc} tag={e.tag} tagBg={e.tagBg} />
            ))}
          </div>
        </div>
      </div>

      <SiteFooter go={go} />
    </div>
  );
}
