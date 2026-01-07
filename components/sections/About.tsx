"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalData = [
    { label: "Name", value: "Awa Nisan Tojah" },
    { label: "Role", value: "Electrical Engineer & Flutter Dev" },
    { label: "Stack", value: "['Dart', 'Python', 'C++', 'React']" },
    { label: "Location", value: "Nigeria" },
    { label: "Status", value: "Ready to Deploy" },
];

export function About() {
    const [lines, setLines] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const sequence = async () => {
            // Initial delay
            await new Promise(r => setTimeout(r, 1000));

            // Type command
            const command = "whoami";
            for (let i = 0; i <= command.length; i++) {
                setLines([`> ${command.slice(0, i)}`]);
                await new Promise(r => setTimeout(r, 100));
            }

            await new Promise(r => setTimeout(r, 500));

            // Show data line by line
            const outputLines = [`> ${command}`];
            setLines(outputLines);

            for (const item of terminalData) {
                await new Promise(r => setTimeout(r, 300));
                outputLines.push(`${item.label.padEnd(10)}: ${item.value}`);
                setLines([...outputLines]);
            }

            // Final prompt
            await new Promise(r => setTimeout(r, 500));
            outputLines.push("> _");
            setLines([...outputLines]);
            setIsTyping(false);
        };

        sequence();
    }, []);

    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 leading-none"
                        >
                            HARDWARE <br />
                            <span className="font-light text-muted-foreground/50">MEETS</span> <br />
                            <span className="text-primary">SOFTWARE</span>
                        </motion.h2>

                        <div className="h-1 w-32 bg-primary mb-12" />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-xl leading-relaxed max-w-lg"
                        >
                            I am a <span className="text-foreground font-semibold">500-level Electrical & Electronics Engineering student</span> and <span className="text-foreground font-semibold">Flutter Developer</span>.
                            I don't just write code; I understand the electrons flowing through the circuits.
                            My goal is to build systems that are robust, scalable, and physically grounded.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] w-full rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl font-mono text-sm md:text-base"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="ml-4 text-xs text-muted-foreground">nisan@portfolio:~</div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 text-green-400/90 h-full overflow-hidden">
                            {lines.map((line, i) => (
                                <div key={i} className="mb-2 break-all">
                                    {line}
                                </div>
                            ))}
                        </div>

                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
