import React from 'react';
import SiteFooter from '../components/SiteFooter';
import PhotoSlot from '../components/PhotoSlot';
import SectionHeader from '../components/SectionHeader';
import EventRow from '../components/EventRow';
import PageHero from '../components/PageHero';
import { asset, pageHref } from '../asset';

// No fixed dates. This describes a typical Pack year rather than a live calendar, so the
// left column carries a season or a frequency and the exact dates go out by email and in
// the Facebook group. The three separate weekly Pack Meeting rows collapsed into one -
// listing the same meeting three times was only ever a side effect of having dates.
// Rebuilt from the Pack's own "25-26 Pack Calendar" (the Canva doc linked off the old
// Google Sites Joining Info page), which is the only complete record of a real Pack year.
// Deliberately no dates: that calendar is reissued every year and every date on it moves,
// so each row carries a season or a frequency and the note under the list points people at
// email, Band and Facebook for the actual dates. Keep it that way.
//
// The seasons here are the real ones off that calendar, which is why some may read oddly:
// the Pinewood Derby is January, Blue & Gold is early March, and the Regatta is an evening
// event, not a morning one.
const TAG = {
  meeting:  { tag: '3–4× / month', tagBg: 'var(--navy)' },
  pack:     { tag: 'Pack-wide',    tagBg: '#92400e' },
  overnight:{ tag: 'Overnight',    tagBg: '#166534' },
  fundraiser:{ tag: 'Fundraiser',  tagBg: '#b91c1c' },
  service:  { tag: 'Service',      tagBg: '#0f766e' },
  community:{ tag: 'Community',    tagBg: '#0369a1' },
  newfam:   { tag: 'New families', tagBg: '#a16207' },
  adults:   { tag: 'Adults',       tagBg: '#64748b' },
};

const EVENTS = [
  // Den meetings are the weekly rhythm; Pack meetings and the committee meeting are monthly.
  // The old page collapsed all three into one row, which hid the difference.
  { when: 'Most Tuesdays', title: 'Den Meeting',            time: '6:00–7:00 PM', loc: 'Central Baptist Church', ...TAG.meeting },
  { when: 'Monthly',       title: 'Pack Meeting',           time: 'Evening',      loc: 'Central Baptist Church', ...TAG.pack },
  { when: 'Monthly',       title: 'Pack Committee Meeting', time: 'Evening',      loc: 'Central Baptist Church', ...TAG.adults },

  { when: 'August',        title: 'School Night for Scouting',      time: 'Evening', loc: 'Lindale schools',        ...TAG.newfam },
  { when: 'August',        title: 'Cub Kick-off & Parent Orientation', time: 'Evening', loc: 'Central Baptist Church', ...TAG.newfam },

  { when: 'Fall',          title: 'Popcorn Sale',           time: 'Weekends',     loc: 'Around Lindale',         ...TAG.fundraiser },
  { when: 'Fall',          title: 'Raingutter Regatta',     time: 'Evening',      loc: 'Central Baptist Church', ...TAG.pack },
  { when: 'Fall',          title: 'Scouting for Food',      time: 'Weekends',     loc: 'Around Lindale',         ...TAG.service },
  { when: 'Fall',          title: 'Mom & Me Campout',       time: 'Fri–Sat',      loc: 'Camp Pirtle, Gary TX',   ...TAG.overnight },
  { when: 'October',       title: 'Trunk or Treat',         time: 'Afternoon',    loc: 'CountryFest, Lindale',   ...TAG.community },
  { when: 'Late October',  title: 'Spooktacular Campout',   time: 'Fri–Sun',      loc: 'American Legion',        ...TAG.overnight },
  { when: 'November',      title: 'NASA Campout',           time: 'Weekend',      loc: 'Announced each year',    ...TAG.overnight },
  { when: 'November',      title: 'Food Bank Service Project', time: 'Morning',   loc: 'East Texas Food Bank',   ...TAG.service },

  // Canes go out in December and get collected back in January, so this one spans the break.
  { when: 'Dec – Jan',     title: 'Candy Cane Fundraiser',  time: 'All day',      loc: 'Hideaway Community',     ...TAG.fundraiser },
  { when: 'December',      title: 'Christmas Parade',       time: 'Afternoon',    loc: 'Lindale',                ...TAG.community },
  { when: 'December',      title: 'Pack Caroling',          time: 'Evening',      loc: 'Lindale Specialty',      ...TAG.community },
  { when: 'December',      title: 'Awards & Potluck',       time: 'Evening',      loc: 'Central Baptist Church', ...TAG.pack },

  { when: 'Winter',        title: 'Pinewood Derby',         time: 'Morning',      loc: 'Central Baptist Church', ...TAG.pack },
  { when: 'Winter',        title: 'Scout Sunday',           time: 'Morning',      loc: 'Central Baptist Church', ...TAG.pack },
  { when: 'Late winter',   title: 'Blue & Gold Banquet & Bridging', time: 'Evening', loc: 'Central Baptist Church', ...TAG.pack },

  { when: 'Spring',        title: 'Pack Campout',           time: 'Fri–Sun',      loc: 'American Legion',        ...TAG.overnight },
  { when: 'Spring',        title: 'Dad & Me Campout',       time: 'Sat–Sun',      loc: 'Camp Pirtle, Gary TX',   ...TAG.overnight },
  { when: 'Spring',        title: 'Pack Service Project',   time: 'Morning',      loc: 'Central Baptist Church', ...TAG.service },
  { when: 'Spring',        title: 'Fire & Nature Festival', time: 'Daytime',      loc: 'Announced each year',    ...TAG.community },
  { when: 'Spring',        title: 'Plant Sale',             time: 'Morning',      loc: 'Around Lindale',         ...TAG.fundraiser },
  { when: 'Spring',        title: 'End of Year Awards',     time: 'Evening',      loc: 'Central Baptist Church', ...TAG.pack },

  { when: 'Varies',        title: 'Spirit Night',           time: 'Evening',      loc: 'Whataburger, Lindale',   ...TAG.fundraiser },
  { when: 'Summer',        title: 'Summer Fun outings',     time: 'Varies',       loc: 'Around Lindale',         ...TAG.community },
];

