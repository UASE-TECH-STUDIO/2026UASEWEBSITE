"use client";
import { usePathname } from "next/navigation";
import { WA, waLink } from "@/lib/data";

export default function WhatsAppFab() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <a className="fab" href={waLink(WA.ng, `Hi USTY, I'm on your website (${path}) and would like to talk.`)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true"><path d="M16 4C9.4 4 4 9 4 15.2c0 2.3.8 4.5 2.2 6.3L5 27l5.7-1.7c1.6.8 3.4 1.2 5.3 1.2 6.6 0 12-5 12-11.3S22.6 4 16 4z"/><path fill="#25d366" d="M12 11.5c.3-.5.6-.5 1-.5l.6 1.400c.1.300-.4.800-.6 1 .6 1.200 1.600 2.100 2.800 2.700.3-.3.700-.9 1.100-.8l1.400.7c0 .5-.2 1.100-.7 1.400-.8.500-2.100.2-3.600-.7-1.700-1-3-2.700-3.300-4-.1-.6.100-1.100.3-1.200z"/></svg>
    </a>
  );
}
