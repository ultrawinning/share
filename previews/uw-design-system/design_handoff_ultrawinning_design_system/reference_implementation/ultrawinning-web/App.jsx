function App() {
  const [screen, setScreen] = React.useState('home');
  const [light, setLight] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* backdrops */}
      {screen !== 'article' && (
        <>
          <div style={{
            position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.007) 3px, rgba(255,255,255,0.007) 4px)',
          }} />
          <div style={{
            position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 95%, rgba(255,26,140,0.07) 0%, transparent 60%)',
          }} />
        </>
      )}
      {screen !== 'article' && <Nav onNav={setScreen} scrolled={scrolled} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {screen === 'home' && <TerminalBoot />}
        {screen === 'writing' && <Writing onBack={() => setScreen('home')} onOpenArticle={() => setScreen('article')} />}
        {screen === 'article' && <Article onBack={() => setScreen('writing')} light={light} onToggle={() => setLight(l => !l)} />}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
