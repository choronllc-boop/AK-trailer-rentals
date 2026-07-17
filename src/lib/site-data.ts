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
  {
    slug: "tow-dolly-vs-car-hauler",
    title: "Tow Dolly vs. Car Hauler: Which Rental is Right for Your Vehicle?",
    excerpt:
      "Tow dollies and car haulers solve the same problem in very different ways. Here's how to pick the right one for your vehicle.",
    body: `Q: Can you put an AWD car on a tow dolly?
A: No. A tow dolly only lifts the front two wheels off the ground — the rear wheels keep turning and rolling down the highway for the whole trip. On a front-wheel-drive car that's usually fine, since the drive wheels are the ones sitting on the dolly. But on an all-wheel-drive or four-wheel-drive vehicle, all four wheels are mechanically linked through the transfer case or center differential. Towing one with the rear wheels spinning free on the pavement can burn up the transfer case, transmission, or differential in a matter of miles, and most manufacturers explicitly warn against it. If your vehicle is AWD or 4x4, the safe answer is a car hauler, not a dolly.

Tow dollies and car haulers both get a vehicle from point A to point B behind another vehicle, but they work on opposite principles. A dolly cradles the front wheels and drags the rear wheels along the ground. A car hauler — a flatbed trailer with ramps — lifts the entire vehicle off the road so none of its wheels touch pavement. That single difference drives almost every other tradeoff between the two.

Q: Is it safer to use a car hauler or a tow dolly?
A: A car hauler is the safer choice for most renters. Because the vehicle rides fully off the ground, there's no risk of drivetrain damage regardless of the vehicle's drivetrain layout, no concern about tire wear on the dragged wheels, and no worry about a dolly tire blowing out under a wheel that's still bearing load. Car haulers also tow flatter and more predictably at highway speed since the load is centered and low, rather than pivoting on a small two-wheel dolly behind your bumper. The tradeoff is size: a car hauler like our 22-ft wood deck trailer is longer and needs more room to maneuver and park than a compact dolly, so backing into a tight driveway takes a bit more practice.

Cost is the other side of the comparison. Dollies are cheaper to rent and lighter to tow, which makes sense for a short, low-stakes trip with a basic front-wheel-drive commuter car. But once you factor in the risk of drivetrain damage on the wrong vehicle, or the extra time spent double-checking tie-downs on a dolly, many renters find the car hauler is worth the difference — especially for a car you actually care about, a non-running vehicle, or anything with all-wheel drive.

Q: What are the dimensions of a typical car hauler rental?
A: Our open-deck car hauler runs 22 feet of deck length on a tandem axle, rated for 9,900 lbs of cargo capacity, with steel loading ramps and tie-down points at all four corners. That's enough room for a full-size sedan, pickup, or SUV with margin to spare, and the tandem axle keeps the ride stable at highway speed even with a heavier vehicle loaded on. A 22-ft deck also gives you space to carry a car alongside smaller cargo like tires or a spare set of wheels if needed.

If you're still not sure which option fits your situation, the safest default is the car hauler — it protects every drivetrain type, keeps tire wear off the equation entirely, and gets your vehicle there without touching a mile of road. Give us a call before you book and we'll help you match the trailer to your specific vehicle and trip.`,
    date: "2026-06-10",
    category: "Guides",
  },
  {
    slug: "kansas-towing-laws-cdl",
    title: "Kansas Towing Laws: Do You Need a CDL to Rent a Heavy-Duty Trailer?",
    excerpt:
      "A plain-English look at when a commercial driver's license is actually required to tow a rental trailer in Kansas.",
    body: `Q: Do I need a CDL to rent a car hauler in Kansas?
A: For most renters, no. A commercial driver's license is only required when the Gross Combination Weight Rating (GCWR) of your tow vehicle and trailer together is 26,001 lbs or more. Most everyday pickup trucks and SUVs towing a single car hauler with a typical vehicle loaded on it fall well under that threshold, so a standard driver's license is all you need. That said, weight limits and license classifications can have exceptions and local wrinkles, so if you're anywhere close to the line, it's worth a quick call to the Kansas Department of Revenue's Division of Vehicles to confirm your specific setup before you hit the road.

Q: What does GCWR mean?
A: GCWR stands for Gross Combination Weight Rating. It's the maximum total weight the manufacturer says your tow vehicle can safely handle, including the tow vehicle itself, the trailer, and everything loaded on both — passengers, cargo, fuel, and the vehicle being hauled. You'll find your tow vehicle's GCWR in the owner's manual or on a sticker inside the driver's door. It's a different number from GVWR (Gross Vehicle Weight Rating), which only covers the tow vehicle by itself — GCWR is the one that matters for figuring out licensing requirements, because it accounts for the whole combination.

Q: What is the maximum trailer weight you can tow without a CDL?
A: There's no single flat number for "trailer weight" in isolation — what matters is the combined GCWR of everything hooked together. As long as your tow vehicle plus trailer plus cargo stays under 26,001 lbs total, you're generally in standard driver's license territory. Here's a simple worked example using our fleet: an average half-ton to three-quarter-ton pickup truck typically carries a GVWR in the neighborhood of 7,000 lbs. Our 22-ft wood deck car hauler has a GVWR of about 9,900 lbs. Add a mid-size sedan weighing roughly 3,500 lbs loaded on the deck, and you land around 20,400 lbs total — comfortably under the 26,001-lb CDL threshold, with several thousand pounds of buffer.

That buffer is exactly why most of our renters — people moving a car, hauling a project vehicle, or picking up something from an auction — never need to think twice about CDL requirements. Where things can get closer to the line is with a heavier dually truck towing a fully loaded hauler carrying a large truck or SUV instead of a sedan, or if you're stacking additional cargo weight on top of the vehicle. In those cases, add up the numbers before you leave: tow vehicle weight, trailer weight, and cargo weight, all together against 26,001 lbs.

The other thing worth knowing is that CDL requirements are about weight, not trailer length or axle count — a long trailer that's still light stays under the threshold just fine, while a shorter trailer loaded to the gills with something heavy could, in theory, approach it. When in doubt, weigh your loaded rig at a public scale or ask us for the exact GVWR figures for the trailer you're renting, and confirm the current rules with the Kansas Department of Revenue if your combination is anywhere near 26,000 lbs. For the vast majority of car-hauling trips around Salina and central Kansas, though, a regular license and a bit of common sense are all you'll need.`,
    date: "2026-05-14",
    category: "Guides",
  },
  {
    slug: "loading-non-running-car",
    title: "How to Safely Load a Non-Running or Lowered Car Onto a Rental Hauler",
    excerpt:
      "A step-by-step walkthrough for winching a dead vehicle onto a car hauler, plus tips for lowered cars with tight ground clearance.",
    body: `Q: How do you get a dead car onto a car hauler?
A: With a winch or come-along pulling the vehicle straight up the ramps in a controlled, steady line, while a spotter watches clearance and calls out stops, followed by securing all four corners with heavy-duty tie-down straps before the trailer moves an inch. It sounds simple, and with the right prep it is — but skipping a step is how vehicles end up jack-knifed on the ramps or shifting in transit. Here's the full process.

Start with the ground. Park the trailer on the flattest, most level surface available and chock the trailer wheels so it can't roll while you're loading. A slight downhill grade toward the ramps can help gravity do some of the work, but too much slope makes the winch line pull at an angle instead of straight, which increases the chance of the car veering sideways mid-pull.

Next, check your ramp width against the vehicle's tire width and wheelbase before you start winching. Most car haulers, including our 22-ft wood deck trailer, have ramps spaced for standard track widths, but it's worth eyeballing it against your specific vehicle first — nothing wastes more time than getting a tire half-cocked on a ramp edge partway up.

For the winch itself, attach the cable or strap to a solid frame point or the factory tow hook — never to suspension components, control arms, or anything not rated to pull the vehicle's full weight. Run the line as straight as possible from the winch to the vehicle; any sideways angle multiplies the risk of the car drifting off the ramp centerline as it climbs. Put the vehicle's steering wheel in the straight-ahead position and, if it's not driveable but the wheels turn freely, have someone in the driver's seat holding it steady (with the vehicle off) rather than relying on the winch alone to keep it tracking.

A spotter is not optional for this job. One person operating the winch or come-along can't also see whether a tire is drifting toward the ramp edge or whether there's clearance underneath. Position the spotter where they can see both the wheels and the undercarriage, and agree on clear stop signals before you start pulling.

Q: Can I rent a car hauler for a lowered car?
A: Yes, but ground clearance and approach angle deserve extra attention. Lowered cars have less breakover clearance at the transition point where the ramp meets the trailer deck, which means the front bumper, splitter, or oil pan can catch right where the ramp angle changes. The fix is straightforward: use ramp extenders if your trailer has them, or lay down sturdy wood planks to create a longer, gentler transition slope. Loading at an angle (nose slightly offset) instead of dead-straight can also help clear a low front lip on some cars, though it takes a steadier hand on the winch line. Go slow through that transition point specifically — most scrapes happen right there, not on the flat part of the ramp.

Q: How do you winch a non-running car onto a trailer?
A: Attach to a rated frame or tow point, keep the pull line straight, keep the wheels pointed straight ahead, move in short controlled increments rather than one continuous pull, and stop immediately if the spotter calls it. Once the car is fully on the deck and centered, set the parking brake if it functions, chock the wheels, and run tie-down straps to all four corners — front and rear, crossing where possible for extra stability — before you tow.

Renting a hauler and doing this yourself, even for a car that won't start, typically costs a fraction of what a specialized flatbed tow service charges for the same trip. With a winch, a patient spotter, and a level spot to work, most non-running vehicles load in under fifteen minutes.`,
    date: "2026-04-20",
    category: "Guides",
  },
  {
    slug: "hauling-atv-utv-tractor",
    title: "Beyond Cars: Moving ATVs, UTVs, and Small Tractors With a Car Hauler",
    excerpt:
      "Our car hauler isn't just for cars — here's how to size up ATVs, side-by-sides, and compact tractors for a safe haul.",
    body: `Q: Can I use a car hauler to transport a tractor or skid steer?
A: Yes, for compact and mid-size equipment — but check the numbers first. Two figures matter: the trailer's weight capacity and its deck dimensions, both measured against your machine's actual weight and footprint. Our 22-ft wood deck car hauler carries up to 9,900 lbs, which covers most compact tractors, skid steers, and utility equipment in that class. Before you load anything, find the machine's operating weight (check the equipment's data plate or the manufacturer's spec sheet, not a rough guess) and confirm it's comfortably under the trailer's rated capacity — leave some margin rather than loading right up to the limit, since attachments, fuel, and any cargo in the bucket all add weight too.

Deck length matters just as much as capacity. A 22-ft deck gives plenty of room for the equipment itself plus space to walk around it for tie-down access, but wider machines like some skid steers can push close to the usable deck width once you account for the ramps and fender clearance. Measure your equipment's width and wheelbase before booking so there are no surprises on load day.

Q: Will a side-by-side fit on a car hauler?
A: Yes, easily. A typical UTV or side-by-side runs around 64 inches wide, and most car hauler decks offer roughly 82 inches of usable width between the fenders — plenty of clearance on both sides for the machine itself plus room to walk the deck and set tie-down straps without squeezing past the tires. Length is rarely an issue either; most UTVs are well under half of a 22-ft deck, which means you can often haul a side-by-side and still have deck space left for gear, a cooler, or a second small item like a set of ramps or tools.

Q: How do you load a UTV on a flatbed trailer?
A: Drive it up the ramps under its own power in low gear, keeping a straight, steady line and moderate throttle — don't gun it, and don't ride the brakes on the way up, since either can cause the machine to lurch or stall partway. Center the UTV on the deck once it's up, roughly equal distance from each side and with weight balanced front-to-back relative to the trailer's axles, since an unbalanced load affects how the trailer tows.

Once it's positioned, set the parking brake and put the transmission in park or gear (not neutral), then move to tie-downs. Use four separate straps, one at each corner of the machine, hooked to a solid frame point or the factory-rated tie-down loops most UTVs include specifically for this purpose — never to suspension arms, axles, or plastic body panels. Angle each strap outward toward its corner of the trailer rather than straight down, which resists both forward-and-back sliding and side-to-side sway during transit. Because UTVs and ATVs have working suspension, the straps should be snug enough to keep the machine from bouncing or shifting, but not cranked down so tight that they fully compress the suspension travel — moderate, even tension across all four points is the goal.

The same fundamentals apply whether you're hauling an ATV, a side-by-side, or a compact tractor: confirm weight against the trailer's rated capacity, confirm width and length against the deck, load slow and straight, center the load, and secure all four corners before you tow. If you're not sure your equipment fits within our hauler's specs, give us a call with the make, model, and weight and we'll help you confirm it before booking day.`,
    date: "2026-07-08",
    category: "Guides",
  },
];
