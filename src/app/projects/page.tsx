import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import StoreButtons from "@/components/StoreButtons";
import Gallery from "@/components/Gallery";
import { projects } from "@/lib/data";
import { extraShots } from "@/lib/extra-shots";
export const metadata = { title: "Projects | USTY — UASE Tech Studio Ltd" };
export default function Projects() {
  const f = projects[0];
  const shots = [...extraShots(), ...f.screenshots].slice(0, 10);
  return (
    <div className="w"><div className="hero" style={{ paddingBottom: 20 }}><h1>Projects</h1><p className="lead">Web platforms, mobile apps and systems we&apos;ve designed and built. Tap any project for the full story.</p></div>
      <div className="case" style={{ marginBottom: 30 }}>
        <span className="tag mono">Featured · Live on web, App Store &amp; Google Play</span>
        <h3><Link href={`/projects/${f.slug}`} style={{ textDecoration: "none" }}>{f.title}</Link></h3><p style={{ color: "var(--mute)" }}>{f.tagline}</p>
        <Gallery images={shots} alt="CARSTRIMS screenshot" />
        <div className="chips">{f.technologies.map((t) => <span key={t} className="chip g">{t}</span>)}</div>
        <StoreButtons caseHref={`/projects/${f.slug}`} />
      </div>
      <ProjectGrid projects={projects} />
    </div>
  );
}
