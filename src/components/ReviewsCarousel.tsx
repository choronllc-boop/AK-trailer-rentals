import { facebookReviews } from "@/lib/site-data";

function ReviewCard({ review }: { review: (typeof facebookReviews)[number] }) {
  return (
    <div className="w-80 shrink-0 rounded-2xl border border-almond bg-white p-6 sm:w-96">
      <p className="text-sm font-semibold text-pumpkin">👍 Recommends AK Trailer Rentals</p>
      <p className="mt-3 text-coffee/80">&ldquo;{review.quote}&rdquo;</p>
      <p className="mt-4 text-sm font-semibold text-coffee">{review.name}</p>
      {review.reply && (
        <p className="mt-3 border-l-2 border-almond pl-3 text-sm text-coffee/60">
          <span className="font-semibold text-coffee">AK Trailer Rentals:</span> {review.reply}
        </p>
      )}
    </div>
  );
}

export default function ReviewsCarousel() {
  const cards = [...facebookReviews, ...facebookReviews];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="animate-marquee flex w-max gap-6">
        {cards.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}
