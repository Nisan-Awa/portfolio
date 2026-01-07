"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Smartphone, Wifi, Zap, Settings, GitBranch } from "lucide-react";

const skillCategories = [
    {
        title: "Mobile Development",
        icon: Smartphone,
        skills: [
            { name: "Flutter (UI, State Mgmt)", level: 95 },
            { name: "Dart (Async, OOP)", level: 90 },
            { name: "Clean Architecture", level: 85 },
            { name: "Custom Widgets", level: 90 },
            { name: "Animations", level: 85 }
        ],
        color: "text-teal-400",
        barColor: "bg-teal-400"
    },
    {
        title: "Web & Scripting",
        icon: Code,
        skills: [
            { name: "Python (Automation)", level: 75 },
            { name: "HTML/CSS/Tailwind", level: 85 },
            { name: "JSON Parsing", level: 90 },
            { name: "Responsive Design", level: 85 }
        ],
        color: "text-blue-400",
        barColor: "bg-blue-400"
    },
    {
        title: "Engineering Tools",
        icon: Zap,
        skills: [
            { name: "PRTG Network Monitor", level: 80 },
            { name: "Fiber Optics (OTDR)", level: 90 },
            { name: "Fusion Splicing", level: 95 },
            { name: "RF Transmission", level: 75 },
            { name: "Spectrum Analysis", level: 70 }
        ],
        color: "text-yellow-400",
        barColor: "bg-yellow-400"
    },
    {
        title: "DevOps & Workflow",
        icon: GitBranch,
        skills: [
            { name: "Git & GitHub", level: 90 },
            { name: "RESTful APIs", level: 85 },
            { name: "Figma Collaboration", level: 80 },
            { name: "VS Code", level: 95 },
            { name: "CI/CD Basics", level: 70 }
        ],
        color: "text-purple-400",
        barColor: "bg-purple-400"
    }
];

export function Skills() {
    return (
        <section id="skills" className="py-32 relative overflow-hidden">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                <h3 className="text-xl font-bold">{category.title}</h3>
                            </div>

                            <div className="space-y-6">
                                {category.skills.map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="text-muted-foreground font-medium">{skill.name}</span>
                                            <span className="text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
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
