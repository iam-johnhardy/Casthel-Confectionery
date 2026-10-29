
"use client";

import { useMemo, useState } from "react";
import StoreHeader from "@/component/store-header";
import ProductCard from "@/component/product-card";
import { products } from "@/lib/products";

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

//   const categories = [
//     "All",
//     ...Array.from(new Set(products.map((product) => product.category)),
//   ];
const categories = [
  "All",
  ...Array.from(new Set(products.map((product) => product.category))),
];
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch = `${product.name} ${product.description}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      <StoreHeader />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
          Made for your sweetest moments
        </p>

        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
          Find your little luxury.
        </h1>

        <p className="mt-4 max-w-xl leading-7 text-[#806a62]">
          Explore handcrafted chocolates, celebration cakes, and
          thoughtful gifts.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search treats..."
            aria-label="Search products"
            className="w-full rounded-full border border-[#ead5cd] bg-white px-5 py-3 outline-none focus:border-[#e96d91] sm:max-w-sm"
          />

          <p className="text-sm text-[#806a62]">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                category === item
                  ? "bg-[#e96d91] text-white"
                  : "border border-[#ead5cd] hover:bg-[#fff0f3]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="font-serif text-2xl">No treats found</h2>
            <p className="mt-2 text-[#806a62]">
              Try another search or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-full bg-[#e96d91] px-5 py-3 text-sm text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
