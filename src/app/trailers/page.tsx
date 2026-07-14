import type { Metadata } from "next";
import { getTrailers } from "@/lib/data";
import TrailerGrid from "@/components/TrailerGrid";

export const metadata: Metadata = {
  title: "Trailer Catalog | AK Trailer Rentals",
  description: "Browse our fleet of car haulers, utility trailers, log haulers, and enclosed cargo trailers.",
};

export default async function TrailersPage() {
  const trailers = await getTrailers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">CATALOG</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Our Trailers</h1>
      <p className="mt-3 max-w-xl text-coffee/70">
        Every trailer is inspected and ready to hook up. Pick a category below to see specs,
        photos, and availability.
      </p>

      <div className="mt-10">
        <TrailerGrid trailers={trailers} />
      </div>
    </div>
  );
}
