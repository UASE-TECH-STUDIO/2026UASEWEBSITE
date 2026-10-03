import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60; // a sleeping free-tier backend can take up to a minute to wake

// Same-origin proxy: the browser talks to this route, this route talks to the backend, so CORS can never block the form.
export async function POST(req: NextRequest) {
  const api = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  if (!api) return NextResponse.json({ detail: "The website is not connected to its server yet." }, { status: 503 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ detail: "Bad request" }, { status: 400 }); }
  try {
    const r = await fetch(`${api}/api/contact`, {
      method: "POST", cache: "no-store", signal: AbortSignal.timeout(55000),
      headers: { "Content-Type": "application/json", "X-Forwarded-For": (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() },
      body: JSON.stringify(body),
    });
    return new NextResponse(await r.text(), { status: r.status, headers: { "Content-Type": "application/json" } });
  } catch {
    return NextResponse.json({ detail: "Our server is waking up or unreachable. Please try again in a minute." }, { status: 504 });
  }
}
