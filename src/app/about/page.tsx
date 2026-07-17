import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AK Trailer Rentals",
  description: "Family-owned trailer rental company serving Salina and central Kansas.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">ABOUT US</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Built for Central Kansas</h1>
      <div className="mt-8 space-y-6 text-coffee/80">
        <p>
          AK Trailer Rentals started with a simple idea: make it easy for our neighbors in
          Salina and across central Kansas to get the right trailer without the hassle.
          We&apos;re a local, family-owned business, and every trailer in our fleet is inspected
          and maintained in-house.
        </p>
        <p>
          Whether you&apos;re hauling firewood before winter, moving into a new place, or
          picking up equipment for a job site, we&apos;ll help you pick the right trailer for
          the task and make sure you leave the lot knowing how to tow it safely.
        </p>
        <p>
          We serve homeowners, contractors, and businesses throughout central Kansas — from
          Salina and Abilene out to McPherson and Lindsborg, and east to Junction City.
        </p>
      </div>
    </div>
  );
}
