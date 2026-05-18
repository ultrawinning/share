# Sweep — Medus Extension Plan (for Agnese)

**Status:** ON ICE. Plan only. Do not execute without Agnese's explicit sign-off.

**Audience:** Agnese + her Claude Code session.

**Author:** Emil (via Opus 4.7 session, 2026-05-18).

**Source file to be modified:** `~/Code/overmind/scripts/sweep.js`

---

## What Sweep does today

Weekly cron job (Friday 18:00 via launchd) that walks **HPFHQ** for migration candidates, classifies via Haiku using the two-leg pollution test, and writes a proposal to `~/Code/overmind/inbox/sweep-YYYY-MM-DD.md` for Emil to review with `/sweep` skill.

Architecture (single-source-of-truth view of [scripts/sweep.js](https://github.com/ultrawinning/share/blob/main/temp/sweep-medus-extension/sweep-snapshot.md)):

- **Pass 1** — HPFHQ migration candidates (recent handoffs in `tasks/`, `git log --since`, new Tier 3 entries in `.claude/learning/global.md`)
- **Pass 2** — Local hygiene candidates (Overmind itself)
- Classifier runs Haiku with a few-shot prompt against the two-leg test:
  1. "If every business-specific name were removed, would the pattern still be useful?"
  2. "Would project N=2 with a different stack find this useful as-is, or fork it?"
- Budget caps: 300K tokens / 5 min wallclock per run.
- Outputs: `inbox/sweep-YYYY-MM-DD.md` + Telegram digest.

## What this extension proposes

Add **Pass 3** — Medus migration candidates — applying the same classifier shape to Medus-owned repos.

### Scope

- `~/Code/medus-app/`
- `~/Code/bite-app/`
- **NOT** `~/Code/Hypergrowth/` (not a git repo per Emil's handoff; Agnese's working tree — exclude until/unless it becomes its own repo)
- **NOT** any other Medus-scoped path Agnese might add — future paths require her explicit add to the `MEDUS_ROOTS` array

### Surgical changes (6 edits, ~80 LOC net)

**1. Add constant near line 17:**

```js
const MEDUS_ROOTS = [
  '/Users/emil/Code/medus-app',
  '/Users/emil/Code/bite-app',
];
```

**2. Generalize the loader.** Rename `loadCandidates(since)` → `loadCandidatesFromRoot(root, repoLabel, since)`. Replace every `HPFHQ` reference with `root`. Tag each returned candidate with `repo: repoLabel`. Existing call becomes:

```js
const hpfhqCandidates = loadCandidatesFromRoot(HPFHQ, 'HPFHQ', since);
```

**3. Add a Medus loop in `main()`** after the existing Pass 1:

```js
// Pass 3: Medus migration candidates
let medusCandidates = [];
for (const root of MEDUS_ROOTS) {
  const label = path.basename(root);
  const cands = loadCandidatesFromRoot(root, label, since);
  log(`pass-3 (${label}): ${cands.length} candidate(s)`);
  medusCandidates = medusCandidates.concat(cands);
}
// classify medusCandidates the same way HPFHQ ones are classified, respecting budget
```

**4. Group `writeProposal()` output by `repo`.** Current `## HPFHQ migration — accepted` becomes a per-repo loop emitting `## <repo> migration — accepted/rejected` blocks. Pass 2 (local hygiene) stays as-is.

**5. Update Telegram digest text** to show per-repo counts:

```
HPFHQ: 3/5 · medus-app: 1/2 · bite-app: 0/1
```

**6. Bump `MAX_TOKENS_PER_RUN` from 300K → 500K**, OR document that budget skips spill to next week's run (already true). Recommendation: bump to 500K because three repos × HPFHQ-scale candidate counts pushes the original cap.

### Risks / open questions

- **Haiku few-shot was tuned on HPFHQ examples.** Pollution test prompts say *"remove HPFHQ, Dan Go, etc."* First Medus run may produce false positives on Medus-internal terminology that should stay business-scoped (clients, products, tenancy).
  - **Mitigation:** dry-run mode first. Add a `--dry-run` flag that writes the proposal locally but skips Telegram. Review accuracy. Add 2–3 Medus-specific few-shot examples before going live.

- **`.claude/learning/global.md` may not exist in Medus repos.** The existing loader is defensive (`try/catch`) — no breakage, just zero Tier-3 candidates from those sources. Verify in dry-run.

- **`tasks/handoff-*.md` convention may not be in use** in Medus repos. Same — loader skips silently. If Agnese uses a different handoff convention, the loader needs a small parameterization (e.g., `tasksDir` and `globalLearningPath` per root).

- **Decision log convention.** Sweep writes its decisions to `~/Code/overmind/decisions/sweep-decisions.jsonl`. If Medus needs a separate decision log under Agnese's repos, that's a follow-up; for now it stays unified.

- **Budget skip transparency.** When the budget cap hits during Pass 3, the skipped candidates spill to next Friday — but they should be visible somewhere so Agnese knows they were dropped. Already logged via `writeBudgetLog` + Telegram. Confirm Agnese receives the Telegram alerts (she may need to be added to the chat).

### Operational notes

- **Cadence:** Friday 18:00 via launchd. No change.
- **Authorization:** This sweep would walk Medus repos read-only (git log + file reads). No writes to Medus paths. Proposal output lands in Overmind's inbox, not in any Medus repo.
- **Reversibility:** Total. Revert the diff to `scripts/sweep.js` and the next Friday run reverts to HPFHQ + local-hygiene only.

### Effort estimate

30–45 minutes for the code change + dry-run verification. Then one Friday cycle of monitoring before assuming it's stable.

---

## Decision points for Agnese

1. **Approve / reject the extension itself.** Default = reject (don't extend Sweep into Medus). Approval is opt-in.
2. **If approved, scope:** medus-app + bite-app? Or fewer? Or more (when other Medus repos exist)?
3. **Few-shot calibration:** add Medus-specific examples upfront, or accept first-run false positives and iterate?
4. **Decision log location:** unified (Overmind decisions log) or split (per-repo)?
5. **Telegram integration:** add Agnese to the Sweep digest chat?

---

## How to integrate (for Agnese's CC)

1. Read `~/Code/overmind/scripts/sweep.js` end-to-end (full file).
2. Apply the 6 surgical changes above.
3. Add a `--dry-run` flag for the first 1–2 runs.
4. Test against medus-app first (single root) before adding bite-app.
5. Review the first proposal carefully — false positives in the first run mean the few-shot needs Medus examples.
6. Send results back to Emil for sign-off on going live.

## Boundary

Per [[feedback-medus-no-access-without-agnese]] — Opus 4.7 (Emil's session) does NOT touch Medus paths. This plan was authored without reading any Medus internals. If integration requires inspecting Medus repos, Agnese's CC drives it.

---

*Generated 2026-05-18 by Opus 4.7. Live at `https://ultrawinning.github.io/share/temp/sweep-medus-extension/`.*
