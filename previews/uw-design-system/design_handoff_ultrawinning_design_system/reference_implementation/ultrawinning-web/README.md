# Ultrawinning Website — UI Kit

Pixel-recreation of ultrawinning.com. Three core surfaces:

- **Home** (`index.html` default view) — terminal boot sequence + 4 project lines
- **Writing** — split essays/technical list with search
- **Article** — narrow-column reader with ghost masthead and light/dark toggle

Components are plain React + inline styles so they can be copied individually.

## Files

- `index.html` — clickable prototype, boots on load
- `App.jsx` — router between screens
- `Nav.jsx` — fixed top nav with pixel mark + wordmark
- `TerminalBoot.jsx` — system log + prompt + project lines
- `Writing.jsx` — article list with tabs and search
- `Article.jsx` — full article reader with ghost masthead
- `Leaderboard.jsx` — password-gated leaderboard
- `tokens.js` — shared color / font / spacing constants

## Component conventions

- No rounded corners. Ever.
- No drop shadows.
- No gradients (except the single radial pink glow used as ambient backdrop).
- Pink (`#ff1a8c`) is the only accent.
- Mono for terminal; Rajdhani for UI; Verdana for prose.
