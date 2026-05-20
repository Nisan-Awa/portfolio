"use client";

import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Experience</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
            Practical exposure across software, power, networks, broadcast systems and teaching.
          </h2>
        </motion.div>

        <div className="relative max-w-5xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.company}-${experience.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.04 }}
                className="relative pl-12"
              >
                <div className="absolute left-[11px] top-8 w-3 h-3 rounded-full bg-primary" />
                <div className="glass-panel rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-2xl font-black">{experience.role}</h3>
                      <p className="text-primary font-bold">{experience.company}</p>
                    </div>
                    <span className="w-fit px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold uppercase tracking-wider">
                      {experience.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
