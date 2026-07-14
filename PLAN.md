# AK Trailer Rentals — Website Plan

Status: **Planning stage — no code yet.** This is a demo/portfolio build for a client pitch.

## Tech Stack

- **Next.js/React**, custom-coded (chosen for flexibility with live calendar + Sheets integration)
- Booking calendar: simple date-blocking per trailer (no inventory-quantity math)
- Contact/booking form → Google Sheets via Sheets API (future phase, not part of initial build)
- Live Google Reviews integration (tool/API TBD — decide during implementation)
- Admin portal: gated behind a basic login page. **Showcase-only, not production-hardened.** Lets the owner demo adding trailer images, editing catalog, blocking calendar dates, and posting blog entries. Real auth/security hardening is explicitly a later, separate task before this could go live.
- Fonts:
  - **Montserrat** — Google Fonts, free, body/UI text
  - **Cal Sans** — NOT on Google Fonts. Free/open-source via Fontshare or GitHub (cal.com). Self-host or pull from Fontshare CDN. Headlines only.

## Color Palette

| Name | Hex | Use |
|---|---|---|
| Coffee Bean | `#130303` | Primary text, dark section backgrounds |
| Rich Mahogany | `#2D080A` | Dark section accents |
| Chestnut | `#7C3626` | Secondary accents |
| Pumpkin Spice | `#F5853F` | Primary accent — CTAs, links, highlights (only accent, used sparingly) |
| Almond Silk | `#FFCDBC` | Light backgrounds, warm negative space |

## Style Direction

Warm minimalism — welcoming, easy, accessible. Reference points:
- **Service Areas module** (dark card, pill-shaped location tags, "SERVICE AREAS" eyebrow label) — reuse this pattern for the homepage Service Areas section and dedicated Service Areas page.
- **Airbnb-style listing detail layout** (large hero photo + grid of secondary photos, minimal icon row for specs, pill-shaped CTA button, star rating/reviews below, generous whitespace, clean sans-serif type) — this is the model for **Trailer Detail pages** specifically: big photo grid, spec icons (capacity, size, hitch type, etc. instead of guests/bedrooms/bathrooms), a clear "Check Availability" style CTA, reviews section beneath.

General rules:
- Flat design — no gradients, no glow effects, no jagged/unreasonable formatting
- Soft rounded corners, subtle card shadows only
- Almond Silk / white backgrounds with Coffee Bean text; Pumpkin Spice as the *only* accent color, used sparingly (CTAs/links)
- Dark (Mahogany/Coffee Bean) sections used sparingly for contrast blocks
- Cal Sans for headlines only; Montserrat for body/UI/nav
- Big touch targets, mobile-first
- Real `tel:` and `mailto:` links everywhere — **no dead links, no dead SMS redirects**
- Realistic Alaska-specific placeholder content throughout (Wasilla/Mat-Su names, plausible trailer specs, region-appropriate stock photos) — since real logo/photos aren't ready yet

## Sitemap

### 1. Home
- Hero (headline + CTA "Book a Trailer")
- Trailer type quick-picker (visual cards → catalog)
- Live availability calendar teaser
- Service Areas section (dark card, pill tags)
- Google Reviews carousel (live-updating)
- Why Rent From Us / trust bar
- Blog teaser (3 latest posts)
- Footer CTA

### 2. Trailer Catalog
- Index page, grid of trailer categories (placeholder types: car hauler, log/wood hauler, utility trailer, etc. — exact lineup TBD with client)

### 3. Trailer Detail pages (one per type)
- Photo gallery (Airbnb-style grid: 1 large + smaller grid below)
- Spec icons row (capacity, dimensions, hitch type, etc.)
- Description
- Mini calendar + "Check Availability" / "Book This Trailer" CTA
- Reviews section

### 4. Book a Trailer (central booking page)
- Pick trailer type → date range (start/end) → pickup or delivery → submit

### 5. Contact Us (separate from booking)
- Hours, phone (`tel:` click-to-call), address + map embed, email
- General inquiry form: name, email, phone, trailer type/size needed, dates needed, pickup vs. delivery, rental duration, message
- → submits to Google Sheet (future integration)

### 6. Service Areas
- Full list of towns served (Wasilla, Palmer, Big Lake, Meadow Lakes, Houston, Willow, Talkeetna, Trapper Creek, Chugiak, Eagle River, Anchorage, JBER, Peters Creek, Birchwood, Sutton, Chickaloon, Butte, etc.)
- Styled per reference: dark card, pill tags, eyebrow label

### 7. FAQ
- Towing requirements, deposits/insurance, cancellation policy, delivery radius, etc.

### 8. Blog
- Index + post template
- Content mix: how-to/towing guides (evergreen SEO) + seasonal Alaska content (firewood hauling in fall, moving season, landscaping season) + occasional company news
- Start with ~5 realistic placeholder posts

### 9. About Us
- Company story, local/family-owned angle, why choose us

### 10. Admin Portal (demo-only)
- Simple login (not production-secure — flagged clearly in build)
- Manage: trailer catalog (add/edit/images), gallery photos, calendar date-blocks, blog posts

## SEO Strategy

- Each trailer detail page, service area, and blog post is its own indexable, keyword-targeted page (e.g. "car hauler rental Wasilla AK")
- Semantic headings, alt text on all trailer images
- Local business schema markup, NAP (name/address/phone) consistency across pages
- `sitemap.xml` and `robots.txt`

## Open Items / Future Phases

- Finalize real trailer lineup with client (current list is placeholder)
- Real trailer photography (logo is final; trailer/blog photos still placeholder until uploaded via admin)
- Connect a database (Vercel Postgres/Neon/Supabase) and Vercel Blob in the Vercel dashboard — admin panel is built and falls back to seed data until `DATABASE_URL` is set
- Google Sheets API integration for form submissions
- Live Google Reviews integration — tool/API TBD (Facebook reviews are in as a static carousel for now)
- Admin portal real authentication/security hardening before go-live (current login is a single shared demo password)
- Host the site (Vercel via GitHub import recommended — connects the repo, auto-deploys on push)
