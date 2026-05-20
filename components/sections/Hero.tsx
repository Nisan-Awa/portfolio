"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { featuredStats } from "@/lib/portfolio-data";

export function Hero() {
    return (
        <section id="home" className="min-h-[100svh] md:min-h-screen flex flex-col justify-center pt-28 md:pt-32 pb-12 md:pb-10 relative overflow-hidden">
            <div className="section-shell">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-4xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
                            style={{ willChange: "transform, opacity" }}
                            className="flex flex-wrap items-center gap-3 mb-8"
                        >
                            <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
                                2026 Portfolio
                            </span>
                            <span className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
                                Flutter Developer
                            </span>
                            <span className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
                                Electrical Engineer
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                            style={{ willChange: "transform, opacity" }}
                            className="text-[clamp(4rem,22vw,6.5rem)] md:text-[clamp(3.6rem,11vw,8.4rem)] font-bold mb-7 md:mb-8 leading-[0.86] md:leading-[0.88] text-foreground"
                        >
                            NISAN
                            <br />
                            <span className="text-muted-foreground/35">AWA</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
                            style={{ willChange: "transform, opacity" }}
                            className="max-w-2xl"
                        >
                            <p className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground leading-relaxed mb-6 md:mb-8">
                                I am a <span className="text-foreground font-medium">final-year Electrical & Electronics Engineering student</span> and <span className="text-foreground font-medium">Flutter Developer</span> building at the intersection of <span className="text-primary font-bold">hardware systems</span>, <span className="text-accent font-bold">intelligent software</span>, automation and user-centered digital products.
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-12 max-w-2xl">
                                From working around 330 kV transmission infrastructure to building Firebase-backed mobile apps, I bring engineering discipline, product thinking and practical software execution into one portfolio.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.6 }}
                            style={{ willChange: "transform, opacity" }}
                            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
                        >
                            <a
                                href="#contact"
                                className="group w-full sm:w-auto justify-center px-8 py-4 bg-primary text-primary-foreground font-bold text-base rounded-full hover:bg-primary/90 transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                            >
                                Contact Me
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/downloads/apps/nisanapp-cloud-release.apk"
                                className="w-full sm:w-auto justify-center px-8 py-4 border border-border bg-card/80 backdrop-blur-sm text-foreground font-bold text-base rounded-full hover:bg-secondary transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                            >
                                <Download className="w-5 h-5" />
                                NisanApp APK
                            </a>
                            <a
                                href="https://github.com/Nisan-Awa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto justify-center px-8 py-4 border border-border bg-card/80 backdrop-blur-sm text-foreground font-bold text-base rounded-full hover:bg-secondary transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                            >
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/nisan-awa-tojah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto justify-center px-8 py-4 border border-border bg-card/80 backdrop-blur-sm text-foreground font-bold text-base rounded-full hover:bg-secondary transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                            >
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
                        style={{ willChange: "transform, opacity" }}
                        className="relative w-full md:w-[430px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-primary/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-10" />
                        <Image
                            src="/hero-portrait.jpg"
                            alt="Awa Nisan Tojah"
                            width={500}
                            height={625}
                            priority
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />

                        <div className="absolute bottom-6 left-6 z-20">
                            <p className="text-white font-bold text-xl">Awa Nisan Tojah</p>
                            <p className="text-primary text-sm">Hardware-aware software developer</p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                >
                    {featuredStats.map((stat) => (
                        <div key={stat.label} className="glass-panel rounded-2xl p-5">
                            <p className="text-3xl font-black text-foreground">{stat.value}</p>
                            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
