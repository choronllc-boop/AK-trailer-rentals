"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Trailer, BlogPost } from "@/lib/site-data";
import { saveTrailer, deleteTrailer, saveBlogPost, deleteBlogPost, uploadImage } from "@/lib/actions";

const DEMO_PASSWORD = "demo1234";

type Tab = "catalog" | "blog";

export default function AdminDashboard({
  initialTrailers,
  initialPosts,
  dbConnected,
}: {
  initialTrailers: Trailer[];
  initialPosts: BlogPost[];
  dbConnected: boolean;
}) {
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

  return (
    <Dashboard initialTrailers={initialTrailers} initialPosts={initialPosts} dbConnected={dbConnected} />
  );
}

function Dashboard({
  initialTrailers,
  initialPosts,
  dbConnected,
}: {
  initialTrailers: Trailer[];
  initialPosts: BlogPost[];
  dbConnected: boolean;
}) {
  const [tab, setTab] = useState<Tab>("catalog");
  const [editingTrailer, setEditingTrailer] = useState<Trailer | "new" | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | "new" | null>(null);

  const tabs: { key: Tab; label: string }[] = [
    { key: "catalog", label: "Trailer Catalog" },
    { key: "blog", label: "Blog Posts" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-coffee">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-coffee/60">
        Changes here save to the live site immediately — no redeploy needed.
      </p>

      {!dbConnected && (
        <p className="mt-4 rounded-xl border border-pumpkin/40 bg-almond/30 p-4 text-sm text-coffee">
          No database is connected yet, so changes won&apos;t save. Set <code>DATABASE_URL</code> in
          the project&apos;s environment variables (Vercel Postgres, Neon, or Supabase all work) to
          enable saving.
        </p>
      )}

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

      {tab === "catalog" &&
        (editingTrailer ? (
          <TrailerForm
            trailer={editingTrailer === "new" ? null : editingTrailer}
            onDone={() => setEditingTrailer(null)}
          />
        ) : (
          <TrailerList trailers={initialTrailers} onEdit={setEditingTrailer} />
        ))}

      {tab === "blog" &&
        (editingPost ? (
          <BlogForm post={editingPost === "new" ? null : editingPost} onDone={() => setEditingPost(null)} />
        ) : (
          <BlogList posts={initialPosts} onEdit={setEditingPost} />
        ))}
    </div>
  );
}

function TrailerList({
  trailers,
  onEdit,
}: {
  trailers: Trailer[];
  onEdit: (t: Trailer | "new") => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleDelete(slug: string) {
    setError("");
    startTransition(async () => {
      try {
        await deleteTrailer(slug);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed");
      }
    });
  }

  return (
    <div className="mt-6 space-y-3">
      {error && <p className="text-sm text-chestnut">{error}</p>}
      {trailers.map((t) => (
        <div key={t.slug} className="flex items-center justify-between rounded-xl border border-almond p-4">
          <div>
            <p className="font-semibold text-coffee">{t.name}</p>
            <p className="text-sm text-coffee/60">${t.pricePerDay}/day</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onEdit(t)} className="text-sm font-semibold text-coffee hover:text-pumpkin">
              Edit
            </button>
            <button
              disabled={isPending}
              onClick={() => handleDelete(t.slug)}
              className="text-sm font-semibold text-chestnut hover:text-pumpkin disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => onEdit("new")}
        className="rounded-full bg-coffee px-6 py-2 text-sm font-semibold text-white hover:bg-mahogany"
      >
        + Add Trailer
      </button>
    </div>
  );
}

function BlogList({
  posts,
  onEdit,
}: {
  posts: BlogPost[];
  onEdit: (p: BlogPost | "new") => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleDelete(slug: string) {
    setError("");
    startTransition(async () => {
      try {
        await deleteBlogPost(slug);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed");
      }
    });
  }

  return (
    <div className="mt-6 space-y-3">
      {error && <p className="text-sm text-chestnut">{error}</p>}
      {posts.map((p) => (
        <div key={p.slug} className="flex items-center justify-between rounded-xl border border-almond p-4">
          <p className="font-semibold text-coffee">{p.title}</p>
          <div className="flex gap-3">
            <button onClick={() => onEdit(p)} className="text-sm font-semibold text-coffee hover:text-pumpkin">
              Edit
            </button>
            <button
              disabled={isPending}
              onClick={() => handleDelete(p.slug)}
              className="text-sm font-semibold text-chestnut hover:text-pumpkin disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => onEdit("new")}
        className="rounded-full bg-coffee px-6 py-2 text-sm font-semibold text-white hover:bg-mahogany"
      >
        + Add Post
      </button>
    </div>
  );
}

const emptyTrailer: Trailer = {
  slug: "",
  name: "",
  tagline: "",
  pricePerDay: 0,
  specs: [],
  description: "",
  amenities: [],
  images: [],
};

function specsToText(specs: Trailer["specs"]) {
  return specs.map((s) => `${s.label}: ${s.value}`).join("\n");
}

function textToSpecs(text: string): Trailer["specs"] {
  return text
    .split("\n")
    .map((line) => line.split(":"))
    .filter(([label, value]) => label?.trim() && value?.trim())
    .map(([label, ...rest]) => ({ label: label.trim(), value: rest.join(":").trim() }));
}

function TrailerForm({ trailer, onDone }: { trailer: Trailer | null; onDone: () => void }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<Trailer>(trailer ?? emptyTrailer);
  const [specsText, setSpecsText] = useState(specsToText(form.specs));
  const [amenitiesText, setAmenitiesText] = useState(form.amenities.join("\n"));
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setFormError("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.set("file", file);
        urls.push(await uploadImage(fd));
      }
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      try {
        await saveTrailer(
          { ...form, specs: textToSpecs(specsText), amenities: amenitiesText.split("\n").filter(Boolean) },
          trailer?.slug,
        );
        router.refresh();
        onDone();
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "Save failed");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
      <button type="button" onClick={onDone} className="text-sm font-semibold text-pumpkin hover:text-chestnut">
        ← Back to list
      </button>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-coffee">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-coffee">Slug (URL)</span>
          <input
            required
            value={form.slug}
            placeholder="auto-generated from name if blank"
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-coffee">Tagline</span>
        <input
          value={form.tagline}
          onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-coffee">Price per day ($)</span>
        <input
          type="number"
          min={0}
          value={form.pricePerDay}
          onChange={(e) => setForm((f) => ({ ...f, pricePerDay: Number(e.target.value) }))}
          className="mt-1 w-full max-w-xs rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-coffee">Description</span>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-coffee">Amenities (one per line)</span>
        <textarea
          rows={4}
          value={amenitiesText}
          onChange={(e) => setAmenitiesText(e.target.value)}
          className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-coffee">Specs (one per line, &quot;Label: Value&quot;)</span>
        <textarea
          rows={4}
          value={specsText}
          onChange={(e) => setSpecsText(e.target.value)}
          placeholder="Capacity: 9,900 lbs"
          className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
        />
      </label>

      <div>
        <span className="text-sm font-semibold text-coffee">Images</span>
        <div className="mt-2 grid grid-cols-4 gap-3">
          {form.images.map((src, i) => (
            <div key={src} className="group relative aspect-square overflow-hidden rounded-lg bg-almond/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-white text-xs text-coffee opacity-0 shadow group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={(e) => handleUpload(e.target.files)}
          className="mt-3 text-sm text-coffee"
        />
        {uploading && <p className="mt-1 text-sm text-coffee/60">Uploading…</p>}
      </div>

      {formError && <p className="text-sm text-chestnut">{formError}</p>}

      <button
        type="submit"
        disabled={isPending || uploading}
        className="rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save Trailer"}
      </button>
    </form>
  );
}

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Company News",
};

function BlogForm({ post, onDone }: { post: BlogPost | null; onDone: () => void }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<BlogPost>(post ?? emptyPost);
  const [formError, setFormError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      try {
        await saveBlogPost(form, post?.slug);
        router.refresh();
        onDone();
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "Save failed");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
      <button type="button" onClick={onDone} className="text-sm font-semibold text-pumpkin hover:text-chestnut">
        ← Back to list
      </button>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-coffee">Title</span>
          <input
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-coffee">Slug (URL)</span>
          <input
            required
            value={form.slug}
            placeholder="auto-generated from title if blank"
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-coffee">Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-coffee">Category</span>
          <input
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-coffee">Excerpt</span>
        <textarea
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-coffee">Body</span>
        <textarea
          rows={10}
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-almond bg-white px-4 py-2 text-coffee"
        />
      </label>

      {formError && <p className="text-sm text-chestnut">{formError}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-pumpkin px-8 py-3 text-base font-semibold text-white hover:bg-chestnut disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save Post"}
      </button>
    </form>
  );
}
