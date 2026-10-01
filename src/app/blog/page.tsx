import Link from "next/link";
import { apiGet } from "@/lib/api";
export const revalidate = 60;
export const metadata = { title: "Blog | USTY — UASE Tech Studio", description: "Notes on our stack, our work, careers, tech and Nigeria." };
type P = { slug: string; title: string; excerpt: string; cover: string; tags: string[]; created: string; likes: number; comments: number };
export default async function Blog() {
  const posts = (await apiGet<P[]>("/api/posts")) || [];
  return (
    <div className="w"><div className="hero" style={{ paddingBottom: 20 }}><h1>Blog</h1><p className="lead">Our stack, our work, careers, tech in general and life in Nigeria.</p></div>
      {posts.length === 0 && <p className="sub">No posts yet. Check back soon.</p>}
      <div className="grid">{posts.map((p) => (
        <Link key={p.slug} href={`/blog/${p.slug}`} className="card pcard">
          {p.cover && <img src={p.cover} alt="" loading="lazy" />}
          <h3>{p.title}</h3><p>{p.excerpt}</p>
          <p className="mono" style={{ fontSize: 12 }}>{new Date(p.created).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · ♥ {p.likes} · 💬 {p.comments}</p>
          <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        </Link>))}</div></div>
  );
}
