import type { Metadata } from "next";
import Link from "next/link";
import { business, serviceAreas } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Vehicle Pickup & Transport | AK Trailer Rentals",
  description:
    "We haul your vehicle from point A to point B on our own trailer — no towing experience or hitch required. Serving Salina and central Kansas.",
};

const steps = [
  {
    title: "Call or text us",
    body: "Tell us the pickup location and the drop-off location, plus what you need moved.",
  },
  {
    title: "Get a quote",
    body: "We'll give you a price based on distance, vehicle size, and access at both ends.",
  },
  {
    title: "We load and secure it",
    body: "Our trailer, our tie-downs, our driving. You don't need a hitch or towing experience.",
  },
  {
    title: "Delivered",
    body: "Your vehicle arrives at the drop-off location, ready to go.",
  },
];

const goodFor = [
  "Non-running or disabled vehicles",
  "Auction or private-party purchases",
  "Moving a second car when you only have one driver",
  "ATVs and UTVs",
  "Breakdowns that need a lift home",
];

export default function VehiclePickupPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">VEHICLE PICKUP SERVICE</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Vehicle Pickup &amp; Transport</h1>
      <p className="mt-6 text-lg text-coffee/80">
        Need a vehicle moved but don&apos;t have a truck, a hitch, or the experience to tow it
        yourself? We&apos;ll load it onto our own trailer and haul it from point A to point B for
        you — you don&apos;t rent or tow anything, we do the driving.
      </p>

      <h2 className="mt-12 font-display text-2xl text-coffee">How it works</h2>
      <ol className="mt-6 space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pumpkin text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-coffee">{step.title}</p>
              <p className="text-coffee/70">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-12 font-display text-2xl text-coffee">Good for</h2>
      <ul className="mt-6 space-y-2 text-coffee/80">
        {goodFor.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 text-pumpkin">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-3xl bg-coffee px-6 py-10 text-center sm:px-12">
        <h2 className="font-display text-2xl text-white sm:text-3xl">Where we go</h2>
        <p className="mx-auto mt-4 max-w-2xl text-almond/80">
          We regularly haul throughout the Salina area and central Kansas, including{" "}
          {serviceAreas.join(", ")}. Longer hauls outside this area are quoted individually — just
          ask.
        </p>
      </div>

      <div className="mt-12 rounded-3xl bg-almond px-6 py-10 text-center sm:px-12">
        <h2 className="font-display text-2xl text-coffee">Call for a quote</h2>
        <p className="mx-auto mt-3 max-w-xl text-coffee/80">
          Pricing depends on distance, vehicle size, and access at pickup and drop-off. Reach out
          and we&apos;ll get you a straight answer.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={business.phoneHref}
            className="rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut"
          >
            Call {business.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-coffee/20 px-8 py-3 text-base font-semibold text-coffee hover:border-coffee/40"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
