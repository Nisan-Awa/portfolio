"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Wifi, Zap } from "lucide-react";

const skillCategories = [
    {
        title: "Software Development",
        icon: Code,
        skills: [
            { name: "Flutter & Dart", level: 95 },
            { name: "Python Scripting", level: 80 },
            { name: "Git & Version Control", level: 85 },
            { name: "REST API Integration", level: 90 },
            { name: "Mobile UI/UX Design", level: 85 }
        ],
        color: "text-teal-400",
        barColor: "bg-teal-400"
    },
    {
        title: "Network Infrastructure",
        icon: Wifi,
        skills: [
            { name: "Fiber Optic Splicing", level: 90 },
            { name: "OTDR Fault Analysis", level: 85 },
            { name: "Microwave Radio Links", level: 80 },
            { name: "Router Config (VLAN/IP)", level: 75 },
            { name: "PRTG Network Monitor", level: 70 }
        ],
        color: "text-blue-400",
        barColor: "bg-blue-400"
    },
    {
        title: "Electrical Systems",
        icon: Zap,
        skills: [
            { name: "High Voltage Grid Ops", level: 85 },
            { name: "Substation Maintenance", level: 80 },
            { name: "UPS & Inverter Systems", level: 90 },
            { name: "RF Transmission", level: 75 },
            { name: "Electronic Circuit Design", level: 70 }
        ],
        color: "text-purple-400",
        barColor: "bg-purple-400"
    }
];

export function Skills() {
    return (
        <section id="skills" className="py-32 relative overflow-hidden">
            {/* Background Glow - Removed static glow in favor of global Background */}

            <div className="container mx-auto px-6">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter"
                    >
                        TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">ARSENAL</span>
                    </motion.h2>
                    <p className="text-muted-foreground tracking-[0.5em] uppercase text-sm">
                        Mastery over bits & atoms
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2"
                        >
                            <div className="flex items-center mb-8">
                                <div className={`p-3 rounded-xl bg-black/50 ${category.color} mr-4`}>
                                    <category.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">{category.title}</h3>
                            </div>

                            <div className="space-y-6">
                                {category.skills.map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-muted-foreground font-medium">{skill.name}</span>
                                            <span className="text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + (i * 0.1) }}
                                                className={`h-full rounded-full ${category.barColor} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
