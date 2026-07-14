import { serviceAreas } from "@/lib/site-data";

export default function ServiceAreas() {
  return (
    <div className="rounded-3xl bg-coffee px-6 py-14 text-center sm:px-12">
      <p className="text-sm font-semibold tracking-wide text-pumpkin">SERVICE AREAS</p>
      <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
        Serving Wasilla, the Mat-Su, and Southcentral Alaska.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-almond/80">
        We are conveniently located in Wasilla, Alaska and proudly provide trailer rentals to
        customers throughout the Mat-Su Valley and Southcentral Alaska. Whether you need a car
        trailer or utility trailer, we serve homeowners, contractors, and businesses across the
        region.
      </p>
      <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
        {serviceAreas.map((area) => (
          <li
            key={area}
            className="rounded-full border border-almond/30 px-4 py-2 text-sm font-semibold text-white"
          >
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}
