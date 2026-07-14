"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business, nav } from "@/lib/site-data";

const links = nav.filter((item) => !["/", "/contact", "/book"].includes(item.href));

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-almond/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpg" alt={business.name} width={56} height={56} priority />
          <span className="font-display text-lg text-coffee">{business.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b-2 py-1 text-sm font-medium no-underline transition-colors ${
                isActive(item.href)
                  ? "border-pumpkin text-coffee"
                  : "border-transparent text-coffee/80 hover:text-pumpkin"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              isActive("/contact")
                ? "border-coffee bg-coffee text-white"
                : "border-coffee text-coffee hover:bg-coffee hover:text-white"
            }`}
          >
            Contact Us
          </Link>
          <Link
            href="/admin"
            className={`hidden rounded-full border px-5 py-2 text-sm font-semibold transition-colors sm:inline-block ${
              isActive("/admin")
                ? "border-coffee bg-coffee text-white"
                : "border-almond text-coffee/70 hover:border-coffee hover:text-coffee"
            }`}
          >
            Admin
          </Link>
          <Link
            href="/trailers"
            className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors ${
              isActive("/trailers") ? "bg-chestnut" : "bg-pumpkin hover:bg-chestnut"
            }`}
          >
            Book a Trailer
          </Link>
        </div>
      </div>
    </header>
  );
}
