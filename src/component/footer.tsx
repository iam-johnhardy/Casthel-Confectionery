import { getCurrentYear } from "@/lib/current-year";
import Link from "next/link";

export async function Footer() {
  const currentYear = await getCurrentYear();

  return (
    <footer id="contact" className="bg-[#3b211f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link
            href="/"
            className="monsieur-la-doulaise-regular text-2xl font-bold text-white/70"
          >
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
        © {currentYear} Casthel Confectionery. Made with care.
      </div>
    </footer>
  );
}