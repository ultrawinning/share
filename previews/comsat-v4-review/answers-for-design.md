# Answers for Claude Design — Round 2

Responses to Claude Design's 2026-05-20 message about the 12 questions. Confirms direct answers, locks the visual-work slice + ordering.

---

## 1. Order — yes, States → Brand → VS Code

That ordering matches build needs exactly:

- **States & Patterns FIRST** is right. It unblocks every component implementation — without state coverage, every component ships half-done.
- **Brand & Icons SECOND** — can actually run in **parallel** with component build (components ship with placeholder ⌬ and method icons, swap in finals when ready). Don't sequence it strictly second; let it overlap.
- **VS Code Surface LAST** — correct. Extension work is build step 8 of 8 in the proposed sequence, so VS Code design lands just before extension implementation. No risk of stale specs.

One small ask for States & Patterns: include the **Pylon-expanded variant** check (Q11) as a side-by-side reference even though you've confirmed it ships. Having Nexus + Pylon expanded side-by-side in the States doc makes it the canonical reference for "what's different between the two" — useful when build hits and someone needs to grep one source of truth.

## 2. Workflow-dot row — yes, IN the default expanded view

Confirmed: workflow-dot row IS in the default expanded view going forward. Empty-state design proceeds on that assumption.

Reasoning: the two-set badge model (engine indicators + workflow dots) was load-bearing from the 2026-05-20 spec — *"engine = runtime auto-detect, workflow = user intent."* Dropping the workflow row collapses two conceptual layers into one and we lose the intent surface. Default-on with empty slots (dashed circles or whatever pattern Q10 produces) is the right move.

---

## Confirmation of the locked-in answers

Three notes on the spec answers already given:

### Drag spec (#6) — saved verbatim

The workspace-bar-gutter as grab zone is a smart move because it preserves the tile click affordance. The per-display dock-edge memory is the right call for the 2-monitor Portugal setup (Mac Studio + display). Specifically saved:

- Grab zones: top/bottom 12px OR leftmost 6px workspace-bar gutter
- Tile rows NOT drag handles (preserves click-to-expand)
- Hot zone: 18px from each screen edge counts as snappable
- During drag: `0 12px 32px rgba(0,0,0,0.55)` shadow + 1px dashed outline + 2px accent-green ghost rails on all 4 edges
- Snap: 220ms `cubic-bezier(.2,.8,.2,1)` — same easing as the rest of the system
- Multi-monitor: per-display dock edge memory; snap effects on whichever display the cursor is on at release
- `Esc` during drag returns to previous position with no animation

### Sound events (#12) — 8 feels right

Saved as named taxonomy. Build can emit them now via a dispatcher; audio subscriber wires later from the StarCraft sound archive.

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

### Pylon verified (#11) — good

Including the side-by-side in States & Patterns makes the verification permanent.

---

## Green light

All three files cleared to start when you're ready:

1. **COMSAT v4 - States & Patterns.html** — covers #1, #2, #3, #4, #5, #10 + Pylon side-by-side
2. **COMSAT v4 - Brand & Icons.html** — covers #8, #9
3. **COMSAT v4 - VS Code Surface.html** — covers #7

No further pre-design questions on this side.
