"use client";
import { useCallback, useEffect, useState } from "react";
import { API } from "@/lib/data";

type Api = (p: string, o?: RequestInit) => Promise<any>;
const toProxy = (p: string) => "/api/backend/" + p.replace(/^\/api\//, "");
const friendly = (m: string) => (/failed to fetch|networkerror|load failed/i.test(m) ? "Can't reach the server. If it was idle, wait a minute and try again." : m);
const cn = (c: string) => { if (c.length !== 2) return c; try { return new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c; } catch { return c; } };

export default function Admin() {
  const [tok, setTok] = useState(""), [pw, setPw] = useState(""), [err, setErr] = useState(""), [tab, setTab] = useState("analytics");
  const [show, setShow] = useState(false), [status, setStatus] = useState(""), [busy, setBusy] = useState(false);
  useEffect(() => { if (tok) return; setStatus("Checking server…"); fetch("/api/backend/health").then(async (r) => { const d = await r.json().catch(() => ({})); setStatus(r.ok ? "Server online" : d.detail || "Server not reachable"); }).catch(() => setStatus("Server not reachable")); }, [tok]);
  useEffect(() => { const t = sessionStorage.getItem("uase_tok"); if (t) setTok(t); }, []);
  const out = () => { sessionStorage.removeItem("uase_tok"); setTok(""); };
  const api: Api = useCallback(async (p, o = {}) => {
    const big = o.body instanceof FormData && [...o.body.values()].some((v) => typeof v !== "string" && v.size > 4 * 1024 * 1024); // big uploads go direct (proxy limit is ~4.5MB)
    let r: Response;
    try { r = await fetch(big ? API + p : toProxy(p), { ...o, headers: { ...(o.body instanceof FormData ? {} : { "Content-Type": "application/json" }), Authorization: "Bearer " + tok } }); }
    catch (e: any) { throw new Error(friendly(e.message || "")); }
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { if (r.status === 401) out(); throw new Error(typeof d.detail === "string" ? d.detail : r.statusText); }
    return d;
  }, [tok]);
  async function login(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const r = await fetch(toProxy("/api/admin/login"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw.trim() }) });
      const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(typeof d.detail === "string" ? d.detail : "Login failed");
      sessionStorage.setItem("uase_tok", d.token); localStorage.setItem("uase_admin", "1"); setTok(d.token); setPw("");
    } catch (x: any) { setErr(friendly(x.message || "Login failed")); }
    setBusy(false);
  }
  if (!tok) return (
    <div className="w"><div className="hero"><h1 style={{ fontSize: 36 }}>Admin</h1>
      <form onSubmit={login} className="card form">
        <div className="pwrow"><input type={show ? "text" : "password"} placeholder="Admin password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" autoCapitalize="none" autoCorrect="off" spellCheck={false} required />
          <button type="button" className="micbtn" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>{show ? "Hide" : "Show"}</button></div>
        <button className="btn p" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>{err && <p className="bad">{err}</p>}
        <p className="rc">{status}</p></form></div></div>
  );
  return (
    <div className="w adm"><div className="hero" style={{ paddingBottom: 12 }}><h1 style={{ fontSize: 34 }}>Admin</h1>
      <div className="chips">{["analytics", "messages", "posts", "resources", "comments"].map((t) => <button key={t} className={"chip btnchip" + (tab === t ? " g" : "")} onClick={() => setTab(t)}>{t}</button>)}
        <button className="chip btnchip" onClick={out}>log out</button></div></div>
      {tab === "analytics" && <Analytics api={api} />}{tab === "messages" && <Messages api={api} />}{tab === "posts" && <Posts api={api} />}
      {tab === "resources" && <Resources api={api} />}{tab === "comments" && <Comments api={api} />}</div>
  );
}

