import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/x7k92qd4j" },
    sitemap: "https://aktrailerrentals.com/sitemap.xml",
  };
}
