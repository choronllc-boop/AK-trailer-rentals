"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { sql, initSchema } from "./db";
import type { Trailer, BlogPost } from "./site-data";

function requireDb() {
  if (!sql) {
    throw new Error(
      "No database configured. Set DATABASE_URL in the project's environment variables to enable saving.",
    );
  }
  return sql;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function revalidateTrailers() {
  revalidatePath("/");
  revalidatePath("/trailers");
  revalidatePath("/trailers/[slug]", "page");
}

function revalidateBlog() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
}

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No file provided");
  // Blob stores created with a custom name get a prefixed variable
  // (e.g. blob_READ_WRITE_TOKEN) that put() won't find on its own.
  const token =
    process.env.BLOB_READ_WRITE_TOKEN ??
    Object.entries(process.env).find(([k]) => k.endsWith("_READ_WRITE_TOKEN"))?.[1];
  const blob = await put(`trailers/${Date.now()}-${file.name}`, file, {
    access: "public",
    token,
  });
  return blob.url;
}

export async function saveTrailer(trailer: Trailer, originalSlug?: string) {
  const db = requireDb();
  await initSchema();
  const slug = slugify(trailer.slug || trailer.name);

  if (originalSlug && originalSlug !== slug) {
    await db`DELETE FROM trailers WHERE slug = ${originalSlug}`;
  }

  await db`
    INSERT INTO trailers (slug, name, tagline, price_per_day, specs, description, amenities, images)
    VALUES (${slug}, ${trailer.name}, ${trailer.tagline}, ${trailer.pricePerDay}, ${db.json(trailer.specs)}, ${trailer.description}, ${db.json(trailer.amenities)}, ${db.json(trailer.images)})
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      tagline = EXCLUDED.tagline,
      price_per_day = EXCLUDED.price_per_day,
      specs = EXCLUDED.specs,
      description = EXCLUDED.description,
      amenities = EXCLUDED.amenities,
      images = EXCLUDED.images
  `;
  revalidateTrailers();
}

export async function deleteTrailer(slug: string) {
  const db = requireDb();
  await db`DELETE FROM trailers WHERE slug = ${slug}`;
  revalidateTrailers();
}

export async function saveBlogPost(post: BlogPost, originalSlug?: string) {
  const db = requireDb();
  await initSchema();
  const slug = slugify(post.slug || post.title);

  if (originalSlug && originalSlug !== slug) {
    await db`DELETE FROM blog_posts WHERE slug = ${originalSlug}`;
  }

  await db`
    INSERT INTO blog_posts (slug, title, excerpt, body, date, category)
    VALUES (${slug}, ${post.title}, ${post.excerpt}, ${post.body}, ${post.date}, ${post.category})
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      body = EXCLUDED.body,
      date = EXCLUDED.date,
      category = EXCLUDED.category
  `;
  revalidateBlog();
}

export async function deleteBlogPost(slug: string) {
  const db = requireDb();
  await db`DELETE FROM blog_posts WHERE slug = ${slug}`;
  revalidateBlog();
}