function Analytics({ api }: { api: Api }) {
  const [days, setDays] = useState(30), [d, setD] = useState<any>(null), [err, setErr] = useState("");
  useEffect(() => { setD(null); setErr(""); api(`/api/admin/analytics?days=${days}`).then(setD).catch((e) => setErr(e.message)); }, [days, api]);
  if (err) return <p className="bad">{err}</p>;
  if (!d) return <p className="sub">Loading…</p>;
  const mx = Math.max(1, ...d.daily.map((x: any) => x.views)), hx = Math.max(1, ...d.hours);
  const Top = ({ t, rows, c }: { t: string; rows: any[]; c?: boolean }) => (
    <div className="card"><h3>{t}</h3>{rows.length === 0 && <p>No data yet</p>}{rows.map((r) => (
      <div key={r.name} className="bar"><span>{c ? cn(r.name) : r.name}</span><i style={{ width: `${Math.max(3, (r.views / rows[0].views) * 100)}%` }} /><b>{r.views}</b></div>))}</div>
  );
  return (
    <div>
      <div className="chips" style={{ marginBottom: 14 }}>{[7, 30, 90].map((n) => <button key={n} className={"chip btnchip" + (days === n ? " g" : "")} onClick={() => setDays(n)}>Last {n} days</button>)}</div>
      <div className="stats"><div className="stat"><b>{d.views}</b><span>Page views</span></div><div className="stat"><b>{d.visitors}</b><span>Unique visitors</span></div></div>
      <div className="card" style={{ marginBottom: 16 }}><h3>Views per day (Lagos time)</h3>
        <div className="cols">{d.daily.map((x: any) => <div key={x.day} title={`${x.day}: ${x.views} views, ${x.visitors} visitors`} style={{ height: `${(x.views / mx) * 100}%` }} />)}</div></div>
      <div className="card" style={{ marginBottom: 16 }}><h3>Busiest hours (Lagos time, 0–23)</h3>
        <div className="cols">{d.hours.map((v: number, h: number) => <div key={h} title={`${h}:00 — ${v} views`} style={{ height: `${(v / hx) * 100}%` }} />)}</div></div>
      <div className="two"><Top t="Countries" rows={d.countries} c /><Top t="Cities" rows={d.places} /><Top t="Where they came from" rows={d.referrers} /><Top t="Top pages" rows={d.pages} /><Top t="Devices" rows={d.devices} /></div>
      <div className="card" style={{ marginTop: 16, overflowX: "auto" }}><h3>Recent visits (your device&apos;s time)</h3>
        <table><tbody>{d.recent.map((r: any, i: number) => <tr key={i}><td>{new Date(r.ts).toLocaleString()}</td><td>{r.place}</td><td>{r.path}</td><td>{r.ref}</td><td>{r.device}</td></tr>)}</tbody></table></div>
    </div>
  );
}

const blank = { id: "", title: "", excerpt: "", content: "", cover: "", tags: "", published: true };
function Posts({ api }: { api: Api }) {
  const [list, setList] = useState<any[]>([]), [f, setF] = useState<any>(null), [msg, setMsg] = useState("");
  const load = useCallback(() => api("/api/admin/posts").then(setList).catch((e) => setMsg(e.message)), [api]);
  useEffect(() => { load(); }, [load]);
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  async function save(e: React.FormEvent) {
    e.preventDefault(); setMsg("");
    const body = JSON.stringify({ title: f.title, excerpt: f.excerpt, content: f.content, cover: f.cover, published: f.published, tags: f.tags.split(",").map((x: string) => x.trim()).filter(Boolean) });
    try { await api(f.id ? `/api/admin/posts/${f.id}` : "/api/admin/posts", { method: f.id ? "PUT" : "POST", body }); setF(null); load(); } catch (x: any) { setMsg(x.message); }
  }
  async function upload(file: File | undefined, cover: boolean) {
    if (!file) return; const fd = new FormData(); fd.append("file", file); setMsg("Uploading…");
    try { const r = await api("/api/admin/upload", { method: "POST", body: fd }); setMsg("Uploaded"); cover ? set("cover", r.url) : set("content", f.content + `\n\n![](${r.url})\n`); } catch (x: any) { setMsg(x.message); }
  }
  if (f) return (
    <form onSubmit={save} className="card form" style={{ maxWidth: 820 }}>
      <input placeholder="Title" value={f.title} onChange={(e) => set("title", e.target.value)} required />
      <input placeholder="Short summary" value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
      <input placeholder="Tags, comma separated" value={f.tags} onChange={(e) => set("tags", e.target.value)} />
      <input placeholder="Cover image URL (or upload below)" value={f.cover} onChange={(e) => set("cover", e.target.value)} />
      <label>Upload cover: <input type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0], true)} /></label>
      <textarea placeholder="Write in Markdown: # Heading, **bold**, - lists, [link](https://…)" rows={16} value={f.content} onChange={(e) => set("content", e.target.value)} />
      <label>Insert image into post: <input type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0], false)} /></label>
      <label><input type="checkbox" checked={f.published} onChange={(e) => set("published", e.target.checked)} /> Published</label>
      <div className="btns" style={{ marginTop: 0 }}><button className="btn p">Save</button><button type="button" className="btn" onClick={() => setF(null)}>Cancel</button></div>{msg && <p>{msg}</p>}
    </form>
  );
  return (
    <div><button className="btn p" onClick={() => setF({ ...blank })}>New post</button>{msg && <p className="bad">{msg}</p>}
      {list.map((p) => (
        <div key={p.id} className="card" style={{ marginTop: 12 }}><h3>{p.title} {!p.published && <span className="chip">draft</span>}</h3><p>/blog/{p.slug}</p>
          <div className="btns" style={{ marginTop: 6 }}><button className="btn" onClick={() => setF({ ...p, tags: (p.tags || []).join(", ") })}>Edit</button>
            <button className="btn" onClick={async () => { if (confirm("Delete this post and its comments?")) { await api(`/api/admin/posts/${p.id}`, { method: "DELETE" }); load(); } }}>Delete</button></div></div>))}</div>
  );
}

