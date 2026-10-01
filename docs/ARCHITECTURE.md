# مُدا (Moda) — Architecture

UI-only Persian (RTL) fashion storefront. All data is mock data that stands in for a
future backend. This document explains how the code is organised and the rules that keep it that way.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 6 (strict) · Tailwind CSS 4 (CSS-first
config) · shadcn/ui on the unified `radix-ui` package · Zod 4 (form + storage validation) ·
next-themes · sonner · lucide-react · Vitest (unit tests) · ESLint 9 flat config.

## Directory layout

```text
src/
├── app/                 Routes only: pages, layouts, loading/error/not-found, metadata,
│                        sitemap/robots. Pages load data from feature `data/` modules and
│                        compose feature components. No business logic.
├── features/            Domain code, one folder per business domain.
│   ├── catalog/         Products, categories, brands, collections, reviews, listing
│   │                    (filters/sort/pagination), product cards, product detail page.
│   ├── search/          Search bar, search dialog, suggestions, recent searches.
│   ├── cart/            Cart state, pricing rules (shipping, tax, coupons), cart UI.
│   ├── wishlist/        Wishlist state and UI.
│   ├── checkout/        Checkout form + schema, order-success snapshot.
│   ├── orders/          Orders mock data, status metadata, timeline, order UI.
│   ├── account/         Customer dashboard: profile, addresses, payment methods,
│   │                    notifications, settings.
│   ├── auth/            Login / register / password recovery UI + schemas.
│   ├── content/         About, FAQ, contact, legal documents, testimonials.
│   ├── home/            Homepage sections.
│   └── design-system/   Living style guide (/design-system).
├── components/
│   ├── ui/              shadcn/ui primitives (presentation only, no app imports).
│   ├── shared/          Domain-agnostic app components (EmptyState, FormField,
│   │                    ConfirmDialog, Pagination, Breadcrumb, JsonLd …).
│   ├── layout/          Storefront shell (header, footer, navigation). The shell is a
│   │                    composition layer and may use features (cart badge, search…).
│   └── providers/       App-wide client providers (theme, direction, cart, wishlist).
├── config/              Site configuration and navigation.
├── constants/           Static reference data shared by several features.
├── hooks/               Generic React hooks shared by several features.
├── lib/                 Framework-independent utilities (cn, formatting, validation, env).
└── styles/              Global CSS (Tailwind entry + design tokens) and fonts.
```

Inside a feature, use only the sub-folders that are needed:

```text
features/<domain>/
├── components/   UI for the domain
├── data/         Mock data + accessors. SERVER-ONLY (`import "server-only"`)
├── lib/          Pure domain logic (no React)
├── schemas/      Zod schemas
├── store/        Client state (React context)
└── types.ts      Types owned by the domain
```

### Why feature-oriented

Almost every change in this app is a domain change: a new filter, a checkout field, or a dashboard
screen. Keeping all of a domain's code in one folder means a change touches one folder.
There is deliberately **no** global `services/`, `stores/` or `schemas/` folder: each schema, store and
service belongs to exactly one domain. There is also no generic repository/service layer on top of the
mock data, because the `data/` accessors already are that seam. When a backend arrives, only the
accessor bodies change.

## Dependency rules

```text
app  →  components/layout  →  features  →  components/shared · components/ui · lib · config · constants · hooks
```

* `components/ui`, `components/shared`, `lib`, `config`, `constants`, `hooks` never import
  from `features/` or `components/layout` (enforced by ESLint `no-restricted-imports`).
* Features may import other features' **types, lib and components** (e.g. cart uses the
  catalog `Product` type; the product card composes cart and wishlist actions). Never create a
  file-level cycle (enforced by ESLint `import/no-cycle`).
* `features/*/data/**` is server-only. Client components receive data **as props** from
  server pages or layouts. Importing mock data into a client component fails the build.

## Server / client split

* Pages, layouts, and most presentational components are Server Components.
* `"use client"` only for interaction: state, effects, event handlers, browser storage, or
  Radix primitives. Large interactive screens are split so that static markup stays on the server
  and only the interactive island ships JS. Examples: the product card is server-renderable and
  only its wishlist and add-to-cart buttons are client islands; the listing is filtered and
  paginated on the server and only the filter controls are client code.

## State

| Kind | Where |
| --- | --- |
| URL state | listing filters/sort/page, FAQ category, orders tab (`searchParams`) |
| Global client state | cart, wishlist, notifications (React context in `features/*/store`) |
| Browser persistence | recent searches, recently viewed (`hooks/use-local-storage`, validated on read) |
| Form state | uncontrolled inputs + `FormData`, validated with Zod on submit |
| Local UI state | component `useState` |

Derived values (totals, counts, filtered lists) are computed, never stored.

## Business rules

Rules live in each feature's `lib/` as pure functions with unit tests, not in components:
pricing, coupons and free shipping (`cart/lib/pricing`), cart lines and quantity caps
(`cart/lib/cart-lines`), the order snapshot and payment options (`checkout/lib`), order status
rules and list filtering (`orders/lib`), the address book and wallet amount parsing
(`account/lib`), and listing filters (`catalog/lib`). Components render the results and wire events.

## Conventions

* Files and folders: `kebab-case`. Components: `PascalCase` named exports. Hooks: `use-*.ts`
  exporting `useX`. Schemas: `*-schema(s).ts` exporting `xSchema`; derive types with `z.infer` where needed.
* Imports use the `@/` alias. There are no barrel files, so imports point at the defining module.
* No `any`. Untrusted data (URL params, storage, form data) is parsed with Zod or explicit
  guards, never cast.

## Scripts

`dev` · `build` · `start` · `lint` · `typecheck` · `test` · `check` (lint + typecheck + test).
