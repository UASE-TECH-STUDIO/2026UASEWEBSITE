import { API } from "./data";
export async function apiGet<T>(path: string): Promise<T | null> {
  try { const r = await fetch(API + path, { next: { revalidate: 60 } }); return r.ok ? await r.json() : null; } catch { return null; }
}
