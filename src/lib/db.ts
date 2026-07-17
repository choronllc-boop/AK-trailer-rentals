import postgres from "postgres";

// Any standard Postgres connection string works here — Vercel Postgres,
// Neon, Supabase, etc. all provide one. Set DATABASE_URL in .env.local
// for local dev and in the Vercel project's environment variables.
// Vercel's Neon/Postgres integrations name the variable POSTGRES_URL;
// accept either so no manual renaming is needed in the dashboard.
const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

export const sql = connectionString
  ? postgres(connectionString, { ssl: "require" })
  : null;

let initialized: Promise<void> | null = null;

export function initSchema() {
  if (!sql) return Promise.resolve();
  if (!initialized) {
    initialized = sql`
      CREATE TABLE IF NOT EXISTS trailers (
        slug TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT NOT NULL,
        price_per_day INTEGER NOT NULL,
        specs JSONB NOT NULL DEFAULT '[]',
        description TEXT NOT NULL DEFAULT '',
        amenities JSONB NOT NULL DEFAULT '[]',
        images JSONB NOT NULL DEFAULT '[]',
        sort_order INTEGER NOT NULL DEFAULT 0
      )
    `
      .then(
        () => sql`
          CREATE TABLE IF NOT EXISTS blog_posts (
            slug TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            excerpt TEXT NOT NULL DEFAULT '',
            body TEXT NOT NULL DEFAULT '',
            date DATE NOT NULL DEFAULT CURRENT_DATE,
            category TEXT NOT NULL DEFAULT 'Company News'
          )
        `,
      )
      .then(
        () => sql`
          CREATE TABLE IF NOT EXISTS form_submissions (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            kind TEXT NOT NULL,
            ip TEXT NOT NULL,
            data JSONB NOT NULL DEFAULT '{}',
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
          )
        `,
      )
      .then(() => {});
  }
  return initialized;
}
