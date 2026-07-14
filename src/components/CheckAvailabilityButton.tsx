"use client";

import { useState } from "react";
import type { Trailer } from "@/lib/site-data";
import TrailerAvailabilityModal from "./TrailerAvailabilityModal";

export default function CheckAvailabilityButton({ trailer }: { trailer: Trailer }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 flex max-w-sm items-center justify-between rounded-full border border-almond bg-white py-2 pl-6 pr-2 shadow-sm transition-colors hover:border-pumpkin"
      >
        <span className="font-semibold text-coffee">Check Availability</span>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-coffee text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
      </button>

      {open && <TrailerAvailabilityModal trailer={trailer} onClose={() => setOpen(false)} />}
    </>
  );
}
