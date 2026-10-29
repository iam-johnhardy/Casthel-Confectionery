# Code review checklist

Use this checklist for changes to the storefront. Review the behavior and risk of the change, not just formatting.

## Correctness and scope

- Does the change meet the stated requirement without unrelated behavior changes?
- Are empty, invalid, missing, and boundary inputs handled deliberately?
- Do product IDs resolve consistently across listing, details, cart, and checkout?
- Are quantity constraints consistent between product detail and cart controls?
- Do cart count, line items, and subtotals agree for multiple products and quantities?
- Does checkout continue to describe the current demo behavior accurately?

## React and Next.js

- Are browser-only APIs such as `localStorage` accessed only on the client?
- Are client components marked appropriately, and are server components kept server-side where possible?
- Are effects and event handlers safe across rerenders and navigation?
- Are route parameters and not-found cases handled?
- If changing Next.js APIs, have the applicable installed-version docs been checked against this project's Next.js version?

## Data and resilience

- Is external or persisted data validated before use?
- Are errors surfaced with context rather than silently ignored or converted into success?
- Does storage restoration avoid overwriting saved data before it has loaded?
- Are prices derived from the product catalog, and are quantities included exactly once?
- Are remote image hosts configured in `next.config.ts`?

## Accessibility and UX

- Can interactive controls be used by keyboard and identified by accessible name?
- Do form controls have labels, suitable input types, and native validation where appropriate?
- Do images have meaningful alternative text (or are decorative images correctly hidden)?
- Are loading, empty, not-found, no-results, and success states understandable?
- Does the layout remain usable at narrow viewport widths?
- Do status messages avoid implying payment or order fulfillment that has not occurred?

## Verification

- Is there a test for the behavior most likely to regress?
- Were the focused manual or automated checks run?
- Run `npm run lint` and `npm run build` when practical for the scope.
- If tests are not added, is the reason clear (for example, no test runner is currently configured)?

## Review outcome

Before approval, summarize the behavior reviewed, checks run, unresolved risks, and any follow-up work. Block approval for a correctness, accessibility, data-integrity, or misleading-checkout issue; record non-blocking improvements separately.
