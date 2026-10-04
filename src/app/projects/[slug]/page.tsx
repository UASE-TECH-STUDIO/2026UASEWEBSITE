import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { CARSTRIMS } from "@/lib/links";
import StoreButtons from "@/components/StoreButtons";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import caseData from "@/data/carstrims-case.json";
import { extraShots } from "@/lib/extra-shots";

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} | USTY` : "Project" };
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const shots = [...(p.slug === CARSTRIMS.slug ? extraShots() : extraShots(`projects/${p.slug}`)), ...p.screenshots];
  return (
    <div className="w">
      <div className="hero" style={{paddingBottom:24}}>
        <Link href="/projects" className="mono" style={{color:"var(--mute)",textDecoration:"none",fontSize:13}}>← All projects</Link>
        <h1 style={{fontSize:"clamp(28px,5vw,44px)"}}>{p.title}</h1>
        <p className="lead">{p.tagline}</p>
        <div className="chips">{p.technologies.map((t) => <span key={t} className="chip g">{t}</span>)}</div>
        {p.slug === CARSTRIMS.slug ? <StoreButtons /> : p.live && <div className="btns"><a className="btn p" href={p.live} target="_blank" rel="noopener">Visit live project</a></div>}
      </div>
      <section><h2>Overview</h2><p className="lead" style={{fontSize:16}}>{p.overview}</p></section>
      {p.problem_solution && <section><div className="two">
        <div className="card"><h3>The problem</h3><p>{p.problem_solution.problem}</p></div>
        <div className="card"><h3>The solution</h3><p>{p.problem_solution.solution}</p></div></div></section>}
      {p.slug === CARSTRIMS.slug && <>
        <section><h2>The problem</h2><p className="sub">What the dealer was facing every day.</p><ul className="list">{caseData.problems.map((x) => <li key={x}>{x}</li>)}</ul></section>
        <section><h2>The solution we designed and built</h2><p className="sub">From scattered notebooks and chats to one platform.</p>
          <div className="grid">{caseData.solutions.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}</div></section>
        <section><h2>Five account types, one platform</h2>
          <div className="grid">{caseData.accounts.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}</div></section></>}
      <section><div className="two">
        <div><h2>Key features</h2><ul className="list">{p.features.map((f) => <li key={f}>{f}</li>)}</ul></div>
        {p.expertise.length > 0 && <div><h2>What I demonstrated</h2><ul className="list">{p.expertise.map((f) => <li key={f}>{f}</li>)}</ul></div>}
      </div></section>
      {shots.length > 0 && <section><h2>Screenshots</h2><p className="sub">{shots.length} screens</p>
        <Gallery images={shots} alt={`${p.title} screenshot`} /></section>}
      {p.slug === CARSTRIMS.slug && <Process title="How I built it, start to finish" />}
      <section><div className="btns" style={{marginTop:0}}><Link className="btn p" href="/contact">Build something similar</Link></div></section>
    </div>
  );
}
