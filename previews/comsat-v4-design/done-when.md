# COMSAT v4 + Nexus — Done-When Contract

The YOLO build is finished when EVERY criterion below passes. Each criterion has a verification method tag (`shell` / `file` / `url` / `manual`) so it's mechanically checkable, not aspirational.

**This file IS the dogfood project.** When the YOLO completes phase 8, the Nexus app contains a project called "COMSAT v4 rebuild" whose `doneWhen` array is exactly this file, parsed into criterion objects. Auto-checks tick every 60s. The Complete-project button activates only when all criteria pass.

Total: **52 criteria across 8 phases.** Author: 2026-05-20.

---

## Phase 1 — Nexus repo scaffold

| # | Criterion | Method | Check |
|---|---|---|---|
| 1.1 | Repo directory exists | `file` | `test -d ~/Code/overmind/projects/nexus` |
| 1.2 | package.json with name "nexus" | `file` | `grep -q '"name": "nexus"' ~/Code/overmind/projects/nexus/package.json` |
| 1.3 | TypeScript + Vite + Electron + React deps installed | `shell` | `cd ~/Code/overmind/projects/nexus && npm ls typescript vite electron react 2>&1 | grep -v "missing"` |
| 1.4 | `npm run dev` launches an Electron window | `shell` | timeout 30s `npm run dev` (window appears, exit 0 on success) |
| 1.5 | Tokens module imports cleanly | `file` | `test -f ~/Code/overmind/projects/nexus/src/tokens/index.css` AND grep `--ws-overmind` returns hit |
| 1.6 | `.gitignore` excludes node_modules + dist | `file` | `grep -q "node_modules" ~/Code/overmind/projects/nexus/.gitignore` |

## Phase 2 — Tokens unified

| # | Criterion | Method | Check |
|---|---|---|---|
| 2.1 | Tokens file authoritative in Nexus | `file` | `test -f ~/Code/overmind/projects/nexus/src/tokens/comsat-v4.css` |
| 2.2 | Defines `:root` AND `[data-theme="light"]` | `shell` | `grep -c '\[data-theme="light"\]' nexus/src/tokens/comsat-v4.css` returns ≥1 |
| 2.3 | All 6 workspace category colors present | `shell` | `grep -cE '\-\-ws\-(overmind|hpfhq|debugs|scratch|bite|medus)' returns 6` |
| 2.4 | Functional status tokens present | `shell` | `grep -cE '\-\-(accent|cook|attn|danger|signal)' returns 5` |
| 2.5 | Press Start 2P load wired or fallback specified | `shell` | grep matches `--font-arcade` |

## Phase 3 — ProjectView ports

| # | Criterion | Method | Check |
|---|---|---|---|
| 3.1 | `<ProjectView>` component renders against mock JSON | `shell` | unit test passes |
| 3.2 | Workspace color flows via `--ws` style prop | `shell` | inspect rendered DOM has `style="--ws: #d35400"` on root |
| 3.3 | Visual diff vs `Nexus ProjectView.html` <5% on key regions | `shell` | playwright screenshot diff; threshold pass |
| 3.4 | Reads `~/.dedicated-projects/<workspaceId>.json` | `shell` | mock JSON load test |
| 3.5 | Atomic write (tmp+rename) on save | `shell` | inject write-during-read race test; no half-state observed |
| 3.6 | Backup written to `.backups/` on each save (last 5 kept) | `shell` | walk `.backups/` after 7 saves; exactly 5 files present |
| 3.7 | HUD corner brackets render on outer shell | `manual` | Confirmed by Emil — visual match to design |

## Phase 4 — Wizard ships

| # | Criterion | Method | Check |
|---|---|---|---|
| 4.1 | All 8 steps render with crumbs | `shell` | playwright nav through 1→8 |
| 4.2 | Copy-prompt button puts correct text on clipboard | `shell` | clipboard inspection test |
| 4.3 | Paste-back textarea validates required fields | `shell` | empty paste → next button disabled |
| 4.4 | Step 1 WIG format enforced ("X from Y to Z by date") | `shell` | freeform input rejected |
| 4.5 | Save writes per-workspace JSON | `shell` | post-save file exists at expected path |
| 4.6 | Sonnet auto-draft populates step 2 (charter) from plan path | `shell` | given plan file, post-draft textarea contains valid JSON with required keys |
| 4.7 | Abandon mid-wizard → resume restores state | `shell` | abort halfway, relaunch, step number + filled fields preserved |
| 4.8 | Stage parsing extracts ≥3 stages from sundae.md test plan | `shell` | parse function returns ≥3 entries |

