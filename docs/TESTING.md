# Testing strategy

This document describes how to test the storefront and what deserves a test. It is a strategy, not a claim that automated tests already exist.

## Current setup

The project is a Next.js App Router application written in TypeScript. `package.json` currently provides `dev`, `build`, `start`, and `lint` scripts; it does not configure a unit-test runner, browser-test runner, or test script.

Run the checks that are available:

```powershell
npm run lint
npm run build
```

Use `npm run dev` for manual browser checks. When adding an automated test framework, add its dependencies and scripts to `package.json`, document the exact commands here, and keep tests alongside the code or in a clearly named test directory.

## What to test

Prioritize behavior that can lose or misrepresent an order: cart persistence and quantity updates, displayed totals, product lookup, and checkout form validation. Test observable behavior at the smallest level that can prove it. Do not write tests for implementation details such as component state variable names or Tailwind class strings.

| Priority | Behavior | Useful cases |
| --- | --- | --- |
| High | Cart operations in `CartProvider` | Add a new item; adding an existing item increments it; update quantity; reject quantities below one; remove an item; independent products remain unchanged. |
| High | Cart persistence | Restore valid saved data; initialize an empty cart when storage is empty; reject malformed JSON or invalid item shapes without crashing; persist updates after restoration is complete. |
| High | Cart, checkout, and price calculations | Empty-cart state; known and unknown product IDs; quantity-weighted subtotal; cart/header count; a submit with an empty cart does not show success. |
| Medium | Product browsing | Search matches product name and description without case sensitivity; category and search filters combine; clearing filters restores the full list; no-results state appears. |
| Medium | Product detail | Existing and unknown IDs; related products share a category and exclude the current item; quantity cannot fall below one or rise above 20; add-to-cart uses the selected quantity. |
| Medium | Checkout form | Required fields and email format are enforced by the browser; submitting valid details shows the demo confirmation; the copy makes clear that no order or payment is processed. |
| Medium | Navigation and presentation | Product, cart, checkout, and about links work; images have useful alternative text; controls have accessible names; key layouts work at narrow and wide viewport sizes. |

### Unit tests

Unit tests should cover deterministic logic without rendering the entire application. Good starting points are `formatPrice` and extracted pure helpers for product filtering, cart totals, and persisted-cart validation. Include boundary cases (empty input, missing product, malformed saved data, and quantity limits), not just the typical case.

For cart behavior that depends on React state or `localStorage`, use a component-level test around `CartProvider` and a small consumer component rather than testing React internals. Mock browser storage only at the boundary and verify the resulting UI or storage value.

### Integration tests

Integration tests should verify that the important pieces work together:

1. Mount the provider with a consumer and confirm add, update, remove, and persistence behavior.
2. Render product browsing with the product data and verify search/category interaction and the result count.
3. Exercise the storefront flow: product listing → product detail → add to cart → cart subtotal → checkout.
4. Confirm restored cart data is visible consistently in the header, cart, and checkout after navigation or reload.

Keep integration tests focused on user-visible outcomes. Avoid binding them to the precise DOM nesting or CSS utility classes.

### Manual smoke test

Until browser automation is configured, use this short smoke test after changes to shopping flows:

1. Start the app with `npm run dev` and open `/`.
2. Browse `/products`; try a case-insensitive search, a category, and a search with no matches.
3. Open a product, increase and decrease quantity, then add it to the cart.
4. On `/cart`, verify the item count, subtotal, quantity controls, removal, and empty-cart view.
5. Reload and verify the cart is restored; continue to `/checkout` and verify the order summary.
6. Submit checkout with missing or malformed required fields, then valid fields. Verify the demo confirmation and that the UI does not claim an order or payment was placed.
7. Check the same primary flow at a narrow viewport and check the browser console for errors.

## Test quality and maintenance

- Assert the requirement that could regress, including meaningful totals and limits.
- Prefer accessible queries (role, label, and visible text) in UI tests.
- Keep fixtures small and explicit; use existing product IDs when a test needs real catalog data.
- Stub network or framework boundaries only when they are part of the test; do not mock the logic being verified.
- Make failure messages identify the behavior that failed.
- Run the focused test first, then `npm run lint` and `npm run build` for changes that affect the app.
- Do not treat line coverage as a goal by itself; prioritize untested business rules and failure paths.
