"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Project, label } from "@/lib/data";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const cats = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [cat, setCat] = useState("all"), [q, setQ] = useState(""), [mic, setMic] = useState(false), [listening, setListening] = useState(false);
  useEffect(() => { const w = window as any; setMic(!!(w.SpeechRecognition || w.webkitSpeechRecognition)); }, []);
  function listen() {
    const w = window as any, R = w.SpeechRecognition || w.webkitSpeechRecognition; if (!R) return;
    const r = new R(); r.lang = "en-NG"; r.interimResults = false;
    r.onresult = (e: any) => setQ(e.results[0][0].transcript.replace(/[.?!]$/, ""));
    r.onend = () => setListening(false); r.onerror = () => setListening(false);
    setListening(true); r.start();
  }
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = projects.filter((p) => (cat === "all" || p.category === cat) &&
    words.every((w) => [p.title, p.tagline, p.category, p.client_type, ...p.technologies].join(" ").toLowerCase().includes(w)));
  return (
    <>
      <div className="searchrow">
        <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, e.g. Next.js, mobile, hospital…" aria-label="Search projects" />
        {mic && <button type="button" className={"micbtn" + (listening ? " on" : "")} onClick={listen} aria-label="Search by voice">{listening ? "Listening…" : "🎤"}</button>}
      </div>
      <div className="chips" style={{ marginBottom: 22 }}>
        {cats.map((c) => (
          <button key={c} className={"chip btnchip" + (c === cat ? " g" : "")} onClick={() => setCat(c)}>{c === "all" ? "All" : label(c)}</button>
        ))}
      </div>
      {list.length === 0 && <p className="sub">No projects match. Try another word.</p>}
      <div className="grid">
        {list.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="card pcard">
            <img src={p.thumbnail} alt={p.title} loading="lazy" />
            <h3>{p.title}</h3>
            <p>{p.tagline}</p>
            <div className="chips">{p.technologies.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
