import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { facebookReviews } from "@/lib/site-data";
import { getTrailer, getTrailers } from "@/lib/data";
import CheckAvailabilityButton from "@/components/CheckAvailabilityButton";

export async function generateStaticParams() {
  const trailers = await getTrailers();
  return trailers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trailer = await getTrailer(slug);
  if (!trailer) return {};
  return {
    title: `${trailer.name} | AK Trailer Rentals`,
    description: trailer.description,
  };
}

export default async function TrailerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trailer = await getTrailer(slug);
  if (!trailer) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Link href="/trailers" className="text-sm font-semibold text-pumpkin hover:text-chestnut">
            ← Back to catalog
          </Link>
          <h1 className="mt-4 font-display text-4xl text-coffee">{trailer.name}</h1>
          <p className="mt-1 text-coffee/60">{trailer.tagline}</p>
          <p className="mt-4 text-2xl font-semibold text-coffee">
            ${trailer.pricePerDay} <span className="text-base font-normal text-coffee/60">/ day</span>
          </p>

          <CheckAvailabilityButton trailer={trailer} />

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trailer.specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-sm uppercase tracking-wide text-coffee/50">{spec.label}</p>
                <p className="mt-1 text-lg font-semibold text-coffee">{spec.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg text-coffee/80">{trailer.description}</p>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-base text-coffee/80">
            {trailer.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="text-pumpkin">→</span> {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {trailer.images[0] ? (
            <div className="relative col-span-2 aspect-4/3 overflow-hidden rounded-2xl bg-almond/50">
              <Image src={trailer.images[0]} alt={trailer.name} fill sizes="(min-width: 1024px) 576px, 100vw" className="object-cover" />
            </div>
          ) : (
            <div className="col-span-2 aspect-4/3 rounded-2xl bg-almond/50" />
          )}
          {Array.from({ length: Math.max(2, trailer.images.length - 1) }, (_, i) => trailer.images[i + 1]).map(
            (src, i) =>
              src ? (
                <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-almond/50">
                  <Image src={src} alt={trailer.name} fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover" />
                </div>
              ) : (
                <div key={i} className="aspect-square rounded-2xl bg-almond/50" />
              ),
          )}
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <p className="flex items-center gap-2 text-lg text-coffee">
          <span>👍</span>
          <span className="font-bold">Recommended</span>
          <span className="text-coffee/60">· {facebookReviews.length} reviews on Facebook</span>
        </p>

        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {facebookReviews.slice(0, 4).map((review) => (
            <div key={review.name}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-almond font-semibold text-coffee">
                  {review.name.charAt(0)}
                </span>
                <p className="font-semibold text-coffee">{review.name}</p>
              </div>
              <p className="mt-3 text-coffee/80">{review.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
