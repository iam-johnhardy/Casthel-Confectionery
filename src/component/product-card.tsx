
"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/component/cart-provider";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addItem } = useCart();

  return (
    <article className="group min-w-0">
      <Link
        href={`/products/${product.id}`}
        className="relative block overflow-hidden rounded-2xl bg-white"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={900}
          height={1125}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {product.label && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide">
            {product.label}
          </span>
        )}
      </Link>

      <div className="pt-3">
        <p className="text-xs text-[#a18a80]">{product.category}</p>

        <Link href={`/products/${product.id}`}>
          <h2 className="mt-1 font-semibold hover:text-[#d9527a]">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 font-semibold text-[#d9527a]">
          {formatPrice(product.price)}
        </p>

        <button
          onClick={() => addItem(product.id)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#e9c9cf] px-3 py-2 text-sm font-semibold transition hover:bg-[#e96d91] hover:text-white"
        >
          <ShoppingBag size={16} />
          Add to cart
        </button>
      </div>
    </article>
  );
}
