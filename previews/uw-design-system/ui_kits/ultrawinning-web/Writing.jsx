function Writing({ onBack, onOpenArticle }) {
  const C = window.UW.color, F = window.UW.font;
  const [tab, setTab] = React.useState('essays');
  const [q, setQ] = React.useState('');

  const ESSAYS = [
    { t: "95% of my happiness is these 5 things, so why am I still hustling?", u: "#", local: true },
    { t: "Why I closed down a $50k a month business instead of letting it run on autopilot", u: "#", local: true },
    { t: "I just completed RimWorld and learned a poignant lesson that changed my…", u: "#", local: true },
    { t: "Building a Second Brain… and Why I Didn't", u: "#", local: true },
    { t: "My puppy is entirely predictable (and you are too) — why 'free will' doesn't exist", u: "#", local: true },
    { t: "Medium is a Ponzi scheme — I just need to decide if I'm okay with it", u: "#", local: true },
    { t: "Churros & Ritalin: 2 Lessons From Utterly Failing at \"Monk Mode\"", u: "#", local: true },
    { t: "Beware of free stuff — it costs you a lot more than you think", u: "#", local: true },
    { t: "I decided to go 'monk mode' and realized it was actually my ideal life", u: "#", local: true },
  ];
  const TECH = [ { t: "The Moat Is Not the Model", u: "moat", local: true } ];
  const src = tab === 'essays' ? ESSAYS : TECH;
  const list = q ? src.filter(a => a.t.toLowerCase().includes(q.toLowerCase())) : src;

  return (
    <div style={{ padding: '80px 64px 60px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <a onClick={(e) => { e.preventDefault(); onBack(); }}
         style={{ fontFamily: F.display, fontSize: '.68rem', color: C.muted, cursor: 'pointer', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 44, display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        ← back
      </a>
      <div style={{ fontFamily: F.display, fontSize: '2rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.title, margin: '18px 0 6px' }}>Writing</div>
      <div style={{ fontFamily: F.mono, fontSize: '.68rem', color: C.muted, letterSpacing: '.12em', marginBottom: 40 }}>// essays &amp; technical</div>
      <div style={{ display: 'flex', gap: 20, marginBottom: 24, fontFamily: F.mono, fontSize: '.68rem', letterSpacing: '.12em' }}>
        {['essays', 'technical'].map(k => (
          <span key={k} onClick={() => { setTab(k); setQ(''); }}
            style={{ cursor: 'pointer', color: tab === k ? C.pink : C.muted, padding: '4px 0' }}>
            // {k}
          </span>
        ))}
      </div>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="// search articles..." autoComplete="off"
        style={{
          width: '100%', maxWidth: 640, background: 'transparent', border: 'none',
          borderBottom: `1px solid ${C.border}`, padding: '10px 0', color: C.title,
          fontFamily: F.mono, fontSize: '.78rem', outline: 'none', letterSpacing: '.1em', marginBottom: 28, display: 'block',
        }} />
      <div style={{ maxWidth: 640 }}>
        {list.length === 0 && <div style={{ fontFamily: F.mono, fontSize: '.68rem', color: C.muted, padding: '20px 0' }}>// no results.</div>}
        {list.map((a, i) => (
          <div key={i} style={{ padding: '2px 0' }}>
            <span style={{ color: C.muted, marginRight: 10, fontSize: '.75rem' }}>•</span>
            <a onClick={(e) => { e.preventDefault(); onOpenArticle(a); }}
              style={{ fontFamily: F.display, fontSize: '.92rem', fontWeight: 500, letterSpacing: '.03em', color: C.title, textDecoration: 'none', cursor: 'pointer', padding: '6px 0', display: 'inline-block' }}
              onMouseOver={e => e.currentTarget.style.color = C.pink}
              onMouseOut={e => e.currentTarget.style.color = C.title}>
              {a.local && <span style={{ color: C.pink, fontFamily: F.mono, fontSize: '.7rem' }}>// </span>}
              {a.t}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
window.Writing = Writing;
