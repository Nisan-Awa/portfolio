"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-9xl font-bold mb-12 tracking-tighter"
                >
                    LET'S <span className="text-primary">TALK</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-20 font-light"
                >
                    Ready to build something extraordinary? Whether it's <span className="text-foreground">mobile development</span>, <span className="text-foreground">network engineering</span>, or <span className="text-foreground">electrical systems</span>, I'm ready to deploy.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <a
                        href="https://wa.me/2349124004256"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-4"
                    >
                        <div className="p-4 rounded-full bg-white/5 group-hover:bg-green-500 text-green-500 group-hover:text-black transition-colors">
                            <Phone className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold text-foreground">WhatsApp</span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>

                    <a
                        href="mailto:nisanawa5@gmail.com"
                        className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-4"
                    >
                        <div className="p-4 rounded-full bg-white/5 group-hover:bg-red-500 text-red-500 group-hover:text-black transition-colors">
                            <Mail className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold text-foreground">Email Me</span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/nisan-awa-tojah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-4"
                    >
                        <div className="p-4 rounded-full bg-white/5 group-hover:bg-blue-500 text-blue-500 group-hover:text-black transition-colors">
                            <Linkedin className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold text-foreground">LinkedIn</span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>

                    <a
                        href="https://github.com/Nisan-Awa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex flex-col items-center justify-center gap-4"
                    >
                        <div className="p-4 rounded-full bg-white/5 group-hover:bg-white text-white group-hover:text-black transition-colors">
                            <Github className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold text-foreground">GitHub</span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>

                <div className="mt-32 pt-8 border-t border-white/10 text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© {new Date().getFullYear()} Awa Nisan Tojah. All rights reserved.</p>
                    <p className="font-mono text-xs tracking-widest uppercase opacity-50">
                        Designed with <span className="text-primary">Precision</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
