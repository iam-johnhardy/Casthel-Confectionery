
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import StoreHeader from "@/component/store-header";
import { useCart } from "@/component/cart-provider";
import { products, formatPrice } from "@/lib/products";
import ProductCard from "@/component/product-card";

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fffaf7]">
          <StoreHeader />
          <p className="p-12 text-center">Loading product...</p>
        </main>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}

function ProductDetailsContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === params.id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
        <StoreHeader />
        <section className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="font-serif text-3xl">Product not found</h1>
          <p className="mt-3 text-[#806a62]">
            This treat may no longer be available.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-[#e96d91] px-6 py-3 text-white"
          >
            Browse products
          </Link>
        </section>
      </main>
    );
  }

  const productId = product.id;
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 3);

  function handleAddToCart() {
    addItem(productId, quantity);
    router.push("/cart");
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      <StoreHeader />

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-[#806a62] hover:text-[#d9527a]"
        >
          <ArrowLeft size={16} /> Back to shop
        </Link>

        <div className="mt-7 grid gap-10 md:grid-cols-2 md:gap-14">
          <div className="overflow-hidden rounded-3xl bg-white">
            <Image
              src={product.image}
              alt={product.name}
              width={900}
              height={1125}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="py-2 md:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
              {product.category}
            </p>

            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-semibold text-[#d9527a]">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 leading-7 text-[#806a62]">
              {product.description}
            </p>

            <div className="mt-8">
              <label className="text-sm font-semibold">Quantity</label>
              <div className="mt-3 inline-flex items-center gap-5 rounded-full border border-[#ead5cd] px-4 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={17} />
                </button>
                <span className="min-w-5 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#e96d91] px-6 py-4 font-semibold text-white transition hover:bg-[#d9527a]"
            >
              <ShoppingBag size={19} />
              Add to cart — {formatPrice(product.price * quantity)}
            </button>

            <div className="mt-6 rounded-2xl bg-[#fff0f3] p-4 text-sm leading-6 text-[#806a62]">
              Need a gift for a special occasion? Contact us to discuss
              custom orders and availability.
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl">You may also love</h2>
            <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
