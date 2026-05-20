"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14"
        >
          <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Skills</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
            Tools and concepts I use across app development and engineering systems.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.04 }}
              className="glass-panel rounded-2xl p-6"
            >
              <h3 className="text-xl font-black mb-5">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="px-3 py-2 rounded-full bg-secondary text-muted-foreground text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
