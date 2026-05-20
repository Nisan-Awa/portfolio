"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";

const contactLinks = [
  { label: "WhatsApp", href: "https://wa.link/y47r9e", icon: Phone },
  { label: "Email", href: "mailto:nisanawa5@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nisan-awa-tojah", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/Nisan-Awa", icon: Github },
];

const downloads = [
  { label: "NisanApp Cloud", href: "/downloads/apps/nisanapp-cloud-release.apk" },
  { label: "NisanApp Local", href: "/downloads/apps/nisanapp-local-release.apk" },
  { label: "LunaCycle", href: "/downloads/apps/lunacycle-release.apk" },
  { label: "DiamondCity", href: "/downloads/apps/diamondcity-release.apk" },
];

export function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="glass-panel rounded-[2rem] p-8 md:p-12 text-center"
        >
          <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-5">Contact</p>
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            Open to mobile development, software internships and engineering technology roles.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
            I am focused on Flutter engineering, Firebase-backed systems, AI-enabled engineering solutions, robotics integration and products that connect hardware, software and human needs.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-2xl border border-border bg-background p-5 hover:bg-secondary transition-colors text-left"
              >
                <link.icon className="w-6 h-6 text-primary mb-4" />
                <div className="flex items-center justify-between gap-3">
                  <span className="font-black">{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-background p-5 text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <div>
                <h3 className="text-2xl font-black">Download featured apps</h3>
                <p className="text-muted-foreground mt-1">Release APKs included for the top portfolio apps.</p>
              </div>
              <Download className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-wrap gap-3">
              {downloads.map((download) => (
                <a
                  key={download.href}
                  href={download.href}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-border bg-card hover:bg-secondary font-bold text-sm"
                >
                  <Download className="w-4 h-4" />
                  {download.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 pt-8 border-t border-border text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Awa Nisan Tojah. All rights reserved.</p>
          <p className="font-mono text-xs tracking-widest uppercase opacity-70">
            Hardware meets software
          </p>
        </div>
      </div>
    </section>
  );
}