const FEATURED = [
  {
    src: '/photos/photo-pinewood-derby.jpg',
    alt: 'A Cub Scout painting a pinewood derby car at a workbench',
    label: 'photo: building a pinewood derby car',
    bg: '#c9a86c',
    title: 'Pinewood Derby',
    // Winter, not spring. The Pack's own calendar puts the Derby in January (see the note at
    // the top of this file), and the EVENTS row below has always said Winter - this card was
    // the odd one out, contradicting the list a few hundred pixels beneath it.
    when: 'Every winter',
    desc: "Build a car. Race it. It's that simple, and that exciting. Scouts and parents spend weeks in the garage perfecting their design. The whole Pack comes out to watch.",
  },
  {
    src: '/photos/photo-regatta.jpg',
    alt: 'Cub Scouts in uniform racing boats down a water-filled trough at a raingutter regatta',
    label: 'photo: raingutter regatta',
    bg: '#6a9fb5',
    title: 'Raingutter Regatta',
    when: 'Every fall',
    desc: 'Scouts build balsa wood sailboats and race them down a water-filled rain gutter. The only motor allowed? Lung power. Expect soggy sleeves and big grins.',
  },
  {
    src: '/candy-cane-scene.svg',
    alt: 'Illustration of a house on a winter night with large candy canes planted in a row along the front lawn',
    label: 'illustration: candy canes on a snowy front lawn',
    bg: '#b87878',
    title: 'Candy Cane Fundraiser',
    when: 'Every December',
    desc: 'Our Scouts "plant" giant 5-foot lawn candy canes at homes all across the Hideaway community. A beloved Lindale tradition, and our biggest fundraiser of the year.',
    // Deliberately no month here. The candy canes page owns the ordering status (its
    // ORDERING_OPEN flag), so restating the window on this card would only drift out of sync.
    linkTo: 'candy-canes',
    linkText: 'Order candy canes →',
  },
];

export default function EventsPage() {
  return (
    <div>
      {/* "Events & Calendar" / "What's coming up" both promised a dated schedule this page
          no longer carries, so the framing shifts to a typical year. */}
      <PageHero
        eyebrow="Events"
        title="A year with Pack 351"
        sub="We meet most Tuesday nights, and the big events come around every year: campouts, the Pinewood Derby, the Raingutter Regatta, and our famous Hideaway candy cane fundraiser."
        image={asset("/photos/photo-pack-year.jpg")}
        imageAlt="Cub Scouts and adult leaders setting up a tent in a meadow"
      />

      {/* Signature events */}
      <div className="section">
        <div className="container">
          <div id="signature">
            <SectionHeader eyebrow="Signature events" title="The big ones" />
            <div className="events-featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 64 }}>
              {FEATURED.map(e => (
                <div key={e.title} className="card" style={{ overflow: 'hidden' }}>
                  <PhotoSlot src={asset(e.src)} alt={e.alt} label={e.label} bg={e.bg} style={{ height: 200 }} />
                  <div style={{ padding: 20 }}>
                    <span className="eyebrow" style={{ marginBottom: 8 }}>{e.when}</span>
                    <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 26, color: 'var(--navy)', marginBottom: 10 }}>{e.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{e.desc}</p>
                    {/* linkTo is a page of this site, linkHref an outside link. */}
                    {e.linkTo && (
                      <a
                        href={pageHref(e.linkTo)}
                        style={{
                          display: 'inline-block', marginTop: 12, fontSize: 14, fontWeight: 700,
                          color: 'var(--navy)', textDecoration: 'underline',
                        }}
                      >{e.linkText}</a>
                    )}
                    {e.linkHref && (
                      <a
                        href={e.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-block', marginTop: 12, fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}
                      >{e.linkText}</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full list */}
          <div id="calendar">
            <SectionHeader eyebrow="Through the year" title="What a Pack year looks like" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {EVENTS.map((e, i) => (
                <EventRow key={i} when={e.when} title={e.title} time={e.time} location={e.loc} tag={e.tag} tagBg={e.tagBg} />
              ))}
            </div>
            {/* Dates came off this page, so it has to say where to actually get them. */}
            <p style={{ fontSize: 14, color: 'var(--muted)', textAlign: 'center', marginTop: 24 }}>
              Exact dates are set each year and go out by email, on Band, and in our{' '}
              <a href="https://www.facebook.com/groups/1094659333885105/" target="_blank" rel="noopener noreferrer"
                 style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}>
                private Facebook group
              </a>. Your den leader also sends reminders.{' '}
              <a href="mailto:txcspack351@gmail.com" style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}>
                Email us
              </a>{' '}
              and we'll keep you in the loop.
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
