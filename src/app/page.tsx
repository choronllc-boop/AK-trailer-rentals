import Link from "next/link";
import { getBlogPosts, getTrailers } from "@/lib/data";
import { business } from "@/lib/site-data";
import ServiceAreas from "@/components/ServiceAreas";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import TrailerGrid from "@/components/TrailerGrid";

export default async function Home() {
  const [trailers, blogPosts] = await Promise.all([getTrailers(), getBlogPosts()]);

  return (
    <div className="flex flex-col gap-24 pb-24">
      <section className="relative overflow-hidden bg-almond/40">
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-800/50" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold tracking-wide text-white/90">SALINA, KANSAS</p>
          <h1 className="max-w-2xl font-display text-4xl text-white sm:text-5xl">
            The right trailer, ready when you need it.
          </h1>
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-coffee">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0 text-teal-600"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            {business.hours.map((h, i) => (
              <span key={h.day}>
                {i > 0 && <span className="mx-1 text-coffee/40">·</span>}
                {h.day === "Monday – Sunday" ? "Open" : h.day}: {h.time}
              </span>
            ))}
          </div>
          <p className="max-w-xl text-lg text-white/90">
            Our wood deck car hauler — rent by the day and tow with confidence
            across the Salina area and central Kansas.
          </p>
          <Link
            href="/book"
            className="rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut"
          >
            Book a Trailer
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl text-coffee sm:text-3xl">Find the right trailer</h2>
        <div className="mt-8">
          <TrailerGrid trailers={trailers} columns="sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-black bg-chestnut/10 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-coffee">Check live availability</h2>
            <p className="mt-2 max-w-md text-coffee/70">
              See open dates for every trailer in our fleet and reserve online in minutes.
            </p>
          </div>
          <Link
            href="/book"
            className="whitespace-nowrap rounded-full bg-coffee px-6 py-3 text-sm font-semibold text-white hover:bg-mahogany"
          >
            View Calendar
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <ServiceAreas />
      </section>

      <section>
        <div className="mx-auto flex w-full max-w-6xl items-baseline justify-between px-4 sm:px-6">
          <h2 className="font-display text-2xl text-coffee sm:text-3xl">What renters say</h2>
          <p className="text-sm text-coffee/60">Reviews via Facebook</p>
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
          <ReviewsCarousel />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-coffee sm:text-3xl">From the blog</h2>
          <Link href="/blog" className="text-sm font-semibold text-pumpkin hover:text-chestnut">
            View all posts
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-black bg-white p-6 hover:border-pumpkin"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-chestnut">
                {post.category}
              </p>
              <p className="mt-2 font-semibold text-coffee">{post.title}</p>
              <p className="mt-2 text-sm text-coffee/70">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
