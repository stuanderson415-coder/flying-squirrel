# Threat Model

## Project Overview

Publicly deployed RTO Standards companion consisting of a React frontend (`artifacts/rto-guide`) and an Express 5 API (`artifacts/api-server`) backed by PostgreSQL via Drizzle. The app exposes public read endpoints for standards content plus mutable endpoints for progress, notes, and favorites. The current product behavior is described as single-user with no authentication, but the production deployment is public on the internet.

## Assets

- **Educator reflections and notes** — freeform text entered by users about standards implementation. These can contain sensitive operational details, self-assessment commentary, or internal compliance observations.
- **Progress and favorites state** — mutable application state representing how a user is working through standards and which strategies they have bookmarked. Integrity matters because it drives the dashboard and user workflow.
- **Seeded standards content and derived summaries** — public reference content plus dashboard aggregates built from stored state.
- **Application secrets and infrastructure configuration** — `DATABASE_URL`, runtime environment, and deployment configuration used by the API server.

## Trust Boundaries

- **Browser to API** — all frontend interactions with `/api/*` cross from an untrusted client into the server. The browser and any other HTTP client must be treated as untrusted.
- **API to PostgreSQL** — all persisted notes, progress, and favorites are stored in Postgres. Any flaw in request validation, authorization, or query scoping affects durable data.
- **Public internet to deployment** — the deployment is public, so unauthenticated endpoints are reachable by arbitrary internet clients, not just the intended single operator.
- **Development-only artifacts vs production artifacts** — `artifacts/mockup-sandbox` is development-only and should usually be ignored unless independently shown to be reachable in production.

## Scan Anchors

- Production API entry points: `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/api-server/src/routes/*.ts`
- Persistent state surfaces: `progress`, `notes`, `favorites` routes plus `lib/db/src/schema/{progress,notes,favorites}.ts`
- Shared request/response contracts: `lib/api-spec/openapi.yaml`, `lib/api-zod`, `lib/api-client-react`
- Frontend consumers of mutable state: `artifacts/rto-guide/src/pages/standard-detail.tsx`, `artifacts/rto-guide/src/pages/notes-list.tsx`, `artifacts/rto-guide/src/components/strategy-card.tsx`
- Dev-only area to ignore by default: `artifacts/mockup-sandbox`

## Threat Categories

### Spoofing

The application currently has no authentication boundary for mutable API endpoints. Because the deployment is public, any internet client can act as the sole intended user unless the system introduces a real identity or another strong gating control. All state-changing endpoints that represent a user's private workspace must require a trustworthy identity or be made non-public.

### Tampering

Progress, notes, and favorites are stored as global records with no user scoping. The API must ensure that only the intended principal can create, update, or delete those records; otherwise any external client can overwrite or erase the live state used by the app. Validation must constrain both structure and abuse potential, not just types.

### Information Disclosure

The notes and dashboard endpoints expose persisted reflections and other user-derived state over a public API. Any data that is meant to represent a private workspace must be scoped to the correct principal before being returned. Error handling and logs should also avoid exposing secrets, but the primary disclosure risk here is unauthorized access to stored notes and derived state.

### Denial of Service

Public write endpoints can be abused to create or churn persisted state. The API must bound request sizes, mutation frequency, and record growth enough to prevent anonymous internet users from filling storage or degrading the experience for the intended operator.

### Elevation of Privilege

Because there is no separation between anonymous callers and the intended single user, an unauthenticated attacker effectively receives the same privileges as the application's owner for mutable workspace data. Any future introduction of multiple users or admin capabilities must be enforced server-side in both the schema and route layer.
