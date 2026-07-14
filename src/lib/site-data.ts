export const business = {
  name: "AK Trailer Rentals",
  phone: "785-416-0279",
  phoneHref: "tel:+17854160279",
  email: "akrental7@outlook.com",
  address: "1420 E Parks Hwy, Wasilla, AK 99654",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=1420+E+Parks+Hwy+Wasilla+AK+99654",
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Trailers", href: "/trailers" },
  { label: "Service Areas", href: "/service-areas" },
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

export const trailers: Trailer[] = [
  {
    slug: "car-hauler",
    name: "Car Hauler Trailer",
    tagline: "Open deck, 18 ft, tandem axle",
    pricePerDay: 95,
    specs: [
      { label: "Capacity", value: "9,900 lbs" },
      { label: "Deck Length", value: "18 ft" },
      { label: "Hitch Type", value: "2 5/16\" ball" },
      { label: "Axles", value: "Tandem" },
    ],
    description:
      "Our open-deck car hauler is built for moving a single vehicle, ATV, or small equipment across the Mat-Su Valley. Steel ramps and tie-down points on all four corners make loading straightforward.",
    amenities: ["Steel loading ramps", "4-corner tie-downs", "LED lighting", "Spare tire included"],
    images: ["/trailers/car-hauler-1.jpg", "/trailers/car-hauler-2.jpg", "/trailers/car-hauler-3.jpg"],
  },
  {
    slug: "log-hauler",
    name: "Log & Wood Hauler",
    tagline: "Heavy-duty flatbed, 20 ft",
    pricePerDay: 110,
    specs: [
      { label: "Capacity", value: "12,000 lbs" },
      { label: "Deck Length", value: "20 ft" },
      { label: "Hitch Type", value: "2 5/16\" ball" },
      { label: "Axles", value: "Tandem" },
    ],
    description:
      "Built for hauling firewood, logs, and lumber around Southcentral Alaska. Reinforced stake pockets hold removable side rails for bulkier loads.",
    amenities: ["Removable side rails", "Stake pockets", "Heavy-duty deck", "Chain tie-downs"],
    images: ["/trailers/log-hauler-1.jpg", "/trailers/log-hauler-2.jpg", "/trailers/log-hauler-3.jpg"],
  },
  {
    slug: "utility-trailer",
    name: "Utility Trailer",
    tagline: "Open deck, 12 ft, single axle",
    pricePerDay: 65,
    specs: [
      { label: "Capacity", value: "3,500 lbs" },
      { label: "Deck Length", value: "12 ft" },
      { label: "Hitch Type", value: "2\" ball" },
      { label: "Axles", value: "Single" },
    ],
    description:
      "A do-it-all trailer for yard cleanup, moving furniture, or small landscaping jobs. Light enough to tow with most SUVs and trucks.",
    amenities: ["Mesh side rails", "Rear ramp gate", "Tie-down loops", "Spare tire included"],
    images: ["/trailers/utility-1.jpg", "/trailers/utility-2.jpg", "/trailers/utility-3.jpg"],
  },
  {
    slug: "enclosed-cargo",
    name: "Enclosed Cargo Trailer",
    tagline: "6x12 ft, weatherproof",
    pricePerDay: 85,
    specs: [
      { label: "Capacity", value: "2,900 lbs" },
      { label: "Interior", value: "6 x 12 ft" },
      { label: "Hitch Type", value: "2\" ball" },
      { label: "Axles", value: "Single" },
    ],
    description:
      "Keep your cargo dry and secure on the Parks Highway. Great for moving, storage, and hauling tools or equipment that needs to stay covered.",
    amenities: ["Lockable rear door", "Side entry door", "Interior tie-downs", "Weatherproof seal"],
    images: ["/trailers/enclosed-1.jpg", "/trailers/enclosed-2.jpg", "/trailers/enclosed-3.jpg"],
  },
];

export const serviceAreas = [
  "Wasilla",
  "Palmer",
  "Big Lake",
  "Meadow Lakes",
  "Houston",
  "Willow",
  "Talkeetna",
  "Trapper Creek",
  "Chugiak",
  "Eagle River",
  "Anchorage",
  "JBER",
  "Peters Creek",
  "Birchwood",
  "Sutton",
  "Chickaloon",
  "Butte",
];

export const faqs = [
  {
    q: "What do I need to rent a trailer?",
    a: "A valid driver's license, proof of insurance for your tow vehicle, and a hitch rated for the trailer's loaded weight. We'll walk you through hookup and safety chains before you leave the lot.",
  },
  {
    q: "Is a deposit required?",
    a: "Yes, a refundable damage deposit is charged at pickup and returned once the trailer is checked back in undamaged.",
  },
  {
    q: "Can you deliver the trailer to me?",
    a: "We offer local delivery and pickup throughout the Mat-Su Valley for an additional fee based on distance. Select \"delivery\" on the booking form and we'll confirm pricing.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Cancel or reschedule up to 24 hours before your reservation for a full refund. Cancellations inside 24 hours are subject to a one-day rental charge.",
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
  date: string;
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-trailer",
    title: "How to Choose the Right Trailer for Your Job",
    excerpt: "From car haulers to enclosed cargo trailers, here's how to match the trailer to the task.",
    date: "2026-03-04",
    category: "Guides",
  },
  {
    slug: "towing-capacity-101",
    title: "Towing Capacity 101: What Your Vehicle Can Actually Pull",
    excerpt: "A quick primer on curb weight, GCWR, and how to avoid overloading your tow vehicle.",
    date: "2026-02-18",
    category: "Guides",
  },
  {
    slug: "firewood-season-mat-su",
    title: "Getting Ready for Firewood Season in the Mat-Su Valley",
    excerpt: "Why fall is the busiest season for our log and wood haulers, and how to book ahead.",
    date: "2026-08-22",
    category: "Seasonal",
  },
  {
    slug: "spring-moving-checklist",
    title: "Spring Moving Checklist for Southcentral Alaska",
    excerpt: "Planning a move this spring? Here's what to line up before your rental day.",
    date: "2026-04-01",
    category: "Seasonal",
  },
  {
    slug: "new-utility-trailers-2026",
    title: "We've Added New Utility Trailers to the Fleet",
    excerpt: "Three new 12 ft utility trailers are now available for booking year-round.",
    date: "2026-01-15",
    category: "Company News",
  },
];
