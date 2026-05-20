"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") {
            return "dark";
        }

        return window.localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        window.localStorage.setItem("portfolio-theme", nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
    };

    const scrollToSection = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else if (href.startsWith("#")) {
            window.location.href = `/${href}`;
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
            >
                <div
                    className={cn(
                        "pointer-events-auto flex items-center justify-between gap-4 px-5 py-3 rounded-full transition-all duration-500 border border-border",
                        isScrolled
                            ? "bg-card/85 backdrop-blur-xl shadow-lg shadow-primary/5 w-full max-w-6xl"
                            : "bg-card/65 backdrop-blur-md w-full max-w-6xl"
                    )}
                >
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection("#home")}>
                        <div className="w-9 h-9 rounded-full bg-foreground text-background grid place-items-center font-black text-sm group-hover:scale-105 transition-transform duration-300">
                            NA
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase text-foreground group-hover:text-primary transition-colors">
                            Nisan
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary group overflow-hidden"
                            >
                                <span className="relative z-10">{item.name}</span>
                                <motion.div
                                    className="absolute inset-0 bg-secondary rounded-full opacity-0 group-hover:opacity-100"
                                    layoutId="navbar-hover"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle light and dark theme"
                            className="text-foreground p-2 hover:bg-secondary rounded-full transition-colors border border-border"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                        <button
                            className="md:hidden text-foreground p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-4 z-40 bg-card/95 backdrop-blur-2xl rounded-3xl border border-border md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <nav className="flex flex-col items-center gap-6">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-3xl font-bold text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
