---
name: session-handoff
description: "Use when wrapping up a build session to capture context for the next session. Triggers on 'handoff', 'wrap up', 'new chat', 'carry this over', 'session summary', 'what's still open', or when a conversation has gone long and the user is shifting to a new topic. Produces a structured handoff document from the current session's git diff, task list, and conversation state."
user-invocable: true
trigger: /handoff
---

# Session Handoff Skill

## What This Does

Captures everything worth preserving from the current build session so the next session starts at full speed. Uses git state + task list + conversation context — not cross-chat scanning. Also reconciles any of the repo's state-mirroring docs (integration docs, docs marked `live_doc: true`) against what the session learned, so they don't silently drift.

---

## Cold-Start-Proof Mandate (non-negotiable)

Every handoff this skill produces — the doc AND the copy-paste prompt — must pass this test:

> **A fresh window with ZERO memory of this session, given only this handoff + the repo, knows WHY the work matters, WHERE to find every fact it needs, WHAT it must not break, and WHAT is a human decision vs a buildable one.**

Four things every handoff MUST contain, or it fails:
1. **WHY** — the business/strategic stake, not just the task. "Close rate is 15% vs 30–40%, follow-ups leak the gap" — not "build follow-up tracking."
2. **WHERE TO LOOK** — an ordered source map: architecture/canon docs → ADRs → integration docs → safety/gate docs → the specific code files. The next session must be able to *find information itself*, not depend on the handoff to contain it all.
3. **SELF-CONTAINED** — NO references to ephemeral session artifacts a fresh window cannot read: tool-call tmp outputs, `/tmp/...` paths, "the synthesis above", run IDs as a source. Inline the load-bearing findings; mark any run IDs "reference-only."
4. **GUARDRAILS + DECISION SPLIT** — the constraints the work must honor (live-surface gates, canon rules, channel/safety rules) AND an explicit split of what's a **human decision** (comp, pricing, people, tone — route to the owner) vs what's **buildable now**.

If any of the four is missing, the handoff is not done. Verify against the test before emitting.

---

## Process

When `/handoff` is triggered:

### Step 1 — Capture session state

Run these in parallel:
- `git diff HEAD --stat` — what files changed
- `git log --oneline -10` — recent commits
- `git status` — uncommitted changes
- Review the current task list
- Review the current conversation for decisions, blockers, and next steps

### Step 1.5 — Live-doc reconciliation

State-mirroring docs drift silently when a fact established in the session never reaches the doc that records it — e.g. a doc still says an external app is in "Development mode" when the session actually published it. Before committing, reconcile them.

**The state-doc set** — computed on the fly, no stored list (a stored list rots like the docs it tracks):
- Every `.md` under any `integrations/` directory — integration docs mirror external state by definition.
- Every doc with `live_doc: true` in its frontmatter (`grep -rl "live_doc: true"` in the repo).