## Phase 5 — Nexus Home + Done ceremony

| # | Criterion | Method | Check |
|---|---|---|---|
| 5.1 | Home lists active projects from `~/.dedicated-projects/*.json` | `shell` | fixture: 3 projects on disk → 3 cards rendered |
| 5.2 | Star toggles focused project; persists to JSON | `shell` | click star, read JSON, `focused: true` |
| 5.3 | Only one project can be focused at a time | `shell` | star A then B; A's JSON shows `focused: false` |
| 5.4 | Archived projects render from `.completed/` | `shell` | fixture archived file → archived card |
| 5.5 | Complete button disabled while any done-when criterion unticked | `shell` | DOM inspect: `disabled` attr present |
| 5.6 | All criteria tick → button enables → 3-screen flow completes | `shell` | scripted full flow |
| 5.7 | After complete, file moves to `.completed/` mode 0444 | `shell` | `stat -f %p` returns `0100444` |
| 5.8 | Retro memory saved to `~/.claude/projects/<workspace>/memory/` | `shell` | post-flow grep for `retro-` prefix |

## Phase 6 — COMSAT v4 lean rebuild

| # | Criterion | Method | Check |
|---|---|---|---|
| 6.1 | Old surfaces deleted: planner directory removed | `file` | `! test -d comsat/src/components/project-planner` |
| 6.2 | Old surfaces deleted: relay tray removed | `file` | `! test -f comsat/src/components/RelayTray.tsx` |
| 6.3 | Old surfaces deleted: recovery + health drawer + unattributed queue UI removed | `file` | each file gone |
| 6.4 | Wireframe theme deleted from globals.css | `shell` | `! grep -q 'theme.*wireframe' comsat/src/styles/globals.css` |
| 6.5 | Drawer renders Pylons (single 2px top line) + Nexus cards (double 4px) | `manual` | Emil visual confirm against design Drawer States.html |
| 6.6 | Status dot pulses orange during cooking | `manual` | trigger cooking state, observe animation |
| 6.7 | Status dot blinks yellow on perm pending | `manual` | trigger perm prompt, observe blink |
| 6.8 | Status dot stable green on standby | `manual` | idle state, observe no animation |
| 6.9 | Drag-to-reposition drawer works per spec (grab zones, snap, multi-monitor) | `manual` | drag from grab zone, snap to each edge on each display |
| 6.10 | `Esc` closes top window | `shell` | scripted keypress test |
| 6.11 | RAM footprint <250MB idle | `shell` | `ps -o rss -p $(pgrep -f COMSAT)` |
| 6.12 | Pylon click → scratchpad opens for that workspace | `manual` | click → see scratchpad with workspace shorthand |
| 6.13 | Nexus tile project chip click → opens Nexus via `nexus://` URL | `manual` | click → Nexus app foregrounds + loads project |
| 6.14 | Workflow-dot row visible in default expanded view (4 empty dashed slots) | `manual` | confirmed |

## Phase 7 — VS Code extension extended

| # | Criterion | Method | Check |
|---|---|---|---|
| 7.1 | Extension moved to `~/Code/overmind/projects/nexus/extension/` | `file` | path exists, old comsat/extension/ removed |
| 7.2 | Activity bar ⌬ icon appears | `manual` | open VS Code, see icon |
| 7.3 | Nexus panel webview renders ProjectView subset for current workspace | `manual` | click ⌬, panel populated |
| 7.4 | Tick done-when in VS Code panel → shared JSON updates → COMSAT chip updates within 5s | `shell` | scripted timing test |
| 7.5 | Status bar shows pinned workflow badges using codicons | `manual` | pin a badge from palette, see in statusbar |
| 7.6 | Per-category layout config writes correct workbench.* settings | `shell` | open Overmind workspace, inspect `.code-workspace`, confirm layout vars |
| 7.7 | UserPromptSubmit hook injects WIG + done-when reminder when dedicated_project active | `shell` | new Claude session in dedicated workspace, transcript shows injection |
| 7.8 | Hook does NOT inject for Pylon workspaces | `shell` | new Claude session in Pylon workspace, no injection |

