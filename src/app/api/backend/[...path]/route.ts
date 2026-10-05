import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60; // a sleeping free-tier backend can take up to a minute to wake
export const dynamic = "force-dynamic";

// Same-origin proxy for the admin area (and a health check), so the browser never needs CORS to reach the backend.
const ALLOWED = /^(health|resources|posts\/[a-z0-9-]+\/(comments|like)|admin\/[A-Za-z0-9_\-/]+)$/;

async function handler(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const p = (await ctx.params).path.join("/");
  if (!ALLOWED.test(p)) return NextResponse.json({ detail: "Not found" }, { status: 404 });
  const api = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  if (!api) return NextResponse.json({ detail: "The website is not connected to its server yet. Set API_URL on Vercel." }, { status: 503 });
  const headers: Record<string, string> = { "X-Forwarded-For": (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() };
  const auth = req.headers.get("authorization"); if (auth) headers["Authorization"] = auth;
  const ct = req.headers.get("content-type"); if (ct) headers["Content-Type"] = ct;
  const hasBody = !["GET", "HEAD"].includes(req.method);
  try {
    const r = await fetch(p === "health" ? `${api}/health` : `${api}/api/${p}${req.nextUrl.search}`, {
      method: req.method, headers, body: hasBody ? await req.arrayBuffer() : undefined,
      cache: "no-store", redirect: "manual", signal: AbortSignal.timeout(55000),
    });
    return new NextResponse(await r.arrayBuffer(), { status: r.status, headers: { "Content-Type": r.headers.get("content-type") || "application/json" } });
  } catch {
    return NextResponse.json({ detail: "Our server is waking up or unreachable. Wait a minute and try again." }, { status: 504 });
  }
}
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
