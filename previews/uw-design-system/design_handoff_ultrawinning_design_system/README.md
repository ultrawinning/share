# Handoff: Ultrawinning Design System

## Overview

This package is the complete design system for **Ultrawinning** — Emil Hodzovic's personal site and content brand (ultrawinning.com). It covers the website (essays, projects, leaderboard, homepage), and a set of social-media templates (IG story, IG post, IG carousel, 16:9 pull-quote card).

The aesthetic is **terminal-adjacent, dark-mode-first, pink-accented, minimal**. Sharp rectangles, one accent color, three fonts, no rounded corners, no shadows, no gradients (except a single ambient pink glow), no emoji, no stock photography.

## About the Design Files

The HTML files in this bundle are **design references** — prototypes that show intended look and behavior, not production code to ship as-is. The implementation task is to **recreate these designs in the target codebase's existing environment** (React/Next.js, Vue, SwiftUI, native, etc.) using its established patterns and libraries. If no environment exists yet, pick the most appropriate framework for the project (the reference implementation under `reference_implementation/` is plain React via Babel-in-browser, suitable as a guide but not a production architecture).

`tokens/colors_and_type.css` and `tokens/fonts.css` **are** production-grade and can be lifted directly into a real codebase as CSS variables.

## Fidelity

**High-fidelity.** Every color is exact. Every font size, weight, line-height, letter-spacing is lifted from the live site. Spacing and motion values are pinned. Recreate pixel-perfectly.

---

## Design Tokens

All tokens live in `tokens/colors_and_type.css` as CSS custom properties. Quick reference:

### Color

| Token | Value | Usage |
| --- | --- | --- |
| `--uw-bg` | `#000` | Primary background, dark mode |
| `--uw-bg-light` | `#fff` | Primary background, light mode |
| `--uw-fg` | `#ccc` | Body text, dark mode |
| `--uw-title` | `#f0ede8` | Headings, dark mode |
| `--uw-muted` | `#888` | Secondary text, dark |
| `--uw-border` | `#222` | Borders & row dividers, dark |
| `--uw-border-strong` | `#1a1a1a` | Table rows |
| `--uw-footer` | `#333` | Footer slug, dark |
| `--uw-fg-light` | `#000` | Body text, light mode |
| `--uw-muted-light` | `#666` | Secondary text, light |
| `--uw-border-light` | `#ddd` | Borders, light |
| `--uw-footer-light` | `#ccc` | Footer slug, light |
| `--uw-pink` | `#ff1a8c` | **The only accent color.** Used for links, the cursor, the pink hr, the pixel mark, the highlight on `<em>` |
| `--uw-pink-dim` | `rgba(255,26,140,.1)` | Chip backgrounds, "you" tag |
| `--uw-pink-overlay` | `rgba(255,26,140,.05)` | Blockquote bg, hover row |
| `--uw-pink-ghost` | `rgba(255,10,138,.09)` | Ghost masthead cursor |
| `--uw-pink-link` | `#ff5fa9` | Article-page inline links (softer pink for readability against prose) |
| `--uw-ghost` | `rgba(255,255,255,.05)` | Ghost wordmark body, dark |
| `--uw-scanline` | `rgba(255,255,255,.007)` | Scanline overlay |

**Hard rule:** pink is the *only* accent. Never two accents. Never a pink fill behind a block. Never a pink gradient.

### Typography

Three families, three jobs. Do not introduce a fourth.

| Family | Weights | Job |
| --- | --- | --- |
| **Rajdhani** | 300, 400, 500, 600, 700 | UI, headings, nav, meta, pull-quotes, **wordmark** (logo / ghost / footer slug / any `ultrawinning.com` reference). Wordmark uses 500 + `.18em` tracking, uppercase. |
| **Share Tech Mono** | regular | Terminal chrome only — `System:` lines, `// comment` tags, `> _` prompts, slide counters, date/meta slugs, code. |
| **Verdana** (system) | regular | Article body prose only. Intentionally retro, Paul-Graham-coded. Never use in UI. |