## Phase 8 — Pathfinder integration

| # | Criterion | Method | Check |
|---|---|---|---|
| 8.1 | Pathfinder `context_packs` table accepts `task_type: "dedicated"` | `shell` | `psql -c "select 1 from context_packs where task_type='dedicated' limit 1"` returns ok |
| 8.2 | DOMAIN_KEYWORDS includes nexus + comsat-v4 + dedicated-project terms | `file` | grep keyword list in `cc-memory-lookup.js` |
| 8.3 | Wizard step 8 Save POSTs context_pack row | `shell` | trigger save with test fixture, `select count(*) from context_packs where project='test-...'` returns ≥1 |
| 8.4 | Next Claude Code session in dedicated workspace gets auto-inject from Pathfinder | `manual` | open Claude session, transcript first message shows charter + plan body |
| 8.5 | Pathfinder write failure surfaces Telegram alert via Nova | `shell` | inject 500 from API, observe Telegram message arrives |
| 8.6 | Project complete → context_pack row deleted | `shell` | run done ceremony, post-query returns 0 |

## Final — Recursion + dogfood

| # | Criterion | Method | Check |
|---|---|---|---|
| F.1 | The COMSAT v4 rebuild is itself a Nexus project | `file` | `test -f ~/.dedicated-projects/<comsat-rebuild-workspace>.json` |
| F.2 | That project's `doneWhen` array IS this file, parsed | `shell` | comparison: JSON array length = 52, every criterion id matches |
| F.3 | All 52 criteria above pass | `shell` | run-all-checks script returns all-green |
| F.4 | Brandon-test sequence walks end-to-end | `manual` | open COMSAT v4 → see drawer → click Pylon → scratchpad → right-click → "Promote to Nexus" → wizard opens → walk all 8 → save → drawer tile transforms Pylon→Nexus card → click chip → Nexus opens → tick a criterion → COMSAT chip updates within 5s → quit both → restart Mac → state survives |
| F.5 | SHIP-LOG.md exists at `~/Code/overmind/projects/nexus/SHIP-LOG.md` with timestamps + commit hashes per phase | `file` | exists + parseable |
| F.6 | The Complete-project button in Nexus enables for the COMSAT v4 rebuild project | `manual` | visual + the 3-screen done ceremony runs |

---

## How "PROVE finished" works mechanically

Three independent verification layers, all required:

1. **Auto-checks run continuously** — each `shell` / `file` / `url` criterion ticks every 60s once Nexus is online. Visible state per criterion in the ProjectView.

2. **Smoke-test script** — `~/Code/overmind/projects/nexus/scripts/done-when.sh` runs all `shell` and `file` and `url` criteria sequentially, exit 0 = all pass, non-zero = the failing criterion's id. Single command, takes <5min, reproducible.

3. **Brandon-test sequence (F.4 above)** — the only manual verification that matters. A scripted walkthrough you do at the end to convince yourself the recursion holds and the surfaces talk to each other. ~3 minutes.

When all three return green: **finished.** The Complete-project button in Nexus enables, you walk the 3-screen done ceremony, and the project archives itself to `~/.dedicated-projects/.completed/`. The COMSAT v4 rebuild project literally completes itself via the tool it built.

If any one fails: NOT finished. Auto-checks point at the specific criterion blocking. Build resumes targeting only that gap.

## Audit trail

Throughout the YOLO:
- Each phase ends with a structured commit message + `CHANGELOG.md` entry
- `/wrap` fires at phase boundaries, writing a handoff
- Pathfinder context_pack updates with each phase completion
- `SHIP-LOG.md` accumulates timestamps + commit hashes per phase

If YOLO crashes or stalls mid-flight: state is durable. Resume by reading `SHIP-LOG.md` + current criterion status + last commit.
