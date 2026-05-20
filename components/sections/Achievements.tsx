"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Megaphone, Users } from "lucide-react";
import Image from "next/image";
import { achievements, certificates } from "@/lib/portfolio-data";

const spotlights = [
  {
    title: "CeresVera Product / Business Lead",
    description:
      "Helped shape product strategy, value proposition, pitch structure and business positioning for an AI-first agricultural support platform.",
    icon: Award,
  },
  {
    title: "Campus to Career 2.0 Pitch Recognition",
    description:
      "Pitched CeresVera at ABUAD and received cash-prize recognition from senior academic and professional figures.",
    icon: Megaphone,
  },
  {
    title: "LinkedIn 4K+ Community",
    description:
      "Built a professional audience by documenting software, engineering, AI, events, learning and personal growth.",
    icon: Users,
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-28 relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14"
        >
          <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Achievements</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
            Public proof of building, learning, teaching and showing up.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {spotlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.04 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent grid place-items-center mb-5">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-2xl font-black mb-5">Highlights</h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement} className="flex gap-3">
                  <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="certificates" className="glass-panel rounded-2xl p-6">
            <h3 className="text-2xl font-black mb-5">Certificates</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {certificates.map((certificate) => (
                <article key={certificate.image} className="rounded-xl border border-border overflow-hidden bg-background">
                  <div className="relative aspect-[4/3] bg-secondary">
                    <Image src={certificate.image} alt={certificate.title} fill className="object-contain p-2" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-black">{certificate.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{certificate.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
