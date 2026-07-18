import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { business } from "@/lib/site-data";
import "./globals.css";

const bebas = localFont({
  src: "../../fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  display: "swap",
});

const barlow = localFont({
  src: [
    { path: "../../fonts/BarlowCondensed-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/BarlowCondensed-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/BarlowCondensed-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/BarlowCondensed-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../fonts/BarlowCondensed-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aktrailerrentals.com"),
  title: "AK Trailer Rentals",
  description: "Trailer rentals serving Salina, Kansas and the surrounding area.",
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  url: "https://aktrailerrentals.com",
  telephone: "+1-785-416-0279",
  email: business.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salina",
    addressRegion: "KS",
    addressCountry: "US",
  },
  areaServed: "Salina, Kansas and surrounding central Kansas",
  openingHours: "Mo-Su 08:00-18:00",
  sameAs: [business.facebookHref],
  description:
    "Trailer rentals serving Salina, Kansas and the surrounding area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${barlow.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
