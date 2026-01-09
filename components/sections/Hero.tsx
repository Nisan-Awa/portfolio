"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section id="home" className="min-h-screen flex flex-col justify-center pt-32 pb-10 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-4xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
                            style={{ willChange: "transform, opacity" }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                                • 2025 Portfolio
                            </span>
                            <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">
                                • Developer
                            </span>
                            <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">
                                • Engineer
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                            style={{ willChange: "transform, opacity" }}
                            className="text-[clamp(4rem,12vw,9rem)] font-bold tracking-tighter mb-8 leading-[0.85] text-foreground"
                        >
                            NISAN
                            <br />
                            <span className="text-muted-foreground/20">AWA</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
                            style={{ willChange: "transform, opacity" }}
                            className="max-w-2xl"
                        >
                            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed mb-12">
                                I am a <span className="text-foreground font-medium">500-level Electrical & Electronics Engineering student</span> and <span className="text-foreground font-medium">Flutter Developer</span>.
                                I specialize in bridging the gap between <span className="text-primary font-bold">complex hardware systems</span> and <span className="text-blue-500 font-bold">intuitive mobile applications</span>.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.6 }}
                            style={{ willChange: "transform, opacity" }}
                            className="flex flex-wrap gap-6"
                        >
                            <a
                                href="#contact"
                                className="group px-10 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                            >
                                Contact Me
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="https://github.com/Nisan-Awa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-10 py-5 border border-white/10 bg-white/5 backdrop-blur-sm text-foreground font-bold text-lg rounded-full hover:bg-white/10 transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                            >
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                        </motion.div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
                        style={{ willChange: "transform, opacity" }}
                        className="relative w-full md:w-[500px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
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
                            <p className="text-primary text-sm">Electrical Engineer</p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-20 border-t border-white/10 pt-8 flex justify-between items-end"
                >
                    <div>
                        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
                            Portfolio 2025
                        </p>
                        <div className="h-0.5 w-24 bg-primary" />
                    </div>

                    <div className="text-right hidden md:block">
                        <p className="text-xs text-muted-foreground tracking-widest uppercase animate-bounce">
                            Scroll to explore
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
