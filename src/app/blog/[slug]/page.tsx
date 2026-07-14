import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/site-data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | AK Trailer Rentals`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="text-sm font-semibold text-pumpkin hover:text-chestnut">
        ← Back to blog
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-chestnut">
        {post.category} ·{" "}
        {new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-2 font-display text-4xl text-coffee">{post.title}</h1>
      <div className="mt-6 aspect-video w-full rounded-2xl bg-almond/50" />
      <div className="mt-8 space-y-6 text-coffee/80">
        <p>{post.excerpt}</p>
        <p>
          This is placeholder content for the AK Trailer Rentals blog. Once real posts are
          ready, this section will hold the full article — practical guidance for renters in
          Wasilla and across the Mat-Su Valley.
        </p>
        <p>
          Have a question about this topic? <Link href="/contact" className="font-semibold text-pumpkin hover:text-chestnut">Contact us</Link> and
          we&apos;ll be glad to help you pick the right trailer for the job.
        </p>
      </div>
    </div>
  );
}
