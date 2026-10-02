import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import Tracker from "@/components/Tracker";
import Nav from "@/components/Nav";
import SwipeBack from "@/components/SwipeBack";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  title: "USTY — Full-Stack Web & Mobile App Developer | UASE Tech Studio Ltd",
  description: "Full-stack developer building websites, web apps and iOS/Android apps with Next.js, FastAPI, MongoDB and Capacitor. Founder of UASE Tech Studio Ltd, Abuja, working with clients worldwide.",
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
        <Tracker /><SwipeBack /><WhatsAppFab />
        <Nav />
        <main>{children}</main>
        <footer><div className="w foot"><img src="/logo-mark.png" alt="" width={28} height={28} /><div>© {new Date().getFullYear()} UASE Tech Studio Ltd · RC 9594186 · Registered with the Corporate Affairs Commission, Nigeria<br />Asokoro, Abuja, Nigeria · Serving clients worldwide, remotely · uasetechstudio@gmail.com<br /><Link href="/resources">Resources</Link> · <Link href="/nigeria">Nigeria</Link> · <Link href="/graphics">Graphics</Link></div></div></footer>
      </body>
    </html>
  );
}
