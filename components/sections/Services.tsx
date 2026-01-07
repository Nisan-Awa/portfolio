"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Network, Settings } from "lucide-react";

const services = [
    {
        title: "Cross-Platform Mobile Development",
        description: "I build high-performance mobile applications for iOS and Android using a single codebase with Flutter. I focus on pixel-perfect UIs, smooth animations, and seamless backend integration.",
        icon: Smartphone,
        color: "text-teal-400",
        border: "group-hover:border-teal-400/50",
        bg: "group-hover:bg-teal-400/10"
    },
    {
        title: "Network Infrastructure Deployment",
        description: "I have hands-on experience in deploying enterprise-grade connectivity. From configuring VLANs and static IPs on routers to physical fiber optic splicing and microwave link alignment.",
        icon: Network,
        color: "text-blue-400",
        border: "group-hover:border-blue-400/50",
        bg: "group-hover:bg-blue-400/10"
    },
    {
        title: "Technical Engineering & Operations",
        description: "With a background in power systems (TCN) and broadcast engineering (FRCN), I bring a disciplined, analytical approach to troubleshooting complex technical faults in high-stakes environments.",
        icon: Settings,
        color: "text-purple-400",
        border: "group-hover:border-purple-400/50",
        bg: "group-hover:bg-purple-400/10"
    }
];

export function Services() {
    return (
        <section id="services" className="py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter">
                        MY <span className="text-primary">EXPERTISE</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Delivering comprehensive solutions across the digital and physical spectrum.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                            className={`p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 group hover:-translate-y-2 ${service.border}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 transition-colors duration-500 ${service.bg}`}>
                                <service.icon className={`w-7 h-7 ${service.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
