import type { MetadataRoute } from "next";
import { projects, services } from "@/lib/data";
import { apiGet } from "@/lib/api";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://uase.tech";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await apiGet<{ slug: string }[]>("/api/posts")) || [];
  const pages = ["", "/projects", "/services", "/resume", "/about", "/contact", "/graphics", "/blog", "/resources", "/nigeria"].map((p) => ({ url: base + p }));
  return [...pages, ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` })), ...posts.map((p) => ({ url: `${base}/blog/${p.slug}` })), ...services.map((s) => ({ url: `${base}/services/${s.slug}` }))];
}
