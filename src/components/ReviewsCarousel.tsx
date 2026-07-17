import { facebookReviews } from "@/lib/site-data";

// Sized so exactly 6 cards (170px + 16px gap each) fit within the max-w-6xl
// container the carousel is rendered in.
const CARD_WIDTH = "w-[170px]";

// Fixed height + line-clamp so every card is the same size regardless of
// review length, instead of stretching/shrinking to fit its own text.
function ReviewCard({ review }: { review: (typeof facebookReviews)[number] }) {
  return (
    <div className={`${CARD_WIDTH} flex h-52 shrink-0 flex-col rounded-xl border border-black bg-white p-4`}>
      <p className="text-xs font-semibold text-pumpkin">👍 Recommends AK Trailer Rentals</p>
      <p className="mt-2 line-clamp-5 text-sm text-coffee/80">&ldquo;{review.quote}&rdquo;</p>
      <p className="mt-auto pt-2 text-sm font-semibold text-coffee">{review.name}</p>
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
        className="animate-marquee flex w-max items-start gap-4"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {cards.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}
