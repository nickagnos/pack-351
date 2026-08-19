import React from 'react';
import SiteFooter from '../components/SiteFooter';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import FormEmbed from '../components/FormEmbed';
import { asset } from '../asset';

const CONTACT_EMAIL = 'txcspack351@gmail.com';
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Candy cane fundraiser')}` +
  `&body=${encodeURIComponent(
    "Hi! I'd like to know when candy cane ordering opens.\n\n" +
    "Name:\nAddress in Hideaway:\nBest phone (optional):\n"
  )}`;

// Ordering opens in October; the Pack closes the form again after the season, and a closed
// form reads "no longer accepting responses". There's no way to read a Google Form's
// open/closed state cross-origin, so this is a manual flip on purpose - it drives both the
// banner copy and the height of the embed below.
const ORDERING_OPEN = false;

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfEZ7BEpcEvaSmMZ-zHFp-7knelAdLUdkdCWMW0yiQNWQe86w/viewform';
// A cross-origin iframe can't size itself to its content, so the height is fixed either way.
// 300 is measured against the real closed form (a two-line "no longer accepting responses").
// 1400 is a GUESS - the form has been closed every time this page has been looked at, so the
// open height has never been seen. Check it the first time ordering opens: too short and the
// form gets its own scrollbar inside the page, too tall and there's a band of dead cream
// under it. Adjust this number, not the layout around it.
const EMBED_HEIGHT = ORDERING_OPEN ? 1400 : 300;

export default function CandyCanesPage({ go }) {
  return (
    <div>
      <PageHero
        eyebrow="Our biggest fundraiser"
        title="Hideaway Candy Canes"
        sub='Our Scouts "plant" giant 5-foot lawn candy canes at homes all across the Hideaway community. A beloved Lindale tradition, and our biggest fundraiser of the year.'
        image={asset('/photos/photo-candy-cane.jpg')}
        imageAlt="Cub Scouts carrying bags door to door across a neighborhood lawn"
      />

      <div className="section">
        <div className="container">

          {/* Ordering status. This is the part that has to carry the message for most of the
              year, since the embedded form below just says "no longer accepting responses"
              whenever the Pack has it closed. */}
          <div className="card" style={{
            padding: 22,
            borderLeft: `5px solid ${ORDERING_OPEN ? 'var(--gold)' : 'var(--navy)'}`,
            marginBottom: 32,
          }}>
            <span className="eyebrow" style={{ marginBottom: 8 }}>
              {ORDERING_OPEN ? 'Ordering is open' : 'Ordering is closed'}
            </span>
            {ORDERING_OPEN ? (
              <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                Fill out the order form below and we'll take care of the rest.
              </p>
            ) : (
              <>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>
                  Ordering opens in October. The form below is closed until then — email us and
                  we'll let you know as soon as it's open.
                </p>
                <a className="btn btn-primary" href={MAILTO}>Email us about ordering →</a>
              </>
            )}
          </div>

          <SectionHeader
            eyebrow="Order form"
            title={ORDERING_OPEN ? "Order your candy canes" : "The order form"}
          />
          <FormEmbed
            url={FORM_URL}
            title="Candy Cane Fundraiser order form"
            height={EMBED_HEIGHT}
          />

          {/* How it works */}
          <div style={{ marginTop: 64 }}>
            <SectionHeader eyebrow="How it works" title="A Lindale tradition" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}
                 className="join-grid">
              <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
                Every December you'll find our Scouts planting hundreds of five-foot candy canes in
                yards across the Hideaway community. It's become one of our most beloved traditions,
                and a great fundraiser for the Pack.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: '🗓️', head: 'December – January', sub: 'Canes go out in December and get collected back in January.' },
                  { icon: '📍', head: 'Hideaway Community', sub: 'Planted in yards all across Hideaway.' },
                ].map(({ icon, head, sub }) => (
                  <div key={head} className="card" style={{ padding: 18 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                      <div>
                        <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 19, color: 'var(--navy)', marginBottom: 6 }}>{head}</div>
                        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <SiteFooter go={go} />
    </div>
  );
}
