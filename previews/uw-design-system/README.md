# Ultrawinning Design System

Design system for **Ultrawinning** — the personal site and content brand of Emil Hodzovic. Terminal-adjacent, dark-mode-first, pink-accented, minimal.

Produces assets across:
- **Website** — ultrawinning.com (essays, technical writing, projects, leaderboard)
- **IG stories** (9:16, 1080×1920)
- **IG posts & carousels** (1:1, 1080×1080)
- **Pull-quote graphics** (16:9 twitter/linkedin cards)

## Sources consulted

- **Codebase** — `ultrawinning/ultrawinning` (GitHub, private). Key files read:
  - `Ultrawinning/index.html` — homepage with terminal boot
  - `Ultrawinning/writing/the-moat-is-not-the-model/index.html` — canonical article template
  - `Ultrawinning/writing/_system/voice_profile.md`, `anti_slop_rules.md`, `editorial_spec.md`, `examples.md`, `claims_policy.md`
  - `Ultrawinning/CLAUDE.md`, `Ultrawinning/writing/CLAUDE.md`
- **Screenshots** — `assets/reference-home.png`, `assets/reference-article.png` (from the live site)
- **Brand assets** — uploaded favicon, Rajdhani + Share Tech Mono TTFs (stored in `/fonts`)

Reference article (canonical reference for tokens): https://ultrawinning.com/writing/the-moat-is-not-the-model

---

## Index

- `README.md` — this file
- `SKILL.md` — Agent-Skill entry point
- `colors_and_type.css` — CSS variables for colors, type, spacing, motion
- `fonts.css` — `@font-face` block for the bundled TTFs
- `fonts/` — Rajdhani (5 weights) + Share Tech Mono
- `assets/` — favicon, logo mark (SVG), logo wordmark (SVG), live-site reference screenshots
- `preview/` — design-system cards (one per token / component cluster)
- `ui_kits/ultrawinning-web/` — React recreation of ultrawinning.com
- `social/` — template pages for IG story, post, carousel, pull-quote card

---

## CONTENT FUNDAMENTALS

Emil's voice is the single most distinctive thing about Ultrawinning. It's **direct, high-agency, slightly mischievous, never corporate**. Copy should read like someone thinking in public, not performing authority.

### Tone & stance
- **First-person singular.** "I bought the Mac Mini. I followed the LLM arms race." Never royal-we, never "as an industry."
- **Address the reader directly when challenging them.** "But that is upside down."
- **Plainspoken.** One elevated word per section, max. No consultant sludge.
- **Self-aware without soft.** Self-deprecation only when real — never performative.
- **Thinking in public, not summarizing.** Build the argument as you go. Avoid thesis-first openings.

### Structural moves
- **Open inside tension, observation, or a moment.** Not "In today's world…" — never.
- **Short staccato sentences as resets.** Followed by longer explanatory builds.
- **One concrete analogy per piece, mined fully.** Not three.
- **End decisively.** No "but maybe I'm wrong" hedge after the point is already made.

