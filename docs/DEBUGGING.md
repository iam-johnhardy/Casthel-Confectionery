# Debugging methodology

Use this process to diagnose defects in the storefront without masking the original failure.

## 1. Establish the failure

Record the route, action sequence, expected result, actual result, browser and viewport, and whether the issue survives a reload. Capture the exact error text and stack trace. For cart issues, note whether the cart was empty, newly changed, or restored from browser storage.

Reproduce the issue with the smallest reliable sequence. Check whether it occurs in both a fresh browser session and the affected session; stale or malformed `localStorage` can make cart behavior session-specific.

## 2. Locate the responsible boundary

Trace from the visible symptom toward the data source:

- Product listing and filtering: `src/app/products/page.tsx` and `src/lib/products.ts`.
- Product details and quantity selection: `src/app/products/[id]/page.tsx`.
- Cart actions and persistence: `src/component/cart-provider.tsx`; the storage key is `ebakes-cart`.
- Cart totals and presentation: `src/app/cart/page.tsx` and `src/app/checkout/page.tsx`.
- Shared navigation/count: `src/component/store-header.tsx`.
- Route shell and global styles: `src/app/layout.tsx` and `src/app/globals.css`.

Use the browser console for client-side errors and the terminal running `npm run dev` for Next.js compilation or server-rendering errors. Check the Network panel for missing images or failed requests. Product photography is loaded from `images.pexels.com`; local video is served from `public/cake-video.mp4`.

## 3. Form a testable hypothesis

Separate observed facts from assumptions. Identify the smallest relevant code path and one likely cause. For example, if the cart is empty only immediately after reload, compare the `ready` state and storage restoration sequence before changing cart calculations.

Avoid changing multiple unrelated things at once. Do not suppress console errors, broaden catch blocks, or replace a failing value with a silent default to make the symptom disappear.

## 4. Verify the cause and fix

Add a regression test for the smallest observable behavior when the project has suitable test coverage; otherwise record a repeatable manual check. Make the narrowest fix that addresses the cause. Check relevant edge cases such as empty data, unknown product IDs, invalid storage JSON, and quantity boundaries.

## 5. Validate and report

Re-run the reproducing scenario and check nearby user flows. Run:

```powershell
npm run lint
npm run build
```

For UI changes, also verify the affected route at narrow and wide viewport widths. Report the root cause, files/behavior changed, checks performed, and any remaining limitation. Do not include customer personal data, secrets, or payment information in logs or reports.

## Common diagnostic notes

- A cart restore is asynchronous; wait for its loading state before concluding that saved items were lost.
- Malformed saved cart data is logged and cleared by the provider. Check the browser console for the restore/clear error rather than assuming storage is valid.
- Checkout is intentionally a demo: valid form submission only changes the local confirmation UI. There is no order API, payment processing, or delivery-fee calculation.
- `getCurrentYear` uses Next.js caching; when diagnosing a stale year, check cache behavior as well as the render path.
- Remote images require the host to be permitted in `next.config.ts`; verify both the source URL and configured `remotePatterns`.
