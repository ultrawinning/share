# Tommy — full agent table

44 components across 6 layers. ⭐ flags items Emil's Ultrawinning didn't mention and could plausibly fold in.

## Sensors (data in)

| # | Agent | Role | Emil |
|---|---|---|---|
| 1 | Idea Bin Watcher | Polls capture surfaces (Telegram, iPhone Shortcut, web form) for new raw idea entries. Emits structured idea events into the system. | |
| 2 | Capture Prompter | Proactively pings the creator for lifestyle moments and build moments, the latter detected from git activity or voice notes. "You just pushed 12 commits to medus-onboarding, want a 30s voice note for content?" | ⭐ |
| 3 | Engagement Reader | Pulls post metrics from X / IG / YT via read-only APIs and populates the performance store. | |
| 4 | Trend Watcher | Monitors competitor accounts and AI/founder ops feeds for trending hooks, formats, audio. All outputs flagged untrusted and sandboxed. | |
| 5 | Asset Library Watcher | Watches a folder / Drive / iCloud for new screenshots, build pics, voice notes that can become content. | |

## Coordination

| # | Agent | Role | Emil |
|---|---|---|---|
| 6 | Triage Router | First-pass classifier on every event: content idea, inspiration drop, metric, system signal, or question. Routes to the right downstream agent. | |
| 7 | Conductor | Orchestrator-worker lead per Anthropic's canonical pattern. Breaks ideas into sub-tasks, delegates to specialists, manages the queue. | |
| 8 | Skill Picker | Selects which validated pattern from the Skill Library applies to this idea, falls back to base prompts otherwise. | ⭐ |
| 9 | Handoff Composer | Formats accepted Packs into clean Wednesday review surfaces: web dashboard + Telegram digest. | |

## Specialists

| # | Agent | Role | Emil |
|---|---|---|---|
| 10 | Idea Refiner | Normalizes raw bin entries, deduplicates against existing ideas, classifies into types (story / teach / build / lifestyle / contrarian / proof). | |
| 11 | Hook Forger | Generates ranked hook candidates per idea, scored on novelty, specificity, opening-line tension, and voice fit. | |
| 12 | X Drafter | Writes X posts and threads with per-format prompts (single, 5-tweet, 10-tweet). | |
| 13 | IG Drafter | Writes IG carousel scripts slide-by-slide, single posts, and story scripts. | |
| 14 | YT Shorts Drafter | Writes 15-30s spoken scripts with [VISUAL:] cues, on-screen text, B-roll suggestions, and recording direction. | |
| 15 | Newsletter Drafter | Writes newsletter sections that anchor the owned-audience trust layer. | |
| 16 | Visual Composer | Generates image prompts, IG carousel layouts, reel storyboards, and on-screen text overlays. | |
| 17 | Voice Calibrator | Maintains the voice corpus and scores drafts on voice fidelity via embeddings against confirmed-on-voice samples. | |
| 18 | Pack Producer | Assembles drafts + visuals + scripts + on-screen text + posting time recommendation into one shippable package per shoot/post. | |

## Quality gates (every pack passes all five)

| # | Agent | Role | Emil |
|---|---|---|---|
| 19 | Voice Auditor | Hard gate. Scores draft against voice corpus and bounces below-threshold drafts back to the Drafter with notes. | |
| 20 | Pre-mortem | Argues against the post by surfacing cringe, AI-slop signatures, factual risk, controversy bait, brand dilution. Returns kill / fix-list / pass. | ⭐ |
| 21 | Brand Differentiation Check | Compares draft against Emil's recent content patterns and flags clones (Agnese-specific gate; Emil would invert this for his own competitive set). | |
| 22 | PII / Security Filter | OWASP-aligned. Detects API keys, client names, financial data, personal info and strips or flags for review. | ⭐ |
| 23 | Compliance Check | Copyright on quoted material, trademark conflicts, third-party clip usage, FTC disclosure for sponsored content. | ⭐ |

## Self-improving engine

| # | Agent | Role | Emil |
|---|---|---|---|
| 24 | Pattern Detector | Daily batch over post metrics and agent failures. Surfaces what hooks / formats / topics performed and where drafts got killed. | ⭐ |
| 25 | Prompt Evolver | When ≥3 corrections cluster on the same failure mode for an agent, proposes 4 candidate prompt mutations. Never auto-applies; human-gated. | ⭐ |
| 26 | Champion/Challenger | Replays new prompts against current ones on historical data. Anti-regression gate before any prompt change ships. | ⭐ |
| 27 | Memory Curator | Daily voice corpus health scan. Drafts "skill candidates" when the same successful pattern fires three or more times. | |
| 28 | Sleep/Consolidation | Nightly memory rewriter. Commits validated skills into the Skill Library and retires stale samples. | ⭐ |
| 29 | Workflow Researcher | Studies competitor accounts and the broader content space and proposes new content angles and format experiments. | |
| 30 | System Researcher | Studies the engine's own logs and open-source agent research. Proposes architecture improvements as PRDs for Agent Builder. | ⭐ |
| 31 | Tech Radar | Monitors new Claude / OpenAI / Vercel releases and platform feature changes. Proposes upgrades when something material lands. | ⭐ |
| 32 | Agent Builder | Takes approved technical PRDs and scaffolds new agents (directory, prompt template, DB rows, tests, wiring). Human-gated. | ⭐ |

## Knowledge & inspiration

| # | Agent | Role | Emil |
|---|---|---|---|
| 42 | Knowledge Curator | Maintains a builds catalog + knowledge map by daily-scanning git activity, voice notes, and past content. Surfaces gaps and shippable build moments. | ⭐ |
| 43 | Applicability Judge | Receives inspiration drops (reels, carousels, X posts the creator flags). Returns GO / SOFT / KILL with reasoning across brand fit, knowledge fit, differentiation, redundancy. | ⭐ |
| 44 | Angle Generator | Fires on GO verdicts. Takes the extracted pattern + builds catalog + knowledge map, generates 2-3 fresh angles applying the pattern to things the creator has actually shipped. | ⭐ |

## Background services (no LLM, pure code, always running)

| # | Service | Role | Emil |
|---|---|---|---|
| 33 | Cost Sentry | Per-agent and per-day token + dollar caps. Throttles or pauses on breach to prevent Denial-of-Wallet attacks. | ⭐ |
| 34 | Telemetry | Per-agent metrics plus a **Content Learning Velocity (CLV)** headline KPI for whether the engine is actually improving. | ⭐ |
| 35 | Scheduler | Cron for daily Pattern Detector batches, nightly Sleep/Consolidation, weekly review digests, hourly engagement reads. | |
| 36 | Audit Logger | Every agent action timestamped with agent ID logged, sensitive fields redacted. | ⭐ |
| 37 | Backup Service | Snapshots Postgres + memory daily and enables point-in-time recovery. | |
| 38 | Secrets Vault | All API keys in env vars; agents never see raw keys, they call typed proxies. | ⭐ |
| 39 | Trust Labeler | Tags every input as trusted (creator) or untrusted (third-party). Downstream agents enforce trust-aware behavior. | ⭐ |
| 40 | Output Sanitizer | Final pass on any agent output before it reaches a human surface. Strips secret-looking strings, applies content safety filter. | ⭐ |
| 41 | Rate Limiter | Per-agent per-minute call limits to prevent runaway loops. | |
