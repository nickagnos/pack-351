import React from 'react';

export default function EventRow({ month, day, title, time, location, tag, tagBg }) {
  return (
    <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: 18, alignItems: 'center' }}>
      <div style={{
        minWidth: 52, textAlign: 'center',
        background: 'var(--navy-light)', borderRadius: 7,
        padding: '6px 0', border: '1.5px solid var(--navy)',
        flexShrink: 0,
      }}>
        <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 12, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: 1 }}>{month}</div>
        <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 28, color: 'var(--navy)', lineHeight: 1.1 }}>{day}</div>
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
