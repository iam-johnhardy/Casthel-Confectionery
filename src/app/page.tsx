
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import OpeningVideo from "@/component/opening-video";
import ProductCard from "@/component/product-card";
import StoreHeader from "@/component/store-header";
import { getCurrentYear } from "@/lib/current-year";
import { products } from "@/lib/products";
import image from "../../public/image.png";

const categories = [
  {
    name: "Chocolate",
    description: "Little bites of luxury",
    image:
      "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    name: "Cakes",
    description: "Made for celebrations",
    image:
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    name: "Gift Boxes",
    description: "Beautifully wrapped joy",
    image:
      "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
];

export default async function Home() {
  const currentYear = await getCurrentYear();

  return (
    <OpeningVideo>
      <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      {/* Announcement bar */}
      <div id="home" className="bg-[#e96d91] px-4 py-2 text-center text-xs text-white">
        A little sweetness goes a long way. Enjoy shopping with us.
      </div>

      <StoreHeader />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:py-20 lg:px-8">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#df6487]">
            Thoughtfully made, beautifully shared
          </p>

          <h1 className="font-serif text-5xl leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
            A little moment.
            <br />
            An extraordinary
            <br />
            <span className="italic text-[#e96d91]">
              indulgence.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[#806a62]">
            Discover handcrafted chocolates, delightful cakes, and
            thoughtful gifts made to turn ordinary moments into
            something special.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#e96d91] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d9527a]"
            >
              Shop the collection <ArrowRight size={17} />
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[#ead5cd] px-6 py-3 text-sm font-semibold transition hover:bg-[#f9ece7]"
            >
              Our story
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-[#806a62]">
            <div className="flex text-[#e9a64f]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={15}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span>Made with care, enjoyed with love</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-86 -top-30 h-24 w-24 rounded-full bg-[#f9dce577] md:h-72 md:w-72" />
          <Image
            src="https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="An assortment of artisan chocolates"
            width={1200}
            height={900}
            priority
            className="relative z-10 aspect-[4/3] w-full rounded-[2rem] object-cover shadow-sm"
          />
          <div className="absolute -bottom-5 -left-4 z-20 rounded-2xl bg-white p-4 shadow-lg sm:p-5">
            <p className="text-xs text-[#806a62]">
              A little box of happiness
            </p>
            <p className="mt-1 font-serif text-lg">
              Made to make you smile.
            </p>
          </div>
        </div>
      </section>

      {/* Shopping benefits */}
      <section className="border-y border-[#f3e5df] bg-[#fff3f5]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-5 py-5 text-center text-sm sm:grid-cols-3 lg:px-8">
          <p>♡ Thoughtfully handcrafted</p>
          <p>✧ Beautifully packaged</p>
          <p>♡ Made for sharing</p>
        </div>
      </section>

      {/* Categories */}
      <section id="shop" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
              Find your favourite
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
              What are you craving?
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-sm font-semibold text-[#d9527a] sm:flex"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/products"
              className="group overflow-hidden rounded-2xl border border-[#f3e5df] bg-white"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={700}
                height={560}
                className="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm text-[#8a756c]">
                    {category.description}
                  </p>
                </div>
                <ArrowRight
                  size={19}
                  className="text-[#e96d91] transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section id="bestsellers" className="bg-[#fff2f4] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
                Loved by our customers
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                Small pleasures. Big favourites.
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-semibold text-[#d9527a] sm:flex"
            >
              Shop everything <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section id="story" className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-2 lg:px-8 lg:py-24">
        <Image
          src={image}
          alt="Carefully preparing handmade treats"
          width={1100}
          height={880}
          className="aspect-[5/4] w-full rounded-[2rem] object-cover"
        />
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e96d91]">
            A little about us
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Good things take care, not shortcuts.
          </h2>
          <p className="mt-5 leading-7 text-[#806a62]">
            Every treat should feel special. We believe in thoughtful
            details, beautiful presentation, and flavours worth sharing.
            From a personal indulgence to a gift for someone you love,
            we make room for sweeter moments.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#ead5cd] px-6 py-3 text-sm font-semibold transition hover:bg-[#fff2f4]"
          >
            Discover our story <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Promotional banner */}
      <section className="mx-5 mb-16 rounded-[2rem] bg-[#f9dce5] px-5 py-12 text-center sm:mx-8 lg:mx-auto lg:max-w-7xl lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b84b6c]">
          Something sweet is waiting
        </p>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
          Make someone&apos;s day.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#806a62]">
          Find a thoughtful gift or choose a little something just for you.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e96d91] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#d9527a]"
        >
          Find your sweet thing <ArrowRight size={17} />
        </Link>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#3b211f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <Link href="/" className="monsieur-la-doulaise-regular text-2xl font-bold text-white/70">
              Casthel Confectionery.
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
              Thoughtfully made treats for life&apos;s sweetest moments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Explore</h3>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p><Link href="/products">Shop all</Link></p>
              <p><a href="#bestsellers">Bestsellers</a></p>
              <p><a href="#story">Our story</a></p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Customer care</h3>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>Delivery information</p>
              <p>Frequently asked questions</p>
              <p>
                <a href="mailto:chiomaethel002@gm.com">
                  ✉️ chiomaethel002@gm.com
                </a>
              </p>
              <p>
                <a href="tel:07069458045">📞 +2347069458045</a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">A little sweetness in your inbox</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">
              New treats, seasonal collections, and thoughtful gift ideas.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/60">
          © {currentYear}  Casthel Confectionery. Made with care.
        </div>
      </footer>
      </main>
    </OpeningVideo>
  );
}
