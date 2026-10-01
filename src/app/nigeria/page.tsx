import Link from "next/link";
import n from "@/data/nigeria.json";
import { waLink, WA } from "@/lib/data";
export const metadata = { title: "UASE Technology Nigeria — IT Consultancy & On-site Support", description: "IT consultancy, technical problem-solving, networking and training in Abuja, Nigeria." };
export default function Nigeria() {
  return (
    <div className="w">
      <div className="hero"><span className="tag mono">UASE Technology · Nigeria</span>
        <h1>Solving IT problems. <em>Powering innovation.</em></h1>
        <p className="lead">UASE Technology is the Nigerian arm of the UASE family: practical IT consultancy, local implementation and training, working with UASE Tech Studio for design and development. Based in Asokoro &amp; Lifecamp, Abuja.</p>
        <div className="btns"><a className="btn wa" href={waLink(WA.nigeria, "Hello UASE Technology, I need IT support.")} target="_blank" rel="noopener">Chat on WhatsApp</a><Link className="btn" href="/contact">Send a message</Link></div></div>
      <section><h2>Services</h2><p className="sub">IT consultancy, problem-solving and implementation.</p>
        <div className="grid">{n.services.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}</div></section>
      <section><h2>Case studies</h2><p className="sub">How we&apos;ve helped clients solve real problems.</p>
        <div className="two">{n.cases.map((c) => (
          <div key={c.title} className="card"><span className="chip g">{c.type}</span><h3 style={{ marginTop: 10 }}>{c.title}</h3>
            <p><b>Problem:</b> {c.problem}</p><p><b>Solution:</b> {c.solution}</p><p><b>Outcome:</b> {c.outcome}</p></div>))}</div></section>
      <section><h2>About &amp; values</h2><p className="lead" style={{ fontSize: 16 }}>Our mission is to deliver accessible, reliable and innovative IT consultancy services across Nigeria, and to grow into Africa&apos;s leading IT consultancy and solutions firm.</p>
        <div className="grid">{n.values.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}</div></section>
      <section><h2>Global design, local delivery</h2><p className="lead" style={{ fontSize: 16 }}>We combine UASE Tech Studio&apos;s engineering with local compliance and on-site support, and we welcome developers, designers, IT specialists and companies who want to collaborate.</p>
        <div className="btns"><a className="btn wa" href={waLink(WA.nigeria, "Hello, I'd like to join the UASE partnership network.")} target="_blank" rel="noopener">Join our partnership network</a>
          <a className="btn" href="mailto:ustyventures@gmail.com">ustyventures@gmail.com</a></div></section>
    </div>
  );
}
