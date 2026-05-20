import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { getProject, projects } from "@/lib/portfolio-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project | Nisan Awa",
    };
  }

  return {
    title: `${project.title} | Nisan Awa`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
      <Header />
      <article className="section-shell">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          All projects
        </Link>

        <header className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start mb-12">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold uppercase tracking-wider">
                {project.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold uppercase tracking-wider">
                {project.year}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">{project.title}</h1>
            <p className="text-2xl text-muted-foreground mb-6">{project.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.summary}</p>

            {project.downloads && (
              <div className="flex flex-wrap gap-3 mt-8">
                {project.downloads.map((download) => (
                  <a
                    key={download.href}
                    href={download.href}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold"
                  >
                    <Download className="w-4 h-4" />
                    {download.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel rounded-[1.5rem] p-6">
            <h2 className="text-2xl font-black mb-5">Project stack</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((item) => (
                <span key={item} className="px-3 py-2 rounded-full bg-secondary text-muted-foreground text-sm">
                  {item}
                </span>
              ))}
            </div>
            {project.downloads?.map((download) => (
              <p key={download.href} className="text-sm text-muted-foreground leading-relaxed">
                {download.note}
              </p>
            ))}
          </div>
        </header>

        {project.images.length > 0 && (
          <section className="glass-panel rounded-[1.5rem] p-6 mb-10">
            <h2 className="text-2xl font-black mb-6">Screenshots</h2>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {project.images.map((image, index) => (
                <div key={image} className="relative shrink-0 w-[230px] md:w-[280px] aspect-[9/18.5] rounded-[2rem] overflow-hidden border border-border bg-background">
                  <Image src={image} alt={`${project.title} screenshot ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <section className="glass-panel rounded-[1.5rem] p-6 md:p-8">
            <h2 className="text-2xl font-black mb-5">Overview</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {project.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-[1.5rem] p-6 md:p-8">
            <h2 className="text-2xl font-black mb-5">Highlights</h2>
            <div className="space-y-4">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3">
                  <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
