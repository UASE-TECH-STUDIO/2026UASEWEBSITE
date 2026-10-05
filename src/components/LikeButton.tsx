"use client";
import { useEffect, useState } from "react";
export default function LikeButton({ slug, likes }: { slug: string; likes: number }) {
  const [n, setN] = useState(likes), [liked, setLiked] = useState(false), [busy, setBusy] = useState(false);
  useEffect(() => { try { setLiked(localStorage.getItem("liked:" + slug) === "1"); } catch {} }, [slug]);
  async function toggle() {
    if (busy) return; setBusy(true);
    try {
      let v = localStorage.getItem("uase_vid");
      if (!v) { v = crypto.randomUUID(); localStorage.setItem("uase_vid", v); }
      const r = await fetch(`/api/backend/posts/${slug}/like`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitor: v }) });
      if (r.ok) { const d = await r.json(); setN(d.likes); setLiked(d.liked); localStorage.setItem("liked:" + slug, d.liked ? "1" : "0"); }
    } catch {}
    setBusy(false);
  }
  return <button className={"btn" + (liked ? " p" : "")} onClick={toggle}>{liked ? "♥" : "♡"} {n} {n === 1 ? "like" : "likes"}</button>;
}
