import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "@/lib/data";

// Parses "Q: ..." / "A: ..." line pairs out of a post body for FAQPage JSON-LD.
function extractFaqs(body: string): { question: string; answer: string }[] {
  const lines = body.split("\n");
  const faqs: { question: string; answer: string }[] = [];
  let question: string | null = null;
  let answer: string[] = [];
  let inAnswer = false;

  for (const line of lines) {
    if (line.startsWith("Q: ")) {
      if (question) faqs.push({ question, answer: answer.join(" ").trim() });
      question = line.slice(3).trim();
      answer = [];
      inAnswer = false;
    } else if (line.startsWith("A: ")) {
      answer.push(line.slice(3).trim());
      inAnswer = true;
    } else if (inAnswer && line.trim()) {
      answer.push(line.trim());
    } else if (!line.trim()) {
      inAnswer = false;
    }
  }
  if (question) faqs.push({ question, answer: answer.join(" ").trim() });

  return faqs.filter((f) => f.question && f.answer);
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} | AK Trailer Rentals`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://aktrailerrentals.com/blog/${post.slug}`,
    author: { "@type": "Organization", name: "AK Trailer Rentals" },
    publisher: { "@type": "Organization", name: "AK Trailer Rentals" },
  };

  const faqs = extractFaqs(post.body);
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
      <div className="mt-8 space-y-4 whitespace-pre-line text-coffee/80">{post.body}</div>
      <p className="mt-8 text-coffee/80">
        Have a question about this topic?{" "}
        <Link href="/contact" className="font-semibold text-pumpkin hover:text-chestnut">
          Contact us
        </Link>{" "}
        and we&apos;ll be glad to help you pick the right trailer for the job.
      </p>
    </div>
  );
}
