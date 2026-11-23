import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio-data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.nisanawa.tech";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: base + "/profile", changeFrequency: "monthly", priority: .8 },
    { url: base + "/learn/python", changeFrequency: "monthly", priority: .9 },
    { url: base + "/projects", changeFrequency: "monthly", priority: .9 },
    ...projects.map(project => ({ url: base + "/projects/" + project.slug, changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
