import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";

export function ClientWork() {
  const websites = projects.filter((project) => project.group === "Client Websites");
  return (
    <section id="client-work" className="editorial-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Client websites · July–October 2026</p>
          <h2 className="display-title">Built for the way<br /><span className="text-primary">each brand works.</span></h2>
          <p className="body-copy max-w-2xl">Alongside my mobile and engineering work, I build websites for businesses. These two collaborations with Nasir Dauda brought different brands to the web.</p>
        </div>
        <div className="website-grid">
          {websites.map((project) => (
            <article key={project.slug} className="website-card">
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="browser-preview group" aria-label={"Visit " + project.title}>
                <div className="browser-bar" aria-hidden="true"><span /><span /><span /><p>{project.website?.replace("https://", "").replace(/\/$/, "")}</p><ArrowUpRight size={14} /></div>
                <div className="relative aspect-[1440/1000] overflow-hidden">
                  <Image src={project.images[0]} unoptimized alt={project.title + " website homepage"} fill sizes="(max-width: 768px) 100vw, 580px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
              </a>
              <div className="website-copy">
                <p className="eyebrow">{project.year} · Co-developed</p>
                <h3 className="text-3xl font-black mb-3">{project.title}</h3>
                <p className="body-copy">{project.summary}</p>
                <p className="text-sm text-muted-foreground mt-4">Built with <a className="text-link" href="https://raregazzetto.me/" target="_blank" rel="noopener noreferrer">Nasir Dauda ↗</a></p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a className="action-link brand-button" href={project.website} target="_blank" rel="noopener noreferrer">
                    <Image src={project.icon!} alt="" width={26} height={26} className="brand-logo" />Visit website <ArrowUpRight size={17} />
                  </a>
                  <Link className="action-link secondary-action" href={"/projects/" + project.slug}>Project notes <ArrowUpRight size={17} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="collaborator-strip">
          <a href="https://raregazzetto.me/" target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] rounded-xl overflow-hidden border border-border">
            <Image src="/assets/websites/nasir-dauda.webp" unoptimized alt="Nasir Dauda’s software development portfolio" fill sizes="360px" className="object-cover object-top" />
          </a>
          <div>
            <p className="eyebrow">The person behind the collaboration</p>
            <h3 className="text-2xl font-black mb-3">Nasir Dauda</h3>
            <p className="body-copy">A full-stack software developer and Electrical & Electronics Engineer, Nasir works across backend systems, responsive web platforms, mobile apps and AI integrations. We collaborated on Queenbrique and Elegant Radiance Luxe.</p>
            <a className="text-link inline-flex items-center gap-2 mt-4" href="https://raregazzetto.me/" target="_blank" rel="noopener noreferrer">Explore Nasir’s portfolio <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
