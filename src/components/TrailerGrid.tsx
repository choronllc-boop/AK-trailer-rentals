"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Trailer } from "@/lib/site-data";
import TrailerAvailabilityModal from "./TrailerAvailabilityModal";

export default function TrailerGrid({
  trailers,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  trailers: Trailer[];
  columns?: string;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openTrailer = trailers.find((t) => t.slug === openSlug) ?? null;

  return (
    <>
      <div className={`grid gap-6 ${columns}`}>
        {trailers.map((trailer) => (
          <div
            key={trailer.slug}
            className="group rounded-2xl border border-black bg-white p-5 transition-colors hover:border-pumpkin"
          >
            <Link href={`/trailers/${trailer.slug}`}>
              {trailer.images[0] ? (
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-almond/50">
                  <Image
                    src={trailer.images[0]}
                    alt={trailer.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-4/3 w-full rounded-xl bg-almond/50" />
              )}
              <p className="mt-4 font-semibold text-coffee">{trailer.name}</p>
              <p className="mt-1 text-sm text-coffee/60">{trailer.tagline}</p>
              <p className="mt-3 text-sm font-semibold text-pumpkin">${trailer.pricePerDay}/day</p>
            </Link>
            <button
              onClick={() => setOpenSlug(trailer.slug)}
              className="mt-4 w-full rounded-full border border-almond py-2 text-sm font-semibold text-coffee hover:border-pumpkin hover:text-pumpkin"
            >
              Check Availability
            </button>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-coffee/30 bg-almond/20 p-5 text-center">
          <p className="font-semibold text-coffee/70">More trailers coming soon</p>
          <p className="mt-1 text-sm text-coffee/50">We&apos;re growing the fleet — check back soon.</p>
        </div>
      </div>

      {openTrailer && (
        <TrailerAvailabilityModal trailer={openTrailer} onClose={() => setOpenSlug(null)} />
      )}
    </>
  );
}
