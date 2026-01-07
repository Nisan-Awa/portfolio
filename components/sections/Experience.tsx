"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Zap, Radio } from "lucide-react";

const experiences = [
    {
        role: "Mobile App Developer",
        company: "Featuremind Limited",
        period: "Feb 2025 - Aug 2025",
        description: "Designed and deployed 'NisanApp' using Flutter. Focused on clean architecture, state management, and seamless UI/UX implementation.",
        icon: Smartphone,
        color: "text-teal-400",
        bg: "bg-teal-400/10",
        border: "border-teal-400/20"
    },
    {
        role: "Engineering Intern (Dual Role)",
        company: "TCN & Winrock Nigeria Ltd",
        period: "June 2024 - Aug 2024",
        description: "Maintained high-voltage 330kV systems at TCN while simultaneously deploying fiber optic internet solutions and microwave links at Winrock.",
        icon: Zap,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    },
    {
        role: "Broadcast Engineering Intern",
        company: "Kapital FM 92.9 (FRCN)",
        period: "June 2023 - Aug 2023",
        description: "Managed master control room operations, maintained UPS battery banks, and ensured signal fidelity for live RF transmissions.",
        icon: Radio,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20"
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
                    CAREER <span className="text-muted-foreground/30">TRAJECTORY</span>
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
