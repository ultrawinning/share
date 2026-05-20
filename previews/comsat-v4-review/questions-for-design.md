# Questions for Claude Design — COMSAT v4 + Nexus

Round 2 ask. Reviewed the 2026-05-20 drop (Drawer States + Nexus ProjectView + HANDOFF.md). The default-state design is locked and excellent. The questions below are gaps that need a designer's eye, not implementation decisions Emil should make.

Each question is self-contained — answer without re-reading the full brief.

---

## 1. Component states sheet

Need a single reference sheet showing **default / hover / focus / active / disabled / loading** for these primitives:

- Buttons — primary + secondary
- Workflow dots — filled (standby, human, on-hold) + empty slot
- Engine icons — CL on/off, CX on/off, 3P lit/dark
- Shield icon
- Tile (drawer + expanded)
- Kanban task card
- Pill (shorthand + lock chip + breadcrumb segment)

For each, spec the token-level delta — what changes per state (border shade, background, opacity, ring, transform).

Current files have ~9 total state rules across both. Need the full grid.

## 2. Loading skeleton — Nexus ProjectView

When the project JSON is being fetched or mid-write, what does the page look like? Preferences:
- Layout-preserving (box backgrounds pulse, content placeholders match final dimensions)
- Single shimmer pattern reused across all boxes
- Cycle time and easing
- Does the header (with workspace color) render immediately, or also skeleton?

## 3. Failure states — three specific tile renderings

Show what a COMSAT tile looks like when:

a) **JSON corrupt** — shared file at `~/.dedicated-projects/<wsId>.json` won't parse. Banner? Red chip? Muted state with error glyph?

b) **Pathfinder write failed** — Nexus tried to POST a context_pack and it failed. Project state is OK locally but Pathfinder is out of sync. Should there be a small `pathfinder: stale` indicator on the project chip?

c) **Nexus app not running but project file exists** — COMSAT can read the file fine; clicking the chip just opens Nexus normally. Does the tile look different while Nexus is offline? Greyed chip? No change?

## 4. Tooltip pattern

The drawer is dense with truncated content but currently has zero tooltips. Spec the tooltip:
- Anchor point (above? below? auto-flip?)
- Delay before show (ms)
- Background, border, text color (dark mode + light mode)
- Max-width before wrapping
- Arrow / pointer or no?
- Animation in/out

Most frequent use: drawer tile hover → show full workspace title + shorthand expansion. Secondary: workflow dot hover → show badge name.

## 5. Sync ping — cross-surface update cue

When the shared JSON updates from Nexus → COMSAT (or VS Code panel → standalone), the receiving surface needs to acknowledge "something just changed elsewhere." Show:
- What pulses (border? entire tile background? just the changed sub-element?)
- Color (workspace color? accent green? subtle white?)
- Duration (200ms? 400ms?)
- Easing
- Frequency cap (if 5 updates land in 1s, do we ping 5 times or coalesce?)

## 6. Drawer drag-to-reposition

The collapsed drawer is "moveable along the edge, snaps to nearest edge." Design the drag interaction:
- Where is the grab handle (whole drawer? specific affordance?)
- Hot zone width on the edge
- Cursor change on hover
- Feedback while dragging (drop shadow? edge highlights showing snap targets?)
- Animation on snap
- Does it work between displays (multi-monitor)?

## 7. VS Code status-bar badge render

Brief said workflow badges drag from COMSAT palette onto VS Code window, rendering as a VS Code `StatusBarItem`. VS Code limits styling — fixed height, foreground/background color, optional icon, optional tooltip text. Design what a badge looks like inside that constraint:
- Single character or short word? ("HMN" for human? icon-only?)
- Color — workspace tint or workflow color?
- Tooltip text format
- Sample render: 4 badges pinned to a workspace — what does the bottom-right of VS Code look like?

## 8. ⌬ Nexus brand mark as proper SVG

Currently the ⌬ is a Unicode codepoint that varies across fonts. Need a final brand mark:
- Monochrome SVG, currentColor
- Variants at 16px / 24px / 32px / 48px (with optical adjustments per size)
- Works on dark + light + workspace-color backgrounds
- Versions: solid, outline, monogram (just the ⌬), wordmark (⌬ NEXUS)
- Activity-bar VS Code variant (must read at ~24px monochrome)

## 9. Done-When method tag icons

Currently text labels: `MANUAL / URL / SHELL / FILE`. Convert to 12px SVG icons:
- `manual` — person? checkbox? handshake?
- `url` — link? globe? arrow-out?
- `shell` — terminal prompt? braces?
- `file` — document? folder?

One consistent style family. Used inline with criterion text in the Done-When list.

## 10. Empty-state for workflow-dot row

When re-added to the default expanded view (per Unilateral #2 in the review), what do the 4 slots look like when ZERO badges are pinned?
- 4 dashed-outline circles? Invisible? Single "+ add badge" affordance?
- On hover-over, do they reveal as drop targets?
- What's the hint that you can drag a badge here?

## 11. Pylon-expanded variant — verify shipped

The Drawer States file mentions Pylon (5 occurrences). Need explicit confirmation:
- Is there a Pylon variant of the expanded work view, OR did the design ship only Nexus-tile?
- If both: what's the visual delta? (Per spec: no project chip, single-thickness top line, otherwise identical.)
- If only Nexus: please ship the Pylon variant.

## 12. (Bonus) Sound design event names

Even if audio is fully out-of-scope, name the 3–5 named events that should be sound-triggerable in the final product. So audio can be wired later without code changes:

- e.g. `event:permission-needed`
- e.g. `event:build-complete`
- e.g. `event:error`
- e.g. `event:project-complete`
- e.g. `event:focus-switched`

Just the names + which UI moments they map to. No actual sounds needed yet.

---

## Out of scope for design (Emil's calls, not Claude Design's)

These are listed only so Claude Design doesn't accidentally design them — they're decisions Emil owns:

- Refactor from `--ws-{name}` enumerated tokens to single `--ws` per workspace (CSS refactor)
- Whether to start build now vs second design pass first (sequencing)
- Workspace shorthand naming convention (HQc vs OM2 vs user-defined per workspace — already locked: user-defined)

---

## Reference

- Wireframes v3.1: https://ultrawinning.github.io/share/previews/nexus-comsat-wireframes/
- Original design brief: https://ultrawinning.github.io/share/previews/nexus-comsat-wireframes/design-brief.md
- This review: https://ultrawinning.github.io/share/previews/comsat-v4-review/
