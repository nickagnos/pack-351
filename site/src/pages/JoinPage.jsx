import React from 'react';
import SiteFooter from '../components/SiteFooter';

const encode = (data) =>
  Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

export default function JoinPage({ go }) {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', grade: '', hear: '' });
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 7,
    border: '1.5px solid var(--border)', fontFamily: 'Nunito',
    fontSize: 16, color: 'var(--text)', background: '#fff',
    outline: 'none', transition: 'border-color .12s',
  };
  const labelStyle = {
    display: 'block', fontFamily: 'Barlow Condensed', fontWeight: 700,
    fontSize: 18, color: 'var(--text)', marginBottom: 6,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'join-pack-351', ...form }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  if (done) return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🏕️</div>
        <span className="eyebrow" style={{ marginBottom: 12 }}>You're in!</span>
        <h1 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 52, color: 'var(--navy)', margin: '12px 0 16px' }}>
          Welcome to Pack 351!
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: 28, lineHeight: 1.7 }}>
          Our Cubmaster will reach out within 48 hours with next steps. In the meantime, explore what's coming up.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-navy" onClick={() => go('events')}>See upcoming events</button>
          <button className="btn btn-ghost" onClick={() => go('resources')}>Explore resources</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '56px 0' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 12 }}>Join Pack 351</span>
          <h1 style={{
            fontFamily: 'Barlow Condensed', fontWeight: 800,
            fontSize: 'clamp(36px,5vw,64px)', color: '#fff', lineHeight: 1, marginBottom: 16,
          }}>
            Let's get your scout started.
          </h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 17, maxWidth: 500, lineHeight: 1.65 }}>
            Takes under 2 minutes. No payment yet — a leader will reach out within 48 hours to walk you through next steps.
          </p>
        </div>
      </div>

      {/* Form + sidebar */}
      <div className="section">
        <div className="container">
          <div className="join-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'start' }}>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 32, color: 'var(--navy)', marginBottom: 32 }}>
                Tell us about your family
              </h2>
              {/* Honeypot field — hidden from humans, traps bots */}
              <input type="text" name="bot-field" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Your name</label>
                  <input type="text" name="name" placeholder="First and last name" value={form.name} onChange={set('name')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input type="email" name="email" placeholder="We'll reply here" value={form.email} onChange={set('email')} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>
                    Phone <span style={{ fontFamily: 'Nunito', fontWeight: 400, fontSize: 14, color: 'var(--muted)' }}>(optional)</span>
                  </label>
                  <input type="tel" name="phone" placeholder="(555) 000-0000" value={form.phone} onChange={set('phone')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your scout's current grade</label>
                  <select name="grade" value={form.grade} onChange={set('grade')} style={{ ...inputStyle, color: form.grade ? 'var(--text)' : 'var(--muted)' }} required>
                    <option value="">Select grade →</option>
                    {[
                      'Kindergarten (Lion den)',
                      '1st grade (Tiger den)',
                      '2nd grade (Wolf den)',
                      '3rd grade (Bear den)',
                      '4th grade (Webelos den)',
                      '5th grade (Arrow of Light den)',
                    ].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>
                    How did you hear about us? <span style={{ fontFamily: 'Nunito', fontWeight: 400, fontSize: 14, color: 'var(--muted)' }}>(optional)</span>
                  </label>
                  <select name="hear" value={form.hear} onChange={set('hear')} style={{ ...inputStyle, color: form.hear ? 'var(--text)' : 'var(--muted)' }}>
                    <option value="">Choose one</option>
                    {['A friend or neighbor', 'Facebook / social media', 'School flyer or teacher', 'Central Baptist Church', 'BeAScout.org', 'Just drove by!', 'Other'].map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p style={{ color: '#b91c1c', fontSize: 14, textAlign: 'center' }}>
                    Something went wrong. Please try again or email us at{' '}
                    <a href="mailto:nickagnos@gmail.com" style={{ color: '#b91c1c' }}>nickagnos@gmail.com</a>.
                  </p>
                )}

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }}>
                  Join Pack 351 →
                </button>
                <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
                  No payment now. Our Cubmaster will email you within 48 hours.
                </p>
              </div>
            </form>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '💸', title: "What does it cost?", body: "$175/year covers dues, activity fees, and your scout's Handbook. Uniform is extra but we'll guide you. Scholarships are available — no scout is ever turned away for finances." },
                { icon: '📅', title: "When do we meet?", body: 'Most Monday nights, 6:30–7:30 PM at Central Baptist Church in Lindale.' },
                { icon: '👀', title: "Can we visit before joining?", body: "Absolutely. Drop in to any Monday meeting. No sign-up needed — just show up and see if it's a fit." },
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
