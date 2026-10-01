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
  { role: "Founder & Lead Engineer — UASE Tech Studio Ltd (RC 9594186)", when: "2020 – Present", where: "Remote / Hybrid, Nigeria", pts: [
    "Architected and delivered 12+ production systems for healthcare, judiciary, automotive and logistics clients.",
    "Built CARSTRIMS end to end: a multi-role vehicle marketplace on Next.js, FastAPI and MongoDB Atlas, live on the web, the App Store and Google Play.",
    "Shipped native iOS and Android apps from one Next.js codebase with Capacitor, including push notifications (FCM V1), real-time messaging and store submission.",
    "Engineered BloodLink, a healthcare platform with automated email workflows, real-time donor matching and admin coordination.",
    "Implemented a Facade-pattern service layer for scalable email and API management across production systems.",
    "Mentored 150+ students on SIWES and final-year software projects across Nigerian universities." ] },
  { role: "Technical IT Assistant — Edge Meter / T4U / Sunstar", when: "2021 – 2023", where: "Contract consulting", pts: [
    "Consulted on technical documentation and system audits for AY Global Integrated Services.",
    "Designed secure data-handling procedures for institutional engineering audits.",
    "Delivered Solar/Starlink integration projects to close connectivity gaps." ] },
  { role: "IT Instructor — Heritage Computers / Ligo Computers", when: "2016 – 2020", where: "Zaria, Nigeria", pts: [
    "Trained 150+ students in MS Office, CorelDRAW and UI/UX design fundamentals.",
    "Developed and delivered structured curriculum for computing diploma programmes." ] },
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
          <p className="lead" style={{fontSize:16}}>Full-stack engineer with a 10-year IT background and full-stack development since 2020. I build web apps and cross-platform iOS and Android apps on Next.js, TypeScript, FastAPI and MongoDB Atlas, and take them from planning and architecture to the App Store, Google Play and production. Founder of UASE Tech Studio, delivering systems across healthcare, judiciary, automotive and logistics. My IT administration and teaching background helps me build software that is operationally efficient and commercially viable.</p>
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
