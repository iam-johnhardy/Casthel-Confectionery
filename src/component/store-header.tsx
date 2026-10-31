
"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/component/cart-provider";

export default function StoreHeader() {
  const { items, ready } = useCart();
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-[#f3e5df] bg-[#fffaf7]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/#home" className="monsieur-la-doulaise-regular text-lg xl:text-4xl font-bold text-[#e96d91]">
          Casthel Confectionery.
        </Link>

        <div className="flex items-center gap-4 text-sm sm:gap-6">
          <Link href="/products" className="hover:text-[#e96d91]">
            Shop
          </Link>
          <Link href="/about" className="hidden hover:text-[#e96d91] sm:block">
            Our Story
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-[#e96d91] px-4 py-2 text-white hover:bg-[#d9527a]"
          >
            <ShoppingBag size={17} />
            Cart
            <span className="rounded-full bg-white/20 px-2">
              {ready ? count : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
