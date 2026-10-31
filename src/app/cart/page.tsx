
"use client";

import Link from "next/link";
import Image from "next/image";
import StoreHeader from "@/component/store-header";
import StoreLoader from "@/component/store-loader";
import { useCart } from "@/component/cart-provider";
import { products, formatPrice } from "@/lib/products";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, ready, updateQuantity, removeItem } = useCart();

  const cartItems = items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#fffaf7]">
        <StoreHeader />
        <StoreLoader message="Loading your cart..." />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      <StoreHeader />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
          Your selection
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
          Your shopping bag.
        </h1>

        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[#f3e5df] bg-white px-6 py-16 text-center">
            <h2 className="font-serif text-2xl">Your bag is waiting for a treat.</h2>
            <p className="mt-3 text-[#806a62]">
              Explore our chocolates, cakes, and thoughtful gifts.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e96d91] px-6 py-3 text-white"
            >
              Browse products <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-[#f3e5df] bg-white p-4 sm:gap-6 sm:p-5"
                >
                  <Link href={`/products/${item.id}`} className="shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={230}
                      className="h-28 w-24 rounded-xl object-cover sm:h-36 sm:w-32"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs text-[#a18a80]">{item.category}</p>
                      <Link href={`/products/${item.id}`}>
                        <h2 className="mt-1 font-semibold hover:text-[#d9527a]">
                          {item.name}
                        </h2>
                      </Link>
                      <p className="mt-2 text-sm font-semibold text-[#d9527a]">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-4 rounded-full border border-[#ead5cd] px-3 py-2">
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id);
                            } else {
                              updateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                        >
                          <Minus size={15} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-xs text-[#a65a5a] hover:text-red-700"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <Link
                href="/products"
                className="inline-flex items-center gap-2 py-3 text-sm font-semibold text-[#d9527a]"
              >
                <ArrowRight size={16} className="rotate-180" />
                Continue shopping
              </Link>
            </div>

            <aside className="rounded-3xl border border-[#f3e5df] bg-white p-6">
              <h2 className="font-serif text-2xl">Order summary</h2>

              <div className="mt-6 flex justify-between gap-4 text-sm">
                <span className="text-[#806a62]">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              <div className="mt-4 flex justify-between gap-4 border-b border-[#f3e5df] pb-5 text-sm">
                <span className="text-[#806a62]">Delivery</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="mt-5 flex justify-between gap-4">
                <span className="font-semibold">Total before delivery</span>
                <span className="text-lg font-bold text-[#d9527a]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#e96d91] px-5 py-4 text-center font-semibold text-white hover:bg-[#d9527a]"
              >
                Continue to checkout <ArrowRight size={17} />
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-[#806a62]">
                Final delivery fees and payment confirmation will be handled
                during checkout.
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
