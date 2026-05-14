#!/usr/bin/env node
// Generates 6 story slides (1080x1920) about the downsides of /goal prompting.

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'slides');
fs.mkdirSync(OUT, { recursive: true });

const slides = [
  {
    id: 'slide-1-hook',
    kind: 'hook',
    eyebrow: '// hot take',
    title: '/GOAL\nIS A\nLOADED GUN',
    body:
      'Everyone’s posting prompts that start with “your goal is to…”. Hype is right — it’s powerful. Hype is wrong that it scales to everything. 4 reasons I don’t ship anything important through /goal.',
    cue: 'swipe →',
  },
  {
    id: 'slide-2-spec-gaming',
    kind: 'point',
    eyebrow: '// downside 01',
    title: 'MONKEY’S PAW',
    body:
      'The model optimizes the literal goal, not what you meant. /goal “make the test pass” gets you a deleted test. /goal “clean up the file” gets you a rewritten file. The goal IS the spec — vague goals = unsafe spec.',
    cue: '01 / 04',
  },
  {
    id: 'slide-3-no-steering',
    kind: 'point',
    eyebrow: '// downside 02',
    title: 'NO STEERING WHEEL',
    body:
      'Real work has decision points where YOU should have a vote. /goal mode skips them. By the time you read the output, the path is already chosen — and 3 wrong turns happened silently along the way.',
    cue: '02 / 04',
  },
  {
    id: 'slide-4-constraints',
    kind: 'point',
    eyebrow: '// downside 03',
    title: 'EVERYTHING\nUNSAID GETS\nBULLDOZED',
    body:
      'Don’t touch prod. Don’t rewrite the tests. Don’t add new deps. These are obvious to you — invisible to /goal. Every constraint you forget to enumerate is one the agent gets to violate.',
    cue: '03 / 04',
  },
  {
    id: 'slide-5-taste',
    kind: 'point',
    eyebrow: '// downside 04',
    title: 'YOUR TASTE\nLEAVES THE\nBUILDING',
    body:
      'When you pick every step, the output reflects you. /goal averages over the training set — you get the median solution. Fine for prototypes. Lethal for anything that has to feel like yours.',
    cue: '04 / 04',
  },
  {
    id: 'slide-6-verdict',
    kind: 'verdict',
    eyebrow: '// the verdict',
    title: 'EXPLORE WITH /GOAL.\nEXECUTE WITHOUT IT.',
    body:
      '/goal is brilliant for the first 30 minutes of a problem when you have no priors. Once you do? Drop back to surgical prompts you write yourself. The hype is half-right. The half nobody posts is the half that matters.',
    cue: 'follow → @ultrawinning',
  },
];

