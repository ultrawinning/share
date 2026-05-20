# COMSAT v4 + Nexus — Design Handoff

Two paired apps for a solo dev running multiple Claude/Codex sessions in parallel.
Hi-fi mockups built on top of the v3 wireframes + design brief. Round 2 reference docs included.

## Files in this package

### Hi-fi components

| File | What it is |
|---|---|
| `COMSAT v4 - Drawer States.html` | COMSAT edge-snapped drawer: collapsed (continuous ticker) + expanded (work view) |
| `COMSAT v4 - Nexus ProjectView.html` | Nexus standalone app — single-scroll project page (themed to workspace color) |

### Round 2 reference docs

| File | What it is |
|---|---|
| `COMSAT v4 - States & Patterns.html` | Component state grid + tooltip + sync ping + loading skeleton + failure tiles + Nexus ↔ Pylon side-by-side |
| `COMSAT v4 - Brand & Icons.html` | Nexus brand mark (solid/outline/monogram/wordmark/VS Code variant) + Done-When method icons |
| `COMSAT v4 - VS Code Surface.html` | Status-bar badge palette + 4-badge pinned cluster + full VS Code chrome render |

### Assets

| File | What it is |
|---|---|
| `fonts.css` + `fonts/` | Local font files (Orbitron, Rajdhani, Share Tech Mono) |

All files share the same design tokens, theme toggle (DARK / LIGHT, persisted to localStorage), and visual vocabulary. Open any of them in any modern browser.

## Design system — locked decisions

**Type stack**
- `--font-display` **Orbitron** — brand mark only (COMSAT, NEXUS)
- `--font-ui` **Rajdhani** — titles, callsigns, big numbers
- `--font-mono` **Share Tech Mono** — labels, timestamps, path strings
- `--font-arcade` **Press Start 2P** — RESERVED for the `3P` accent indicator only (Google Font)
- `--font-sans` system stack — body copy

**Color tokens** (CSS custom properties at `:root`, mirrored at `[data-theme="light"]`)
- Functional status — `--accent` green standby, `--cook` orange (Claude / cooking), `--attn` yellow (VS Code attention), `--danger` red, `--signal` cyan (Codex), `--pink` workflow (human-in-loop)
- Workspace category palette — `--ws-overmind` `#d35400`, `--ws-hpfhq` `#008b8b`, `--ws-debugs` `#6b7280`, `--ws-scratch` `#d4a017`, `--ws-bite` `#228b22`, `--ws-medus` `#6c3baa`
- Glow strength `--glow` `0.55` dark / `0` light — restraint per brief; only live indicators carry sparkle
- Grid `--grid` + `--grid-major` — engineering-chart background, 32 px minor / 160 px major

**Sci-fi treatment rules**
- HUD corner brackets ONLY on the outermost frame
- One ambient animation per UI element: status dot pulse (`cook` 2 s ease, `attn` 1.2 s blink). No other motion.
- Paper-on-tan light mode (`#ece8d8` body, `#fff` cards) per brief §3
- Near-black dark mode (`#04060a` body, `#182228` lifted cards) with green grid

## Components shipped

### Drawer States
- **Collapsed ticker** — 50 px outer, 24 px rows, no inter-row gaps. Workspace identity = left-edge bar (Pylon 4 px / Nexus 6 px) with a row-wide horizontal color wash. Inline `[● dot] [SHORTHAND]` — Nexus shorthand heavier weight than Pylon.
- **Expanded work view** — 256 px tight density. Per tile:
  - Header: `[dot · CALLSIGN · 3P · CL · CX · shield]`
  - CL/CX are bare brand SVG icons. No chip wrapper. Brand-color fill when on, neutral grey when off.
  - Title (heavier on Nexus tiles)
  - Project chip with inner progress bar (Nexus only)
  - Perm row (`Y / N` action) when permission is pending
  - Foot: tier ramp (T0–T4) + 10-bar CTX with **traffic-light heatmap** (≤40% green · 40–75% yellow · 75%+ red)

