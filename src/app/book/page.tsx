import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Trailer | AK Trailer Rentals",
  description: "Check availability and book a trailer online.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">BOOK ONLINE</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Book a Trailer</h1>
      <p className="mt-3 text-coffee/70">
        Pick a trailer, choose your dates, and let us know if you need delivery. We&apos;ll
        confirm your reservation by phone or email.
      </p>

      <Suspense>
        <BookingForm />
      </Suspense>
    </div>
  );
}
