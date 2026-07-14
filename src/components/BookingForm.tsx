"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Trailer } from "@/lib/site-data";

export default function BookingForm({ trailers }: { trailers: Trailer[] }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("trailer") ?? trailers[0]?.slug;
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl border border-pumpkin/40 bg-almond/30 p-8 text-center">
        <p className="font-display text-2xl text-coffee">Request received</p>
        <p className="mt-2 text-coffee/70">
          We&apos;ll confirm your reservation by phone or email shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-10 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <label className="block text-sm font-semibold text-coffee" htmlFor="trailer">
          Trailer
        </label>
        <select
          id="trailer"
          name="trailer"
          defaultValue={preselected}
          className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
        >
          {trailers.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name} — ${t.pricePerDay}/day
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="start-date">
            Start date
          </label>
          <input
            id="start-date"
            name="startDate"
            type="date"
            required
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="end-date">
            End date
          </label>
          <input
            id="end-date"
            name="endDate"
            type="date"
            required
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-coffee">Pickup or delivery?</legend>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 text-coffee/80">
            <input type="radio" name="fulfillment" value="pickup" defaultChecked /> Pickup
          </label>
          <label className="flex items-center gap-2 text-coffee/80">
            <input type="radio" name="fulfillment" value="delivery" /> Delivery
          </label>
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-coffee" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut"
      >
        Request Reservation
      </button>
    </form>
  );
}
