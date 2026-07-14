"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Trailer } from "@/lib/site-data";

export default function TrailerAvailabilityModal({
  trailer,
  onClose,
}: {
  trailer: Trailer;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-coffee/60 p-4 py-10 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute left-2 top-2 z-10 flex size-9 items-center justify-center rounded-full bg-white text-coffee shadow"
          >
            ✕
          </button>
          <span className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-coffee shadow">
            <span className="size-2 rounded-full bg-green-500" /> Available
          </span>
          {trailer.images[0] ? (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-almond/50">
              <Image src={trailer.images[0]} alt={trailer.name} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
            </div>
          ) : (
            <div className="aspect-4/3 w-full rounded-xl bg-almond/50" />
          )}
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) =>
              trailer.images[i] ? (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-almond/50">
                  <Image src={trailer.images[i]} alt={trailer.name} fill sizes="140px" className="object-cover" />
                </div>
              ) : (
                <div key={i} className="aspect-square rounded-lg bg-almond/50" />
              ),
            )}
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl text-coffee">{trailer.name}</h2>
          <p className="whitespace-nowrap text-2xl font-semibold text-coffee">
            ${trailer.pricePerDay}
            <span className="text-base font-normal text-coffee/60"> / day</span>
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-almond p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-coffee/50">Dates</p>
            <div className="mt-1 flex items-center gap-2 text-sm text-coffee">
              <input type="date" className="w-full min-w-0 bg-transparent focus:outline-none" />
              <span>→</span>
              <input type="date" className="w-full min-w-0 bg-transparent focus:outline-none" />
            </div>
          </div>
          <div className="rounded-xl border border-almond p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-coffee/50">Location</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-coffee">
              <span className="size-2 rounded-full bg-green-500" /> Wasilla, AK
            </p>
          </div>
        </div>

        <Link
          href={`/book?trailer=${trailer.slug}`}
          className="mt-4 block w-full rounded-full bg-pumpkin px-8 py-3 text-center text-base font-semibold text-white hover:bg-chestnut"
        >
          Continue to Booking
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-coffee">Specifications</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-coffee/80">
            {trailer.specs.map((spec) => (
              <li key={spec.label}>
                {spec.label}: <span className="font-semibold text-coffee">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
