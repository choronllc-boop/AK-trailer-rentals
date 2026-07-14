import Image from "next/image";
import Link from "next/link";
import { business, nav } from "@/lib/site-data";

const quickLinks = nav.filter((item) => item.href !== "/");

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-coffee text-almond">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/logo.jpg"
            alt={business.name}
            width={56}
            height={56}
            className="rounded-md bg-white p-0.5"
          />
          <p className="mt-4 max-w-xs text-sm text-almond/80">
            Trailer rentals in Wasilla, Alaska. Serving the Mat-Su Valley and Southcentral
            Alaska.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={business.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AK Trailer Rentals on Facebook"
              className="flex size-9 items-center justify-center rounded-full border border-almond/30 text-almond hover:border-pumpkin hover:text-pumpkin"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-white">QUICK LINKS</p>
          <ul className="mt-4 space-y-2 text-sm text-almond/80">
            <li>
              <Link href="/" className="hover:text-pumpkin">
                Home
              </Link>
            </li>
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-pumpkin">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-white">CONTACT US</p>
          <ul className="mt-4 space-y-3 text-sm text-almond/80">
            <li>
              <a
                href={business.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-pumpkin"
              >
                <PinIcon />
                {business.address}
              </a>
            </li>
            <li>
              <a href={business.phoneHref} className="flex items-center gap-2 hover:text-pumpkin">
                <PhoneIcon />
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-center gap-2 hover:text-pumpkin">
                <MailIcon />
                {business.email}
              </a>
            </li>
          </ul>

          <ul className="mt-4 space-y-1 text-sm text-almond/80">
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
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-almond/60 sm:px-6">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
