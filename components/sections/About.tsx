"use client";

import React from "react";
import { motion } from "framer-motion";

const focusAreas = [
  "Flutter, Dart, Firebase, SQLite, Provider and REST APIs",
  "Power transmission, broadcast systems, RF, fiber optics and network infrastructure",
  "Robotics, automation, AI-enabled energy systems and technical education",
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-24 relative overflow-hidden">
      <div className="section-shell">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-5">About</p>
            <h2 className="text-5xl md:text-7xl font-black leading-none mb-8">
              HARDWARE <br />
              <span className="text-muted-foreground/50">MEETS</span> <br />
              <span className="text-primary">SOFTWARE</span>
            </h2>
            <div className="h-1 w-28 bg-accent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              I am Nisan Awa, also known as Awa Nisan Tojah, a final-year Electrical and Electronics Engineering student at Afe Babalola University, Ado-Ekiti, and a Flutter developer building practical mobile products.
            </p>
            <p>
              My journey has moved across multiple layers of technology: broadcast engineering at FRCN, high-voltage power transmission exposure at TCN, network infrastructure and fiber work at Winrock Nigeria / Plusnet, and mobile software development at Featuremind Nigeria Limited.
            </p>
            <p>
              That mix shaped how I work. I think like an engineer, design like a product builder, and execute like a developer. I care about software that is clean, usable, reliable and grounded in real problems beyond the screen.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {focusAreas.map((area) => (
                <div key={area} className="glass-panel rounded-2xl p-5 text-sm text-foreground leading-relaxed">
                  {area}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
