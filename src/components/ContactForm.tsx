"use client";
import { useState } from "react";
import { API, EMAIL } from "@/lib/data";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(f.entries())),
      });
      if (!r.ok) throw new Error();
      setState("ok");
      e.currentTarget.reset();
    } catch { setState("err"); }
  }
  return (
    <form onSubmit={submit} className="card form">
      <input name="name" placeholder="Your name" required maxLength={100} />
      <input name="email" type="email" placeholder="Your email" required maxLength={150} />
      <textarea name="message" placeholder="Tell me about the role or project" rows={6} required maxLength={4000} />
      <input name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
      <button className="btn p" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      {state === "ok" && <p className="ok">Thanks! I&apos;ll reply as soon as I can.</p>}
      {state === "err" && <p className="bad">Couldn&apos;t send. Please email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
    </form>
  );
}
