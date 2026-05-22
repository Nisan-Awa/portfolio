"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Bot, BrainCircuit, Download, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project, projects } from "@/lib/portfolio-data";

const featuredProjects = projects.filter((project) => project.featured);
const engineeringProjects = projects.filter((project) => project.group === "Engineering, AI and Product");
const practiceProjects = projects.filter((project) => project.group === "UI Concepts and Practice Builds");

function ProjectFallbackVisual({ project }: { project: Project }) {
  const Icon = project.slug.includes("robot")
    ? Bot
    : project.slug.includes("energy")
      ? BrainCircuit
      : project.slug.includes("ceres")
        ? Sprout
        : ArrowUpRight;

  return (
    <div className="h-full min-h-[300px] rounded-2xl border border-border bg-background/75 p-6 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        {project.icon ? (
          <Image src={project.icon} alt={`${project.title} app icon`} width={56} height={56} className="rounded-2xl object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary grid place-items-center">
            <Icon className="w-7 h-7" />
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Visual proof</p>
          <p className="font-black">{project.category}</p>
        </div>
      </div>
      <div>
        <p className="text-3xl font-black mb-3">{project.title}</p>
        <p className="text-muted-foreground leading-relaxed">{project.highlights[0]}</p>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-24 relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"
        >
          <div>
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Featured projects</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
              Top mobile apps first, deeper case studies one click away.
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full border border-border bg-card hover:bg-secondary font-bold"
          >
            View more
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.05 }}
              className="glass-panel rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden"
            >
              <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0">
                <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between md:min-h-[420px]">
                  <div>
                    <div className="flex items-start gap-4 mb-5">
                      {project.icon && (
                        <Image src={project.icon} alt={`${project.title} app icon`} width={64} height={64} className="rounded-2xl border border-border object-cover" />
                      )}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold uppercase tracking-wider">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black mb-3 md:mb-4">{project.title}</h3>
                    <p className="text-lg md:text-xl text-muted-foreground mb-4 md:mb-5">{project.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{project.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-7 md:mt-8">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90"
                    >
                      Case study
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    {project.downloads?.slice(0, 1).map((download) => (
                      <a
                        key={download.href}
                        href={download.href}
                        className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full border border-border bg-card hover:bg-secondary font-bold"
                      >
                        <Download className="w-4 h-4" />
                        {download.label.includes("APK") ? "Download demo build" : download.label}
                      </a>
                    ))}
                    {project.downloads?.slice(0, 1).map((download) => (
                      <p key={`${download.href}-note`} className="basis-full text-xs text-muted-foreground leading-relaxed">
                        {download.note ?? "Android APK demo build. Install manually on Android devices."}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 sm:p-6 md:p-8 overflow-hidden">
                  {project.images.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {project.images.slice(0, 4).map((image, imageIndex) => (
                        <div
                          key={image}
                          className="relative shrink-0 w-[72vw] sm:w-[210px] md:w-[250px] aspect-[9/18.5] rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border border-border bg-background shadow-2xl"
                          style={{ transform: `translateY(${imageIndex % 2 === 0 ? 0 : 28}px)` }}
                        >
                          <Image src={image} alt={`${project.title} screenshot ${imageIndex + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ProjectFallbackVisual project={project} />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-[1fr_1fr] gap-5">
          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">Engineering, AI and product</p>
            <div className="space-y-3">
              {engineeringProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block rounded-xl border border-border bg-background/60 p-4 hover:bg-secondary transition-colors">
                  <h3 className="font-black text-lg mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">UI concepts and practice builds</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {practiceProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="rounded-xl border border-border bg-background/60 p-4 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    {project.icon && (
                      <Image src={project.icon} alt={`${project.title} app icon`} width={36} height={36} className="rounded-lg object-cover" />
                    )}
                    <p className="font-black">{project.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
