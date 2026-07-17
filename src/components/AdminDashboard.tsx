"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Trailer, BlogPost } from "@/lib/site-data";
import { saveTrailer, deleteTrailer, saveBlogPost, deleteBlogPost, uploadImage } from "@/lib/actions";

const DEMO_PASSWORD = "demo1234";

type Tab = "catalog" | "blog";

const inputCls = "mt-1 w-full rounded-xl border border-almond bg-white px-4 py-3 text-coffee";

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-coffee/60">{children}</p>;
}

function StepHeading({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-2xl text-coffee">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-pumpkin text-base text-white">
        {n}
      </span>
      {title}
    </h2>
  );
}

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
          className={inputCls}
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
    { key: "catalog", label: "My Trailers" },
    { key: "blog", label: "Blog Posts" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-coffee">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-coffee/60">
        Anything you save here shows up on the website right away.
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

  function handleDelete(slug: string, name: string) {
    if (!window.confirm(`Remove "${name}" from the website? This can't be undone.`)) return;
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
              onClick={() => handleDelete(t.slug, t.name)}
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

  function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Remove "${title}" from the website? This can't be undone.`)) return;
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
              onClick={() => handleDelete(p.slug, p.title)}
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

function TrailerForm({ trailer, onDone }: { trailer: Trailer | null; onDone: () => void }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<Trailer>(trailer ?? emptyTrailer);
  // Simple add-a-row lists instead of "one per line" textareas.
  const [features, setFeatures] = useState<string[]>(
    trailer?.amenities.length ? trailer.amenities : [""],
  );
  const [details, setDetails] = useState<{ label: string; value: string }[]>(
    trailer?.specs.length ? trailer.specs : [{ label: "", value: "" }],
  );
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
          {
            ...form,
            // The web address is always built from the name on the server.
            slug: "",
            specs: details
              .map((d) => ({ label: d.label.trim(), value: d.value.trim() }))
              .filter((d) => d.label && d.value),
            amenities: features.map((f) => f.trim()).filter(Boolean),
          },
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
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-10">
      <button type="button" onClick={onDone} className="text-sm font-semibold text-pumpkin hover:text-chestnut">
        ← Back to the list (nothing is saved until you press Save)
      </button>

      <section className="space-y-4">
        <StepHeading n={1} title="About this trailer" />

        <label className="block">
          <span className="text-sm font-semibold text-coffee">Trailer name</span>
          <input
            required
            value={form.name}
            placeholder="Wood Deck Car Hauler"
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputCls}
          />
          <Hint>The big title customers see. The trailer&apos;s web address is made from this automatically.</Hint>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-coffee">One-line summary</span>
          <input
            value={form.tagline}
            placeholder="Open deck, 22 ft, tandem axle"
            onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
            className={inputCls}
          />
          <Hint>Shows in small text under the name.</Hint>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-coffee">Price per day (in dollars)</span>
          <input
            type="number"
            min={0}
            required
            value={form.pricePerDay}
            onChange={(e) => setForm((f) => ({ ...f, pricePerDay: Number(e.target.value) }))}
            className={`${inputCls} max-w-40`}
          />
          <Hint>Just the number — 95 means $95 per day.</Hint>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-coffee">Description</span>
          <textarea
            rows={3}
            value={form.description}
            placeholder="A couple of sentences about what this trailer is good for."
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={inputCls}
          />
        </label>
      </section>

      <section className="space-y-3">
        <StepHeading n={2} title="Photos" />
        <Hint>Pick photos from your computer or phone. The first photo is the main one.</Hint>
        <div className="grid grid-cols-4 gap-3">
          {form.images.map((src, i) => (
            <div key={src} className="group relative aspect-square overflow-hidden rounded-lg bg-almond/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="size-full object-cover" />
              <button
                type="button"
                aria-label="Remove photo"
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
          className="text-sm text-coffee"
        />
        {uploading && <p className="text-sm text-coffee/60">Uploading…</p>}
      </section>

      <section className="space-y-3">
        <StepHeading n={3} title="What comes with it" />
        <Hint>One thing per box, like &quot;Steel loading ramps&quot; or &quot;Spare tire included&quot;.</Hint>
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={feature}
              placeholder="Steel loading ramps"
              onChange={(e) => setFeatures((rows) => rows.map((r, idx) => (idx === i ? e.target.value : r)))}
              className={`${inputCls} mt-0`}
            />
            <button
              type="button"
              aria-label="Remove this line"
              onClick={() => setFeatures((rows) => rows.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-full border border-almond px-3 py-2 text-sm text-chestnut hover:border-chestnut"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFeatures((rows) => [...rows, ""])}
          className="rounded-full border border-almond px-5 py-2 text-sm font-semibold text-coffee hover:border-pumpkin hover:text-pumpkin"
        >
          + Add another
        </button>
      </section>

      <section className="space-y-3">
        <StepHeading n={4} title="Facts and numbers" />
        <Hint>
          The left box is the fact, the right box is the answer — like &quot;Deck Length&quot; and &quot;22 ft&quot;.
        </Hint>
        {details.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={row.label}
              placeholder="Deck Length"
              onChange={(e) =>
                setDetails((rows) => rows.map((r, idx) => (idx === i ? { ...r, label: e.target.value } : r)))
              }
              className={`${inputCls} mt-0`}
            />
            <input
              value={row.value}
              placeholder="22 ft"
              onChange={(e) =>
                setDetails((rows) => rows.map((r, idx) => (idx === i ? { ...r, value: e.target.value } : r)))
              }
              className={`${inputCls} mt-0`}
            />
            <button
              type="button"
              aria-label="Remove this line"
              onClick={() => setDetails((rows) => rows.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-full border border-almond px-3 py-2 text-sm text-chestnut hover:border-chestnut"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setDetails((rows) => [...rows, { label: "", value: "" }])}
          className="rounded-full border border-almond px-5 py-2 text-sm font-semibold text-coffee hover:border-pumpkin hover:text-pumpkin"
        >
          + Add another
        </button>
      </section>

      {formError && <p className="text-sm text-chestnut">{formError}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="rounded-full bg-pumpkin px-10 py-4 text-lg font-semibold text-white hover:bg-chestnut disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save — put it on the website"}
        </button>
        <button type="button" onClick={onDone} className="text-sm font-semibold text-coffee/60 hover:text-coffee">
          Cancel
        </button>
      </div>
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

  const categories = Array.from(new Set(["Company News", "Guides", "Seasonal", form.category].filter(Boolean)));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      try {
        // The web address is always built from the title on the server.
        await saveBlogPost({ ...form, slug: "" }, post?.slug);
        router.refresh();
        onDone();
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "Save failed");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-10">
      <button type="button" onClick={onDone} className="text-sm font-semibold text-pumpkin hover:text-chestnut">
        ← Back to the list (nothing is saved until you press Save)
      </button>

      <section className="space-y-4">
        <StepHeading n={1} title="Write your post" />

        <label className="block">
          <span className="text-sm font-semibold text-coffee">Title</span>
          <input
            required
            value={form.title}
            placeholder="Getting Ready for Firewood Season"
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className={inputCls}
          />
          <Hint>The post&apos;s web address is made from this automatically.</Hint>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-coffee">The article</span>
          <textarea
            rows={10}
            required
            value={form.body}
            placeholder="Write your post here, as long or short as you like."
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            className={inputCls}
          />
        </label>
      </section>

      <section className="space-y-4">
        <StepHeading n={2} title="A few details" />

        <label className="block">
          <span className="text-sm font-semibold text-coffee">Short preview line</span>
          <textarea
            rows={2}
            value={form.excerpt}
            placeholder="One sentence that makes people want to read the post."
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            className={inputCls}
          />
          <Hint>Shows on the blog page under the title.</Hint>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-coffee">Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className={inputCls}
            />
            <Hint>Usually today. Newest posts show first.</Hint>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-coffee">Category</span>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={inputCls}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {formError && <p className="text-sm text-chestnut">{formError}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-pumpkin px-10 py-4 text-lg font-semibold text-white hover:bg-chestnut disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save — put it on the website"}
        </button>
        <button type="button" onClick={onDone} className="text-sm font-semibold text-coffee/60 hover:text-coffee">
          Cancel
        </button>
      </div>
    </form>
  );
}
