"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function Tracker() {
  const path = usePathname();
  useEffect(() => {
    if (path.startsWith("/admin")) return;
    let first = false;
    try { if (localStorage.getItem("uase_admin")) return; first = !sessionStorage.getItem("uase_s"); sessionStorage.setItem("uase_s", "1"); } catch {}
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path, ref: first ? document.referrer : "" }), keepalive: true }).catch(() => {});
  }, [path]);
  return null;
}
