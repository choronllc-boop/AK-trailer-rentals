import type { Metadata } from "next";
import { getTrailers, getBlogPosts } from "@/lib/data";
import { sql } from "@/lib/db";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | AK Trailer Rentals",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [trailers, posts] = await Promise.all([getTrailers(), getBlogPosts()]);
  return <AdminDashboard initialTrailers={trailers} initialPosts={posts} dbConnected={sql !== null} />;
}
