import Image from "next/image";
import Link from "next/link";
import { business, nav } from "@/lib/site-data";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-almond/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpg" alt={business.name} width={56} height={56} priority />
          <span className="font-display text-lg text-coffee">{business.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.slice(1, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-coffee/80 hover:text-pumpkin"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/book"
          className="rounded-full bg-pumpkin px-5 py-2 text-sm font-semibold text-white hover:bg-chestnut"
        >
          Book a Trailer
        </Link>
      </div>
    </header>
  );
}
