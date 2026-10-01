import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const api = process.env.NEXT_PUBLIC_API_URL, secret = process.env.TRACK_SECRET;
  if (!api || !secret) return NextResponse.json({ ok: false });
  let b: { path?: string; ref?: string } = {};
  try { b = await req.json(); } catch {}
  const h = req.headers;
  const dec = (v: string | null) => { try { return decodeURIComponent(v || ""); } catch { return v || ""; } };
  try {
    await fetch(`${api}/api/analytics/track`, {
      method: "POST", cache: "no-store",
      headers: { "Content-Type": "application/json", "X-Track-Secret": secret },
      body: JSON.stringify({
        path: String(b.path || "/").slice(0, 300), ref: String(b.ref || "").slice(0, 500), host: h.get("host") || "",
        ua: h.get("user-agent") || "", ip: (h.get("x-forwarded-for") || "").split(",")[0].trim(),
        country: h.get("x-vercel-ip-country") || "", region: dec(h.get("x-vercel-ip-country-region")), city: dec(h.get("x-vercel-ip-city")),
      }),
    });
  } catch {}
  return NextResponse.json({ ok: true });
}
