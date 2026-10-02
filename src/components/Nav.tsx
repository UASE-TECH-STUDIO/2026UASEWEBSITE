"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links: [string, string][] = [["/projects", "Projects"], ["/services", "Services"], ["/training", "Training"], ["/blog", "Blog"], ["/resume", "Resume"], ["/about", "About"], ["/contact", "Contact"]];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  return (
    <header>
      <div className="w hdr">
        <Link href="/" className="logo">
          <img src="/logo-mark.png" alt="UASE logo" width={34} height={34} />
          <span>USTY<span>.</span></span>
          <span className="mono lt">UASE Tech Studio Ltd</span>
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        <nav className={open ? "open" : ""}>
          {links.map(([h, t]) => <Link key={h} href={h} className={path.startsWith(h) ? "act" : ""}>{t}</Link>)}
        </nav>
      </div>
    </header>
  );
}
