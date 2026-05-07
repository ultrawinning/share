const { useState, useEffect } = React;

function Nav({ onNav, scrolled }) {
  const C = window.UW.color;
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '18px 64px', display: 'flex', alignItems: 'center', gap: 0,
      background: scrolled ? 'rgba(0,0,0,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.borderSoft}` : '1px solid transparent',
      transition: 'background .3s, border-color .3s',
    }}>
      <a onClick={(e) => { e.preventDefault(); onNav('home'); }}
         style={{ display: 'flex', alignItems: 'center', padding: 8, cursor: 'pointer', textDecoration: 'none' }}>
        <svg width="28" height="20" viewBox="0 0 11 8" style={{ imageRendering: 'pixelated', display: 'block' }}>
          {[[2,0],[8,0],[3,1],[7,1]].map(([x,y],i) =>
            <rect key={i} x={x} y={y} width="1" height="1" fill={C.pink} />)}
          <rect x="2" y="2" width="7" height="1" fill={C.pink}/>
          <rect x="1" y="3" width="2" height="1" fill={C.pink}/>
          <rect x="4" y="3" width="3" height="1" fill={C.pink}/>
          <rect x="8" y="3" width="2" height="1" fill={C.pink}/>
          <rect x="0" y="4" width="11" height="1" fill={C.pink}/>
          <rect x="0" y="5" width="1" height="1" fill={C.pink}/>
          <rect x="2" y="5" width="7" height="1" fill={C.pink}/>
          <rect x="10" y="5" width="1" height="1" fill={C.pink}/>
          <rect x="0" y="6" width="1" height="1" fill={C.pink}/>
          <rect x="2" y="6" width="1" height="1" fill={C.pink}/>
          <rect x="8" y="6" width="1" height="1" fill={C.pink}/>
          <rect x="10" y="6" width="1" height="1" fill={C.pink}/>
          <rect x="3" y="7" width="2" height="1" fill={C.pink}/>
          <rect x="6" y="7" width="2" height="1" fill={C.pink}/>
        </svg>
      </a>
      <a onClick={(e) => { e.preventDefault(); onNav('writing'); }}
         style={{
          fontFamily: window.UW.font.display, fontSize: 22, fontWeight: 500,
          letterSpacing: '.2em', textTransform: 'uppercase', color: C.title,
          textDecoration: 'none', cursor: 'pointer', padding: '8px 0', marginLeft: 10,
          whiteSpace: 'nowrap',
         }}>
        ULTRAWINNING<span className="uw-blink" style={{ color: C.pink, marginLeft: 6 }}>_</span>
      </a>
    </nav>
  );
}
window.Nav = Nav;
