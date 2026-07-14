import Image from "next/image";
import Link from "next/link";
import { business, nav } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="mt-auto bg-coffee text-almond">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt={business.name}
              width={40}
              height={40}
              className="rounded-md bg-white p-0.5"
            />
            <p className="font-display text-lg text-white">{business.name}</p>
          </div>
          <p className="mt-3 text-sm text-almond/80">
            Trailer rentals serving Wasilla, the Mat-Su Valley, and Southcentral Alaska.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-almond/80">
            <li>
              <a href={business.phoneHref} className="hover:text-pumpkin">
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-pumpkin">
                {business.email}
              </a>
            </li>
            <li>
              <a href={business.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-pumpkin">
                {business.address}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Hours</p>
          <ul className="mt-3 space-y-2 text-sm text-almond/80">
            {business.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-almond/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-almond/60 sm:px-6">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {nav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-pumpkin">
                {item.label}
              </Link>
            ))}
            <a
              href={business.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pumpkin"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