**Canonical sizes:**
- title `17px`
- short-form body (homepage blurbs, cards) `13px`
- **article-page body `14px` / line-height `1.6` / paragraph margin `18px`** (readability-tuned, distinct from short-form body)
- meta `12px`
- footer slug `11px`
- ghost masthead `108px` desktop / `64px` mobile

**Tracking:**
- `--tr-ui: 0.1em` — most uppercase UI
- `--tr-wordmark: 0.18em` — wordmark + nav
- `--tr-ui-widest: 0.22em` — section eyebrows
- prose: default

**Line height:**
- terminal log `1.7`
- title `1.35`
- article body `1.6`
- short-form body: default

**Column:** prose caps at `435px`. Do not widen. Forces short lines.

### Spacing

| Token | Value |
| --- | --- |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `24px` |
| `--space-6` | `32px` |
| `--space-7` | `48px` |
| `--space-8` | `64px` |
| `--pad-page-d` | `20px 28px 80px` (desktop page) |
| `--pad-page-m` | `16px 20px 60px` (mobile page) |

Breakpoint: **500px**. Mobile below.

### Border / Corner / Shadow

- `--radius: 0` everywhere. **No rounded corners ever.**
- `--border-w: 1px solid`. Color from the table above.
- **No drop shadows. No inner shadows. No glow.** (Single exception: leaderboard rank-1 chip — keep that contained.)
- Focus = border swaps to `--uw-pink`. That's it.

### Motion

- Linear, fast, minimal: `0.15s – 0.3s` ease.
- **Blinking underscore** — the `_` cursor after every ULTRAWINNING wordmark and on prompt lines. `1s step-end infinite`. Two-frame opacity 1 → 0.
- **Typewriter** — used once, on the homepage terminal boot. Never decoratively elsewhere.
- **Hover** — color shift to pink, *or* opacity `0.85`. No scale. No translate.
- **Press** — opacity `0.85`. Never shrink.
- **No bouncing, no eased curves, no staggered reveals.**

### Background treatments

- Solid `#000` (not dark grey).
- **Scanline overlay** — repeating-linear-gradient at `0deg`, `1px` of `rgba(255,255,255,.007 – .012)` every 5–7px. Dark mode only.
- **Radial pink glow** — once per page, anchored at the bottom: `radial-gradient(ellipse at 50% 95%, rgba(255,26,140,.07) 0%, transparent 60%)`. Ambient, low-intensity.
- **Ghost masthead** — huge faded `ULTRAWINNING_` wordmark in Rajdhani 500, uppercase, `.18em` tracking, body at ~5% opacity, cursor at ~9% pink. Sits behind article heroes and on social templates.
- **Social bloom** — every social template uses the same pink bloom recipe (see `social_templates/`):
  ```css
  background:
    radial-gradient(ellipse 75% 60% at 15% 100%, rgba(255,26,140,.45) 0%, rgba(255,26,140,.12) 30%, transparent 65%),
    radial-gradient(ellipse 100% 55% at 50% 110%, rgba(255,26,140,.22) 0%, transparent 70%);
  ```
- **No stock photography. No illustrations. No additional gradients.**

---

## Iconography

Ultrawinning is **deliberately anti-icon**. No icon library, no Lucide, no Heroicons.

1. **Pixel mark** (`assets/logo-mark.svg`, 11×8) — space-invader silhouette. Render with `image-rendering: pixelated`. Always pink (`#ff1a8c`). Appears in the nav and as favicon.
2. **Wordmark** (`assets/logo-wordmark.svg`) — `ULTRAWINNING` in Rajdhani 500 uppercase, `.18em` tracking, with a pink blinking `_` cursor. **Never render the wordmark without the cursor.**
3. **ASCII markers** —
   - `>` prompt (pink)
   - `>>` streak / active leader (pink)
   - `//` comment tag (pink, lowercase after)
   - `_` blinking cursor (pink)
   - `--` idle / dormant (muted grey)
