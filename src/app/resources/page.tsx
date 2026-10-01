import { apiGet } from "@/lib/api";
import { API } from "@/lib/data";
export const revalidate = 60;
export const metadata = { title: "Resources | USTY — UASE Tech Studio" };
type R = { id: string; title: string; description: string; category: string; filename: string; size: number; downloads: number };
export default async function Resources() {
  const items = (await apiGet<R[]>("/api/resources")) || [];
  return (
    <div className="w"><div className="hero" style={{ paddingBottom: 20 }}><h1>Resources</h1><p className="lead">Free guides, templates and files from UASE Tech Studio.</p></div>
      {items.length === 0 && <p className="sub">New resources are coming soon.</p>}
      <div className="grid">{items.map((r) => (
        <div key={r.id} className="card"><span className="chip g">{r.category}</span><h3 style={{ marginTop: 10 }}>{r.title}</h3><p>{r.description}</p>
          <p className="mono" style={{ fontSize: 12 }}>{r.filename} · {(r.size / 1048576).toFixed(1)} MB · {r.downloads} downloads</p>
          <a className="btn p" href={`${API}/api/resources/${r.id}/download`}>Download</a></div>))}</div></div>
  );
}
