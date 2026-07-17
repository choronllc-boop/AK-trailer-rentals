"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import type { Trailer } from "@/lib/site-data";
import { submitForm } from "@/lib/actions";

export default function BookingForm({ trailers }: { trailers: Trailer[] }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("trailer") ?? trailers[0]?.slug;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

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
        setError("");
        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        startTransition(async () => {
          try {
            const res = await submitForm("booking", data);
            if (res.error) setError(res.error);
            else setSubmitted(true);
          } catch {
            setError("Something went wrong — please try again or give us a call.");
          }
        });
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

      {error && <p className="text-sm font-semibold text-chestnut">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Request Reservation"}
      </button>
    </form>
  );
}
