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

  const isWideVisual = project.imageLayout === "wide";

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 md:pt-32 pb-16 md:pb-20">
      <Header />
      <article className="section-shell">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          All projects
        </Link>

        <header className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start mb-12">
          <div>
            <div className="flex items-start gap-4 mb-5">
              {project.icon && (
                <Image src={project.icon} alt={`${project.title} app icon`} width={72} height={72} className="rounded-2xl border border-border object-cover" />
              )}
              <div className="flex flex-wrap gap-2">
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
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-none mb-5 md:mb-6">{project.title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-5 md:mb-6">{project.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.summary}</p>

            {project.downloads && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
                {project.downloads.map((download) => (
                  <a
                    key={download.href}
                    href={download.href}
                    className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold"
                  >
                    <Download className="w-4 h-4" />
                    {download.label}
                  </a>
                ))}
                <p className="basis-full text-sm text-muted-foreground leading-relaxed">
                  Android APK demo builds are provided for manual installation on Android devices. Use the notes below to choose the right build.
                </p>
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
              <div key={download.href} className="rounded-xl border border-border bg-background/60 p-4 mb-3 last:mb-0">
                <p className="font-bold mb-1">{download.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{download.note}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="glass-panel rounded-[1.5rem] p-6 mb-10">
          <h2 className="text-2xl font-black mb-6">{project.images.length > 0 && !isWideVisual ? "Screenshots" : "Visual proof"}</h2>
          {project.images.length > 0 ? (
            <div className={isWideVisual ? "grid md:grid-cols-2 gap-4" : "flex gap-4 overflow-x-auto pb-3"}>
              {project.images.map((image, index) => (
                <div key={image} className={isWideVisual ? "" : "shrink-0 w-[74vw] sm:w-[230px] md:w-[280px]"}>
                  <div
                    className={
                      isWideVisual
                        ? "relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background"
                        : "relative aspect-[9/18.5] rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border border-border bg-background"
                    }
                  >
                    <Image
                      src={image}
                      alt={`${project.title} visual ${index + 1}`}
                      fill
                      className={isWideVisual ? "object-contain p-2" : "object-cover"}
                    />
                  </div>
                  {project.imageCaptions?.[index] && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{project.imageCaptions[index]}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-background/70 p-6 md:p-8 flex flex-col md:flex-row gap-5 md:items-center">
              {project.icon ? (
                <Image src={project.icon} alt={`${project.title} app icon`} width={96} height={96} className="rounded-3xl border border-border object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-3xl bg-primary/15 text-primary grid place-items-center text-3xl font-black">
                  {project.title.slice(0, 2)}
                </div>
              )}
              <div>
                <p className="text-xl font-black mb-2">{project.title}</p>
                <p className="text-muted-foreground leading-relaxed">
                  This project is presented through its visual identity, stack, highlights and case-study notes, with the strongest screen-level walkthroughs reserved for the featured mobile apps.
                </p>
              </div>
            </div>
          )}
        </section>

        {project.caseStudy && (
          <section className="glass-panel rounded-[1.5rem] p-6 md:p-8 mb-10">
            <h2 className="text-2xl font-black mb-6">Case study</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(project.caseStudy).map(([label, value]) => (
                <div key={label} className="rounded-xl border border-border bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">{label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
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
