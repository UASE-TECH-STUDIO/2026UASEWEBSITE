"use client";
import { useState } from "react";
import { API } from "@/lib/data";
type C = { name: string; message: string; created: string };
export default function Comments({ slug, initial }: { slug: string; initial: C[] }) {
  const [list, setList] = useState(initial), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setBusy(true);
    const form = e.currentTarget, f = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch(`${API}/api/posts/${slug}/comments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const d = await r.json();
      if (!r.ok) throw new Error(typeof d.detail === "string" ? d.detail : "Please check your comment");
      setList([d, ...list]); form.reset();
    } catch (x: any) { setErr(x.message || "Couldn't post. Try again."); }
    setBusy(false);
  }
  return (
    <div>
      <h2>Comments ({list.length})</h2>
      <form onSubmit={submit} className="card form" style={{ marginBottom: 18 }}>
        <input name="name" placeholder="Your name (optional, leave empty to comment as Ghost)" maxLength={40} />
        <textarea name="message" placeholder="Write a comment…" rows={3} required maxLength={1000} />
        <input name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
        <button className="btn p" disabled={busy}>{busy ? "Posting…" : "Post comment"}</button>
        {err && <p className="bad">{err}</p>}
      </form>
      {list.length === 0 && <p className="sub">No comments yet. Be the first.</p>}
      {list.map((c, i) => (
        <div key={i} className="card cmt"><b>{c.name}</b> <span className="mono">{new Date(c.created).toLocaleString()}</span><p>{c.message}</p></div>
      ))}
    </div>
  );
}
