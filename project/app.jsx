// Top-level app: DesignCanvas + Tweaks

const ACCENT_OPTIONS = [
  { name: 'Forest', value: '#2b5d3a' },
  { name: 'Navy', value: '#1f3a68' },
  { name: 'Brick', value: '#a63a2a' },
  { name: 'Gold', value: '#b87a18' },
  { name: 'Slate', value: '#3a3a3a' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2b5d3a",
  "showNotes": true,
  "paper": "#fdfaf2"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--wf-accent', t.accent);
    document.documentElement.style.setProperty('--wf-paper-override', t.paper);
  }, [t.accent, t.paper]);

  return (
    <>
      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent color">
          <TweakColor
            label="Pen / button accent"
            value={t.accent}
            options={ACCENT_OPTIONS.map(o => o.value)}
            onChange={v => setTweak('accent', v)}
          />
        </TweakSection>
        <TweakSection title="Notes">
          <TweakToggle
            label="Show designer's sticky notes"
            value={t.showNotes}
            onChange={v => setTweak('showNotes', v)}
          />
        </TweakSection>
      </TweaksPanel>

      <style>{`
        ${!t.showNotes ? '.wf-note { display: none !important; }' : ''}
      `}</style>

      <div style={{ position: 'fixed', top: 16, left: 20, zIndex: 5, pointerEvents: 'none' }}>
        <div className="wf-hand" style={{ fontSize: 32 }}>Pack 351 · site wireframes</div>
        <div className="wf-scribble" style={{ fontSize: 14, color: '#555' }}>
          Lo-fi sketches · drag to pan · scroll to zoom · ⌥/Alt + click an artboard to focus
        </div>
      </div>

      <DesignCanvas>
        <DCSection id="homepages" title="Homepage variations" subtitle="Four different jobs the homepage could do">
          <DCArtboard id="home-a" label="A · Classic recruiter — big hero" width={1200} height={1680}>
            <HomeA />
          </DCArtboard>
          <DCArtboard id="home-b" label="B · Calendar-first — current families" width={1200} height={1320}>
            <HomeB />
          </DCArtboard>
          <DCArtboard id="home-c" label="C · Activity showcase — photo grid" width={1200} height={1620}>
            <HomeC />
          </DCArtboard>
          <DCArtboard id="home-d" label="D · Storybook adventure — long scroll" width={1200} height={1840}>
            <HomeD />
          </DCArtboard>
        </DCSection>

        <DCSection id="mobile" title="Mobile" subtitle="Phone version of the leading direction + 2 key flows">
          <DCArtboard id="m-home" label="Mobile home" width={340} height={700}>
            <MobileHome />
          </DCArtboard>
          <DCArtboard id="m-join" label="Mobile join (step 1)" width={340} height={700}>
            <MobileJoin />
          </DCArtboard>
          <DCArtboard id="m-res" label="Mobile resources" width={340} height={700}>
            <MobileResources />
          </DCArtboard>
        </DCSection>

        <DCSection id="inner" title="Inner pages" subtitle="The pages every variant has in common">
          <DCArtboard id="about" label="About / Our pack" width={1100} height={1180}>
            <PageAbout />
          </DCArtboard>
          <DCArtboard id="events" label="Events & calendar" width={1100} height={1280}>
            <PageEvents />
          </DCArtboard>
          <DCArtboard id="join" label="Join · multi-step" width={1100} height={1080}>
            <PageJoin />
          </DCArtboard>
          <DCArtboard id="resources" label="Resources & forms" width={1100} height={1480}>
            <PageResources />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
