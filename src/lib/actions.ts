"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";
import { put } from "@vercel/blob";
import { sql, initSchema } from "./db";
import type { Trailer, BlogPost } from "./site-data";

// Set ADMIN_PASSWORD in the environment (Vercel project settings / .env.local).
// If it's unset, admin login is disabled entirely rather than falling back.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const ADMIN_COOKIE = "ak_admin";

function adminCookieValue() {
  return createHash("sha256").update(ADMIN_PASSWORD).digest("hex");
}

// ponytail: in-memory throttle — best-effort on serverless (per warm instance);
// move to Postgres if real brute-force traffic ever shows up.
const loginFailures = new Map<string, { count: number; last: number }>();

export async function adminLogin(password: string): Promise<{ ok?: boolean; error?: string }> {
  if (!ADMIN_PASSWORD) {
    return { error: "Admin login is not configured. Set ADMIN_PASSWORD in the environment." };
  }
  const ip = ((await headers()).get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const fails = loginFailures.get(ip);
  if (fails && fails.count >= 5 && Date.now() - fails.last < 15 * 60 * 1000) {
    return { error: "Too many attempts. Try again in 15 minutes." };
  }
  const ok =
    password.length === ADMIN_PASSWORD.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(ADMIN_PASSWORD));
  if (!ok) {
    loginFailures.set(ip, { count: (fails?.count ?? 0) + 1, last: Date.now() });
    return { error: "Incorrect password." };
  }
  loginFailures.delete(ip);
  (await cookies()).set(ADMIN_COOKIE, adminCookieValue(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { ok: true };
}

export async function isAdminLoggedIn(): Promise<boolean> {
  if (!ADMIN_PASSWORD) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return cookie === adminCookieValue();
}

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

// Returns the error as data — thrown errors get masked in production,
// which leaves the owner staring at a useless generic message.
export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) return { error: "No file provided" };
    // Blob stores created with a custom name get a prefixed variable
    // (e.g. blob_READ_WRITE_TOKEN) that put() won't find on its own.
    const token =
      process.env.BLOB_READ_WRITE_TOKEN ??
      Object.entries(process.env).find(([k]) => k.endsWith("_READ_WRITE_TOKEN"))?.[1];
    const blob = await put(`trailers/${Date.now()}-${file.name}`, file, {
      access: "public",
      token,
    });
    return { url: blob.url };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    // Env var NAMES (never values) that look storage-related, to make
    // misconfigured Blob stores diagnosable from the admin UI.
    const names = Object.keys(process.env)
      .filter((k) => /blob|token|store/i.test(k))
      .join(", ");
    const friendly = /token/i.test(msg)
      ? "Photo storage isn't connected to this site yet. In Vercel: Storage tab → connect a Blob store to this project, then redeploy."
      : msg;
    return { error: `${friendly} (storage settings the site can see: ${names || "none"})` };
  }
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

const RATE_LIMIT_SECONDS = 60;

// Handles both the contact and booking forms: rate-limits per visitor,
// stores the submission in Postgres, and forwards to the Google Sheets /
// Calendar webhook when SHEETS_WEBHOOK_URL is configured.
const REQUIRED_FIELDS = {
  contact: ["name", "phone"],
  booking: ["name", "phone", "startDate", "endDate"],
};

export async function submitForm(
  kind: "contact" | "booking",
  data: Record<string, string>,
): Promise<{ ok?: boolean; error?: string }> {
  const missing = REQUIRED_FIELDS[kind].filter((f) => !data[f]?.trim());
  if (missing.length) {
    return { error: `Missing required fields: ${missing.join(", ")}` };
  }

  const ip = ((await headers()).get("x-forwarded-for") ?? "unknown").split(",")[0].trim();

  if (sql) {
    await initSchema();
    const [recent] = await sql`
      SELECT 1 FROM form_submissions
      WHERE ip = ${ip} AND created_at > now() - make_interval(secs => ${RATE_LIMIT_SECONDS})
      LIMIT 1
    `;
    if (recent) {
      return { error: "You just sent a message — please wait a minute before sending another." };
    }
    await sql`INSERT INTO form_submissions (kind, ip, data) VALUES (${kind}, ${ip}, ${sql.json(data)})`;
  }

  const webhook = process.env.SHEETS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...data }),
      });
    } catch {
      // The submission is already stored in Postgres; a webhook hiccup
      // shouldn't fail the visitor's request.
    }
  }

  return { ok: true };
}
