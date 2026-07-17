export const business = {
  name: "AK Trailer Rentals",
  phone: "785-416-0279",
  phoneHref: "tel:+17854160279",
  email: "akrentals7@outlook.com",
  address: "N/A",
  facebookHref: "https://www.facebook.com/AKtransportationllc",
  hours: [
    { day: "Monday – Sunday", time: "8:00 AM – 6:00 PM" },
    { day: "Emergency", time: "8:00 AM – 8:00 PM" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Trailers", href: "/trailers" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Vehicle Pickup", href: "/vehicle-pickup" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Book a Trailer", href: "/book" },
];

export type Trailer = {
  slug: string;
  name: string;
  tagline: string;
  pricePerDay: number;
  specs: { label: string; value: string }[];
  description: string;
  amenities: string[];
  images: string[];
};

export type FacebookReview = {
  name: string;
  quote: string;
  reply?: string;
};

export const facebookReviews: FacebookReview[] = [
  {
    name: "Cristian Reveles",
    quote:
      "Would rent from him again in a heartbeat. Super easy and straight forward. Had a blow out 5 hours out and he had someone replace the tire within 45 minutes without a question. Would recommend him to anyone I know needing a trailer. Super nice trailer that pulls well and straight and awesome customer service.",
    reply: "Thank you for using AK Trailer Rental, we'll see you on your next rental 🙏🏽",
  },
  {
    name: "Tyler Pankratz",
    quote: "Very nice and friendly and very nice trailer too, I will be renting again.",
    reply: "Thank you 🙏🏽",
  },
  {
    name: "Timothy Tanner Cox",
    quote: "Highly recommend. He was fast and professional.",
  },
  {
    name: "Shelby Tabor",
    quote:
      "This is by far the most honest and caring place. I was in a bind and they helped me out and didn't even charge me. I will definitely be using them again.",
  },
  {
    name: "Brenton Carlson",
    quote:
      "I'd highly recommend them! He was very punctual and respectful, very careful with what he was hauling and just all around a good guy!",
  },
  {
    name: "Justin Hernandez",
    quote: "Very helpful and reliable.",
  },
  {
    name: "Daniel Lamas Ortiz",
    quote: "Great service and very professional.",
  },
  {
    name: "Lanie Hanes",
    quote: "Excellent experience, very communicative and helpful.",
  },
  {
    name: "Sadie Ward",
    quote: "Highly recommend for any transport needs.",
  },
  {
    name: "Alina Quevedo",
    quote:
      "We used AK Transportation over the weekend to get a Tommy lift for our truck. They were super organized, delivered on time and within our budget. Will definitely be using them again for any other transportation needs!",
  },
  {
    name: "Alex Sweet",
    quote:
      "I would highly recommend AK Transportation LLC! I had a vehicle needing trailered on short notice and he helped make it possible. He went above and beyond to take care of me and get my vehicle where it needed to be! Highly recommend his services, I would not hesitate to use his business again!",
  },
  {
    name: "Grant Dodge",
    quote: "Great service and knows what he's doing when it comes to his business!! Highly recommend!!!",
  },
  {
    name: "Christopher Parker",
    quote:
      "Thanks to AK Transportation LLC Allan Blevins for the hookup on the great trailer and safe equipment to get the broken car home from the ice cream cruise. Would definitely recommend for all trailer rental needs.",
  },
  {
    name: "Travis Graham",
    quote:
      "Sent a message to AK Trailer Rentals LLC and within 30 minutes he had a trailer at my house. He was very professional and the trailer was in great shape. I would highly recommend him to anyone.",
  },
  {
    name: "Scott Bailey",
    quote:
      "If you need a trailer or someone to haul something for you, AK Transportation LLC is the place to go. Very professional and reliable. He went out of his way to help me and I really appreciate it.",
  },
];

// Seed data — used to populate the database on first run, and as a
// fallback when no DATABASE_URL is configured (e.g. local dev).
export const seedTrailers: Trailer[] = [
  {
    slug: "wood-deck-car-hauler",
    name: "Wood Deck Car Hauler",
    tagline: "Open deck, 22 ft, tandem axle",
    pricePerDay: 95,
    specs: [
      { label: "Capacity", value: "9,900 lbs" },
      { label: "Deck Length", value: "22 ft" },
      { label: "Hitch Type", value: "2 5/16\" ball" },
      { label: "Axles", value: "Tandem" },
    ],
    description:
      "Our open-deck car hauler is built for moving a single vehicle, ATV, or small equipment across the Salina area and central Kansas. A wood deck and tie-down points on all four corners make loading straightforward.",
    amenities: ["Steel loading ramps", "4-corner tie-downs", "LED lighting", "Spare tire included"],
    images: [],
  },
];

export const serviceAreas = [
  "Salina",
  "Abilene",
  "McPherson",
  "Lindsborg",
  "Ellsworth",
  "Minneapolis",
  "Bennington",
  "Assaria",
  "Gypsum",
  "Solomon",
  "Brookville",
  "Junction City",
];

export const faqs = [
  {
    q: "What do I need to rent a trailer?",
    a: "A valid driver's license, proof of insurance for your tow vehicle, and a hitch rated for the trailer's loaded weight. We'll walk you through hookup and safety chains before you leave the lot.",
  },
  {
    q: "Is a deposit required?",
    a: "Yes, a $90 deposit is required before the rental starts.",
  },
  {
    q: "Do I need insurance to rent a trailer?",
    a: "Yes, full coverage insurance is required. Renters must carry full coverage insurance before the rental starts.",
  },
  {
    q: "Can you deliver the trailer to me?",
    a: "We offer local delivery and pickup throughout the Salina area and central Kansas for an additional fee based on distance. Select \"delivery\" on the booking form and we'll confirm pricing.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Just notify us at least 24 hours ahead of your rental start time to cancel or reschedule. Cancellations inside 24 hours are subject to a one-day rental charge.",
  },
  {
    q: "Do I need my own hitch ball and wiring?",
    a: "Your tow vehicle needs a hitch receiver and 4- or 7-pin wiring that matches the trailer. If you're not sure what you have, call us and we'll help confirm compatibility before you book.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  category: string;
};

const placeholderBody = (excerpt: string) =>
  `${excerpt}\n\nThis is placeholder content for the AK Trailer Rentals blog — practical guidance for renters in Salina and across central Kansas.\n\nHave a question about this topic? Contact us and we'll be glad to help you pick the right trailer for the job.`;

export const seedBlogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-trailer",
    title: "How to Choose the Right Trailer for Your Job",
    excerpt: "From car haulers to enclosed cargo trailers, here's how to match the trailer to the task.",
    body: placeholderBody("From car haulers to enclosed cargo trailers, here's how to match the trailer to the task."),
    date: "2026-03-04",
    category: "Guides",
  },
  {
    slug: "towing-capacity-101",
    title: "Towing Capacity 101: What Your Vehicle Can Actually Pull",
    excerpt: "A quick primer on curb weight, GCWR, and how to avoid overloading your tow vehicle.",
    body: placeholderBody("A quick primer on curb weight, GCWR, and how to avoid overloading your tow vehicle."),
    date: "2026-02-18",
    category: "Guides",
  },
  {
    slug: "firewood-season-central-kansas",
    title: "Getting Ready for Firewood Season in Central Kansas",
    excerpt: "Why fall is the busiest season for our log and wood haulers, and how to book ahead.",
    body: placeholderBody("Why fall is the busiest season for our log and wood haulers, and how to book ahead."),
    date: "2026-08-22",
    category: "Seasonal",
  },
  {
    slug: "spring-moving-checklist",
    title: "Spring Moving Checklist for Central Kansas",
    excerpt: "Planning a move this spring? Here's what to line up before your rental day.",
    body: placeholderBody("Planning a move this spring? Here's what to line up before your rental day."),
    date: "2026-04-01",
    category: "Seasonal",
  },
  {
    slug: "new-utility-trailers-2026",
    title: "We've Added New Utility Trailers to the Fleet",
    excerpt: "Three new 12 ft utility trailers are now available for booking year-round.",
    body: placeholderBody("Three new 12 ft utility trailers are now available for booking year-round."),
    date: "2026-01-15",
    category: "Company News",
  },
];
