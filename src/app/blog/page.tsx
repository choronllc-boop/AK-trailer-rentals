import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Blog | AK Trailer Rentals",
  description: "Towing guides, seasonal tips, and news from AK Trailer Rentals.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">BLOG</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">From the Blog</h1>

      <div className="mt-10 space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-almond bg-white p-6 hover:border-pumpkin"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-chestnut">
              {post.category} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
            <p className="mt-2 font-display text-xl text-coffee">{post.title}</p>
            <p className="mt-2 text-coffee/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
