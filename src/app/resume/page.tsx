import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { EMAIL, LINKEDIN, WA, waLink } from "@/lib/data";
export const metadata = { title: "Resume | Muhammedmustapha Abdullahi (USTY) — Full-Stack Web & Mobile Developer" };

const skills: [string, string[]][] = [
  ["Core stack", ["Next.js", "React", "TypeScript", "FastAPI", "Python", "MongoDB Atlas", "Capacitor (iOS + Android)", "REST APIs", "Zustand", "Tailwind CSS", "Firebase FCM", "Git / CI-CD", "Vercel", "Render", "Cloudinary"]],
  ["Also skilled in", ["Django", "PostgreSQL", "MySQL", "PHP", "Node.js", "Docker", "IT administration", "System design", "SEO", "Graphic design", "CorelDRAW", "MS Office", "Solar / Starlink"]],
  ["Patterns", ["MVC", "Facade", "Singleton", "Observer", "Adapter", "Repository", "Scrum"]],
  ["Languages", ["English (C1 Advanced)", "Hausa (native)"]],
];
const jobs = [
  { role: "Founder & Lead Software Engineer — UASE Tech Studio Ltd (RC 9594186)", when: "Jun 2026 – Present", where: "Abuja, Nigeria · Remote worldwide", pts: [
    "Registered UASE Tech Studio Ltd as a stand-alone software company, separate from the enterprise's other businesses, to take on complete software projects for clients worldwide.",
    "Led CARSTRIMS from the client's problem to launch: planning, architecture, design, build, testing and release of a multi-role marketplace (dealer, staff, partner, buyer, super admin) on Next.js, FastAPI and MongoDB Atlas, live on the web, the App Store and Google Play.",
    "Shipped native iOS and Android apps from one Next.js codebase with Capacitor, including push notifications (FCM V1), real-time messaging, store submission and device-specific fixes.",
    "Rebuilt the company site, uase.tech, in the same stack: blog, admin dashboard, visitor analytics, contact system and a responsive, mobile-first interface.",
    "Run training for developers and office teams; bill international clients in US dollars." ] },
  { role: "Founder & Lead Developer — USTY Alhaji Service Enterprise", when: "2024 – 2026", where: "CAC-registered business trading under the UASE brand · Abuja", pts: [
    "Moved from working as an individual developer to running a registered business, delivering complete software systems for clients instead of isolated components.",
    "Delivered systems for healthcare, judiciary, automotive and logistics clients, including BloodLink and a Court Order Management System.",
    "Implemented a Facade-pattern service layer for scalable email and API management.",
    "Mentored 150+ students on SIWES and final-year software projects across Nigerian universities." ] },
  { role: "Independent Full-Stack Developer", when: "2020 – 2024", where: "Nigeria · Remote", pts: [
    "Started coding in 2020 and progressed from small learning projects to full client systems.",
    "Built with Django, PostgreSQL, MySQL, PHP, JavaScript and Bootstrap before moving to the Next.js and FastAPI stack." ] },
  { role: "Technical IT Assistant — Edge Meter / T4U / Sunstar", when: "2021 – 2023", where: "Contract consulting", pts: [
    "Technical documentation and system audits for AY Global Integrated Services; secure data-handling procedures for institutional engineering audits.",
    "Delivered Solar/Starlink integration projects to close connectivity gaps." ] },
  { role: "IT Instructor — Heritage Computers / Ligo Computers", when: "2016 – 2020", where: "Zaria, Nigeria", pts: [
    "Trained 150+ students in MS Office, CorelDRAW and UI/UX fundamentals; developed and delivered structured diploma curriculum." ] },
];
const featured = [
  ["CARSTRIMS — Vehicle Marketplace (Web + iOS + Android)", "carstrims-car-dealer-platform", "Multi-role marketplace and dealer platform with 5 user roles, inventory, sales, financial reports, real-time messaging and push notifications.", ["Next.js", "FastAPI", "MongoDB Atlas", "Capacitor"]],
  ["BloodLink — Blood Donor Platform", "bloodlink-blood-donor-management", "Healthcare platform connecting donors, beneficiaries and admins with automated email and real-time matching.", ["Next.js", "MongoDB", "NextAuth", "Resend"]],
  ["Court Order Management System", "court-order-management-system", "Secure platform for issuing and tracking digital court orders across legal institutions.", ["Django", "PostgreSQL", "Python"]],
  ["Food Ordering App", "food-ordering-app", "Multi-vendor food platform with real-time tracking, converted to a native Android app with Capacitor.", ["React", "Node.js", "Capacitor"]],
] as const;

export default function Resume() {
  return (
    <div className="w"><div className="hero" style={{paddingBottom:24}}>
      <span className="tag mono">Resume &amp; CV</span>
      <h1 style={{fontSize:"clamp(30px,5vw,46px)"}}>Muhammedmustapha Abdullahi (USTY)</h1>
      <p className="lead">Full-stack web &amp; mobile developer · Founder, UASE Tech Studio · BSc Computer Science, ABU Zaria · Remote-ready</p>
      <div className="btns noprint">
        <a className="btn p" href="/downloads/usty-cv.pdf" download>Download CV (PDF)</a>
        <PrintButton />
      </div></div>
      <div className="rs">
        <aside>
          <div className="card" style={{marginBottom:16}}><h3>Contact</h3>
            <p className="meta">Remote — Nigeria &amp; USA</p>
            <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p><p><a href={waLink(WA.ng)} target="_blank" rel="noopener">WhatsApp (Nigeria)</a></p><p><a href={waLink(WA.us)} target="_blank" rel="noopener">WhatsApp (USA)</a></p>
            <p><a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a></p></div>
          {skills.map(([t, l]) => <div key={t} className="card" style={{marginBottom:16}}><h3>{t}</h3><div className="chips">{l.map((x) => <span key={x} className={"chip" + (t === "Core stack" ? " g" : "")}>{x}</span>)}</div></div>)}
        </aside>
        <div>
          <h2>Professional summary</h2>
          <p className="lead" style={{fontSize:16}}>Full-stack developer since 2020 and founder of a software company: trading under the UASE brand since 2024 and incorporated as UASE Tech Studio Ltd in 2026. I take whole products from a client&apos;s problem to the App Store, Google Play and production, covering planning, architecture, design, build, testing, launch and ongoing upgrades. Core stack: Next.js, TypeScript, FastAPI, MongoDB Atlas and Capacitor (iOS + Android). Hire me as a developer, or engage UASE Tech Studio Ltd as your software team.</p>
          <h2 style={{marginTop:32}}>Experience</h2>
          {jobs.map((j) => <div key={j.role} className="job card"><h3>{j.role}</h3><p className="meta">{j.when} · {j.where}</p><ul className="list">{j.pts.map((p) => <li key={p}>{p}</li>)}</ul></div>)}
          <h2 style={{marginTop:32}}>Featured projects</h2>
          <div className="two">{featured.map(([t, s, d, tech]) => (
            <Link key={s} href={`/projects/${s}`} className="card pcard"><h3>{t}</h3><p>{d}</p><div className="chips">{tech.map((x) => <span key={x} className="chip">{x}</span>)}</div></Link>))}</div>
          <h2 style={{marginTop:32}}>Education &amp; credentials</h2>
          <ul className="list"><li>BSc Computer Science — Ahmadu Bello University (ABU), Zaria</li><li>Full-Stack Software Development — Brotech Institute (certified)</li><li>English Proficiency C1 Advanced — EF SET score 68/100</li><li>Diploma in Computing — Heritage Computers, Zaria</li></ul>
        </div></div></div>
  );
}
