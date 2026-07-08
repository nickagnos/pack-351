import React from 'react';

export default function SectionHeader({ eyebrow, title, sub, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 36 }}>
      {eyebrow && <span className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</span>}
      <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 'clamp(28px,3vw,46px)', color: 'var(--navy)' }}>{title}</h2>
      {sub && <p style={{ fontSize: 17, color: 'var(--muted)', marginTop: 10, maxWidth: center ? 600 : '100%', margin: center ? '10px auto 0' : '10px 0 0' }}>{sub}</p>}
    </div>
  );
}
