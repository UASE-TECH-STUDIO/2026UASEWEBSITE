"use client";
import Link from "next/link";
import { useState } from "react";
import { Project, label } from "@/lib/data";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const cats = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? projects : projects.filter((p) => p.category === cat);
  return (
    <>
      <div className="chips" style={{ marginBottom: 22 }}>
        {cats.map((c) => (
          <button key={c} className={"chip btnchip" + (c === cat ? " g" : "")} onClick={() => setCat(c)}>
            {c === "all" ? "All" : label(c)}
          </button>
        ))}
      </div>
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
