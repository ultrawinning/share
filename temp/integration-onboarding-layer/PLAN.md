# Integration Onboarding Layer — Plan for Medus / Bite

**Status:** SCOPED. Plan only. Do not execute without Agnese + Emil's explicit sign-off on the build/rent decision (see "Holes").

**Audience:** Agnese + her Claude Code session.

**Author:** Emil (via Opus 4.7 session, 2026-05-19).

**Origin prompt:** Emil reviewed [windsor.ai](https://windsor.ai/) and asked whether the Windsor-shape (connect-and-manage marketing/SaaS integrations) is the right onboarding surface for Medus and Bite clients.

**Why this lands in `share/` and not `medus-app` directly:** Emil's Claude Code session has a hard constraint against editing `medus-app` / `bite-app` / `Hypergrowth` repos without Agnese's AOK. This is the plan artifact handed across — Agnese's CC owns the execution.

---

## Section 1 — Context

### 1.1 What Windsor.ai is (and the category it sits in)

Windsor is one of ~6 marketing-data ETL/ELT vendors. The pattern across all of them:

1. **OAuth into the client's ad/SaaS accounts** (Meta Ads, Google Ads, GA4, TikTok, Shopify, GHL, Salesforce, etc.).
2. **Pull data on a schedule** from each platform's API.
3. **Normalize + write to a destination** (Sheets, BigQuery, Snowflake, Postgres, lately "ChatGPT/Claude as a destination").
4. **Charge per data source × per account × per row-volume.**

Competitor landscape as of 2026-05-19:

| Vendor | Starting price | Connectors | Embeddable? | Self-host? |
|---|---|---|---|---|
| **Windsor.ai** | $23/mo Basic → $598 Professional → custom Enterprise | 325+, all included in every tier | No public embed; "external auth links" for letting clients connect | No |
| **Funnel.io** | $200/mo Starter → $800 Business | 121–590 depending on tier | No public embed; Solution Partner Program is referral/co-sell, not technical | No |
| **Supermetrics** | $299/mo Premium for white-label reporting | Strong on ad platforms | Limited; ties everything to Google accounts (well-known agency pain point) | No |
| **Fivetran** | Partner pricing not disclosed publicly | Strongest enterprise breadth | Partner portal only; pricing opaque | No |
| **Airbyte** | $0 self-hosted (OSS); cloud from $10/mo; Enterprise Flex for embedded | 600+ | **Yes — Enterprise Flex explicitly supports "Airbyte Agents inside your own product for your customers"** | **Yes — Core plan free and self-host-friendly** |
| **Nango** | $0 (10 connections) → $50/mo Starter → $500/mo Growth + $1/extra connection | 800+ APIs (auth broker, not ETL) | **Yes — purpose-built as embedded OAuth + sync infrastructure**, per-customer credential isolation first-class | **Yes — self-hosting supported** |

### 1.2 What Medus and Bite actually need

Per Emil's framing, the first 30 minutes of any new Medus/Bite client engagement is integration plumbing — wiring into the client's Meta Ads, Google Ads, GHL subaccount, store, etc. Today that's manual, slow, and brittle. A clean "connect your accounts" wizard is both:

- The onboarding moment (first impression on every new client).
- The ongoing data pipe (everything downstream — reporting, attribution, AI features — reads from it).
- A lock-in surface (the more integrations are wired, the higher the switching cost).

This is **not** a feature request for "we'd like a dashboard." This is asking *what category of plumbing the agency products are built on top of*.

### 1.3 What's off-limits / non-negotiable

- **Emil's CC cannot edit `medus-app` or `bite-app` directly.** All implementation in those repos must be done by Agnese's CC.
- **No cross-tenant pollution.** Per Overmind's pollution rules, the shared component must contain zero Medus/Bite/HPFHQ business strings. It is a tenant-agnostic Architect-pattern component.
- **No silent failures.** Per `rule-28` of the global rules, every connector failure must surface — Slack/Telegram alert or a response flag the consumer can see. `console.error` alone is not surfacing.
- **Per-tenant credential isolation.** A Medus client's Meta token must never be addressable by a Bite client's session, even by mistake.

---

## Section 2 — Thought process

### 2.1 The first decision: build vs. rent the connector layer

This is the gating decision. Everything downstream depends on it.

**Option A — Build everything ourselves (DIY connectors).**

- Cost: 1–2 engineers full-time, forever, just to keep Meta/Google/TikTok APIs green as they break every 6–12 months.
- Upside: Total control, zero vendor cost.
- Verdict: **Wrong call.** Connector maintenance is a treadmill, not a product. This is what kills indie attempts at this category. Ruled out.

**Option B — Rent an all-in-one marketing ETL (Windsor / Funnel / Supermetrics).**

- Cost: ~$200–800/mo/client at scale (depends on tier and row volume).
- Upside: Cheap to start. Connectors maintained for us.
- Downside:
  - **None of them are embeddable** in a meaningful way. We'd be sending clients to a Windsor-branded auth page or hosting a manual wizard. Defeats the "connect your accounts" UX inside the Medus/Bite product.
  - Vendor lock-in on the destination schema.
  - Margin compression — clients can find these vendors themselves, undermining the value-add.
- Verdict: **Partial.** Good for HPFHQ-internal ingestion. Wrong for an agency product where the integration UX is itself the onboarding surface.

**Option C — Compose Nango (OAuth broker) + Airbyte (ETL) into our own product.**

- Cost: Nango free tier covers 10 connections; ~$50/mo from 20+; Airbyte Core is free self-hosted or $10/mo cloud. We pay per-connection at modest scale.
- Upside:
  - **Both are designed to be embedded** in another product. Nango especially — it's the only vendor in the list whose explicit job is "OAuth + sync infrastructure that you put inside your product."
  - **Per-customer credential isolation is a first-class feature** in Nango, not a workaround.
  - Self-host escape hatch on both. If pricing goes hostile, we move to self-hosted on our own Supabase + a Hetzner box.
  - We own the UX completely. "Connect your Meta Ads" looks like a native Medus/Bite button, not a redirect to a third party.
  - The schema we write into Supabase is ours to design — no vendor's normalized format leaking into our DB.
- Downside:
  - More upfront engineering than Option B (~1 week to wire Nango + an initial 3–4 connectors, vs. ~1 day to integrate a Windsor SDK).
  - We still depend on Nango's connector library for OAuth handshakes (but the dependency is contained — auth tokens land in our infra, not theirs).
- Verdict: **Right call.** This is the shape that matches the actual product ambition.

**Decision: Option C.** Build the onboarding UX + per-tenant credential vault + downstream schema ourselves. Use **Nango as the OAuth broker** and **Airbyte (cloud to start, self-hosted later) as the sync engine**. Treat both as facade dependencies — wrap them so a future swap is a single-file change.

### 2.2 Why Nango specifically over building OAuth from scratch

Every OAuth flow is the same five steps in a slightly different order with three undocumented quirks per platform. Building this is a known-quantity tar pit:

- Meta Long-Lived Tokens vs. Short-Lived. PKCE flows. The Meta Business Login annoyance.
- Google's offline access scope handling. Refresh token rotation.
- TikTok's region-specific auth domains.
- GHL OAuth 2.0 + the per-location vs. per-agency token distinction.
- Shopify's per-shop install flow.

Nango handles 800+ of these. We hand it a `connectionId` (we use `client_id` from our Supabase) and it gives back a valid, refreshed token via API. That's the integration surface for our app.

### 2.3 Why Airbyte specifically over Windsor for the sync layer

Two reasons:

1. **Embeddability.** Airbyte Enterprise Flex is explicitly licensed for "Airbyte Agents inside your own product for your customers." Windsor isn't. If/when we scale, Airbyte stays an embedded dependency; Windsor would need to be replaced.
2. **Schema control.** Airbyte writes to *our* destination (our Supabase / our BigQuery). We define the schema. Vendor ETLs always nudge you toward their normalized schema, and migrating off later is painful.

The cost we pay for these benefits is ~3–5 days extra wiring vs. dropping in a Windsor SDK.

### 2.4 The shape of the shared component

Three layers, separable, each with its own facade:

```
┌─────────────────────────────────────────────────────────────┐
│  Product consumer (medus-app, bite-app, hpfhq)              │
│  - imports @arch/integrations SDK                            │
│  - renders <ConnectAccounts /> in onboarding flow            │
│  - reads from normalized schema in its own Supabase          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Shared Architect component: @arch/integrations              │
│  - OAuth broker facade (today: Nango; swappable)             │
│  - Sync engine facade (today: Airbyte; swappable)            │
│  - Per-tenant credential vault (Supabase RLS)                │
│  - Normalized schema definitions (per source)                │
│  - Webhook receiver + retry/dead-letter handling             │
│  - Failure surfacing (rule-28 compliance)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  External vendors                                            │
│  - Nango (OAuth + token refresh)                             │
│  - Airbyte cloud (sync) → later: self-hosted                 │
└─────────────────────────────────────────────────────────────┘
```

The two facades are the critical detail. Every Nango call goes through `@arch/integrations/auth/broker.ts`. Every Airbyte call goes through `@arch/integrations/sync/engine.ts`. If Nango raises prices or Airbyte breaks, swap inside one file.

### 2.5 What we ruled out and why

- **DIY connectors.** Treadmill. See 2.1.
- **Windsor / Funnel / Supermetrics as the embedded layer.** Not embeddable in a way that preserves Medus/Bite branding. See 2.1.
- **Building OAuth flows from scratch instead of Nango.** Known tar pit. See 2.2.
- **Letting each product (Medus, Bite) implement its own integrations.** Duplicated effort, divergent schemas, no cross-pollination. The whole point is one shared component.
- **Putting this component inside `medus-app` and importing from there.** Pollution. Component must live in its own neutral repo (Overmind experiment first, eventually `~/Code/arch-integrations/`) and be consumed by all products via npm/yarn.

---

## Section 3 — Build

### 3.1 Repo structure (target end state)

```
~/Code/arch-integrations/        # the shared component (new repo)
├── README.md
├── CLAUDE.md                    # Architect-pattern doc
├── package.json                 # publishes as @arch/integrations
├── src/
│   ├── auth/
│   │   ├── broker.ts            # Nango facade (the only file that imports Nango)
│   │   └── types.ts
│   ├── sync/
│   │   ├── engine.ts            # Airbyte facade
│   │   └── types.ts
│   ├── vault/
│   │   └── credentials.ts       # Supabase RLS wrapper
│   ├── schema/
│   │   ├── meta-ads.ts          # normalized Meta Ads schema
│   │   ├── google-ads.ts
│   │   ├── ga4.ts
│   │   ├── ghl.ts
│   │   └── shopify.ts
│   ├── react/
│   │   └── ConnectAccounts.tsx  # the onboarding UI component
│   └── webhooks/
│       └── receiver.ts
├── supabase/
│   └── migrations/
│       └── 0001_integrations_tables.sql
└── tests/
```

### 3.2 Database schema (lands in the consuming product's Supabase)

```sql
-- run in medus-app's Supabase (and bite-app's, and hpfhq's, separately)
-- per-tenant isolation via RLS on tenant_id

create table integration_connections (
  id              uuid primary key default gen_random_uuid(),
  tenant_id       uuid not null,
  source          text not null,           -- 'meta_ads' | 'google_ads' | 'ga4' | 'ghl' | 'shopify'
  account_label   text not null,           -- human-readable: "Acme Corp Meta Ad Account"
  external_account_id text not null,       -- the platform's account ID
  nango_connection_id text not null unique,
  status          text not null,           -- 'active' | 'reauth_required' | 'failed' | 'disabled'
  last_sync_at    timestamptz,
  last_error      text,                    -- per rule-28: surface failures, don't swallow
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table integration_connections enable row level security;
create policy "tenant_isolation" on integration_connections
  using (tenant_id = auth.uid());          -- adjust to actual tenant claim shape

create table integration_sync_runs (
  id              uuid primary key default gen_random_uuid(),
  connection_id   uuid not null references integration_connections(id) on delete cascade,
  started_at      timestamptz not null default now(),
  finished_at     timestamptz,
  status          text not null,           -- 'running' | 'success' | 'failed'
  rows_synced     int,
  error           text
);
```

Plus per-source data tables (`meta_ads_insights`, `google_ads_campaigns`, etc.) — schema defined per source under `src/schema/`.

### 3.3 Facade interfaces (the contracts consumers depend on)

```ts
// @arch/integrations/auth/broker.ts
export interface AuthBroker {
  startConnection(opts: {
    tenantId: string;
    source: SourceName;
    redirectUrl: string;
  }): Promise<{ authUrl: string; connectionId: string }>;

  getValidToken(connectionId: string): Promise<{ token: string; expiresAt: Date }>;

  revokeConnection(connectionId: string): Promise<void>;

  onWebhook(payload: unknown): Promise<WebhookResult>;
}

// @arch/integrations/sync/engine.ts
export interface SyncEngine {
  scheduleSync(opts: {
    connectionId: string;
    source: SourceName;
    destination: { type: 'supabase' | 'bigquery'; config: unknown };
    cadence: 'hourly' | 'daily';
  }): Promise<{ syncId: string }>;

  triggerSyncNow(syncId: string): Promise<void>;

  getSyncStatus(syncId: string): Promise<SyncStatus>;
}

export type SourceName = 'meta_ads' | 'google_ads' | 'ga4' | 'ghl' | 'shopify';
```

Concrete implementations (`NangoAuthBroker`, `AirbyteSyncEngine`) sit behind these interfaces. Consumers never import Nango or Airbyte SDKs directly.

### 3.4 React component (the onboarding UX)

```tsx
// @arch/integrations/react/ConnectAccounts.tsx
import { useState } from 'react';

export function ConnectAccounts({
  tenantId,
  sources,
  onConnected,
}: {
  tenantId: string;
  sources: SourceName[];
  onConnected: (source: SourceName, connectionId: string) => void;
}) {
  // renders a button per source
  // clicking calls broker.startConnection() → opens authUrl in popup
  // on success, fires onConnected
  // styled to be themeable by the consuming product (Medus / Bite / HPFHQ)
}
```

The consuming app drops this into its onboarding flow:

```tsx
// in medus-app/app/onboarding/integrations/page.tsx
<ConnectAccounts
  tenantId={currentClient.id}
  sources={['meta_ads', 'google_ads', 'ghl', 'shopify']}
  onConnected={(source, connId) => trackOnboardingStep(source)}
/>
```

### 3.5 Build phases

**Phase 0 — Decision gate (Emil + Agnese).** Confirm Option C (compose Nango + Airbyte) before any code lands. If rejected (e.g. Agnese has reason to prefer Option B), redo Section 2.1 with that constraint. **Estimated: 1 conversation.**

**Phase 1 — Skeleton in Overmind experiment.** Stand up `~/Code/overmind/experiments/2026-05/integration-onboarding/` with the facade interfaces + a single working source (Meta Ads via Nango → Supabase test table). Prove the OAuth round-trip end-to-end with a throwaway tenant. No UI yet — CLI test only. **Estimated: 2 days.**

**Phase 2 — Promote to standalone repo `@arch/integrations`.** Move the experiment into its own repo, publish to a private npm/Github Packages, add Supabase migrations, write the React component. Add 2nd and 3rd sources (Google Ads, GHL). **Estimated: 3 days.**

**Phase 3 — Medus consumer integration (Agnese's CC owns this).** In `medus-app`: install `@arch/integrations`, run the migration, wire `<ConnectAccounts />` into the onboarding flow, replace any existing per-client manual integration steps. **Estimated: 2 days for Agnese.**

**Phase 4 — Bite + HPFHQ consumers.** Mirror Phase 3 for Bite. HPFHQ gets the same component for its own marketing data ingestion (replaces ad-hoc Meta CAPI / GHL webhook code where appropriate). **Estimated: 2 days each.**

**Phase 5 — Self-host escape hatch (only if vendor costs become painful).** Migrate Nango to self-hosted on Hetzner + Airbyte Core on the same box. Single-file change inside the two facades because we wrapped them properly in Phase 1. **Estimated: 1 week, only when triggered.**

### 3.6 Acceptance criteria for Phase 1 (the only phase Emil's CC can ship)

- [ ] `~/Code/overmind/experiments/2026-05/integration-onboarding/` exists with skeleton repo.
- [ ] `broker.ts` implements `AuthBroker` using Nango SDK.
- [ ] CLI script can: start a Meta Ads OAuth flow for a fake tenant, capture the callback, store a `connectionId` in a test Supabase project, retrieve a valid token via `getValidToken()`, and refresh it.
- [ ] Failure path test: simulated Nango outage triggers a Telegram alert via the shared `reportFailure()` helper (rule-28 compliance).
- [ ] README documents the facade contracts and the swap path.
- [ ] `experiments/2026-05/integration-onboarding/DECISIONS.md` written documenting Option C rationale.

---

## Section 4 — Holes

Per global `rule-23` — make uncertainty first-class.

1. **Nango pricing at scale.** $1/extra connection sounds reasonable, but if Medus signs 200 clients each with 5 connections = 1000 connections = $1000/mo just for Nango. Unsigned. Need to confirm whether "connection" = per-client-per-source or per-tenant aggregate. Action: ping Nango support before Phase 2 commits.
2. **Airbyte cloud row-volume pricing.** "Starting at $10/mo" is misleading; real costs scale with synced rows. Marketing data is row-heavy (Meta insights at daily × campaign × ad-set × ad granularity = millions of rows/client/year). Need a realistic cost model before Phase 2. Action: build a row-volume estimator from a sample HPFHQ Meta Ads month.
3. **Nango GHL coverage.** Nango lists 800+ APIs but I did not confirm GoHighLevel specifically is one of them. If it isn't, we either contribute the connector (Nango is OSS-friendly for contributions) or build GHL OAuth in-house. Action: check Nango's API directory before Phase 1.
4. **Per-tenant Supabase vs. shared Supabase.** Open question: does each Medus client get their own Supabase project (clean isolation, expensive) or share one with RLS (cheaper, more attack surface)? Schema in 3.2 assumes shared+RLS. Defer to Agnese's existing Medus tenancy model.
5. **GHL agency-vs-location token distinction.** GHL has two OAuth flows: agency-level and per-location. Medus clients are likely a mix. Schema in 3.2 stores one `external_account_id` per connection — may need a second table for the agency→locations mapping. Defer to whoever knows GHL best.
6. **White-label branding.** Nango's OAuth popup shows their domain. For client-facing onboarding inside Medus, this might be acceptable (Nango is invisible-by-default) or unacceptable (clients see "nango.dev" in the auth URL). Action: confirm with Agnese whether Medus's brand needs to be present in the popup. If yes, custom domain feature in Nango (price unknown).
7. **HPFHQ tenancy model.** HPFHQ is single-tenant today. Adding `@arch/integrations` means deciding whether HPFHQ gets a virtual "tenant_id" or whether the schema accommodates single-tenant case. Easy fix, just needs a call.

---

## Section 5 — Handoff notes for Agnese's CC

- The plan above is Emil's recommendation. If Agnese disagrees with Option C (Section 2.1) and prefers Option B (Windsor SDK), the entire build section needs rework — that's a Phase 0 conversation.
- The facade pattern (`AuthBroker`, `SyncEngine` interfaces) is load-bearing. Even if the underlying vendor changes, the consumer-facing contract must not change. Consumers (Medus/Bite/HPFHQ) should never import Nango or Airbyte directly.
- Per Overmind's `rule-28`, every connector failure must surface — wire to the shared `reportFailure()` helper or equivalent Telegram alerter. Silent `console.error` is non-compliant.
- Per Overmind's pollution rules, this repo must never reference Medus / Bite / HPFHQ business strings. It is tenant-agnostic.
- The Holes section is the most important block for Agnese's CC to read before starting — those are the seven things that would invalidate the plan if answered wrong.

---

**Last updated:** 2026-05-19 by Emil's Opus 4.7 session.
