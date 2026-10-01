import Link from "next/link";
import { services, WA, waLink } from "@/lib/data";
export const metadata = { title: "Training | UASE Tech Studio Ltd", description: "Hands-on training in web, mobile and IT skills, plus SIWES and final-year project mentoring, in Abuja and online." };

const programs: [string, string, string[]][] = [
  ["Web development", "Build real websites and web apps from scratch.", ["HTML, CSS, JavaScript", "React and Next.js with TypeScript", "Deploying to Vercel"]],
  ["Backend and APIs", "Learn how apps store data and talk to each other.", ["Python and FastAPI", "MongoDB databases", "Authentication and roles"]],
  ["Mobile apps (iOS and Android)", "Turn a web app into native apps with one codebase.", ["Capacitor", "Push notifications", "Publishing to Google Play and the App Store"]],
  ["UI/UX and graphic design", "Design interfaces and brand material people enjoy using.", ["UI/UX fundamentals", "CorelDRAW", "Design for web and mobile"]],
  ["IT skills and MS Office", "The everyday digital skills every workplace expects.", ["Microsoft Office", "Computer and internet basics", "Productivity and documentation"]],
  ["SIWES and final-year projects", "Guidance from idea to a working project and a clean report.", ["Project planning and coding support", "SIWES logbooks and reports", "Presentation preparation"]],
];

export default function Training() {
  const svc = services.find((s) => /training/i.test(s.title));
  return (
    <div className="w">
      <div className="hero"><span className="tag mono">UASE Tech Studio Ltd · Training</span>
        <h1>Learn to build <em>real software.</em></h1>
        <p className="lead">We train students, graduates and teams with hands-on lessons taught by an engineer who ships web and mobile products every day. Over 150 students have trained and been mentored with us.</p>
        <div className="btns"><a className="btn wa" href={waLink(WA.ng, "Hi, I'd like to know about your training programs.")} target="_blank" rel="noopener">Ask about the next class on WhatsApp</a><Link className="btn" href="/contact">Send a message</Link></div></div>
      <section><h2>Programs</h2><p className="sub">Tell us your level and goal, and we shape the plan around you.</p>
        <div className="grid">{programs.map(([t, d, pts]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p><ul className="list">{pts.map((x) => <li key={x}>{x}</li>)}</ul></div>)}</div></section>
      {svc && <section><div className="two">
        <div><h2>Why train with us</h2><ul className="list">{svc.benefits.map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div><h2>How it works</h2><ol className="list">{svc.how.map((b) => <li key={b}>{b}</li>)}</ol></div></div></section>}
      <section><div className="band"><h2>Training for your team or school</h2><p className="lead" style={{ fontSize: 16 }}>We can run a program for your staff, class or community group, on site in Abuja or online.</p>
        <div className="btns"><a className="btn wa" href={waLink(WA.ng, "Hi, I'd like to arrange training for my team/school.")} target="_blank" rel="noopener">Chat on WhatsApp</a><Link className="btn" href="/projects/3-month-training-website">See a training project we built</Link></div></div></section>
    </div>
  );
}
