"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, BrainCircuit, GraduationCap, Network, Smartphone, Zap } from "lucide-react";

const services = [
  {
    title: "Mobile App Development",
    description:
      "Cross-platform Flutter apps with clean UI, Firebase/local data, REST APIs, notifications, file handling, authentication, state management and deployment preparation.",
    icon: Smartphone,
  },
  {
    title: "Engineering Technology",
    description:
      "Practical exposure to power systems, broadcast chains, substation operations, RF transmission, fiber optics, microwave links and network monitoring.",
    icon: Zap,
  },
  {
    title: "AI and Data Systems",
    description:
      "Machine learning experimentation for energy management using feature engineering, classification, regression, baselines and time-series evaluation.",
    icon: BrainCircuit,
  },
  {
    title: "Robotics and Automation",
    description:
      "Interest and capstone work in systems where digital workflows, authentication and control logic connect to physical movement and office automation.",
    icon: Bot,
  },
  {
    title: "Connectivity Infrastructure",
    description:
      "Fiber diagnostics, OTDR testing, CPE and router configuration, static IP/VLAN concepts, PRTG monitoring and field troubleshooting.",
    icon: Network,
  },
  {
    title: "Technical Education",
    description:
      "Python teaching, beginner-friendly programming instruction, portfolio facilitation, student talks and practical technical communication.",
    icon: GraduationCap,
  },
];

export function Services() {
  return (
    <section id="services" className="py-28 relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14"
        >
          <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">What I do</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
            I build software with an engineering view of real-world systems.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.04 }}
              className="glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary grid place-items-center mb-5">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
