
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StoreHeader from "@/component/store-header";
import StoreLoader from "@/component/store-loader";
import { useCart } from "@/component/cart-provider";
import { products, formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, ready } = useCart();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const cartItems = items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cartItems.length === 0) return;

    // Demo only: connect this form to your FastAPI order endpoint later.
    setSubmitted(true);
  }

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#fffaf7]">
        <StoreHeader />
        <StoreLoader message="Loading checkout..." />
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
        <StoreHeader />
        <section className="mx-auto max-w-xl px-5 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
            Demo checkout
          </p>
          <h1 className="mt-4 font-serif text-4xl">Your form is ready!</h1>
          <p className="mt-4 leading-7 text-[#806a62]">
            No order has been placed and no payment has been taken.
            The next step is connecting this form to the backend.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-7 rounded-full bg-[#e96d91] px-6 py-3 text-white"
          >
            Continue shopping
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      <StoreHeader />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
          Almost time for something sweet
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Checkout.</h1>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center">
            <h2 className="font-serif text-2xl">Your cart is empty</h2>
            <Link
              href="/products"
              className="mt-5 inline-block rounded-full bg-[#e96d91] px-6 py-3 text-white"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
            <form
              onSubmit={handleSubmit}
              className="space-y-7 rounded-3xl border border-[#f3e5df] bg-white p-5 sm:p-8"
            >
              <section>
                <h2 className="font-serif text-2xl">Your details</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm">
                    Full name
                    <input
                      name="fullName"
                      required
                      autoComplete="name"
                      className="mt-2 w-full rounded-xl border border-[#ead5cd] px-4 py-3 outline-none focus:border-[#e96d91]"
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="text-sm">
                    Email address
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-2 w-full rounded-xl border border-[#ead5cd] px-4 py-3 outline-none focus:border-[#e96d91]"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="text-sm sm:col-span-2">
                    Phone number
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="mt-2 w-full rounded-xl border border-[#ead5cd] px-4 py-3 outline-none focus:border-[#e96d91]"
                      placeholder="Your contact number"
                    />
                  </label>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl">Delivery address</h2>
                <div className="mt-5 space-y-4">
                  <label className="block text-sm">
                    Street address
                    <input
                      name="address"
                      required
                      autoComplete="street-address"
                      className="mt-2 w-full rounded-xl border border-[#ead5cd] px-4 py-3 outline-none focus:border-[#e96d91]"
                      placeholder="House number and street"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm">
                      City
                      <input
                        name="city"
                        required
                        autoComplete="address-level2"
                        className="mt-2 w-full rounded-xl border border-[#ead5cd] px-4 py-3 outline-none focus:border-[#e96d91]"
                        placeholder="City"
                      />
                    </label>
                    <label className="text-sm">
                      State
                      <input
                        name="state"
                        required
                        autoComplete="address-level1"
                        className="mt-2 w-full rounded-xl border border-[#ead5cd] px-4 py-3 outline-none focus:border-[#e96d91]"
                        placeholder="State"
                      />
                    </label>
                  </div>
                  <label className="block text-sm">
                    Delivery notes (optional)
                    <textarea
                      name="notes"
                      rows={3}
                      className="mt-2 w-full rounded-xl border border-[#ead5cd] px-4 py-3 outline-none focus:border-[#e96d91]"
                      placeholder="Landmarks or special instructions"
                    />
                  </label>
                </div>
              </section>

              <div className="rounded-2xl bg-[#fff0f3] p-4 text-sm leading-6 text-[#806a62]">
                Payment options will be displayed here once the backend
                and payment provider are connected. Do not enter payment
                card details into this demo form.
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#e96d91] px-6 py-4 font-semibold text-white hover:bg-[#d9527a]"
              >
                Continue — {formatPrice(subtotal)}
              </button>
            </form>

            <aside className="rounded-3xl border border-[#f3e5df] bg-white p-6">
              <h2 className="font-serif text-2xl">Your order</h2>
              <div className="mt-5 space-y-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="mt-1 text-xs text-[#806a62]">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between border-t border-[#f3e5df] pt-5 font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#806a62]">
                Delivery fees are not included yet.
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
