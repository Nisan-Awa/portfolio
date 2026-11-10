"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { featuredStats } from "@/lib/portfolio-data";

export function Hero() {
  return (
    <section id="home" className="min-h-[100svh] flex flex-col justify-center pt-32 pb-12 relative overflow-hidden">
      <div className="section-shell">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] items-center gap-10 lg:gap-16">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8">
              <span className="text-xs font-bold tracking-[.22em] text-primary uppercase">Software Engineer</span>
              <span className="text-xs font-bold tracking-[.16em] text-muted-foreground uppercase">Web & Mobile App Developer</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .1 }} className="text-[clamp(4rem,22vw,6.5rem)] md:text-[clamp(3.6rem,11vw,8.4rem)] font-bold mb-7 leading-[.88]">
              NISAN <br /><span className="text-muted-foreground/70">AWA</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .2 }}>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                I build <span className="text-primary font-bold">websites</span> and <span className="text-accent font-bold">mobile applications</span>, bringing an <span className="text-foreground font-semibold">Electrical & Electronics Engineer’s</span> understanding of systems to practical software.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                From working around 330 kV transmission infrastructure to building client websites and Firebase-backed apps, I bring engineering discipline, product thinking and practical software execution.
              </p>
              <a href="#education" className="degree-badge">B.Eng. · Second Class Upper · Class of 2026 <ArrowUpRight size={15} aria-hidden="true" /></a>
              <div className="flex flex-wrap gap-3 mb-6">
                <a href="#contact" className="action-link px-7 py-4">Contact Me <ArrowRight size={18} aria-hidden="true" /></a>
                <a href="#client-work" className="action-link secondary-action px-7 py-4">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <a href="https://github.com/Nisan-Awa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Github size={18} aria-hidden="true" />GitHub <span className="sr-only">(opens in a new tab)</span></a>
                <a href="https://www.linkedin.com/in/nisan-awa-tojah" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Linkedin size={18} aria-hidden="true" />LinkedIn <span className="sr-only">(opens in a new tab)</span></a>
              </div>
            </motion.div>
          </div>
          <motion.figure initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .2 }} className="relative w-full max-w-[460px] mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-primary/10">
            <Image src="/assets/portraits/suit-3.webp" alt="Awa Nisan Tojah in a dark suit" width={1200} height={1500} sizes="(max-width: 1023px) 460px, 40vw" priority className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <figcaption className="absolute bottom-6 left-6 right-6"><p className="text-white font-bold text-xl">Awa Nisan Tojah</p><p className="text-teal-200 text-sm mt-1">Software Engineer · Educator</p></figcaption>
          </motion.figure>
        </div>
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {featuredStats.map(stat => <div key={stat.label} className="glass-panel rounded-2xl p-4 sm:p-5"><p className="text-2xl sm:text-3xl font-black">{stat.value}</p><p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p></div>)}
        </div>
        <nav aria-label="Explore the portfolio" className="hero-explore"><a href="#client-work">Client websites ↗</a><a href="#education">Education & certificate ↗</a><a href="#mentoring">Teaching & mentorship ↗</a><a href="/profile">Full profile & perspective ↗</a></nav>
      </div>
    </section>
  );
}
