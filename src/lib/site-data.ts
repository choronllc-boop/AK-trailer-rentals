export const business = {
  name: "AK Trailer Rentals",
  phone: "907-555-0142",
  phoneHref: "tel:+19075550142",
  email: "info@aktrailerrentals.com",
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
  rating: number;
  reviews: { name: string; date: string; text: string }[];
};

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
    rating: 4.9,
    reviews: [
      {
        name: "Kaveh M.",
        date: "March 2026",
        text: "Easy pickup, trailer was clean and ready to go. Booked online in five minutes and hookup was straightforward.",
      },
      {
        name: "Dean R.",
        date: "January 2026",
        text: "Staff walked me through hookup step by step. Great for a first-time renter — will book again.",
      },
    ],
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
    rating: 4.8,
    reviews: [
      {
        name: "Sarah T.",
        date: "October 2025",
        text: "Used the log hauler for firewood season two years running. Always reliable and the side rails make a huge difference.",
      },
      {
        name: "Mike H.",
        date: "September 2025",
        text: "Hauled a full cord of birch without any issues. Deck is solid and tie-down points are exactly where you need them.",
      },
    ],
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
    rating: 4.9,
    reviews: [
      {
        name: "Jess P.",
        date: "May 2026",
        text: "Perfect for a yard cleanup weekend. Light enough to tow with my SUV and easy to back up.",
      },
      {
        name: "Tom W.",
        date: "April 2026",
        text: "Rented it to move a couch and some furniture. Ramp gate made loading simple, no complaints.",
      },
    ],
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
    rating: 4.7,
    reviews: [
      {
        name: "Amanda K.",
        date: "February 2026",
        text: "Kept everything bone dry during a move in the rain. The lock gave me peace of mind leaving it overnight.",
      },
      {
        name: "Chris B.",
        date: "December 2025",
        text: "Used it to haul tools for a job site. Weatherproofing held up great through some heavy Alaska weather.",
      },
    ],
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
