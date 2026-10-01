import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { apiGet } from "@/lib/api";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";
export const revalidate = 60;
type Post = { slug: string; title: string; excerpt: string; content: string; cover: string; tags: string[]; created: string; likes: number; comment_list: { name: string; message: string; created: string }[] };
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = await apiGet<Post>(`/api/posts/${slug}`);
  return { title: p ? `${p.title} | USTY` : "Blog", description: p?.excerpt };
}
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = await apiGet<Post>(`/api/posts/${slug}`);
  if (!p) notFound();
  return (
    <div className="w" style={{ maxWidth: 780 }}><div className="hero" style={{ paddingBottom: 16 }}>
      <Link href="/blog" className="mono" style={{ color: "var(--mute)", textDecoration: "none", fontSize: 13 }}>← All posts</Link>
      <h1 style={{ fontSize: "clamp(28px,5vw,42px)" }}>{p.title}</h1>
      <p className="mono" style={{ color: "var(--mute)", fontSize: 13 }}>{new Date(p.created).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {p.tags.join(" · ")}</p></div>
      {p.cover && <img src={p.cover} alt="" style={{ width: "100%", borderRadius: 14, marginBottom: 20 }} />}
      <article className="md"><ReactMarkdown remarkPlugins={[remarkGfm]}>{p.content}</ReactMarkdown></article>
      <div className="btns"><LikeButton slug={p.slug} likes={p.likes} /></div>
      <section><Comments slug={p.slug} initial={p.comment_list} /></section></div>
  );
}
