import projectsJson from "@/data/projects.json";
import servicesJson from "@/data/services.json";

export type Project = {
  slug: string; title: string; tagline: string; client_type: string; category: string;
  overview: string; technologies: string[]; features: string[]; thumbnail: string;
  screenshots: string[]; live: string | null; expertise: string[];
  problem_solution: { problem: string; solution: string } | null;
};
export type Service = { slug: string; title: string; description: string; tools: string[]; benefits: string[]; how: string[] };

export const projects = projectsJson as Project[];
export const services = servicesJson as Service[];
export const LINKEDIN = "https://www.linkedin.com/in/muhammedmustapha-abdullahi-bb897a309";
export const EMAIL = "uasetechstudio@gmail.com";
export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const label = (c: string) => c.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
export const WA = { ng: "2349133549399", us: "12135579829", nigeria: "2348146550674" };
export const waLink = (n: string, text = "Hi USTY, I found your website and would like to talk.") => `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
