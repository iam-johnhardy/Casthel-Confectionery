"use client";

import { useState } from "react";
import Link from "next/link";
import StoreHeader from "@/component/store-header";

type FormMode = "sign-in" | "sign-up";

export default function LoginPage() {
  const [mode, setMode] = useState<FormMode>("sign-in");
  const [notice, setNotice] = useState("");

  function changeMode(nextMode: FormMode) {
    setMode(nextMode);
    setNotice("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Account access is not connected yet. Your details have not been sent or saved."
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      <StoreHeader />

      <section className="mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:px-8">
        <div className="mx-auto max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
            Your sweetest moments start here
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            {mode === "sign-in" ? "Welcome back." : "Create your account."}
          </h1>
          <p className="mt-4 leading-7 text-[#806a62]">
            {mode === "sign-in"
              ? "Sign in to make your next visit a little sweeter."
              : "Join us to make every celebration a little sweeter."}
          </p>

          <div className="mt-8 grid grid-cols-2 rounded-full bg-[#f9ece7] p-1">
            <button
              type="button"
              aria-pressed={mode === "sign-in"}
              onClick={() => changeMode("sign-in")}
              className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                mode === "sign-in"
                  ? "bg-white text-[#d9527a] shadow-sm"
                  : "text-[#806a62] hover:text-[#38231f]"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              aria-pressed={mode === "sign-up"}
              onClick={() => changeMode("sign-up")}
              className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                mode === "sign-up"
                  ? "bg-white text-[#d9527a] shadow-sm"
                  : "text-[#806a62] hover:text-[#38231f]"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {mode === "sign-up" && (
              <label className="block text-sm font-medium">
                Full name
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 w-full rounded-xl border border-[#ead5cd] bg-white px-4 py-3 outline-none transition focus:border-[#e96d91]"
                  placeholder="Your full name"
                />
              </label>
            )}

            <label className="block text-sm font-medium">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-[#ead5cd] bg-white px-4 py-3 outline-none transition focus:border-[#e96d91]"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-sm font-medium">
              Password
              <input
                name="password"
                type="password"
                autoComplete={
                  mode === "sign-in" ? "current-password" : "new-password"
                }
                minLength={8}
                required
                className="mt-2 w-full rounded-xl border border-[#ead5cd] bg-white px-4 py-3 outline-none transition focus:border-[#e96d91]"
                placeholder="At least 8 characters"
              />
            </label>

            {notice && (
              <p
                role="status"
                className="rounded-xl bg-[#fff0f3] px-4 py-3 text-sm leading-6 text-[#806a62]"
              >
                {notice}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#e96d91] px-6 py-4 font-semibold text-white transition hover:bg-[#d9527a]"
            >
              {mode === "sign-in" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 text-[#806a62]">
            Account access is a preview and is not connected to an
            authentication service. Checkout remains available without signing
            in.
          </p>

          <p className="mt-6 text-center text-sm text-[#806a62]">
            Just browsing?{" "}
            <Link
              href="/products"
              className="font-semibold text-[#d9527a] hover:underline"
            >
              Explore our treats
            </Link>
          </p>
        </div>

        <div className="relative hidden min-h-[540px] overflow-hidden rounded-[2rem] bg-[#fff0f3] lg:block">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#f9dce5]" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#f4e5cc]" />
          <div className="relative flex h-full min-h-[540px] flex-col justify-end p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9527a]">
              Casthel Confectionery
            </p>
            <p className="mt-4 max-w-md font-serif text-4xl leading-tight text-[#38231f]">
              Thoughtfully made treats for life&apos;s sweetest moments.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
