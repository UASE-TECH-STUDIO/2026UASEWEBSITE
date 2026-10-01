"use client";
import { useRef, useState } from "react";
import Lightbox from "./Lightbox";

export default function Gallery({ images, grid = false, alt = "" }: { images: string[]; grid?: boolean; alt?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  if (!images.length) return null;
  return (
    <div className="gal">
      <div ref={ref} data-noswipe className={grid ? "shots" : "strip"}>
        {images.map((s, k) => (
          <button key={s} type="button" className="thumb" onClick={() => setOpen(k)} aria-label={`Open image ${k + 1} of ${images.length}`}>
            <img src={s} alt={alt} loading="lazy" draggable={false} />
          </button>
        ))}
      </div>
      {!grid && images.length > 1 && <><button className="sn l" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button><button className="sn r" onClick={() => scroll(1)} aria-label="Scroll right">›</button></>}
      {open !== null && <Lightbox images={images} start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
