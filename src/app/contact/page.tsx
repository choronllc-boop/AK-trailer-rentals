import type { Metadata } from "next";
import { Suspense } from "react";
import { business } from "@/lib/site-data";
import { getTrailers } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | AK Trailer Rentals",
  description: "Hours, phone, email, and location for AK Trailer Rentals in Salina, KS.",
};

export default async function ContactPage() {
  const trailers = await getTrailers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">GET IN TOUCH</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Contact Us</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-coffee/50">Phone</p>
              <a href={business.phoneHref} className="text-lg font-semibold text-coffee hover:text-pumpkin">
                {business.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-coffee/50">Email</p>
              <a href={`mailto:${business.email}`} className="text-lg font-semibold text-coffee hover:text-pumpkin">
                {business.email}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-coffee/50">Location</p>
              <p className="text-lg font-semibold text-coffee">{business.address}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-coffee/50">Hours</p>
              <ul className="mt-1 space-y-1">
                {business.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 text-coffee/80">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 aspect-video w-full rounded-2xl bg-almond/50" />
        </div>

        <Suspense>
          <ContactForm trailers={trailers} />
        </Suspense>
      </div>
    </div>
  );
}
