# Casthel Confectionery

A Next.js App Router storefront for browsing chocolates, cakes, and gifts. The current app includes a static product catalog, category/search filters, a cart persisted in browser local storage, and a demo checkout form.

> Checkout is not connected to an order service or payment provider. Submitting the form does not place an order or take payment.

## Getting started

Install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |

There is currently no automated unit- or browser-test runner configured. See the [testing strategy](./docs/TESTING.md) for priorities and a manual smoke test.

## Documentation

- [Testing strategy](./docs/TESTING.md) — unit/integration guidance, what to test, and manual smoke checks.
- [Debugging methodology](./docs/DEBUGGING.md) — a repeatable troubleshooting and verification workflow.
- [Code review checklist](./docs/CODE_REVIEW.md) — correctness, accessibility, resilience, and verification checks.
- [Storefront design](./docs/DESIGN.md) — routes, state, shopping flow, and system boundaries.

## Source layout

```text
src/
  app/                 App Router pages and global styles
  component/           Shared UI and cart context
  lib/                 Product catalog and shared helpers
public/                Static images and video
docs/                  Project testing, debugging, review, and design guides
```
