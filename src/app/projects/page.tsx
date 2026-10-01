import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import { extraShots } from "@/lib/extra-shots";
import StoreButtons from "@/components/StoreButtons";
import { projects } from "@/lib/data";
export const metadata = { title: "Projects | USTY — UASE Tech Studio" };
export default function Projects() {
  const [f, ...rest] = projects;
  return (
    <div className="w"><div className="hero" style={{paddingBottom:20}}><h1>Projects</h1><p className="lead">Web platforms, mobile apps and systems I&apos;ve designed and built.</p></div>
      <div className="case" style={{marginBottom:30}}>
        <span className="tag mono">Featured · Live on web, App Store &amp; Google Play</span>
        <h3>{f.title}</h3><p style={{color:"var(--mute)"}}>{f.tagline}</p>
        <div className="shots">{[...extraShots(), ...f.screenshots].slice(0, 4).map((s)=><img key={s} src={s} alt="" loading="lazy" />)}</div>
        <div className="chips">{f.technologies.map((t)=><span key={t} className="chip g">{t}</span>)}</div>
        <StoreButtons caseHref={`/projects/${f.slug}`} />
      </div>
      <ProjectGrid projects={rest} />
    </div>
  );
}
