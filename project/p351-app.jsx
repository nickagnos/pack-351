// App shell — hash router + tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "navy": "#1b3068",
  "gold": "#d4950a",
  "showJoinBanner": true
}/*EDITMODE-END*/;

function App() {
  const getPage = () => (window.location.hash.replace('#/', '') || 'home');
  const [page, setPage] = React.useState(getPage);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--navy', t.navy);
    document.documentElement.style.setProperty('--gold', t.gold);
    document.documentElement.style.setProperty('--gold-dark', t.gold === '#d4950a' ? '#a87308' : t.gold);
    document.documentElement.style.setProperty('--navy-dark', t.navy === '#1b3068' ? '#0f1e40' : t.navy);
    document.documentElement.style.setProperty('--navy-light', t.navy + '1a');
  }, [t.navy, t.gold]);

  const go = React.useCallback((p) => {
    setPage(p);
    window.location.hash = '/' + p;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  React.useEffect(() => {
    const h = () => setPage(getPage());
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  return (
    <>
      <TweaksPanel>
        <TweakSection title="Brand colors">
          <TweakColor
            label="Navy"
            value={t.navy}
            options={['#1b3068','#1a3a5c','#1f2d4a','#2d4a8a']}
            onChange={v => setTweak('navy', v)}
          />
          <TweakColor
            label="Gold accent"
            value={t.gold}
            options={['#d4950a','#c8850a','#b87a18','#e0a010']}
            onChange={v => setTweak('gold', v)}
          />
        </TweakSection>
        <TweakSection title="Homepage">
          <TweakToggle
            label="Show join CTA banner"
            value={t.showJoinBanner}
            onChange={v => setTweak('showJoinBanner', v)}
          />
        </TweakSection>
      </TweaksPanel>

      <SiteNav current={page} go={go} />

      {page === 'home'      && <HomePage      go={go} showBanner={t.showJoinBanner} />}
      {page === 'about'     && <AboutPage     go={go} />}
      {page === 'events'    && <EventsPage    go={go} />}
      {page === 'join'      && <JoinPage      go={go} />}
      {page === 'resources' && <ResourcesPage go={go} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