### Nexus ProjectView
- App bar with `⌬ NEXUS` brand, breadcrumb, theme toggle, settings icon
- Project header card (the hero) — copper top border, copper drop-shadow, contains:
  - Title row: `⌬ [Project name] ↗` + `🔒 hard` chip
  - Activity strip: `[● cooking] [HQc] · [27m active] · [3P] [CL on] [CX dim] · CTX 60%`
  - Meta: workspace + plan file path
- Goal callout (large)
- Progress bar in workspace color
- Stages pipeline (7 horizontal stages, `done / active / next / —` states)
- Two-column body: Exec Summary, Lead Measures · 4DX, Done-When (4/7), Pre-mortem (5 ranked risks with L×S scores)
- Tasks Kanban (To do / Doing / Review / Done, workspace-color borders on active column)
- Handoffs timeline (auto-watched)
- Complete project CTA (disabled until all done-when criteria pass)

## Round 2 reference — answers to Claude Code's 12 questions

| # | Question | Answer location |
|---|---|---|
| 1 | Component states sheet | `States & Patterns.html` §01–09 — full grid (default / hover / focus / active / disabled / loading) for buttons, dots, workflow slots, engines, shield, pills, tile collapsed, tile expanded, kanban |
| 2 | Loading skeleton (Nexus ProjectView) | `States & Patterns.html` §12 — layout-preserving, workspace color renders immediately, 1.4 s linear shimmer, single pattern reused |
| 3 | Failure states — three tile renderings | `States & Patterns.html` §13 — JSON corrupt (red + danger dot), Pathfinder stale (dashed project chip + ribbon), Nexus offline (shield slot swapped for `NEXUS · OFFLINE` chip, content dimmed) |
| 4 | Tooltip pattern | `States & Patterns.html` §10 — anchors (top/bottom/left/right + flip rule), tones (default/warn/danger), 500 ms show / 100 ms hide, max 240 px |
| 5 | Sync ping animation | `States & Patterns.html` §11 — workspace color overlay, 340 ms cubic-bezier(.2,.7,.3,1), restart-on-collision, 250 ms throttle on burst. Interactive demo with FIRE button. |
| 6 | Drawer drag-to-reposition | `States & Patterns.html` §14 + spec notes — grab zones (top/bottom 12 px OR leftmost 6 px gutter), 18 px hot zones, 220 ms snap, per-display memory, `Esc` cancel |
| 7 | VS Code status-bar badge render | `VS Code Surface.html` (full file) — 6-badge palette, anatomy, tooltip format, status bar close-up, full VS Code chrome render |
| 8 | ⌬ Nexus brand mark as proper SVG | `Brand & Icons.html` §01–05 — solid/outline/monogram/wordmark + 5-step size scale + 6-background test + VS Code activity-bar variant |
| 9 | Done-When method tag icons | `Brand & Icons.html` §06–08 — manual / url / shell / file in one style family + in-context Done-When list + copy-pasteable SVG source |
| 10 | Workflow-dot empty state | `States & Patterns.html` §03 — dashed-circle default, accent ring on drop-target. Confirmed in default expanded view. |
| 11 | Pylon-expanded variant — verified | `States & Patterns.html` §08 — canonical side-by-side reference with delta notes |
| 12 | Sound design event names | See "Sound events" section below |

### Sound events

| Event | Trigger |
|---|---|
| `event:permission-needed` | Perm row appears in tile |
| `event:cooking-start` | Agent transitions to cooking (dot turns orange) |
| `event:standby` | Agent finishes; dot returns to green |
| `event:attention-needed` | VS Code-side attention required (dot turns yellow) |
| `event:error` | Tile enters error state |
| `event:project-complete` | Done ceremony reached; all done-when pass |
| `event:focus-switched` | User changes the ★ focused project in Nexus Home |
| `event:sync-received` | Cross-surface update arrives — sync ping fires |

## Outstanding work (from the brief / wireframes)

