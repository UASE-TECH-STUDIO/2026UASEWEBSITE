import Link from "next/link";
import { services, WA, waLink } from "@/lib/data";
export const metadata = { title: "Training | UASE Tech Studio Ltd", description: "Hands-on training in web, mobile and IT skills, plus SIWES and final-year project mentoring, in Abuja and online." };

const tech: [string, string, string[]][] = [
  ["Web development", "Build real websites and web apps from scratch.", ["HTML, CSS, JavaScript", "React and Next.js with TypeScript", "Deploying to Vercel"]],
  ["Backend and APIs", "Learn how apps store data and talk to each other.", ["Python and FastAPI", "MongoDB databases", "Authentication and roles"]],
  ["Mobile apps (iOS and Android)", "Turn a web app into native apps from one codebase.", ["Capacitor", "Push notifications", "Publishing to Google Play and the App Store"]],
  ["UI/UX and graphic design", "Design interfaces and brand material people enjoy using.", ["UI/UX fundamentals", "CorelDRAW", "Design for web and mobile"]],
  ["SIWES and final-year projects", "Guidance from idea to a working project and a clean report.", ["Project planning and coding support", "SIWES logbooks and reports", "Presentation preparation"]],
];
const office: [string, string, string[]][] = [
  ["Microsoft Office", "Do everyday office work faster and with confidence.", ["Word: letters, reports, formatting", "Excel: tables, formulas, simple analysis", "PowerPoint: clear presentations"]],
  ["CorelDRAW and design basics", "Create flyers, logos, banners and print-ready designs.", ["CorelDRAW tools and layout", "Typography and colour", "Exporting for print and social media"]],
  ["Typing and speed", "Type accurately and quickly, the skill every office role needs.", ["Touch typing from the home row", "Speed and accuracy drills", "Progress tests along the way"]],
  ["AI tools at work", "Use AI applications to write, research and organise, and know where to be careful.", ["Writing emails, reports and summaries", "Research and brainstorming", "Checking AI answers before you rely on them"]],
  ["Online workplace tools", "Handle the tools modern offices run on.", ["Google Workspace: Docs, Sheets, Drive, Gmail", "Calendars, invitations and reminders", "Zoom, Google Meet and video-call etiquette"]],
  ["Computer basics for the workplace", "For people with office jobs who have had little time on computers.", ["Files, folders, printing and scanning", "Email, internet and online safety", "Cloud storage, PDFs and sharing documents"]],
];
const Cards = ({ items }: { items: [string, string, string[]][] }) => (
  <div className="grid">{items.map(([t, d, pts]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p><ul className="list">{pts.map((x) => <li key={x}>{x}</li>)}</ul></div>)}</div>
);

export default function Training() {
  const svc = services.find((s) => /training/i.test(s.title));
  return (
    <div className="w">
      <div className="hero"><span className="tag mono">UASE Tech Studio Ltd · Training</span>
        <h1>Learn to build <em>real software.</em></h1>
        <p className="lead">We train students, graduates, professionals and teams, from typing, MS Office and CorelDRAW to Google tools, Zoom, AI applications and full web and mobile development. Lessons are hands-on and taught by an engineer who ships real products. Over 150 students have trained and been mentored with us.</p>
        <div className="btns"><a className="btn wa" href={waLink(WA.ng, "Hi, I'd like to know about your training programs.")} target="_blank" rel="noopener">Ask about the next class on WhatsApp</a><Link className="btn" href="/contact">Send a message</Link></div></div>
      <section><h2>For work and the office</h2><p className="sub">Practical skills for anyone who works with computers, from first-timers to busy professionals. No technical background needed.</p>
        <Cards items={office} /></section>
      <section><h2>For developers and designers</h2><p className="sub">Learn to build real software and design. Tell us your level and goal, and we shape the plan around you.</p>
        <Cards items={tech} /></section>
      {svc && <section><div className="two">
        <div><h2>Why train with us</h2><ul className="list">{svc.benefits.map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div><h2>How it works</h2><ol className="list">{svc.how.map((b) => <li key={b}>{b}</li>)}</ol></div></div></section>}
      <section><div className="band"><h2>Training for your team or school</h2><p className="lead" style={{ fontSize: 16 }}>We can run a program for your staff, class or community group, on site in Asokoro, Abuja or online, anywhere in the world.</p>
        <div className="btns"><a className="btn wa" href={waLink(WA.ng, "Hi, I'd like to arrange training for my team/school.")} target="_blank" rel="noopener">Chat on WhatsApp</a><Link className="btn" href="/projects/3-month-training-website">See a training project we built</Link></div></div></section>
    </div>
  );
}
