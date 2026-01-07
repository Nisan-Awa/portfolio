"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Zap, Radio, Award, Briefcase } from "lucide-react";

const experiences = [
    {
        role: "Selected for NUC Internship",
        company: "National Universities Commission",
        period: "2025",
        description: "Offered a competitive internship position to manage national university databases. (Declined to pursue Software Engineering focus).",
        icon: Award,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20"
    },
    {
        role: "Dual Internship Success",
        company: "TCN & Winrock Nigeria Ltd",
        period: "2024",
        description: "Successfully managed simultaneous engineering roles. Maintained 330kV high-voltage systems at TCN while deploying fiber optic internet solutions at Winrock.",
        icon: Briefcase,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    },
    {
        role: "NisanApp Development",
        company: "Personal Project",
        period: "Ongoing",
        description: "Conceptualized and developed a functional mobile application using Flutter, handling full lifecycle development from design to deployment.",
        icon: Smartphone,
        color: "text-teal-400",
        bg: "bg-teal-400/10",
        border: "border-teal-400/20"
    }
];

export function Experience() {
    return (
        <section id="experience" className="py-32 relative">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="text-4xl md:text-7xl font-bold mb-24 text-center tracking-tighter"
                >
                    ACHIEVEMENTS & <span className="text-muted-foreground/30">HIGHLIGHTS</span>
                </motion.h2>

                <div className="max-w-5xl mx-auto relative">
                    {/* Central Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent transform md:-translate-x-1/2" />

                    <div className="space-y-20">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
                                className={`relative md:flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_rgba(74,222,128,0.8)] transform md:-translate-x-1/2 z-10 mt-8 md:mt-0" />

                                {/* Content Card */}
                                <div className={`md:w-[45%] pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className={`p-8 rounded-3xl border backdrop-blur-md transition-all hover:scale-[1.02] duration-300 group ${exp.bg} ${exp.border}`}>
                                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                            <div className={`p-3 rounded-xl bg-black/40 ${exp.color}`}>
                                                <exp.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                                                <p className={`font-medium ${exp.color}`}>{exp.company}</p>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            {exp.description}
                                        </p>

                                        <span className="inline-block px-4 py-1 rounded-full bg-black/20 text-xs font-mono text-muted-foreground border border-white/5">
                                            {exp.period}
                                        </span>
                                    </div>
                                </div>

                                {/* Empty Space for alignment */}
                                <div className="md:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
