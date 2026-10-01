import { CARSTRIMS } from "@/lib/links";

export default function StoreButtons({ caseHref }: { caseHref?: string }) {
  return (
    <div className="btns">
      <a className="btn p" href={CARSTRIMS.web} target="_blank" rel="noopener">Open web app</a>
      {CARSTRIMS.appStore && <a className="btn" href={CARSTRIMS.appStore} target="_blank" rel="noopener">Download on the App Store</a>}
      <a className="btn" href={CARSTRIMS.play} target="_blank" rel="noopener">Get it on Google Play</a>
      {caseHref && <a className="btn" href={caseHref}>Read the case study</a>}
    </div>
  );
}