4. **Unicode glyphs as UI icons** — `←` back, `→` forward, `↑` top, `•` bullet, `☀` dark-mode toggle, `☾` light-mode toggle.
5. **Emoji: never used.** Not for streaks, not for reactions, not in social posts. If a concept needs a glyph, use ASCII or unicode above.
6. If unicode + ASCII can't cover a need, **rethink the component instead of inventing an icon.**

---

## Voice & Copy

The brand voice is the most distinctive thing about Ultrawinning and must survive any UI implementation. Microcopy, error messages, empty states, button labels — all of it should pass these rules.

### Stance
- **First-person singular.** "I bought the Mac Mini." Never royal-we, never "as an industry."
- **Plainspoken.** One elevated word per section, max.
- **Self-aware without soft.**
- **Thinking in public, not summarizing.**

### Casing
- UI / NAV / BRAND → UPPERCASE with `.1em – .22em` tracking. Always.
- Article titles → Sentence or Title case. **Never ALL CAPS in titles.**
- Body prose → Sentence case. Contractions throughout (don't, it's, isn't).
- Terminal log → `>` prompts, `//` for comments, lowercase after `//`.

### Banned phrases
"leverage", "unlock", "seamless", "delve", "robust", "transformative", "game-changer", "Here's the thing", "In today's fast-paced world", tricolon closings, soft endings. See `SOURCE_README.md` for the full list and worked examples.

---

## Components

Every component below has a working example in `design_cards/` (design-system swatches) and `reference_implementation/ultrawinning-web/` (working React).

### Nav (fixed-top)
- Position: `fixed; top: 0`
- Padding: `18px 64px` desktop, `18px 24px` mobile
- Background: `transparent` by default; on scroll → `rgba(0,0,0,0.96)` + `backdrop-filter: blur(14px)` + 1px bottom border (`#1a1a1a`)
- Layout: `flex; align-items: center`
- Children: pixel mark (28×20), wordmark `ULTRAWINNING_` (Rajdhani 500, `.18em` tracking, 22px, color `#f0ede8`, pink blinking cursor)
- Hover on logo: opacity drop, no other effect
- File: `design_cards/nav.html`, `reference_implementation/ultrawinning-web/Nav.jsx`

### Buttons
- All variants: `border-radius: 0`. Sharp.
- Primary: 1px solid `#ff1a8c`, transparent bg, pink text, uppercase `.1em` tracking.
- Hover: bg `rgba(255,26,140,.1)`, no other change.
- Press: opacity `0.85`.
- Disabled: opacity `0.4`, cursor `not-allowed`.
- File: `design_cards/buttons.html`

### Inputs
- 1px solid `#222` (dark) / `#ddd` (light), bg transparent.
- Focus: border `#ff1a8c`. No glow, no shadow.
- Font: Rajdhani 400 for label, Verdana for value if it's prose-ish, Share Tech Mono if it's terminal-ish (e.g. command bar).
- File: `design_cards/inputs.html`

### Article hero
The signature composition. Every essay page uses it.
- Ghost masthead `ULTRAWINNING_` (huge, 108px desktop, ~5% opacity, Rajdhani 500, `.18em` tracking) absolutely positioned behind the title.
- Back-link `← ultrawinning` (12px Rajdhani, `.1em` tracking, uppercase, muted color).
- Title (17px Rajdhani 600, `1.35` line-height, color `#f0ede8`).
- Date / read-time meta (12px Rajdhani 500, `.08em` tracking, muted).
- Light/dark toggle (`☀` / `☾`).
- Pink horizontal rule: `60×1px`, color `#ff1a8c`, `margin: 0 0 32px`.
- Below the rule: prose column at exactly **435px wide**, Verdana 14/1.6 with paragraph gap 18px, link color `#ff5fa9`.
- Files: `design_cards/article-hero.html`, `design_cards/type-prose.html`, `reference_implementation/ultrawinning-web/Article.jsx`

### Homepage terminal boot
- Plain `<pre>`-style block, padding `100px 64px 60px`, max-width 960.
- Rows of `Label:` (Share Tech Mono `.8rem` muted) + `VALUE` (Share Tech Mono `.8rem` `#f0ede8`).
- After boot completes: `> _` prompt with the blinking pink cursor.
- File: `reference_implementation/ultrawinning-web/TerminalBoot.jsx`

### Writing list (homepage)
- Vertical list of articles. Each row: title (17px Rajdhani 600), date+read-time (12px muted, Share Tech Mono for the date if styled as a slug), 1px row divider `#1a1a1a`.
- Hover row: bg `rgba(255,255,255,.02)`. No scale, no border change.
- File: `design_cards/article-list.html`, `reference_implementation/ultrawinning-web/Writing.jsx`

### Blockquote
- Border-left `2px solid #ff1a8c`.
- Padding `8px 16px`.
- Background `rgba(255,26,140,0.05)`.
- `font-style: italic`, color `#f0ede8` (dark) / `#000` (light).
- File: `design_cards/blockquote.html`

### Leaderboard row
- Grid: `# | id | score | streak`.
- 1px row divider `#1a1a1a`.
- Streak marker: `>>` (pink) when active, `--` (muted) when idle. **Not 🔥 or 💤.** Emoji are forbidden.
- Hover row: bg `rgba(255,255,255,.02)`.
- File: `design_cards/leaderboard-row.html`

### Toggle (light/dark)
- Single character button. `☀` for "currently dark, click to go light", `☾` for the inverse.
- 14px, padding `2px`, no border, transparent bg, color `#888`, cursor pointer.
- File: any of the article cards.

### Social templates
Four sizes, one bloom recipe. See `social_templates/` for working HTML.
- **IG Story** — 1080×1920. Ghost masthead top, content centered, attribution row at bottom (left = `ultrawinning.com_` Rajdhani; right = `// 04 · 2026` Share Tech Mono).
- **IG Post** — 1080×1080. Same idea, smaller ghost.
- **IG Carousel (6 slides)** — 1080×1080 each. Cover slide has the pixel mark watermark big and faded; quote slides have a `01–06` counter (Share Tech Mono pink); outro has a CTA → `READ FULL ESSAY · ULTRAWINNING.COM/WRITING`.
- **Pull-quote** — 1200×675. 16:9 for Twitter/LinkedIn cards.

`social_templates/templates/` contains blank, ready-to-populate versions of story and post.

---

## Layout rules

- Everything is **left-aligned**. Long-form is never centered.
- Page padding: `var(--pad-page-d)` desktop, `var(--pad-page-m)` mobile.
- Wider gutter: `64px` horizontal on the homepage.
- Signature article composition — ghost masthead → title → 60px pink hr → 435px prose column. Repeat on every writing page.
- Mobile breakpoint: `500px`.

---

## State Management

The reference implementation uses a tiny page-router state in `App.jsx`:

- `page: 'home' | 'writing' | 'article'` — which view is rendered.
- `light: boolean` — light/dark toggle, applies only to `article` view. Persists in localStorage with key `uw-light`.
- `scrolled: boolean` — listens to `window.scroll` and triggers nav background.

No global store, no context, no router library — fine for the brochure-site use case. In a production app, swap for Next.js routing or your equivalent.

---

## Files in this bundle

```
design_handoff_ultrawinning_design_system/
├── README.md                           ← this file
├── SOURCE_README.md                    ← the long-form brand bible
├── SOURCE_SKILL.md                     ← agent-skill non-negotiables (good system prompt material)
│
├── tokens/
│   ├── colors_and_type.css             ← all CSS custom properties (lift directly)
│   ├── fonts.css                       ← @font-face block for the bundled TTFs
│   └── fonts/
│       ├── Rajdhani-Light.ttf          (300)
│       ├── Rajdhani-Regular.ttf        (400)
│       ├── Rajdhani-Medium.ttf         (500)
│       ├── Rajdhani-SemiBold.ttf       (600)
│       ├── Rajdhani-Bold.ttf           (700)
│       └── ShareTechMono-Regular.ttf
│
├── assets/
│   ├── favicon.svg                     ← pixel space-invader, pink
│   ├── logo-mark.svg                   ← same mark, scalable, 11×8 viewBox
│   ├── logo-wordmark.svg               ← ULTRAWINNING_ in Rajdhani 500
│   ├── reference-home.png              ← live-site screenshot
│   └── reference-article.png           ← live-site screenshot
│
├── reference_implementation/
│   └── ultrawinning-web/               ← working React (Babel-in-browser) recreation
│       ├── index.html                  ← entry point — open this to run
│       ├── App.jsx                     ← page router
│       ├── Nav.jsx                     ← fixed-top nav with wordmark + pixel mark
│       ├── TerminalBoot.jsx            ← homepage typewriter boot sequence
│       ├── Writing.jsx                 ← article-list view
│       ├── Article.jsx                 ← single-article view (ghost masthead + prose)
│       ├── tokens.js                   ← inline shared color/font tokens
│       └── README.md                   ← notes on the kit
│
├── design_cards/                       ← visual reference for each token cluster
│   ├── colors-dark.html
│   ├── colors-light.html
│   ├── colors-pink.html
│   ├── type-families.html
│   ├── type-scale.html
│   ├── type-prose.html
│   ├── spacing.html
│   ├── backgrounds.html
│   ├── overlays.html
│   ├── logo.html
│   ├── nav.html
│   ├── buttons.html
│   ├── inputs.html
│   ├── blockquote.html
│   ├── article-hero.html
│   ├── article-list.html
│   ├── leaderboard-row.html
│   ├── terminal-lines.html
│   ├── iconography.html
│   ├── voice.html
│   └── _card.css                       ← shared card chrome (delete in production)
│
└── social_templates/
    ├── ig-story.html                   ← 1080×1920, populated example
    ├── ig-post.html                    ← 1080×1080, populated example
    ├── ig-carousel.html                ← 6 slides, populated example
    ├── pullquote-1200x675.html         ← 16:9 example
    └── templates/
        ├── story-template.html         ← blank, ready to populate
        ├── post-template.html          ← blank, ready to populate
        └── README.md
```

---

## Recommended implementation order

1. **Lift `tokens/colors_and_type.css` and `tokens/fonts.css` into the codebase**. Self-host the TTFs from `tokens/fonts/` (do not pull from Google Fonts in production — the site self-hosts these).
2. **Build the wordmark + nav** as the first component. Get this perfect — every page wears it.
3. **Build the article hero composition** (ghost masthead → title → pink rule → 435px prose column). This is the signature visual.
4. **Build the homepage** (terminal boot + writing list). Steal directly from `reference_implementation/`.
5. **Wire interactions** (light/dark toggle on articles, scrolled nav state, blinking cursor animation).
6. **Cross-check against `design_cards/`** — every preview file is a single-component swatch. Use them as the acceptance test.

## Acceptance checks for the developer

- [ ] No emoji anywhere in the rendered UI.
- [ ] No `border-radius` other than `0`.
- [ ] No `box-shadow` rules anywhere.
- [ ] No gradients other than the single ambient pink glow + scanline + social bloom.
- [ ] Pink (`#ff1a8c`) is used only as accent — never as a fill, never as a gradient stop in primary content.
- [ ] Every `ULTRAWINNING` wordmark is followed by a blinking pink `_` cursor.
- [ ] Article prose column is exactly `435px`, Verdana 14/1.6, paragraph margin 18px.
- [ ] Article inline links are `#ff5fa9`.
- [ ] Nav wordmark is Rajdhani 500, `.18em` tracking — *not* Share Tech Mono.
- [ ] Terminal log lines and `// comment` tags are Share Tech Mono — *not* Rajdhani.
- [ ] Mobile breakpoint at `500px`. Below, ghost masthead drops to `64px`.
- [ ] Streak indicators on leaderboards are `>>` and `--`. Not 🔥 / 💤.

---

## Brand assets — provenance

The brand assets in `assets/` are owned by Emil Hodzovic / Ultrawinning. Use them only for the Ultrawinning brand. Do not reuse for unrelated projects.

The fonts in `tokens/fonts/` are licensed under the SIL Open Font License (Rajdhani) and SIL OFL (Share Tech Mono) — both safe to redistribute and self-host.
