"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const focusAreas = [
  "Web & mobile applications, Flutter, Dart, Firebase, SQLite and REST APIs",
  "Power transmission, broadcast systems, RF, fiber optics and network infrastructure",
  "Robotics, automation, AI-enabled energy systems and technical education",
];

export function About() {
  return (
    <section id="about" className="editorial-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">About · An engineering foundation</p>
          <h2 className="about-heading">HARDWARE <span className="text-muted-foreground/70">MEETS</span><br /><span className="text-primary">SOFTWARE</span></h2>
        </div>
        <div className="about-layout">
          <motion.figure initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="engineering-portrait">
            <a href="/assets/portraits/engineering.webp" target="_blank" rel="noopener noreferrer" className="block cursor-zoom-in" aria-label="Open the full engineering portrait">
              <Image src="/assets/portraits/engineering.webp" alt="Nisan Awa wearing a hard hat and high-visibility safety vest" width={1176} height={1600} sizes="(max-width: 767px) 88vw, 360px" className="w-full h-auto" />
            </a>
            <figcaption><span className="block text-xs uppercase tracking-widest text-primary font-bold mb-2">Electrical & Electronics Engineer</span><p className="text-sm text-muted-foreground leading-relaxed">Engineering is where my approach to problem-solving began.</p></figcaption>
          </motion.figure>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .1 }} className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
            <p>I am Nisan Awa, also known as Awa Nisan Tojah, a Software Engineer focused on websites and mobile applications. I am also an Electrical & Electronics Engineer and a graduate of Afe Babalola University, Ado-Ekiti, with Second Class Upper.</p>
            <p>My journey has moved across multiple layers of technology: broadcast engineering at FRCN, high-voltage power transmission exposure at TCN, network infrastructure and fiber work at Winrock Nigeria / Plusnet, and mobile software development at Featuremind Nigeria Limited.</p>
            <p>That mix shaped how I work. I think like an engineer, design like a product builder, and execute like a developer. I care about software that is clean, usable, reliable and grounded in real problems beyond the screen.</p>
            <p>Since July 2026, that work has expanded into client websites, built with Nasir Dauda, and a part-time ICT facilitation role at Karryfield International School. Helping young people create with technology has become an important part of my work.</p>
            <Link className="text-link inline-block" href="/profile">More about my background, contribution and lessons learned ↗</Link>
            <div className="about-focus">{focusAreas.map((area, index) => <div key={area}><span aria-hidden="true">0{index + 1}</span><p>{area}</p></div>)}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
