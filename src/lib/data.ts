import "server-only";
import { sql, initSchema } from "./db";
import { seedTrailers, seedBlogPosts, type Trailer, type BlogPost } from "./site-data";

async function ensureSeeded() {
  if (!sql) return;
  await initSchema();

  const [{ count: trailerCount }] = await sql`SELECT count(*)::int FROM trailers`;
  if (trailerCount === 0) {
    for (const [i, t] of seedTrailers.entries()) {
      await sql`
        INSERT INTO trailers (slug, name, tagline, price_per_day, specs, description, amenities, images, sort_order)
        VALUES (${t.slug}, ${t.name}, ${t.tagline}, ${t.pricePerDay}, ${sql.json(t.specs)}, ${t.description}, ${sql.json(t.amenities)}, ${sql.json(t.images)}, ${i})
        ON CONFLICT (slug) DO NOTHING
      `;
    }
  }

  const [{ count: postCount }] = await sql`SELECT count(*)::int FROM blog_posts`;
  if (postCount === 0) {
    for (const p of seedBlogPosts) {
      await sql`
        INSERT INTO blog_posts (slug, title, excerpt, body, date, category)
        VALUES (${p.slug}, ${p.title}, ${p.excerpt}, ${p.body}, ${p.date}, ${p.category})
        ON CONFLICT (slug) DO NOTHING
      `;
    }
  }
}

type TrailerRow = {
  slug: string;
  name: string;
  tagline: string;
  price_per_day: number;
  specs: { label: string; value: string }[];
  description: string;
  amenities: string[];
  images: string[];
};

// Rows written before sql.json() was used may hold double-encoded JSON
// (a jsonb string containing the array) — parse those back on read.
function fromJsonb<T>(value: T | string): T {
  return typeof value === "string" ? (JSON.parse(value) as T) : value;
}

function rowToTrailer(row: TrailerRow): Trailer {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    pricePerDay: row.price_per_day,
    specs: fromJsonb(row.specs),
    description: row.description,
    amenities: fromJsonb(row.amenities),
    images: fromJsonb(row.images),
  };
}

export async function getTrailers(): Promise<Trailer[]> {
  if (!sql) return seedTrailers;
  await ensureSeeded();
  const rows = await sql<TrailerRow[]>`SELECT * FROM trailers ORDER BY sort_order ASC, name ASC`;
  return rows.map(rowToTrailer);
}

export async function getTrailer(slug: string): Promise<Trailer | undefined> {
  if (!sql) return seedTrailers.find((t) => t.slug === slug);
  await ensureSeeded();
  const rows = await sql<TrailerRow[]>`SELECT * FROM trailers WHERE slug = ${slug}`;
  return rows[0] ? rowToTrailer(rows[0]) : undefined;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!sql) return seedBlogPosts;
  await ensureSeeded();
  const rows = await sql<BlogPost[]>`SELECT slug, title, excerpt, body, date::text, category FROM blog_posts ORDER BY date DESC`;
  return rows;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!sql) return seedBlogPosts.find((p) => p.slug === slug);
  await ensureSeeded();
  const rows = await sql<BlogPost[]>`SELECT slug, title, excerpt, body, date::text, category FROM blog_posts WHERE slug = ${slug}`;
  return rows[0];
}
