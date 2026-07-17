"use client";

import { useState, useTransition } from "react";
import type { Trailer } from "@/lib/site-data";
import { submitForm } from "@/lib/actions";

export default function ContactForm({ trailers }: { trailers: Trailer[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (submitted) {
    return (
      <div className="rounded-2xl border border-pumpkin/40 bg-almond/30 p-8 text-center">
        <p className="font-display text-2xl text-coffee">Thanks for reaching out</p>
        <p className="mt-2 text-coffee/70">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        startTransition(async () => {
          try {
            const res = await submitForm("contact", data);
            if (res.error) setError(res.error);
            else setSubmitted(true);
          } catch {
            setError("Something went wrong — please try again or give us a call.");
          }
        });
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="c-name">
            Full name
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="c-phone">
            Phone
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            required
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-coffee" htmlFor="c-email">
          Email
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="c-trailer">
            Trailer type needed
          </label>
          <select
            id="c-trailer"
            name="trailerType"
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          >
            {trailers.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-coffee" htmlFor="c-when">
            When do you need it?
          </label>
          <input
            id="c-when"
            name="whenNeeded"
            type="date"
            className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-coffee" htmlFor="c-message">
          What do you need it for?
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={4}
          className="mt-2 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
        />
      </div>

      {error && <p className="text-sm font-semibold text-chestnut">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
