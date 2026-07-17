import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
  title: "AK Trailer Rentals",
  description: "Trailer rentals serving Salina, Kansas and the surrounding area.",
  icons: { icon: "/logo-transparent.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${barlow.variable} h-full antialiased`}
    >
      <head>
        <script
          // Apply stored theme before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
