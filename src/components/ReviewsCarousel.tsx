import { facebookReviews } from "@/lib/site-data";

// Sized so exactly 6 cards (170px + 16px gap each) fit within the max-w-6xl
// container the carousel is rendered in.
const CARD_WIDTH = "w-[170px]";

function ReviewCard({ review }: { review: (typeof facebookReviews)[number] }) {
  return (
    <div className={`${CARD_WIDTH} shrink-0 rounded-xl border border-almond bg-white p-4`}>
      <p className="text-xs font-semibold text-pumpkin">👍 Recommends AK Trailer Rentals</p>
      <p className="mt-2 text-xs text-coffee/80">&ldquo;{review.quote}&rdquo;</p>
      <p className="mt-2 text-xs font-semibold text-coffee">{review.name}</p>
      {review.reply && (
        <p className="mt-2 border-l-2 border-almond pl-2 text-[11px] text-coffee/60">
          <span className="font-semibold text-coffee">AK Trailer Rentals:</span> {review.reply}
        </p>
      )}
    </div>
  );
}

// Repeat the review set enough times that one half of the track is wider
// than any screen, so the loop point is never visible.
const MIN_CARDS_PER_HALF = 16;

export default function ReviewsCarousel() {
  const repeats = Math.max(1, Math.ceil(MIN_CARDS_PER_HALF / facebookReviews.length));
  const half = Array.from({ length: repeats }, () => facebookReviews).flat();
  const cards = [...half, ...half];
  const durationSeconds = half.length * 4;

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className="animate-marquee flex w-max gap-4"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {cards.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}
