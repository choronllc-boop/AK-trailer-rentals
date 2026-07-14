import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const calSans = localFont({
  src: "../../public/fonts/CalSansVF.woff2",
  variable: "--font-cal-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AK Trailer Rentals",
  description: "Trailer rentals serving Wasilla, the Mat-Su Valley, and Southcentral Alaska.",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${calSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
