import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import cv from "@/data/cv.json";

export const metadata = { title: `Resume | ${cv.name} (${cv.nickname}) — Full-Stack Web & Mobile Developer` };
// The resume page and the downloadable CV PDF are both generated from src/data/cv.json, so they always match.
const rich = (t: string) => t.split("**").map((x, i) => (i % 2 ? <b key={i}>{x}</b> : x));

export default function Resume() {
  const c = cv.contact;
  return (
    <div className="w">
      <div className="hero" style={{ paddingBottom: 24 }}>
        <span className="tag mono">Resume &amp; CV</span>
        <h1 style={{ fontSize: "clamp(28px,5vw,46px)" }}>{cv.name} ({cv.nickname})</h1>
        <p className="lead">{cv.title.replace(" | ", " · ")} · Remote-ready</p>
        <div className="btns noprint"><a className="btn p" href="/downloads/usty-cv.pdf" download>Download CV (PDF)</a><PrintButton /></div>
      </div>
      <div className="rs">
        <aside>
          <div className="card" style={{ marginBottom: 16 }}><h3>Contact</h3>
            <p className="meta">{c.location}</p>
            <p><a href={`mailto:${c.email}`}>{c.email}</a></p>
            <p><a href={c.whatsappLink} target="_blank" rel="noopener">WhatsApp</a></p>
            <p><a href={c.linkedin} target="_blank" rel="noopener">LinkedIn</a></p></div>
          {cv.skills.map(([t, l]) => <div key={t} className="card" style={{ marginBottom: 16 }}><h3>{t}</h3><p>{l}</p></div>)}
        </aside>
        <div>
          <h2>Profile</h2>
          <p className="lead" style={{ fontSize: 16 }}>{rich(cv.profile)}</p>
          <div className="two" style={{ marginTop: 14 }}>{cv.hire.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}</div>
          <h2 style={{ marginTop: 32 }}>Highlights</h2>
          <ul className="list">{cv.highlights.map((h) => <li key={h}>{rich(h)}</li>)}</ul>
          <h2 style={{ marginTop: 32 }}>Experience</h2>
          {cv.experience.map((e) => (
            <div key={e.role + e.company} className="job card"><h3>{e.role} — {e.company}</h3><p className="meta">{e.dates} · {e.sub}</p>
              <ul className="list">{e.points.map((p) => <li key={p}>{rich(p)}</li>)}</ul></div>))}
          <h2 style={{ marginTop: 32 }}>Selected projects</h2>
          <div className="two">{cv.projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="card pcard"><h3>{p.name}</h3><p className="meta">{p.tech}</p><p>{p.text}</p></Link>))}</div>
          <h2 style={{ marginTop: 32 }}>Education &amp; credentials</h2>
          <ul className="list">{cv.education.map((e) => <li key={e}>{e}</li>)}</ul>
        </div></div></div>
  );
}
