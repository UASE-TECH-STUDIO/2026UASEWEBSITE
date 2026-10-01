import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";

export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return { title: s ? `${s.title} | USTY` : "Service" };
}
export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <div className="w"><div className="hero" style={{paddingBottom:24}}>
      <Link href="/services" className="mono" style={{color:"var(--mute)",textDecoration:"none",fontSize:13}}>← All services</Link>
      <h1 style={{fontSize:"clamp(28px,5vw,44px)"}}>{s.title}</h1><p className="lead">{s.description}</p>
      <div className="chips">{s.tools.map((t) => <span key={t} className="chip g">{t}</span>)}</div></div>
      <section><div className="two">
        <div><h2>Benefits</h2><ul className="list">{s.benefits.map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div><h2>How we work</h2><ol className="list">{s.how.map((b) => <li key={b}>{b}</li>)}</ol></div></div>
        <div className="btns"><Link className="btn p" href="/contact">Request this service</Link></div></section>
    </div>
  );
}
