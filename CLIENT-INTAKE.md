# Client Intake — AK Trailer Rentals

Information needed from the client to move the site from demo to full production.

## Business Info

- [ ] Legal business name(s) — site says "AK Trailer Rentals," but reviews reference "AK Transportation LLC" too. Which is correct/primary, and is one a DBA of the other?
- [ ] Confirm phone, email, address, and hours are accurate (currently: 785-416-0279, akrental7@outlook.com, 1420 E Parks Hwy, Wasilla AK 99654)
- [ ] Final Facebook page URL (currently linked to facebook.com/AKtransportationllc)
- [ ] Any other socials (Instagram, Google Business Profile) to link

## Trailer Lineup

- [ ] Actual trailer types/models he rents (site currently has 4 placeholder types: car hauler, log/wood hauler, utility, enclosed cargo)
- [ ] Per trailer: real name, price/day, capacity, dimensions, hitch type, axle count, any other specs
- [ ] Real photos for each trailer (multiple angles — this is the biggest visible gap right now, all images are blank placeholders)
- [ ] Amenities/features per trailer (ramps, tie-downs, lighting, etc.)

## Service Area

- [ ] Confirm the town list is accurate/complete (currently: Wasilla, Palmer, Big Lake, Meadow Lakes, Houston, Willow, Talkeetna, Trapper Creek, Chugiak, Eagle River, Anchorage, JBER, Peters Creek, Birchwood, Sutton, Chickaloon, Butte)
- [ ] Delivery radius/fee structure, if delivery is offered

## Booking & Policies

- [ ] Deposit amount/policy
- [ ] Cancellation policy specifics
- [ ] Insurance/license requirements for renters
- [ ] Actual availability/inventory data (site currently has no real calendar — it's a placeholder date-picker)

## Content

- [ ] Real "About Us" story (currently generic placeholder copy)
- [ ] Any real customer reviews beyond the ~15 Facebook ones already pulled in
- [ ] Blog topics he wants covered, or existing content to migrate

## Assets

- [ ] Logo (already have — the badge logo he provided)
- [ ] Brand colors — confirm if the new "steel/rose/taupe" palette is a keeper or if he wants the original orange-based one back

## Technical Decisions (his input needed)

- [ ] **Hosting**: does he have/want a Vercel account, or a preference for another host?
- [ ] **Domain**: does he own a domain already, or need one registered?
- [ ] **Google Sheets / booking backend**: still planned but not built — does he want form submissions routed to a spreadsheet, email, or the database directly?
- [ ] **Live Google Reviews**: currently using static Facebook reviews pasted in manually — does he want a live-syncing Google Reviews widget instead/also?
- [ ] **Admin access**: who should have the login, and are they comfortable with a shared password for now (current demo auth is not production-secure)
