import Link from "next/link";
import { services } from "@/lib/data";
export const metadata = { title: "Services | USTY — UASE Tech Studio" };
export default function Services() {
  return (
    <div className="w"><div className="hero" style={{paddingBottom:20}}><h1>Services</h1><p className="lead">Web, mobile and backend engineering, plus the supporting work that keeps a business running.</p></div>
      <div className="two">{services.map((s) => (
        <div key={s.slug} className="card"><h3>{s.title}</h3><p>{s.description}</p>
          <div className="chips">{s.tools.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          <ul className="list">{s.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
          <Link className="btn" href={`/services/${s.slug}`}>How it works</Link></div>))}</div>
      <div className="btns"><Link className="btn p" href="/contact">Start a project</Link></div>
    </div>
  );
}
