import type { Metadata } from "next";
import { faqs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "FAQ | AK Trailer Rentals",
  description: "Answers to common questions about renting a trailer from AK Trailer Rentals.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">FAQ</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Frequently Asked Questions</h1>

      <div className="mt-10 divide-y divide-almond">
        {faqs.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-coffee">
              {item.q}
              <span className="text-pumpkin group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-coffee/70">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