### Casing
- **UI / NAV / BRAND** → UPPERCASE with wide letter-spacing (`.1em` – `.22em`). Always.
- **Article titles** → Sentence case ("The Moat Is Not the Model" uses Title Case; essays often Sentence case). Never ALL CAPS in titles.
- **Body prose** → Sentence case. Contractions throughout (don't, it's, isn't).
- **Terminal log** → `>` prompts, `//` for comments, lowercase after `//`.

### Emoji & symbols
- **Emoji: never.** No exceptions — not even for streaks or idle states. All icons are ASCII or unicode line glyphs.
- **Unicode glyphs as iconography** — `←` `→` `↑` `•` `☀` `☾`. These stand in for icons.
- **ASCII motifs do the heavy lifting** — `>` `>>` `_` `//` `--` `01` `02` etc.

### Anti-slop (ban on sight)
"leverage", "unlock", "seamless", "delve", "robust", "transformative", "game-changer", "Here's the thing", "In today's fast-paced world", "Three things I believe", tricolon closings, motivational-guru tone, repeated thesis restatement, soft endings, electricity metaphors.

### Worked examples
- **Good open**: *"I used to think the hard part was deciding what I wanted. It wasn't. The hard part was admitting I already knew."*
- **Bad open**: *"Success in modern life often comes down to intentionality, systems, and understanding your values."*
- **Good close**: *"This is the moat. This will decide if you win or lose."*
- **Bad close**: *"Of course, I could be wrong, and maybe this is just where I am right now."*

---

## VISUAL FOUNDATIONS

A small, rigorous system. Sharp rectangles, one pink accent, three fonts. Do not add more.

### Colors
- **Dark is default.** Light mode is opt-in via a `☀/☾` toggle, writing pages only.
- **Dark surfaces**: bg `#000`, body `#ccc`, title `#f0ede8`, muted `#888`, border `#222`, footer `#333`, scanline `rgba(255,255,255,.007)`.
- **Light surfaces**: bg `#fff`, body/title `#000`, muted `#666`, border `#ddd`, footer `#ccc`.
- **Pink `#ff1a8c` is the only accent.** Used for links, separators, prompts, the cursor, the pixel mark, highlights. Never as a background fill. Never as a gradient. Never duplicated.
- **Pink scales**: solid `#ff1a8c` · dim `rgba(255,26,140,.1)` (chips, "you" tag) · overlay `rgba(255,26,140,.05)` (blockquote bg, hover row) · ghost `rgba(255,10,138,.09)` (masthead cursor).

### Type
- **Rajdhani** — wordmark (logo / ghost / footer / any `ultrawinning.com` reference), UI, headings, nav, meta, pull-quotes. Weights 400/500/600/700. The wordmark uses 500 weight + `.18em` tracking uppercase.
- **Share Tech Mono** — terminal log lines (`System:`, `Node:`, `> _`), `// comment` tags, slide counters, date/meta slugs, code.
- **Verdana (system)** — article body prose only. Intentionally retro, Paul-Graham-coded. Never use Verdana in UI chrome.
- **Canonical sizes**: title 17px · body 13px · meta 12px · footer 11px · ghost masthead 108/64px (desktop/mobile).
- **Tracking**: UI is spacious (`.1em` – `.22em`). Prose is default.
- **Line height**: UI `1.7` (terminal log), title `1.35`, prose default (intentionally tight — forces short lines).
- **Column**: prose caps at **435px**. Do not widen.

### Backgrounds
- **Solid black, not dark grey.** `#000` literally.
- **Scanline overlay** — very subtle (`.7%` opacity) repeating 1px gradient. Dark mode only.
- **Radial pink glow** — once per page at bottom (`radial-gradient(ellipse at 50% 95%, rgba(255,26,140,.07) 0%, transparent 60%)`). Ambient.
- **Ghost masthead** — huge faded `ULTRAWINNING` wordmark in Rajdhani 500 (uppercase, `.18em` tracking) behind article heroes at ~5% opacity, with a pink blinking underscore at ~9%.
- **No stock photography. No illustrations. No gradients beyond the one radial glow.**

### Iconography
- **Pixel mark** — the 11×8 space-invader at `assets/logo-mark.svg`. Rendered with `image-rendering: pixelated`.
- **ASCII-first** — use `>` `_` `//` before reaching for icons.
- **Unicode glyphs** substitute for icons: `←` `→` `↑` `•` `☀` `☾`.
- **No icon font, no Lucide, no Heroicons.** If a glyph doesn't exist in unicode and ASCII doesn't cover it, invent nothing — rethink the component.

### Motion
- Linear, fast, minimal. `.15s – .3s` ease.
- **Blinking underscore** `_` — 1s step-end infinite. Sits after every ULTRAWINNING instance and on prompt lines.
- **Typewriter** — used once, on home boot. Never decoratively.
- **Hover** — color shift to pink, or opacity drop to `.85`. No scaling. No glow (except on the leaderboard rank-1 chip).
- **No bouncing, no easing curves, no staggered reveals.**

### Borders & cards
- **Corner radius: `0`, everywhere.** No rounded corners.
- **Borders: 1px, solid.** `#222` dark / `#ddd` light for chrome, `#ff1a8c` for focus and the title rule.
- **Cards as such don't exist.** Sections are set off by the pink `60×1px` horizontal rule, or by 1px row dividers. No drop shadows. No glow. No inner shadows.
- **Focus state**: border swaps to pink. That's it.
- **Hover row**: background becomes `rgba(255,255,255,.02)` (dark) or `rgba(0,0,0,.02)` (light). No scale, no lift.
- **Press state**: opacity `.85`. Never shrink.

### Transparency & blur
- **Used once**: scrolled nav gets `rgba(0,0,0,.96) + backdrop-filter: blur(14px)` and a 1px border-bottom appears. Nothing else in the system uses blur.

### Layout
- **Everything is left-aligned.** Long-form is never centered.
- **Fixed top nav**, transparent by default.
- **Page padding**: `20px 28px 80px` desktop, `16px 20px 60px` mobile. Breakpoint at 500px.
- **Gutter on wider pages**: `64px` horizontal.
- **Signature composition** — ghost masthead stacked behind title → 60px pink hr → tight prose column. Repeated on every writing page.

### Aspect ratios (social)
- IG Story / Reel cover: 9:16 (1080×1920)
- IG Post / Carousel slide: 1:1 (1080×1080)
- Twitter / LinkedIn card: 16:9 (1200×675)

---

## ICONOGRAPHY

Ultrawinning's iconography is **deliberately anti-icon**. Where other brands reach for Lucide or Heroicons, Ultrawinning uses ASCII, unicode glyphs, and one pixel-art mark. That's the whole system.

1. **Pixel mark** (`assets/logo-mark.svg`, 11×8) — the space-invader. Always rendered with `image-rendering: pixelated`. Always in the brand pink `#ff1a8c`. Appears in the nav bar and as favicon.
2. **Wordmark** (`assets/logo-wordmark.svg`) — `ULTRAWINNING` in Rajdhani 500 uppercase with `.18em` tracking and a blinking pink `_` cursor. Same treatment across the logo asset, nav, ghost masthead, footer slug, and any on-screen `ultrawinning.com` reference. Never use the wordmark without the cursor.
3. **ASCII markers** — `>` (prompt, pink), `>>` (streak/active, pink), `//` (comment, pink), `_` (cursor, pink, blinking), `--` (idle/dormant, muted grey).
4. **Unicode glyphs as UI icons** — `←` back, `→` forward, `↑` top, `•` list-bullet, `☀` dark-mode toggle, `☾` light-mode toggle.
5. **Emoji** — never. Not used anywhere in the system, including leaderboards, reactions, or social posts. If a concept needs a glyph, use ASCII or unicode line chars above.
6. **No icon library is loaded anywhere.** If you need something icon-shaped that unicode doesn't cover, don't fake it with SVG — rethink the copy to not need an icon.
