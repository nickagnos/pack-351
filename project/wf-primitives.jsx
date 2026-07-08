// Shared wireframe primitives — sketchy lo-fi UI elements
// Exposed on window for cross-script use.

const Photo = ({ label = 'photo', h, w, style = {}, rotate = 0 }) => (
  <div
    className="wf-photo"
    style={{ width: w, height: h, flex: w ? undefined : 1, transform: `rotate(${rotate}deg)`, ...style }}
  >
    <span className="label">{label}</span>
  </div>
);

const Btn = ({ children, primary, ghost, sm, style = {}, ...rest }) => (
  <span
    className={`wf-btn ${primary ? 'primary' : ''} ${ghost ? 'ghost' : ''}`}
    style={{ fontSize: sm ? 17 : 22, padding: sm ? '5px 12px' : '8px 18px', ...style }}
    {...rest}
  >
    {children}
  </span>
);

const Chip = ({ children }) => <span className="wf-chip">{children}</span>;
const Pill = ({ children }) => <span className="wf-pill">{children}</span>;

const Line = ({ w = '100%', short, mid }) => (
  <div className={`wf-line ${short ? 'short' : ''} ${mid ? 'mid' : ''}`} style={{ width: w }} />
);

const Lines = ({ count = 3, lastShort = true }) =>
  Array.from({ length: count }).map((_, i) => (
    <Line key={i} short={lastShort && i === count - 1} />
  ));

const Logo = ({ name = 'Pack 351', sub = 'Cub Scouts' }) => (
  <div className="wf-logo">
    <span className="badge">351</span>
    <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <span>{name}</span>
      <span className="wf-scribble" style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{sub}</span>
    </span>
  </div>
);

const Nav = ({ items = ['Home', 'About', 'Events', 'Resources', 'Join'], style = 'top', joinCta = true, current }) => {
  if (style === 'hamburger') {
    return (
      <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Logo />
        <div className="row gap-12" style={{ alignItems: 'center' }}>
          {joinCta && <Btn primary sm>Join</Btn>}
          <div style={{ width: 28, height: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ height: 3, background: '#1a1a1a', borderRadius: 2 }} />
            <div style={{ height: 3, background: '#1a1a1a', borderRadius: 2 }} />
            <div style={{ height: 3, background: '#1a1a1a', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Logo />
      <div className="wf-nav">
        {items.map(i => (
          <span key={i} style={{ borderBottom: current === i ? '3px solid var(--accent)' : 'none', paddingBottom: 2 }}>
            {i}
          </span>
        ))}
      </div>
      {joinCta ? <Btn primary sm>Join Now →</Btn> : <span style={{ width: 80 }} />}
    </div>
  );
};

const Sidebar = ({ items = ['Home', 'About', 'Events', 'Den Pages', 'Resources', 'Gallery', 'Contact', 'Join'], current = 'Home' }) => (
  <div className="col gap-16" style={{ width: 200, padding: 20, borderRight: '1.75px solid #1a1a1a', height: '100%' }}>
    <Logo />
    <div className="col gap-8" style={{ marginTop: 16 }}>
      {items.map(i => (
        <div key={i} className="wf-hand" style={{
          fontSize: 22,
          padding: '4px 8px',
          background: current === i ? 'var(--accent)' : 'transparent',
          color: current === i ? '#fff' : '#1a1a1a',
          borderRadius: 4,
        }}>{i}</div>
      ))}
    </div>
    <div style={{ marginTop: 'auto' }}>
      <Btn primary>Join Now →</Btn>
    </div>
  </div>
);

const Footer = () => (
  <div style={{ borderTop: '1.75px solid #1a1a1a', padding: 20, background: 'rgba(0,0,0,.03)' }}>
    <div className="row gap-32" style={{ alignItems: 'flex-start' }}>
      <div className="col gap-8" style={{ flex: 1 }}>
        <Logo />
        <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>
          Chartered by [Org]. Meets at [Location].
        </div>
      </div>
      <div className="col gap-6">
        <div className="wf-hand" style={{ fontSize: 20 }}>Quick links</div>
        <Line short /><Line short /><Line short />
      </div>
      <div className="col gap-6">
        <div className="wf-hand" style={{ fontSize: 20 }}>Contact</div>
        <Line short /><Line short />
      </div>
      <div className="col gap-6">
        <div className="wf-hand" style={{ fontSize: 20 }}>Follow</div>
        <div className="row gap-6">
          <Chip>FB</Chip><Chip>IG</Chip>
        </div>
      </div>
    </div>
  </div>
);

const EventCard = ({ date = 'SAT MAY 24', title = 'Pinewood Derby', meta = '9am · Lodge Hall', tag = 'Pack-wide' }) => (
  <div className="wf-box col gap-8" style={{ padding: 14, minWidth: 0 }}>
    <div className="row gap-12" style={{ alignItems: 'flex-start' }}>
      <div className="col" style={{
        border: '1.75px solid #1a1a1a',
        padding: '4px 10px',
        textAlign: 'center',
        background: 'rgba(0,0,0,.04)',
        minWidth: 64,
      }}>
        <div className="wf-scribble" style={{ fontSize: 12, color: '#666' }}>{date.split(' ')[0]}</div>
        <div className="wf-hand" style={{ fontSize: 28, lineHeight: 1 }}>{date.split(' ')[2] || ''}</div>
        <div className="wf-scribble" style={{ fontSize: 12 }}>{date.split(' ')[1]}</div>
      </div>
      <div className="col gap-4" style={{ flex: 1, minWidth: 0 }}>
        <div className="wf-hand" style={{ fontSize: 22, lineHeight: 1 }}>{title}</div>
        <div className="wf-scribble" style={{ fontSize: 13, color: '#666' }}>{meta}</div>
        <div style={{ marginTop: 4 }}><Chip>{tag}</Chip></div>
      </div>
    </div>
  </div>
);

const FAQCard = ({ q = 'When do you meet?', a }) => (
  <div className="wf-box col gap-8" style={{ padding: 14 }}>
    <div className="wf-hand" style={{ fontSize: 22 }}>{q}</div>
    {a ? (
      <div className="wf-scribble" style={{ fontSize: 13, color: '#444' }}>{a}</div>
    ) : (
      <><Line /><Line short /></>
    )}
  </div>
);

const StickyNote = ({ children, rotate = -2, color = '#ffe98a' }) => (
  <div className="wf-note" style={{ transform: `rotate(${rotate}deg)`, background: color }}>
    {children}
  </div>
);

const ScreenLabel = ({ children }) => (
  <div style={{
    position: 'absolute', top: -28, left: 0,
    fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 22, color: '#1a1a1a',
  }}>
    ↳ {children}
  </div>
);

Object.assign(window, {
  Photo, Btn, Chip, Pill, Line, Lines, Logo, Nav, Sidebar, Footer,
  EventCard, FAQCard, StickyNote, ScreenLabel,
});