function Resources({ api }: { api: Api }) {
  const [list, setList] = useState<any[]>([]), [msg, setMsg] = useState("");
  const load = useCallback(() => api("/api/resources").then(setList).catch((e) => setMsg(e.message)), [api]);
  useEffect(() => { load(); }, [load]);
  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; setMsg("Uploading…");
    try { await api("/api/admin/resources", { method: "POST", body: new FormData(form) }); form.reset(); setMsg("Uploaded"); load(); } catch (x: any) { setMsg(x.message); }
  }
  return (
    <div><form onSubmit={add} className="card form"><input name="title" placeholder="Title" required /><textarea name="description" placeholder="Description" rows={3} />
      <input name="category" placeholder="Category (e.g. web-dev)" defaultValue="general" /><input name="file" type="file" required />
      <button className="btn p">Upload resource</button>{msg && <p>{msg}</p>}</form>
      {list.map((r) => <div key={r.id} className="card" style={{ marginTop: 12 }}><h3>{r.title}</h3><p>{r.filename} · {r.downloads} downloads</p>
        <button className="btn" onClick={async () => { if (confirm("Delete this resource?")) { await api(`/api/admin/resources/${r.id}`, { method: "DELETE" }); load(); } }}>Delete</button></div>)}</div>
  );
}

function Comments({ api }: { api: Api }) {
  const [list, setList] = useState<any[]>([]);
  const load = useCallback(() => api("/api/admin/comments").then(setList).catch(() => {}), [api]);
  useEffect(() => { load(); }, [load]);
  return (
    <div>{list.length === 0 && <p className="sub">No comments yet.</p>}{list.map((c) => (
      <div key={c.id} className="card cmt" style={{ marginBottom: 12 }}><b>{c.name}</b> <span className="mono">{c.slug} · {new Date(c.created).toLocaleString()}</span><p>{c.message}</p>
        <button className="btn" onClick={async () => { await api(`/api/admin/comments/${c.id}`, { method: "DELETE" }); load(); }}>Delete</button></div>))}</div>
  );
}

function Messages({ api }: { api: Api }) {
  const [list, setList] = useState<any[]>([]), [err, setErr] = useState("");
  const load = useCallback(() => api("/api/admin/messages").then(setList).catch((e) => setErr(e.message)), [api]);
  useEffect(() => { load(); }, [load]);
  return (
    <div>{err && <p className="bad">{err}</p>}{!err && list.length === 0 && <p className="sub">No messages yet. Contact-form messages are saved here.</p>}
      {list.map((m) => (
        <div key={m.id} className="card cmt" style={{ marginBottom: 12 }}><b>{m.name}</b> · <a href={`mailto:${m.email}`}>{m.email}</a> <span className="mono">{m.created ? new Date(m.created).toLocaleString() : ""}</span>
          <p style={{ whiteSpace: "pre-wrap" }}>{m.message}</p>
          <div className="btns" style={{ marginTop: 6 }}><a className="btn" href={`mailto:${m.email}?subject=Re: your message to UASE Tech Studio`}>Reply by email</a>
            <button className="btn" onClick={async () => { if (confirm("Delete this message?")) { await api(`/api/admin/messages/${m.id}`, { method: "DELETE" }); load(); } }}>Delete</button></div></div>))}</div>
  );
}
