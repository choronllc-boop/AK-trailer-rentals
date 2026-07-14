import Link from "next/link";
import { blogPosts, trailers } from "@/lib/site-data";
import ServiceAreas from "@/components/ServiceAreas";

const reviews = [
  { name: "Kaveh M.", quote: "Easy pickup, trailer was clean and ready to go. Booked online in five minutes." },
  { name: "Sarah T.", quote: "Used the log hauler for firewood season two years running. Always reliable." },
  { name: "Dean R.", quote: "Staff walked me through hookup step by step. Great for a first-time renter." },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <section className="bg-almond/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold tracking-wide text-chestnut">WASILLA, ALASKA</p>
          <h1 className="max-w-2xl font-display text-4xl text-coffee sm:text-5xl">
            The right trailer, ready when you need it.
          </h1>
          <p className="max-w-xl text-lg text-coffee/80">
            Car haulers, utility trailers, and more — rent by the day and tow with confidence
            across the Mat-Su Valley and Southcentral Alaska.
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trailers.map((trailer) => (
            <Link
              key={trailer.slug}
              href={`/trailers/${trailer.slug}`}
              className="group rounded-2xl border border-almond bg-white p-5 transition-colors hover:border-pumpkin"
            >
              <div className="aspect-4/3 w-full rounded-xl bg-almond/50" />
              <p className="mt-4 font-semibold text-coffee">{trailer.name}</p>
              <p className="mt-1 text-sm text-coffee/60">{trailer.tagline}</p>
              <p className="mt-3 text-sm font-semibold text-pumpkin">
                ${trailer.pricePerDay}/day
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-3xl bg-chestnut/10 p-8 sm:flex-row sm:items-center sm:justify-between">
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

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-coffee sm:text-3xl">What renters say</h2>
          <p className="text-sm text-coffee/60">Live via Google Reviews</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-almond bg-white p-6">
              <p className="text-sm text-pumpkin">★★★★★</p>
              <p className="mt-3 text-coffee/80">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-coffee">{review.name}</p>
            </div>
          ))}
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
              className="rounded-2xl border border-almond bg-white p-6 hover:border-pumpkin"
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
