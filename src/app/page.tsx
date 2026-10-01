import Link from "next/link";
import { projects, services, WA, waLink } from "@/lib/data";
import { extraShots } from "@/lib/extra-shots";
import StoreButtons from "@/components/StoreButtons";
import Process from "@/components/Process";

export default function Home() {
  const c = projects[0];
  const more = projects.slice(1, 4);
  return (
    <div className="w">
      <div className="hero">
        <span className="tag mono">Open to jobs, contracts &amp; new projects</span>
        <h1>Full-stack <em>web</em> &amp; <em>iOS / Android</em> apps, built to ship.</h1>
        <p className="lead">I&apos;m Muhammedmustapha Abdullahi (USTY), a full-stack developer and founder of UASE Tech Studio in Abuja. I build websites, web apps and mobile apps end to end with Next.js, FastAPI, MongoDB and Capacitor, from idea to the App Store, Play Store and production.</p>
        <div className="btns"><Link className="btn p" href="/contact">Hire me</Link><Link className="btn" href="/projects">View projects</Link><a className="btn wa" href={waLink(WA.ng)} target="_blank" rel="noopener">WhatsApp me</a></div>
      </div>

      <section>
        <h2>Flagship project</h2><p className="sub">One codebase, three platforms.</p>
        <div className="case">
          <span className="tag mono">Live on the web, App Store &amp; Google Play</span>
          <h3>{c.title}</h3><p style={{color:"var(--mute)"}}>{c.tagline}</p>
          <div className="stats">
            <div className="stat"><b>3 platforms</b><span>Web, iOS, Android</span></div>
            <div className="stat"><b>5 roles</b><span>Admin, dealer, partner, staff, buyer</span></div>
            <div className="stat"><b>Real-time</b><span>Messaging + push notifications</span></div>
          </div>
          <div className="shots">{[...extraShots(), ...c.screenshots].slice(0, 3).map((s) => <img key={s} src={s} alt="" loading="lazy" />)}</div>
          <div className="chips">{c.technologies.map((t) => <span key={t} className="chip g">{t}</span>)}</div>
          <StoreButtons caseHref={`/projects/${c.slug}`} />
        </div>
      </section>

      <Process />

      <section>
        <h2>More work</h2><p className="sub">A selection from {projects.length} projects.</p>
        <div className="grid">{more.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="card pcard"><img src={p.thumbnail} alt={p.title} loading="lazy" /><h3>{p.title}</h3><p>{p.tagline}</p></Link>
        ))}</div>
        <div className="btns"><Link className="btn" href="/projects">See all projects</Link></div>
      </section>

      <section>
        <h2>Tech stack</h2><p className="sub">Current focus first, then the rest of my toolbox.</p>
        <div className="grid">
          <div className="card"><h3>Primary stack</h3><div className="chips">{["Next.js","React","TypeScript","FastAPI","Python","MongoDB Atlas","Capacitor","Zustand"].map((t)=><span key={t} className="chip g">{t}</span>)}</div></div>
          <div className="card"><h3>Mobile &amp; delivery</h3><div className="chips">{["iOS (Xcode Cloud)","Android (Play Console)","Firebase FCM","Vercel","Render","Cloudinary"].map((t)=><span key={t} className="chip">{t}</span>)}</div></div>
          <div className="card"><h3>Also experienced with</h3><div className="chips">{["Django","PHP","MySQL","Bootstrap","JavaScript","HTML / CSS"].map((t)=><span key={t} className="chip">{t}</span>)}</div></div>
        </div>
      </section>

      <section>
        <h2>What I offer</h2><p className="sub">See all {services.length} services.</p>
        <div className="grid">{services.slice(0, 3).map((s) => <div key={s.slug} className="card"><h3>{s.title}</h3><p>{s.description}</p></div>)}</div>
        <div className="btns"><Link className="btn" href="/services">All services</Link><Link className="btn p" href="/contact">Get in touch</Link></div>
      </section>
    </div>
  );
}
