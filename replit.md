# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### `rto-guide` — RTO Standards 2025 Practice Guide

A React + Vite web app for Australian vocational educators (TAFE / RTO trainers and assessors) navigating the RTO Standards 2025. Single-user, no auth.

- **Path**: `artifacts/rto-guide`, served at `/`.
- **Pages**: Dashboard (`/`), Standards browse (`/standards`), Quality Area detail (`/quality-areas/:qualityAreaId`), Standard detail (`/standards/:standardId`), Strategies browse (`/strategies`), Favorites (`/favorites`), Notes (`/notes`).
- **Visual identity**: Warm forest green + library cream. DM Sans (UI) + Fraunces (display).
- **Domain model**: 4 Quality Areas → 24 Standards → ~57 Strategies. Per-standard progress (`not_started | planning | in_progress | embedded`), per-standard reflection notes, per-strategy favorites.

### `api-server` — Express 5 + Drizzle backend for the practice guide

- **Path**: `artifacts/api-server`, served at `/api`.
- **Endpoints**: `/quality-areas`, `/standards`, `/strategies`, `/strategies/featured`, `/progress`, `/notes`, `/favorites`, `/dashboard/summary`. All defined in `lib/api-spec/openapi.yaml`.
- **Seed data**: `src/lib/seedData.ts` holds the practitioner-facing standards content. `src/lib/seed.ts` runs idempotently on startup (`seedIfEmpty`).
- **Builders**: `src/lib/builders.ts` centralises the joins for standard summaries and strategy listings (with progress and favorited state).

## Database

Drizzle schemas in `lib/db/src/schema/`:

- `quality_areas` — 4 rows (QA1-QA4)
- `standards` — 18 rows, FK to `quality_areas`
- `strategies` — ~40 rows, FK to `standards`, with `category` and `effort` enums
- `progress` — keyed by `standard_id` (single user)
- `notes` — multiple per `standard_id`
- `favorites` — keyed by `strategy_id` (single user)

After schema changes: `pnpm --filter @workspace/db run push`.

## Adding API Endpoints

1. Edit `lib/api-spec/openapi.yaml`.
2. Run `pnpm --filter @workspace/api-spec run codegen`.
3. Add a route file under `artifacts/api-server/src/routes/` and register it in `routes/index.ts`.
4. Validate inputs and outputs with `@workspace/api-zod` schemas.