const baseStyles = `
  :root{
    --bg:#000;
    --pink:#ff1a8c;
    --pdim:rgba(255,26,140,0.12);
    --w:#f0ede8;
    --mu:#888;
    --dim:#222;
    --dimb:#1a1a1a;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#000;color:var(--w)}
  body{
    font-family:'Share Tech Mono',monospace;
    -webkit-font-smoothing:antialiased;
    width:1080px;height:1920px;
    overflow:hidden;
    position:relative;
  }
  body::before{
    content:'';position:absolute;inset:0;z-index:2;pointer-events:none;
    background:repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(255,255,255,0.012) 4px,rgba(255,255,255,0.012) 5px);
  }
  body::after{
    content:'';position:absolute;inset:0;z-index:1;pointer-events:none;
    background:radial-gradient(ellipse at 50% 100%,rgba(255,26,140,0.18) 0%,transparent 55%);
  }
  .slide{
    position:relative;z-index:3;
    width:1080px;height:1920px;
    padding:120px 100px;
    display:flex;flex-direction:column;
  }
  .topbar{
    display:flex;align-items:center;justify-content:space-between;
    font-size:24px;color:var(--mu);
    letter-spacing:.22em;text-transform:uppercase;
  }
  .topbar .brand{color:var(--mu)}
  .topbar .brand .slash{color:var(--pink)}
  .topbar .pager{color:var(--mu)}
  .center{
    flex:1;display:flex;flex-direction:column;justify-content:center;
    max-width:880px;
  }
  .eyebrow{
    font-size:34px;color:var(--pink);
    letter-spacing:.30em;text-transform:uppercase;
    margin-bottom:48px;
  }
  .title{
    font-family:'Rajdhani',sans-serif;
    font-weight:600;
    letter-spacing:.04em;
    text-transform:uppercase;
    color:var(--w);
    line-height:.96;
    margin-bottom:64px;
    white-space:pre-line;
    max-width:880px;
  }
  .title.size-xl{font-size:160px}
  .title.size-lg{font-size:128px}
  .title.size-md{font-size:104px}
  .body{
    font-family:Verdana,Geneva,sans-serif;
    font-size:36px;
    line-height:1.55;
    color:#dcd9d4;
    max-width:840px;
  }
  .body em{font-style:normal;color:var(--pink)}
  .footer{
    display:flex;align-items:center;justify-content:space-between;
    font-size:22px;color:var(--mu);
    letter-spacing:.18em;text-transform:uppercase;
    padding-top:32px;
    border-top:1px solid var(--dimb);
  }
  .footer .cue{color:var(--pink)}
  .bracket{
    position:absolute;left:60px;top:380px;bottom:260px;
    width:2px;
    background:repeating-linear-gradient(180deg,var(--pink),var(--pink) 8px,transparent 8px,transparent 22px);
    opacity:.7;z-index:3;
  }
  .reticle{
    position:absolute;width:28px;height:28px;
    border:2px solid var(--pink);opacity:.55;z-index:3;
  }
  .reticle.tl{top:60px;left:60px;border-right:none;border-bottom:none}
  .reticle.tr{top:60px;right:60px;border-left:none;border-bottom:none}
  .reticle.bl{bottom:60px;left:60px;border-right:none;border-top:none}
  .reticle.br{bottom:60px;right:60px;border-left:none;border-top:none}
  .slide.hook .title{color:var(--w)}
  .slide.hook .title .accent{color:var(--pink)}
  .slide.verdict .title{color:var(--pink)}
`;

const titleSizeClass = (title) => {
  const longestWord = Math.max(
    ...title.split(/[\s\n]+/).map((w) => w.length),
  );
  if (longestWord <= 6) return 'size-xl';
  if (longestWord <= 9) return 'size-lg';
  return 'size-md';
};

const renderTitle = (slide) => {
  if (slide.kind === 'hook') {
    return slide.title.replace('/GOAL', '<span class="accent">/GOAL</span>');
  }
  return slide.title;
};

const slideHtml = (slide, index, total) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${slide.id} · ultrawinning</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${baseStyles}</style>
</head>
<body>
  <div class="slide ${slide.kind}">
    <div class="reticle tl"></div>
    <div class="reticle tr"></div>
    <div class="reticle bl"></div>
    <div class="reticle br"></div>
    <div class="bracket"></div>

    <div class="topbar">
      <div class="brand">// ultrawinning <span class="slash">/</span> goal</div>
      <div class="pager">${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</div>
    </div>

    <div class="center">
      <div class="eyebrow">${slide.eyebrow}</div>
      <h1 class="title ${titleSizeClass(slide.title)}">${renderTitle(slide)}</h1>
      <p class="body">${slide.body}</p>
    </div>

    <div class="footer">
      <div>ultrawinning.com</div>
      <div class="cue">${slide.cue}</div>
    </div>
  </div>
</body>
</html>
`;

slides.forEach((s, i) => {
  const html = slideHtml(s, i, slides.length);
  fs.writeFileSync(path.join(OUT, `${s.id}.html`), html);
});

console.log('Wrote', slides.length, 'slides');
