import React from 'react';

// A single row in the Pack-year list. The left badge used to be a calendar tile (month +
// day number). The Pack doesn't publish firm dates ahead of time, so it now carries a
// timing label instead - "Most Mondays", "Spring", "December" - and the box is sized for
// a word rather than a two-digit number.
export default function EventRow({ when, title, time, location, tag, tagBg }) {
  return (
    <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: 18, alignItems: 'center' }}>
      <div style={{
        width: 104, textAlign: 'center',
        background: 'var(--navy-light)', borderRadius: 7,
        padding: '10px 6px', border: '1.5px solid var(--navy)',
        flexShrink: 0,
      }}>
        <div style={{
          fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 17, color: 'var(--navy)',
          textTransform: 'uppercase', letterSpacing: .6, lineHeight: 1.15,
        }}>{when}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20 }}>{title}</span>
          {tag && (
            <span style={{
              fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, letterSpacing: .8,
              textTransform: 'uppercase', background: tagBg || 'var(--navy-light)',
              color: tagBg ? '#fff' : 'var(--navy)', padding: '2px 9px', borderRadius: 99,
            }}>{tag}</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {time && <span>⏰ {time}</span>}
          {location && <span>📍 {location}</span>}
        </div>
      </div>
    </div>
  );
}
