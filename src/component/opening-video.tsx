import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OpeningVideo({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="opening-video fixed inset-0 z-50 flex items-end overflow-hidden bg-[#3b211f] px-5 py-12 sm:items-center sm:px-8">
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/cake-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="relative mx-auto w-full max-w-7xl text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/85 sm:text-sm">
            Thoughtfully made, beautifully shared
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl lg:text-7xl">
            A little sweetness, made for your moments.
          </h1>
          <Link
            href="#home"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#38231f] transition hover:bg-[#fff2f4]"
          >
            Explore the shop <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      {children}
    </>
  );
}
