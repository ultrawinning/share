function Article({ onBack, light, onToggle }) {
  const F = window.UW.font;
  const bg = light ? '#fff' : '#0a0a0a';
  const fg = light ? '#000' : '#ccc';
  const title = light ? '#000' : '#f0ede8';
  const muted = light ? '#666' : '#888';
  const border = light ? '#ddd' : '#222';
  const ghost = light ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  const pinkGhost = light ? 'rgba(255,10,138,.10)' : 'rgba(255,10,138,.09)';
  return (
    <div style={{ background: bg, color: fg, minHeight: '100vh', position: 'relative' }}>
      <div style={{ padding: '20px 28px 80px' }}>
        <div style={{ position: 'relative', width: 435, maxWidth: '100%', paddingTop: 90 }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, zIndex: 0,
            fontFamily: F.display, fontSize: 108, lineHeight: .9, fontWeight: 500,
            letterSpacing: '.18em', textTransform: 'uppercase', color: ghost,
            whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
          }}>
            ULTRAWINNING<span className="uw-blink" style={{ color: pinkGhost }}>_</span>
          </div>
          <a onClick={(e) => { e.preventDefault(); onBack(); }}
            style={{ position: 'relative', zIndex: 1, fontFamily: F.display, fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: muted, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>
            ← ultrawinning
          </a>
          <div style={{ position: 'relative', zIndex: 1, fontFamily: F.display, fontSize: 17, fontWeight: 600, lineHeight: 1.35, color: title, margin: '0 0 14px' }}>
            The Moat Is Not the Model
          </div>
          <div style={{ position: 'relative', zIndex: 1, fontFamily: F.display, fontSize: 12, letterSpacing: '.08em', color: muted, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>April 2026 · 5 min read</span>
            <button onClick={onToggle} style={{ fontSize: 14, cursor: 'pointer', background: 'none', border: 'none', color: muted, padding: 2, lineHeight: 1 }}>
              {light ? '☾' : '☀'}
            </button>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #ff1a8c', margin: '0 0 32px', width: 60, maxWidth: 60, position: 'relative', zIndex: 1 }} />
        </div>
        <div style={{ fontFamily: F.prose, fontSize: 14, lineHeight: 1.6, width: 435, maxWidth: '100%', color: fg }}>
          {[
            "Most people think the AI advantage will come from the model or agent layer.",
            "I think it will come from the knowledge layer.",
            "Not a pile of human-readable documents in a shared drive. Or a notes system with retrieval taped on top.",
            "I mean a governed system that gives intelligence a deep and accessible understanding of how your business actually works.",
            "That is a very different thing.",
          ].map((p, i) => <p key={i} style={{ margin: '0 0 18px' }}>{p}</p>)}
          <blockquote style={{ borderLeft: '2px solid #ff1a8c', padding: '8px 16px', margin: '1.3em 0', fontStyle: 'italic', background: 'rgba(255,26,140,0.05)', color: title }}>
            <p style={{ margin: 0 }}>This is the moat. This will decide if you win or lose.</p>
          </blockquote>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${border}`, fontFamily: F.display, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: light ? '#ccc' : '#333' }}>
          ultrawinning.com
        </div>
      </div>
    </div>
  );
}
window.Article = Article;
