# Storefront design

## Purpose and current scope

Casthel Confectionery is a product-browsing storefront for chocolates, cakes, and gifts. The current application supports product discovery, a browser-persisted shopping cart, and a demo checkout form. It does not currently create orders, calculate delivery fees, or take payment.

## Application structure

The app uses the Next.js App Router and React with TypeScript. `src/app/layout.tsx` provides the shared HTML shell and wraps route content in `CartProvider`. Route files compose shared components and data:

| Route | Responsibility |
| --- | --- |
| `/` | Brand landing page, featured categories/products, and opening video. |
| `/products` | Product catalog with client-side category and text filters. |
| `/products/[id]` | Product details, bounded quantity selection, related items, and add-to-cart. |
| `/cart` | Cart contents, quantity/removal controls, subtotal, and checkout navigation. |
| `/checkout` | Required customer and delivery fields, order summary, and demo-only confirmation. |
| `/about` | Brand story and values. |

Reusable UI lives in `src/component/`; catalog data and price formatting live in `src/lib/products.ts`. The `@/*` TypeScript alias maps to `src/*`.

## Data and state

- The product catalog is a static in-source array in `src/lib/products.ts`. Each product has an ID, name, category, numeric price in NGN, image URL, description, and optional label.
- Cart state is held in the React context in `src/component/cart-provider.tsx`. A cart item stores only a product ID and positive integer quantity; product details and prices are looked up from the catalog when rendered.
- The provider restores and persists cart items in browser `localStorage` under `ebakes-cart`. Its `ready` state separates initial restoration from the empty-cart state.
- The cart/header quantity indicator counts units, not distinct product lines.
- Search and category filters are local state on `/products`. Cart state is shared across routes through the root provider.
- `getCurrentYear` is a cached server helper used by the home and about pages.

## Shopping flow

1. A visitor opens the product list or follows a featured category from the home page.
2. A product card links to its detail route and can add one unit directly. The detail page lets the visitor select 1–20 units before adding them.
3. The provider merges additions for the same product ID and saves the updated cart to local storage.
4. The cart and checkout resolve each ID against the static catalog and compute the subtotal as `price × quantity`.
5. Checkout relies on native required/email form validation. A valid submission displays a demo confirmation; it does not submit data to a backend.

## Presentation and accessibility

Global styles and the Tailwind theme are configured in `src/app/globals.css`; route components use utility classes for layout and styling. The visual direction is warm, confectionery-inspired, responsive, and image-led. Preserve semantic headings, links for navigation, buttons for actions, associated form labels, accessible names for icon-only controls, and useful image alternatives when changing the UI.

The opening video is decorative and muted; the invitation link uses the `#home` target to expose the underlying landing page. Check this interaction and reduced-motion considerations when changing the introduction experience.

## Important boundaries and future decisions

- **No persistence beyond one browser:** the cart is local to the current browser and is not synchronized across devices.
- **No authoritative order data:** product and price data are client-visible static data. A real order flow must validate product availability, quantities, and prices on a trusted server.
- **Demo checkout only:** do not collect or imply payment-card processing in this frontend. A production integration needs a backend order endpoint, server-side validation, payment-provider integration, and explicit success/failure states.
- **Delivery is not priced:** shown totals are merchandise subtotals only; fees and fulfillment rules are not implemented.
- **Remote assets:** catalog images use Pexels URLs, with the allowed host configured in `next.config.ts`; the opening video is a local public asset.

When implementing any of these future capabilities, document the chosen backend contract, source of truth, error/retry behavior, and relevant security/privacy decisions here before describing it as production behavior.
