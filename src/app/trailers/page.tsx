import Link from "next/link";
import type { Metadata } from "next";
import { trailers } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Trailer Catalog | AK Trailer Rentals",
  description: "Browse our fleet of car haulers, utility trailers, log haulers, and enclosed cargo trailers.",
};

export default function TrailersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">CATALOG</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Our Trailers</h1>
      <p className="mt-3 max-w-xl text-coffee/70">
        Every trailer is inspected and ready to hook up. Pick a category below to see specs,
        photos, and availability.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trailers.map((trailer) => (
          <Link
            key={trailer.slug}
            href={`/trailers/${trailer.slug}`}
            className="group rounded-2xl border border-almond bg-white p-5 transition-colors hover:border-pumpkin"
          >
            <div className="aspect-4/3 w-full rounded-xl bg-almond/50" />
            <p className="mt-4 font-semibold text-coffee">{trailer.name}</p>
            <p className="mt-1 text-sm text-coffee/60">{trailer.tagline}</p>
            <p className="mt-3 text-sm font-semibold text-pumpkin">${trailer.pricePerDay}/day</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
