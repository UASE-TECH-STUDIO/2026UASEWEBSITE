"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// iPhone-style edge swipe: drag from the left edge to go back, from the right edge to go forward.
export default function SwipeBack() {
  const path = usePathname();
  const pathRef = useRef(path);
  const [hint, setHint] = useState<"" | "back" | "fwd">("");
  useEffect(() => { pathRef.current = path; }, [path]);
  useEffect(() => {
    let st: { x: number; y: number; m: "back" | "fwd" } | null = null;
    const start = (e: TouchEvent) => {
      const t = e.touches[0];
      if (e.touches.length !== 1 || (e.target as HTMLElement)?.closest?.("[data-noswipe]")) { st = null; return; }
      const edge = 28;
      st = t.clientX < edge ? { x: t.clientX, y: t.clientY, m: "back" } : t.clientX > window.innerWidth - edge ? { x: t.clientX, y: t.clientY, m: "fwd" } : null;
    };
    const end = (e: TouchEvent) => {
      if (!st) return;
      const t = e.changedTouches[0], dx = t.clientX - st.x, dy = Math.abs(t.clientY - st.y);
      if (dy < 70) {
        if (st.m === "back" && dx > 90 && pathRef.current !== "/") { setHint("back"); history.back(); }
        else if (st.m === "fwd" && dx < -90) { setHint("fwd"); history.forward(); }
      }
      st = null; setTimeout(() => setHint(""), 350);
    };
    const cancel = () => { st = null; };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    window.addEventListener("touchcancel", cancel, { passive: true });
    return () => { window.removeEventListener("touchstart", start); window.removeEventListener("touchend", end); window.removeEventListener("touchcancel", cancel); };
  }, []);
  return hint ? <div className={"swipehint " + hint} aria-hidden="true">{hint === "back" ? "‹" : "›"}</div> : null;
}
