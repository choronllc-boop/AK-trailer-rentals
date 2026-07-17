import type { Metadata } from "next";
import { getTrailers, getBlogPosts } from "@/lib/data";
import { sql } from "@/lib/db";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | AK Trailer Rentals",
  robots: { index: false, follow: false },
};

// Always read fresh from the database — the admin list must never be a
// stale prerender from build time.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [trailers, posts] = await Promise.all([getTrailers(), getBlogPosts()]);
  return <AdminDashboard initialTrailers={trailers} initialPosts={posts} dbConnected={sql !== null} />;
}
