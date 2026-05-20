# COMSAT v4 + Nexus — Design Brief

For Claude Design (or any visual design pass) on top of the wireframes at  
[ultrawinning.github.io/share/previews/nexus-comsat-wireframes/](https://ultrawinning.github.io/share/previews/nexus-comsat-wireframes/)

---

## 1. Product framing

Two paired apps for a solo software developer who runs multiple workspaces in parallel:

- **COMSAT v4** — always-on radar (Mac menubar / drawer / vertical strip). Ambient peripheral surface. Shows tile per workspace, status dots, permission routing.
- **Nexus** — standalone Electron app + VS Code extension panel. Deep-work surface for *dedicated long-term projects* (multi-week, locked focus). One project per workspace at most.

Workspaces split into two types — **Nexus cards** (workspace is dedicated to a Nexus project) and **Pylons** (transient day-to-day workspace, no project overhead). Same tile shell; the only visual distinction is a double-thickness top color band on Nexus cards.

## 2. Vibe / aesthetic direction

**Sci-fi adjacent**, restrained. Cues:
- **Heritage**: COMSAT = StarCraft Terran scanner sweep; Nexus + Pylons = Protoss base structures; "Player 3" arcade-font label for 3rd-party AI agents.
- **HUD framing**: L-bracket corner decorations on major panels (4–10px brackets at top-left + bottom-right). Not on every component — only the big ones.
- **Typography**: monospace for headers and numeric callouts (IBM Plex Mono, Berkeley Mono, or system `ui-monospace`). Sans-serif for body. Arcade font (Press Start 2P) reserved for the "3P" accent indicator only.
- **Status indicators**: organic dots for live state (pulse on attention, blink on yellow). Segmented bars for quantitative state (tier 0-4 bars, 10-bar context fill).
- **Voice / labels**: terse, terminal-style ("STBY", "CTX 60%", "OPS NORMAL"). Numbers in monospace.

**Anti-patterns** (do NOT do):
- Neon glows everywhere — restraint per Emil's [feedback_glow_restraint](#)
- Hexagons / heavy graphic chrome (Halo armor look)
- Lens flares / JJ-Abrams space effects
- Brackets on every component — only major frames
- Cyberpunk neon-on-black — keep paper-ish background; sci-fi via restraint not maximalism

## 3. Color system

### Workspace colors (user-set per category, flow everywhere)

Each workspace category carries a color. That color flows across both apps:

| Surface | Treatment |
|---|---|
| COMSAT tile border | workspace color · 80% saturation |
| Nexus card top-line (COMSAT side) | workspace color · full · 4px thickness |
| Pylon top-line (COMSAT side) | workspace color · full · 2px thickness |
| Tile background tint | workspace color · 5% |
| Nexus app ProjectView header accent | workspace color · full |
| Nexus app progress bars | workspace color · full |
| Nexus chip / box backgrounds | workspace color · 15% tint |
| Nexus VS Code panel top border | workspace color · full · 3px |

Sample workspace colors (from current wireframes):
- Overmind: `#d35400` (copper)
- HPFHQ: `#008b8b` (teal)
- Debugs: `#6b7280` (gray)
- Scratch: `#d4a017` (yellow ochre)
- Bite: `#228b22` (green)
- Medus: `#6c3baa` (purple)

### Functional colors (NOT workspace-coded)

| Token | Hex | Use |
|---|---|---|
| Status — cooking | `#ff8c2a` | Orange dot — agent working |
| Status — needs attention | `#f5c423` | Yellow dot — VS Code permission pending (blinks) |
| Status — standby | `#2ed47a` | Green dot — standing by / complete |
| Engine — Claude | `#ff8c2a` | CL logo on-state (matches Anthropic) |
| Engine — Codex | `#00b8d4` | CX logo on-state (cyan) |
| Engine — 3P phosphor | `#2ed47a` | Player-2 arcade glow when 3p active |
| Workflow — standby | `#f5c423` | Yellow workflow dot |
| Workflow — needs human | `#ff6f9b` | Pink workflow dot |
| Workflow — on hold / blocked | `#e53935` | Red workflow dot |
| Workflow — empty slot | transparent border | Open slot in 4-dot row |
| Paper | `#fafaf7` | App background |
| Ink | `#1a1a1a` | Primary text + frame border |
| Ink-soft | `#555` | Secondary text |
| Ink-faint | `#999` | Tertiary text |
| Rule | `#d8d4cc` | Hairlines |
| Muted bg | `#f0eee7` | Header strips, secondary surfaces |

## 4. Typography scale

| Token | Family | Size | Weight | Use |
|---|---|---|---|---|
| `font-mono-header` | IBM Plex Mono / `ui-monospace` | 22px | 600 | Section h2 (with `⎡ ` bracket accent prefix) |
| `font-mono-label` | IBM Plex Mono / `ui-monospace` | 14px | 600 | h3, ALL CAPS section labels |
| `font-mono-numeric` | IBM Plex Mono | 12-13px | 500 | Numbers in tiles, tier/context labels |
| `font-arcade` | Press Start 2P | 10px | 400 | "3P" accent only |
| `font-body` | -apple-system, SF Pro | 13-15px | 400 | Prose, tile titles |
| `font-mini` | -apple-system | 10-11px | 400-600 | Drawer shorthand (HQc, DBG), pills |

## 5. Component primitives

### a. Status dot
- Size: 10×10px (larger contexts), 8×8px (workflow dots)
- Shape: perfect circle, no border
- Position: top-left of tile, either OVERLAYING the top-line (with 1.5px white ring separator) or WITHIN BOUNDS just below the top-line. Both acceptable.
- Motion:
  - Orange: slow pulse (2s cycle, opacity 0.55–1.0, scale 0.92–1.0)
  - Yellow: sharper blink (1.2s cycle, opacity 0.3–1.0, 40% duty)
  - Green: static

### b. Top-line color band
- Sits across the top of the tile, full width minus a small inset (2-4px)
- Pylon: 2px thick
- Nexus card: 4px thick
- Color: workspace color at full saturation
- Border-radius: 1px (subtle)

### c. Shorthand pill
- User-defined per workspace (2–6 char abbreviation)
- Background: `var(--muted-bg)`
- Border: 1px var(--rule)
- Padding: 2px 7px
- Border-radius: 10px (pill)
- Font: 11px sans-serif, weight 600
- Color: var(--ink-soft)

### d. Engine indicators (CL / CX / 3P)
- CL/CX: 18×18px rounded square (radius 4px) with letter glyph; when "on" → fill with brand color, white letter
- 3P: arcade font, padded 2px 4px, bordered, normally `--ink-faint` color; when 3p agents active → green glow + phosphor color

### e. Workflow dots
- 8×8 px circle
- 4 slots per tile, gap 4px between
- Empty slot = transparent fill, 1px dashed border
- Filled slots = solid color (yellow/pink/red), 1px subtle dark border
- Slot order: standby (yellow) → human (pink) → on-hold (red) → empty

### f. Tier bar
- 4 vertical bars, 3px wide × 10px tall, 2px gap
- Filled (active tier) = var(--ink-faint)
- Inactive = transparent (only filled bars render)

### g. Context bar
- 10 small rectangles, 8px wide × 10px tall, 2px gap
- Empty: 1px border var(--ink-faint), white fill
- Filled: solid var(--ink-soft), no border
- Reads 0–100% in 10% steps

### h. Project chip (Nexus tile only)
- Background: workspace color at 15% tint (color-mix in srgb)
- Border: 1px workspace color (full saturation)
- Padding: 6px 8px
- Border-radius: 4px
- Inner progress bar: 4px tall, workspace color fill on rgba white track

### i. Permission row
- Background: `#fff3e0` (warm cream)
- Border: 1px var(--dot-orange)
- Color: var(--dot-orange)
- Padding: 6px 8px
- Font-size: 12px

### j. HUD corner brackets (sci-fi accent)
- Apply to: main frames only (.frame, .nexus-shell, .wizard, .layout-config)
- Top-left: 10×10px L-bracket (border-top + border-left, 2px solid var(--ink), -2px offset outside the corner)
- Bottom-right: mirror
- Other corners: standard rounded radius
- Skip on small components (chips, tiles, popups)

## 6. Component composition

### COMSAT drawer (collapsed)
- Width: 44px container, 32px inner tile
- Tile composition: top-line + status dot (overlay) + shorthand
- Height: adaptive to tile count
- Border-radius: 6px outer, 3px inner

### COMSAT drawer (expanded — work view)
- Width: ~320px tile
- Composition: top-line · header row (dot + shorthand pill + 3P/CL/CX + workflow dots) · title · project chip OR perm row · bottom row (tier + context)
- Pylons: omit project chip
- Sci-fi nod: corner brackets on the drawer outer container

### Nexus VS Code panel (sidebar webview)
- Width: 280–320px
- Composition: top border colored (workspace color, 3px) · header (name, goal, progress, meta) · done-when section · current stage section · handoffs section · redirect-to-app callout
- Color identity inherited from `--ws-*` var on root element

### Nexus standalone ProjectView
- Header strip (with top-line band) · 2-column grid (1.4fr / 1fr) for exec summary + done-when · full-width stages · 2-col grid for lead measures + pre-mortem · full-width tasks (kanban) · full-width handoffs · floating "Complete" CTA
- HUD brackets on the outer shell

## 7. Motion guidelines

Restraint > maximalism. Sci-fi via stillness, not motion.

- Status dot pulses (already specified above) — the only ambient animation
- Tile transformations (Pylon ↔ Nexus card on project create/complete): 300ms ease-out, vertical expand
- Drawer collapsed ↔ expanded: 250ms ease-out, horizontal slide
- Tile hover: subtle border darkening, no scale/lift
- Wizard step transition: instant (no animation), crumbs update color

NO:
- Spring bounces
- Parallax
- Continuous scanline overlays (too 80s)
- Cursor-following effects

## 8. Density / spacing

- Base unit: 4px
- Tile internal padding: 8–10px
- Section gaps in expanded views: 16px
- Page gutters: 24px
- Tile-to-tile gap (drawer): 6px
- Touch targets: 28px minimum (tile clickable areas, action buttons)

## 9. State variants per component

For each primitive, specify:
- Default
- Hover (pointer cursor + 1-shade-darker border)
- Active (1 more shade darker, no scale change)
- Focus (1px outline in var(--accent), 2px offset)
- Disabled (opacity 0.35, no pointer)
- Loading (subtle pulse on background, not on border — preserves layout)

## 10. Specific deliverables wanted from the design pass

1. Specific monospace font choice (license-clean) and fallback stack
2. Refined L-bracket dimensions + offset (currently 10px / -2px)
3. Sample Press Start 2P fallback if too retro (e.g. Pixelify Sans? VT323?)
4. Pixel-perfect grid for Nexus ProjectView header — current is rough
5. Empty-state rendering for the workflow-dot row when zero badges pinned
6. Hover/focus states for all interactive primitives
7. Dark-mode variant (current wireframes are paper-on-cream; need a dark scheme for VS Code panel consistency)
8. Iconography: shield, ⌬ (Nexus brand mark), the engine logos (CL/CX) — final SVGs
9. Loading skeleton for the ProjectView when JSON is mid-write

## 11. Out of scope (do not design)

- Marketing site for either app
- Onboarding flow (handled by wizard + 1-time setup)
- Mobile / responsive views (Mac desktop only)
- Sound design — sound mappings exist separately ([sound_sources](#))
- Animation timing curves beyond what's specified

---

**Source files**:
- Wireframes (live): https://ultrawinning.github.io/share/previews/nexus-comsat-wireframes/
- Source HTML: `/Users/emil/Code/hpf-command-center/share/previews/nexus-comsat-wireframes/index.html`
- V1 spec: `/Users/emil/Code/overmind/projects/comsat/docs/plans/2026-05-19-dedicated-project-workspaces-v1.md`
- COMSAT lean brief: `/Users/emil/Code/overmind/projects/comsat/docs/plans/2026-05-19-wireframe-brief-comsat-lean.md`
- Nexus brief: `/Users/emil/Code/overmind/projects/comsat/docs/plans/2026-05-19-wireframe-brief-nexus-projectview.md`
- Link contract: `/Users/emil/Code/overmind/projects/comsat/docs/plans/2026-05-19-link-contract-comsat-nexus.md`

**Memory** (durable design decisions): `~/.claude/projects/-Users-emil-Code-comsat-radar/memory/` — search for files prefixed `project_comsat_*`, `project_dedicated_*`, `feedback_*_badge_*`, `feedback_design_*`.
