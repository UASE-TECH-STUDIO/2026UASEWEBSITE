import Link from "next/link";
import { projects, services, WA, waLink } from "@/lib/data";
import { extraShots } from "@/lib/extra-shots";
import StoreButtons from "@/components/StoreButtons";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import caseData from "@/data/carstrims-case.json";

const ease: [string, string][] = [
  ["Swipe and zoom", "Galleries open full screen. Pinch, double-tap, drag and swipe, like a native app."],
  ["Voice search", "Search projects by speaking. The same feature we built into CARSTRIMS."],
  ["WhatsApp first", "Talk to us in one tap, from any page, with numbers formatted correctly."],
  ["Works on every screen", "Phones, tablets and desktops, with safe-area handling for modern devices."],
  ["Light and dark", "Follows your device theme automatically."],
  ["Fast and lean", "Built on Next.js with static pages and no clutter."],
];

export default function Home() {
  const c = projects[0];
  const more = projects.slice(1, 4);
  const shots = [...extraShots(), ...c.screenshots].slice(0, 8);
  const train = services.find((s) => /training/i.test(s.title));
  return (
    <div className="w">
      <div className="hero">
        <span className="tag mono">UASE Tech Studio Ltd · Open to jobs, contracts &amp; new projects</span>
        <h1>Your idea, problem or vision, turned into <em>software that works.</em></h1>
        <p className="lead">UASE Tech Studio Ltd is a global, remote-first company that designs, builds and launches websites, web apps and iOS &amp; Android apps for clients worldwide, and trains developers and office teams. I&apos;m USTY, the founder and lead engineer. I plan, design, build, launch and support what we ship.</p>
        <div className="btns"><Link className="btn p" href="/contact">Start a project</Link><Link className="btn" href="/projects">View projects</Link><a className="btn wa" href={waLink(WA.ng)} target="_blank" rel="noopener">WhatsApp me</a></div>
        <p className="rc" style={{ marginTop: 16 }}>UASE Tech Studio Ltd · Registered with the Corporate Affairs Commission, Nigeria (RC 9594186) · Asokoro, Abuja · Working with clients worldwide</p>
      </div>

      <section>
        <h2>Proof: a problem we turned into a live product</h2><p className="sub">CARSTRIMS, on the web, the App Store and Google Play.</p>
        <div className="case">
          <span className="tag mono">Live on the web, App Store &amp; Google Play</span>
          <h3>{c.title}</h3><p style={{ color: "var(--mute)" }}>{c.tagline}</p>
          <div className="two" style={{ margin: "18px 0" }}>
            <div className="card"><h3>The problem</h3><ul className="list">{caseData.problems.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="card"><h3>What we built</h3><ul className="list">{caseData.solutions.slice(0, 4).map(([t, d]) => <li key={t}><b>{t}.</b> {d}</li>)}</ul></div>
          </div>
          <Gallery images={shots} alt="CARSTRIMS screenshot" />
          <div className="stats">
            <div className="stat"><b>3 platforms</b><span>Web, iOS, Android</span></div>
            <div className="stat"><b>5 account types</b><span>Dealer, staff, partner, buyer, admin</span></div>
            <div className="stat"><b>Real-time</b><span>Messaging and push notifications</span></div>
          </div>
          <div className="chips">{c.technologies.map((t) => <span key={t} className="chip g">{t}</span>)}</div>
          <StoreButtons caseHref={`/projects/${c.slug}`} />
        </div>
      </section>

      <section>
        <div className="band"><h2>Have a problem, an idea or a vision?</h2>
          <p className="lead" style={{ fontSize: 16 }}>Bring it to us as it is: a rough idea, a business headache or a full vision. We help you shape it, design it, build it and launch it, so you get technology that makes life and work easier.</p>
          <div className="btns"><Link className="btn p" href="/contact">Tell us your idea</Link><a className="btn wa" href={waLink(WA.ng, "Hi, I have an idea/problem I'd like to turn into software.")} target="_blank" rel="noopener">Chat on WhatsApp</a></div></div>
      </section>

      <section><div className="band"><h2>A global company, working remotely</h2>
        <p className="lead" style={{ fontSize: 16 }}>We are not limited by location. We work remotely with clients around the world, especially in the United States. We accept payments in US dollars, and we have a US phone number and address, with our home base in Asokoro, Abuja.</p>
        <div className="btns"><a className="btn wa" href={waLink(WA.us, "Hi, I'm in the US and would like to discuss a project.")} target="_blank" rel="noopener">WhatsApp (USA)</a><a className="btn wa" href={waLink(WA.ng)} target="_blank" rel="noopener">WhatsApp (Nigeria)</a></div></div></section>

      <Process />

      <section>
        <h2>More work</h2><p className="sub">A selection from {projects.length} projects.</p>
        <div className="grid">{more.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="card pcard"><img src={p.thumbnail} alt={p.title} loading="lazy" /><h3>{p.title}</h3><p>{p.tagline}</p></Link>
        ))}</div>
        <div className="btns"><Link className="btn" href="/projects">See all projects</Link></div>
      </section>

      <section>
        <h2>We also train</h2><p className="sub">Learn to build real software with someone who ships it every day.</p>
        <div className="two"><div className="card"><p>Hands-on training for developers and for people at work: web and mobile development, MS Office, CorelDRAW, typing, Google tools, Zoom, AI tools and everyday office technology, plus SIWES and final-year project mentoring. Over 150 students have trained and been mentored with us.</p>
          {train && <ul className="list">{train.benefits.slice(0, 3).map((b) => <li key={b}>{b}</li>)}</ul>}
          <div className="btns"><Link className="btn p" href="/training">See training programs</Link></div></div>
          <div className="card"><h3>What you walk away with</h3><ul className="list"><li>Real projects for your portfolio</li><li>The same tools we use on client work</li><li>Guidance from a working engineer</li></ul></div></div>
      </section>

      <section>
        <h2>Built to be easy to use</h2><p className="sub">This site is made the way we make client apps.</p>
        <div className="grid">{ease.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section>
        <h2>Tech stack</h2><p className="sub">Current focus first, then the rest of our toolbox.</p>
        <div className="grid">
          <div className="card"><h3>Primary stack</h3><div className="chips">{["Next.js","React","TypeScript","FastAPI","Python","MongoDB Atlas","Capacitor","Zustand"].map((t)=><span key={t} className="chip g">{t}</span>)}</div></div>
          <div className="card"><h3>Mobile &amp; delivery</h3><div className="chips">{["iOS (Xcode Cloud)","Android (Play Console)","Firebase FCM","Vercel","Render","Cloudinary"].map((t)=><span key={t} className="chip">{t}</span>)}</div></div>
          <div className="card"><h3>Also experienced with</h3><div className="chips">{["Django","PHP","MySQL","Bootstrap","JavaScript","HTML / CSS"].map((t)=><span key={t} className="chip">{t}</span>)}</div></div>
        </div>
      </section>

      <section>
        <h2>What we offer</h2><p className="sub">See all {services.length} services.</p>
        <div className="grid">{services.slice(0, 3).map((s) => <div key={s.slug} className="card"><h3>{s.title}</h3><p>{s.description}</p></div>)}</div>
        <div className="btns"><Link className="btn" href="/services">All services</Link><Link className="btn p" href="/contact">Get in touch</Link></div>
      </section>
    </div>
  );
}
