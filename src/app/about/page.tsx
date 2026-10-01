import Link from "next/link";
export const metadata = { title: "About | USTY — UASE Tech Studio" };
export default function About() {
  return (
    <div className="w"><div className="hero"><div className="about">
      <img src="/images/usty_headshot.jpg" alt="Muhammedmustapha Abdullahi (USTY)" />
      <div><h1 style={{marginTop:0}}>Hi, I&apos;m USTY.</h1>
        <p className="lead">I&apos;m Muhammedmustapha Abdullahi, a full-stack developer and founder of UASE Tech Studio Ltd in Abuja, Nigeria. My focus is building web apps and cross-platform iOS and Android apps with Next.js, TypeScript, FastAPI, MongoDB Atlas and Capacitor.</p>
        <p className="lead">I take products all the way from architecture to deployment: role-based dashboards, real-time messaging, push notifications, cloud hosting and app store submission. I also work with Django, PHP and MySQL when a project calls for them.</p>
        <div className="btns"><Link className="btn p" href="/contact">Work with me</Link><Link className="btn" href="/projects">See my work</Link></div>
      </div></div></div></div>
  );
}
