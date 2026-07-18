import type { MetadataRoute } from "next";
import { getBlogPosts, getTrailers } from "@/lib/data";

const BASE = "https://aktrailerrentals.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, trailers] = await Promise.all([getBlogPosts(), getTrailers()]);
  const pages = [
    "",
    "/trailers",
    "/book",
    "/contact",
    "/about",
    "/faq",
    "/service-areas",
    "/vehicle-pickup",
    "/blog",
    "/privacy",
  ];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...trailers.map((t) => ({ url: `${BASE}/trailers/${t.slug}` })),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}` })),
  ];
}
