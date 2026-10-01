"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type T = { s: number; x: number; y: number };
const ONE: T = { s: 1, x: 0, y: 0 };
const clamp = (s: number) => Math.min(5, Math.max(1, s));

export default function Lightbox({ images, start, onClose }: { images: string[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start), [t, setT] = useState<T>(ONE);
  const ptrs = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ d: number; s: number } | null>(null);
  const sw = useRef({ x: 0, y: 0, moved: false });
  const last = useRef(0);
  const n = images.length;
  const go = useCallback((d: number) => { setI((v) => (v + d + n) % n); setT(ONE); }, [n]);
  const zoom = (d: number) => setT((v) => { const s = clamp(v.s + d); return { s, x: s === 1 ? 0 : v.x, y: s === 1 ? 0 : v.y }; });

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") zoom(0.5);
      else if (e.key === "-") zoom(-0.5);
    };
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [go, onClose]);

  const dist = () => { const p = [...ptrs.current.values()]; return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); };
  const down = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.current.size === 2) { pinch.current = { d: dist(), s: t.s }; return; }
    sw.current = { x: e.clientX, y: e.clientY, moved: false };
    const now = Date.now();
    if (now - last.current < 280 && e.target instanceof HTMLImageElement) setT((v) => (v.s > 1 ? ONE : { s: 2.5, x: 0, y: 0 }));
    last.current = now;
  };
  const move = (e: React.PointerEvent) => {
    const p = ptrs.current.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.current.size === 2 && pinch.current) {
      const s = clamp((pinch.current.s * dist()) / pinch.current.d);
      setT((v) => ({ s, x: s === 1 ? 0 : v.x, y: s === 1 ? 0 : v.y }));
    } else if (t.s > 1) setT((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    if (Math.abs(e.clientX - sw.current.x) > 8 || Math.abs(e.clientY - sw.current.y) > 8) sw.current.moved = true;
  };
  const up = (e: React.PointerEvent) => {
    ptrs.current.delete(e.pointerId); pinch.current = null;
    if (t.s === 1 && ptrs.current.size === 0) {
      const dx = e.clientX - sw.current.x, dy = e.clientY - sw.current.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      else if (dy > 110) onClose();
    }
  };
  const wheel = (e: React.WheelEvent) => zoom(-e.deltaY * 0.002);

  return (
    <div className="lb" data-noswipe role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="lb-bar"><span className="mono">{i + 1} / {n}</span>
        <div><button onClick={() => zoom(0.5)} aria-label="Zoom in">＋</button><button onClick={() => zoom(-0.5)} aria-label="Zoom out">－</button><button onClick={onClose} aria-label="Close">✕</button></div></div>
      <div className="lb-stage" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onWheel={wheel}
        onClick={(e) => { if (e.target === e.currentTarget && !sw.current.moved) onClose(); }}>
        <img src={images[i]} alt="" draggable={false} style={{ transform: `translate(${t.x}px,${t.y}px) scale(${t.s})`, transition: ptrs.current.size ? "none" : "transform .15s" }} />
      </div>
      {n > 1 && <><button className="lb-nav l" onClick={() => go(-1)} aria-label="Previous">‹</button><button className="lb-nav r" onClick={() => go(1)} aria-label="Next">›</button></>}
      <p className="lb-hint mono">Pinch or double-tap to zoom · swipe to browse · swipe down to close</p>
    </div>
  );
}