**For each doc in that set:**
1. From its name/path, judge whether the session engaged that system at all. If the session never touched it, skip — no need to deep-read every integration doc.
2. Otherwise read it and compare against what THIS session established — did the session learn, change, or confirm anything the doc now states wrongly or omits? (an app mode, a token's state, a webhook path, an env var, a cron cadence, an auth model.)
3. If drift is found — edit the doc to match, and show the diff in the wrap output. A real edit, surfaced — never a deferred "doc needs updating" note; deferred notes are how docs rot.
4. If a doc is contradicted but the correct edit is genuinely unclear — do NOT guess. Surface it as a loud item in the handoff's Blockers section.

Scope discipline: only docs in the set, only facts the session actually touched. Edits land in this session's commit (Step 1.6 picks them up as session-modified files).

### Step 1.6 — Commit and push session work

**This step is mandatory. Sessions must not end with uncommitted work.**

1. From `git status` and `git diff`, identify files THIS session modified (use conversation context to distinguish from parallel sessions — ignore files other sessions are editing)
2. If there are uncommitted changes from this session:
   - Stage the session's files by name (never `git add -A`)
   - Commit with a descriptive message summarizing what this session did
3. If there are unpushed commits, push now
4. If push fails, fix and retry once. If still failing, note as blocker in the handoff doc

### Step 2 — Generate handoff document

```markdown
# Session Handoff — {YYYY-MM-DD HH:MM}

## Why This Matters
- [The business/strategic stake — what breaks or leaks if this isn't done, with the number/context that makes it matter. NOT a restatement of the task.]

## What Got Done
- [Concrete completions — specific file paths, route names, behavior changes]
- [Include migration filenames if schema changes were made]

## Still In Progress
- [Things started but not verified/completed]
- [Exact state: built but not tested / built but build fails / awaiting a decision]

## Queued / Next Up
- [Items discussed and agreed on but not started]
- [In priority order — highest leverage first]

## Decisions Made
### → Log to your decision record (strategic)
- [Decision + reasoning — if you keep a decision log, this is what to append]

### → Handoff Only (implementation details)
- [Config choices, naming conventions, etc. — for next chat continuity]

## Open Action Items
- [ ] [Anything waiting on a human: SQL to apply, env vars to set, manual external steps, etc.]

## Files Created / Modified
- [key new files with paths]
- [modified files worth flagging]

## Blockers
- [Anything that will block next session if not resolved]

## Build State
- `<build command>`: [passing / failing / not run]
- Uncommitted changes: [yes/no — what]
- Migrations pending apply: [list if any]

## Read These First (source map — where the info lives)
- [Ordered: 1. architecture/canon docs (paths) → 2. ADRs → 3. integration docs for each external system touched → 4. safety/gate docs → 5. the specific code files to change.]
- [State explicitly that the handoff is self-contained: the load-bearing findings are inlined; this session's tmp outputs are NOT readable from a fresh window — run IDs are reference-only.]

## Guardrails / Constraints (what the work must NOT break)
- [Live-surface gates that apply (e.g. payment webhooks, auth middleware, anything customer-facing), canon rules, channel/safety rules, and any "this is now manual / this changed" facts that explain a gap.]

## Human Decisions vs Buildable (decision split)
- **Human decision (route to owner):** [comp %, pricing, people, threshold values, alert tone — who decides each]
- **Buildable now (no human gate):** [what can proceed once approved]

## Context for Next Session
- [What the next session needs to know that isn't already in the repo docs]
- [Current phase: what's done, what's next]
```

The four cold-start sections (Why / Read These First / Guardrails / Human-vs-Buildable) are MANDATORY per the Cold-Start-Proof Mandate above. Omit a section only by writing "(none)" with a one-line reason — never by silent absence.

### Step 3 — Decision routing

**Log to your decision record if:**
- Changes how the business measures something
- Designates a source of truth
- Affects compensation, pricing, or financial reporting
- Sets architectural direction future builds depend on
- Another person needs to know about it
- Reversing it would require significant rework

**Handoff-only (don't log) if:**
- Bug fix or config change
- Naming convention or formatting choice
- Implementation detail captured in code
- Only you need to know about it

### Step 4 — Copy-paste handoff prompt

**This step is mandatory.** After the handoff document, emit a fenced code block titled "Handoff prompt for next session" that you can paste verbatim into a new chat's first message. The prompt must be self-contained — the next session has zero memory of this conversation.

Format:
```
Context from previous session ({YYYY-MM-DD HH:MM}):

**Why:** {one line — the stake. Why this matters, not what the task is.}

**What shipped:** {1-3 bullet points — concrete, with commit range or key files}

**What's open:** {numbered list of unfinished items in priority order, with file paths}

**Decisions made:** {any architectural or product decisions the next session must respect}

**Read first:** {ordered source map — canon/architecture docs, integration docs, then code files. Where the next session finds facts itself.}

**Guardrails:** {gates/canon/safety the work must not break + what's a human decision vs buildable}

**Blockers:** {action items waiting on a human, if any}

**Parallel sessions:** {what other sessions are working on, to avoid collision}

**Start here:** {[patch] or [build] classification. For [build]: "Read {files} first, design the pipeline, present approach before coding." For [patch]: "Read {file}:{lines}, apply fix, verify." Always include files to read — never just "fix X"}
```

Rules:
- No prose preamble. Start with the context line.
- Include file paths, not descriptions. "lib/metrics/compute.ts" not "the compute module."
- If there's a specific plan or spec the next session should read first, say so.
- Keep under 300 words. The next session will read the referenced files for detail.
- **Classify each open item** as `[patch]` (single fix, isolated) or `[build]` (multi-step pipeline, needs design). If `[build]`, the "Start here" must say "read the code + design the pipeline before coding" — never "start fixing X."
- **Start here must include code to read.** Not just "fix dropdowns" — include the specific files to read and understand before acting. The next session should assess the system state from code, not from the handoff summary.
- **Self-contained — no ephemeral refs.** The prompt must never point at this session's tmp/tool-call outputs (`/tmp/...`, "the synthesis above", run IDs as a source). A fresh window cannot read them. Inline the load-bearing facts; mark run IDs reference-only.
- **Why + Read-first are mandatory lines**, same as Start-here. A prompt without the stake and without a source map is not cold-start-proof.

---

## Quality Standard

**Cold-start test (the gate — run before emitting either the doc or the prompt):**
Read the handoff as if you have ZERO memory of this session. Can you answer all four from the handoff + repo alone?
1. **Why** does this matter (the stake)?
2. **Where** do I look for each fact I'll need (ordered source map)?
3. **What** must I not break (gates/canon/safety)?
4. **Which** open items are human decisions vs buildable now?
If any answer requires information only in this (now-gone) conversation, the handoff fails — fix it before emitting.

**Specific over general:**
- Bad: "Fixed the dashboard"
- Good: "Fixed MoM calculation for Sheets metrics — Calls Booked now shows -4.9% (137 vs 144)"

**State changes are explicit:**
- "API token set March 26, expires ~May 24, calendar reminder May 17"

**Prompts preserved verbatim** (if any were written but not yet run):
- Include exact text in a code block
