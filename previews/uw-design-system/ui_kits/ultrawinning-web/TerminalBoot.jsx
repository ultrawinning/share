const { useState: useStateT, useEffect: useEffectT, useRef: useRefT } = React;

function TerminalBoot({ onOpenWriting }) {
  const C = window.UW.color;
  const F = window.UW.font;
  const [sysLines, setSys] = useStateT([]);
  const [state, setState] = useStateT('idle');
  const [projects, setProjects] = useStateT([]);
  const [hintVisible, setHintVisible] = useStateT(false);

  const PROJECTS = [
    { name: 'HPFHQ', desc: '// Elite growth operator dashboard and hub', href: '/hpfhq/' },
    { name: 'MEDUS', desc: '// Hive intelligence feeding the agent swarm', href: '#' },
    { name: 'NOVA', desc: '// The autonomous agent. Codename: AGENT X', href: '#' },
    { name: 'PROMPTSCORE', desc: '// Track your tokens. Beat your friends', href: '#' },
  ];

  useEffectT(() => {
    const boot = [
      { l: 'System:', v: 'ULTRAWINNING v1.0.0' },
      { l: 'Node:', v: 'REMOTE-01' },
      { l: 'Location:', v: 'SOMEWHERE ON EARTH' },
      { l: 'Status:', v: 'OPERATIONAL' },
    ];
    let i = 0;
    const id = setInterval(() => {
      const next = boot[i];
      if (!next) { clearInterval(id); setTimeout(() => setHintVisible(true), 300); return; }
      setSys(s => [...s, next]);
      i++;
    }, 180);
    return () => clearInterval(id);
  }, []);

  useEffectT(() => {
    const onKey = (e) => {
      if (e.key !== 'Enter') return;
      if (state === 'idle') loadProjects();
      else if (state === 'loaded') reset();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state]);

  const loadProjects = () => {
    setState('loading');
    setHintVisible(false);
    let i = 0;
    const add = () => {
      if (i >= PROJECTS.length) { setState('loaded'); setHintVisible(true); return; }
      setProjects(p => [...p, PROJECTS[i]]); i++;
      setTimeout(add, 140);
    };
    add();
  };
  const reset = () => { setState('idle'); setProjects([]); setHintVisible(false); setTimeout(() => setHintVisible(true), 250); };

  return (
    <div style={{ padding: '100px 64px 60px', maxWidth: 960 }}>
      <div style={{ fontFamily: F.mono, fontSize: '.88rem', color: C.muted, lineHeight: 1.7, marginBottom: 18 }}>
        {sysLines.map((s, i) => (
          <div key={i}>{s.l} <span style={{ color: '#666' }}>{s.v}</span></div>
        ))}
      </div>
      {state !== 'loaded' && (
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.1rem', fontFamily: F.mono, marginTop: 4 }}>
          <span style={{ color: C.pink, marginRight: 8 }}>&gt;</span>
          <span className="uw-blink" style={{ color: C.pink }}>_</span>
        </div>
      )}
      <div onClick={() => { if (state === 'idle') loadProjects(); else if (state === 'loaded') reset(); }}
           style={{
             marginTop: 28, fontFamily: F.mono, fontSize: '.72rem', color: C.muted,
             letterSpacing: '.22em', textTransform: 'uppercase',
             opacity: hintVisible ? 1 : 0, transition: 'opacity .8s ease', cursor: 'pointer', padding: '12px 0',
           }}>
        // press enter to {state === 'loaded' ? 'reset' : 'initialize'}
      </div>
      {state !== 'idle' && (
        <div style={{ marginTop: 12, fontFamily: F.mono, fontSize: '.88rem', color: C.muted, lineHeight: 1.8 }}>
          <div><span style={{ color: C.pink }}>&gt;</span> initializing...</div>
          <div><span style={{ color: C.pink }}>&gt;</span> {PROJECTS.length} projects found</div>
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        {projects.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid transparent', cursor: 'pointer', opacity: 1, fontFamily: F.mono }}
               onMouseOver={e => e.currentTarget.style.borderBottomColor = 'rgba(255,26,140,0.3)'}
               onMouseOut={e => e.currentTarget.style.borderBottomColor = 'transparent'}>
            <span style={{ color: C.pink, marginRight: 14, fontSize: '.88rem', minWidth: 24 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: F.display, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.title, marginRight: 10, fontSize: '1.05rem' }}>
              {p.name}
            </span>
            <span style={{ color: C.muted, fontSize: '.88rem', flex: 1 }}>{p.desc}</span>
            <span style={{ color: C.muted, marginLeft: 16 }}>→</span>
          </div>
        ))}
        {state === 'loaded' && <span className="uw-blink" style={{ color: C.pink, fontFamily: F.mono, fontSize: '.9rem', marginTop: 10, display: 'inline-block' }}>_</span>}
      </div>
    </div>
  );
}
window.TerminalBoot = TerminalBoot;