| # | Component | Source |
|---|---|---|
| 1 | Nexus **Home** — active + archived projects list with ★ focused-project marker | wireframe §6 |
| 2 | Nexus **Wizard** — 8-step charter creation (with auto-fill via local-bg) | wireframe §7 |
| 3 | Nexus **Done ceremony** — 3-screen retro → snapshot preview → archive confirm | wireframe §9 |
| 4 | **VS Code Nexus panel** — sidebar webview (280–320 px) mirroring the work-view header pattern. NOTE: status-bar surface IS shipped (see Round 2 file). The panel itself isn't. | brief §6, wireframe §VS |
| 5 | **Per-category workspace layout config** — VS Code-side settings UI | wireframe §VS |
| 6 | **Badge palette UI** — drag source for status-bar badges. The destination (VS Code status bar) is designed; the palette itself isn't. | brief §3 |
| 7 | COMSAT **Settings drawer** — existing in v3, may need a v4 pass | v3 design system |
| 8 | COMSAT **Launch popout** — existing in v3, may need a v4 pass | v3 design system |

## Polish items for the two hi-fi files

These are tracked but not blocking implementation:

- **Method tag icons** in ProjectView — currently still text labels. Brand & Icons doc has the SVG family ready. Drop-in.
- **Pre-mortem rank numbers** — currently 16 px Orbitron. Could be more theatrical.
- **Stages pipeline active state** — could add a small cooking dot when an agent is working that stage.
- **Workflow-dot row** — confirmed in default expanded view per Round 2 #10 answer. Empty state spec lives in `States & Patterns.html` §03. Add to HTML when implementing.
- **Lock chip `soft` variant** — alongside `hard`, per brief. Both variants designed in `States & Patterns.html` §06.

## Implementation notes for Claude Code

- **Single source of truth for tokens**: CSS custom properties on `:root` + `[data-theme="light"]`. No hard-coded colors anywhere in the component CSS — every value goes through a var.
- **Workspace color flows via `--ws`** set on the project container (`style="--ws: var(--ws-overmind)"`). All children resolve their workspace-tinted backgrounds, borders, and accents from `color-mix(in srgb, var(--ws) N%, transparent)`. To switch a project's workspace color, change one variable.
- **CTX heatmap classes** — `.ctx.ctx-ok` / `.ctx.ctx-warn` / `.ctx.ctx-hot` + matching `.ctx-pct.ctx-ok` etc. Apply based on the percentage band.
- **Theme toggle** — `<button data-theme="dark|light">` posts `document.documentElement.setAttribute('data-theme', ...)`. Persisted via `localStorage.comsat_v4_theme`. Same JS in every file; reusable.
- **Background-color gotcha** — use the longhand `background-color: var(--bg)` rather than the `background:` shorthand. The shorthand doesn't always re-resolve when CSS vars change at runtime.
- **SVG icons inlined** — Claude / Codex / shield / settings / lock are all inline SVG using `currentColor` so color state flows through CSS. Brand mark + method icons have copy-pasteable source in `Brand & Icons.html` §08.
- **Press Start 2P** loaded from Google Fonts. If the team prefers a self-hosted font, swap to a local `@font-face` for `--font-arcade`.
- **No framework** — vanilla HTML/CSS, one tiny JS block for theme persistence. Should port cleanly into Electron / React without ceremony.
- **Forced states** — the States & Patterns doc uses `.is-hover`, `.is-focus`, `.is-active`, `.is-disabled`, `.is-loading` classes to force each state for review. Production CSS should use `:hover` / `:focus-visible` / `:active` / `[disabled]` / `[aria-busy="true"]` instead.

## Open questions for Emil

1. **CL/CX brand marks** — current icons are stylized house-style approximations (Claude 12-spoke asterisk, Codex 3-bar knot). If the team needs the exact Anthropic / OpenAI logomarks, swap in the official SVGs.
2. **Workspace color naming** — categories (Overmind, HPFHQ, Debugs, Scratch, Bite, Medus) are user-defined; CSS uses `--ws-{name}` tokens. If the category set is open-ended, drop the named tokens and use `--ws` directly per workspace.
3. **Codicons in VS Code badges** — currently using SVG approximations of the codicons (`$(person)`, `$(zap)`, etc). Real implementation should use VS Code's built-in codicon font for native consistency.

---

Built by Emil + Claude Design, 2026-05-20 → 2026-05-21.
