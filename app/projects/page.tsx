import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { projects } from "@/lib/portfolio-data";

export const metadata = {
  title: "Projects | Nisan Awa",
  description: "Flutter, engineering, AI, robotics and product projects by Nisan Awa.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-28 md:pt-32 pb-16 md:pb-20">
      <Header />
      <section className="section-shell">
        <div className="mb-12">
          <Link href="/#projects" className="text-sm font-bold text-primary">
            Back to home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mt-5 mb-5 md:mb-6">Projects</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            A broader index of my mobile apps, engineering projects, AI experiments, robotics work and product leadership experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <article key={project.slug} className="glass-panel rounded-2xl p-6 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  {project.year}
                </span>
              </div>
              <h2 className="text-2xl font-black mb-2">{project.title}</h2>
              <p className="text-muted-foreground mb-4">{project.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.summary}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm"
                >
                  Case study
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                {project.downloads?.slice(0, 1).map((download) => (
                  <a
                    key={download.href}
                    href={download.href}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-border bg-card hover:bg-secondary font-bold text-sm"
                  >
                    <Download className="w-4 h-4" />
                    APK
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
