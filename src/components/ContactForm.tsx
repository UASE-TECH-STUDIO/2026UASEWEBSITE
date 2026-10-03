"use client";
import { useEffect, useState } from "react";
import { EMAIL, WA, waLink } from "@/lib/data";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState(""), [slow, setSlow] = useState(false);
  useEffect(() => { if (state !== "sending") { setSlow(false); return; } const t = setTimeout(() => setSlow(true), 7000); return () => clearTimeout(t); }, [state]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget, f = Object.fromEntries(new FormData(form).entries());
    setState("sending"); setErr("");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const d = await r.json().catch(() => ({}));
      if (r.ok) { setState("ok"); form.reset(); return; }
      setErr(r.status === 422 ? "Please check your name, email address and message." : r.status === 429 ? "Too many messages in a short time. Please wait a few minutes." : typeof d.detail === "string" ? d.detail : "Something went wrong.");
    } catch { setErr("Couldn't reach the website server. Check your connection and try again."); }
    setState("err");
  }
  return (
    <form onSubmit={submit} className="card form">
      <input name="name" placeholder="Your name" required maxLength={100} autoComplete="name" />
      <input name="email" type="email" placeholder="Your email" required maxLength={150} autoComplete="email" />
      <textarea name="message" placeholder="Tell me about the role or project" rows={6} required maxLength={4000} />
      <input name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
      <button className="btn p" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      {slow && <p className="rc">Still sending. Our server may be waking up, which can take up to a minute. Please keep this page open.</p>}
      {state === "ok" && <p className="ok">Thanks! Your message was received and I&apos;ll reply as soon as I can.</p>}
      {state === "err" && <p className="bad">{err} You can also email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or <a href={waLink(WA.ng)} target="_blank" rel="noopener">message us on WhatsApp</a>.</p>}
    </form>
  );
}
