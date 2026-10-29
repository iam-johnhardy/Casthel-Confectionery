
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Gift, Sparkles, CakeSlice } from "lucide-react";
import StoreHeader from "@/component/store-header";
import { getCurrentYear } from "@/lib/current-year";

const values = [
  {
    icon: Heart,
    title: "Made with care",
    description:
      "We believe the little details make a meaningful difference, from flavour to final presentation.",
  },
  {
    icon: Sparkles,
    title: "Thoughtfully crafted",
    description:
      "Every treat should feel special, whether it is an everyday indulgence or a once-in-a-lifetime celebration.",
  },
  {
    icon: Gift,
    title: "Beautifully shared",
    description:
      "We make it easier to turn appreciation, celebrations, and simple gestures into sweeter memories.",
  },
  {
    icon: CakeSlice,
    title: "For every occasion",
    description:
      "From a personal treat to a thoughtful gift, there is always a reason to share something lovely.",
  },
];

export default async function AboutPage() {
  const currentYear = await getCurrentYear();

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      <StoreHeader />

      <section className="relative overflow-hidden bg-[#fff0f3] px-5 py-20 text-center sm:py-28">
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d9527a]">
            A little about us
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
            Our Story,
            <br />
            Baked Fresh Daily
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-[#806a62]">
            We believe life is sweeter when we slow down, savour the
            little things, and share something delicious with the people
            who matter.
          </p>
        </div>
        <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#f9dce5]" />
        <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-[#f4e5cc]" />
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 lg:px-8 lg:py-24">
        <Image
          src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1100"
          alt="Preparing baked goods with care"
          width={1100}
          height={880}
          className="aspect-[5/4] w-full rounded-3xl object-cover"
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
            Small beginnings. Sweeter memories.
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            A little sweetness goes a long way.
          </h2>
          <div className="mt-5 space-y-4 leading-7 text-[#806a62]">
            <p>
              E Bakes is built around a simple idea: the things we share
              can make ordinary days feel extraordinary.
            </p>
            <p>
              Whether you are celebrating a birthday, thanking someone
              special, or treating yourself after a long day, we want
              every experience to feel thoughtful and memorable.
            </p>
            <p>
              From our product selection to the way your order is
              presented, we aim to make every little detail count.
            </p>
          </div>
          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e96d91] px-6 py-3 font-semibold text-white transition hover:bg-[#d9527a]"
          >
            Discover our treats <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="bg-[#fff3f5] px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
              What makes us different
            </p>
            <h2 className="mt-3 font-serif text-4xl">
              The good things we bake into everything.
            </h2>
            <p className="mt-4 leading-7 text-[#806a62]">
              Thoughtful choices, a love for the details, and a belief
              that little moments deserve to be celebrated.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-[#f3e5df] bg-white p-6"
                >
                  <div className="inline-flex rounded-xl bg-[#fff0f3] p-3 text-[#d9527a]">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-5 font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#806a62]">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
              Made for sharing
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Ready for something sweet?
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-[#806a62]">
              Explore our collection and find something lovely for
              yourself or someone you care about.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e96d91] px-6 py-3 font-semibold text-white hover:bg-[#d9527a]"
            >
              Shop the collection <ArrowRight size={17} />
            </Link>
          </div>

          <Image
            src="https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=1100"
            alt="A selection of chocolates ready to share"
            width={1100}
            height={880}
            className="aspect-[5/4] w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      <footer className="bg-[#3b211f] px-5 py-10 text-center text-white">
        <Link href="/" className="font-serif text-2xl">
          E Bakes.
        </Link>
        <p className="mt-3 text-sm text-white/70">
          Thoughtfully made treats for life&apos;s sweetest moments.
        </p>
        <div className="mt-5 flex justify-center gap-6 text-sm text-white/80">
          <Link href="/products">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/about">Our story</Link>
        </div>
        <p className="mt-8 text-xs text-white/50">
          © {currentYear} E Bakes.
        </p>
      </footer>
    </main>
  );
}
