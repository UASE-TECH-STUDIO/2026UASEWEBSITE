import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import Tracker from "@/components/Tracker";

export const metadata: Metadata = {
  title: "USTY — Full-Stack Web & Mobile App Developer | UASE Tech Studio",
  description: "Full-stack developer building websites, web apps and iOS/Android apps with Next.js, FastAPI, MongoDB and Capacitor. Founder of UASE Tech Studio, Abuja.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=DM+Mono:wght@400;500&display=swap" />
      </head>
      <body>
        <Tracker />
        <header><div className="w">
          <Link href="/" className="logo">USTY<span>.</span> <span className="mono" style={{fontSize:12,color:"var(--mute)",fontWeight:400}}>UASE Tech Studio</span></Link>
          <nav><Link href="/projects">Projects</Link><Link href="/services">Services</Link><Link href="/blog">Blog</Link><Link href="/resume">Resume</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
        </div></header>
        <main>{children}</main>
        <footer><div className="w">© {new Date().getFullYear()} UASE Tech Studio Ltd · Kpaduma 1, Asokoro Extension, Abuja, Nigeria · uasetechstudio@gmail.com · <Link href="/resources">Resources</Link> · <Link href="/nigeria">Nigeria</Link> · <Link href="/graphics">Graphics</Link></div></footer>
      </body>
    </html>
  );
}
