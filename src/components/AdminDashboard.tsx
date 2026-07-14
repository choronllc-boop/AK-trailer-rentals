"use client";

import { useState } from "react";
import { trailers as initialTrailers, blogPosts as initialPosts } from "@/lib/site-data";

const DEMO_PASSWORD = "demo1234";

type Tab = "catalog" | "gallery" | "calendar" | "blog";

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!loggedIn) {
    return (
      <form
        className="mx-auto mt-24 max-w-sm space-y-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (password === DEMO_PASSWORD) {
            setLoggedIn(true);
            setError("");
          } else {
            setError("Incorrect password. Try \"demo1234\" for this preview.");
          }
        }}
      >
        <h1 className="font-display text-3xl text-coffee">Admin Login</h1>
        <p className="text-sm text-coffee/60">
          Demo only — this login is not production-secure. Password: <code>demo1234</code>
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee"
        />
        {error && <p className="text-sm text-chestnut">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut"
        >
          Log In
        </button>
      </form>
    );
  }

  return <Dashboard />;
}

function Dashboard() {
  const [tab, setTab] = useState<Tab>("catalog");
  const [trailers, setTrailers] = useState(initialTrailers);
  const [posts, setPosts] = useState(initialPosts);

  const tabs: { key: Tab; label: string }[] = [
    { key: "catalog", label: "Trailer Catalog" },
    { key: "gallery", label: "Gallery" },
    { key: "calendar", label: "Booking Calendar" },
    { key: "blog", label: "Blog Posts" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-coffee">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-coffee/60">
        Preview only — changes here are not saved and reset on reload.
      </p>

      <div className="mt-8 flex gap-2 border-b border-almond">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold ${
              tab === t.key ? "border-b-2 border-pumpkin text-coffee" : "text-coffee/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "catalog" && (
        <div className="mt-6 space-y-3">
          {trailers.map((t) => (
            <div key={t.slug} className="flex items-center justify-between rounded-xl border border-almond p-4">
              <div>
                <p className="font-semibold text-coffee">{t.name}</p>
                <p className="text-sm text-coffee/60">${t.pricePerDay}/day</p>
              </div>
              <button
                onClick={() => setTrailers((prev) => prev.filter((x) => x.slug !== t.slug))}
                className="text-sm font-semibold text-chestnut hover:text-pumpkin"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setTrailers((prev) => [
                ...prev,
                {
                  slug: `new-trailer-${prev.length}`,
                  name: "New Trailer",
                  tagline: "Add details",
                  pricePerDay: 0,
                  specs: [],
                  description: "",
                  amenities: [],
                  images: [],
                },
              ])
            }
            className="rounded-full bg-coffee px-6 py-2 text-sm font-semibold text-white hover:bg-mahogany"
          >
            + Add Trailer
          </button>
        </div>
      )}

      {tab === "gallery" && (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {trailers.flatMap((t) => t.images).map((img) => (
              <div key={img} className="aspect-square rounded-xl bg-almond/50" />
            ))}
          </div>
          <button className="mt-4 rounded-full bg-coffee px-6 py-2 text-sm font-semibold text-white hover:bg-mahogany">
            + Upload Photo
          </button>
        </div>
      )}

      {tab === "calendar" && (
        <div className="mt-6 space-y-3">
          <p className="text-coffee/70">Select a trailer, then block or unblock dates.</p>
          <select className="w-full max-w-xs rounded-xl border border-almond bg-white px-4 py-3 text-coffee">
            {trailers.map((t) => (
              <option key={t.slug}>{t.name}</option>
            ))}
          </select>
          <input type="date" className="w-full max-w-xs rounded-xl border border-almond bg-white px-4 py-3 text-coffee" />
          <button className="rounded-full bg-coffee px-6 py-2 text-sm font-semibold text-white hover:bg-mahogany">
            Block Date
          </button>
        </div>
      )}

      {tab === "blog" && (
        <div className="mt-6 space-y-3">
          {posts.map((p) => (
            <div key={p.slug} className="flex items-center justify-between rounded-xl border border-almond p-4">
              <p className="font-semibold text-coffee">{p.title}</p>
              <button
                onClick={() => setPosts((prev) => prev.filter((x) => x.slug !== p.slug))}
                className="text-sm font-semibold text-chestnut hover:text-pumpkin"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setPosts((prev) => [
                ...prev,
                {
                  slug: `new-post-${prev.length}`,
                  title: "New Post",
                  excerpt: "",
                  date: new Date().toISOString().slice(0, 10),
                  category: "Company News",
                },
              ])
            }
            className="rounded-full bg-coffee px-6 py-2 text-sm font-semibold text-white hover:bg-mahogany"
          >
            + Add Post
          </button>
        </div>
      )}
    </div>
  );
}
