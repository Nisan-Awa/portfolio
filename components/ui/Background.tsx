"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Background() {
    const shouldReduceMotion = useReducedMotion();

    const blobs = useMemo(() => [
        {
            initial: { scale: 1, x: 0, y: 0 },
            animate: shouldReduceMotion ? {} : {
                scale: [1, 1.1, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
            },
            transition: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            className: "top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[100px]",
        },
        {
            initial: { scale: 1, x: 0, y: 0 },
            animate: shouldReduceMotion ? {} : {
                scale: [1, 1.2, 1],
                x: [0, -50, 0],
                y: [0, 50, 0],
            },
            transition: { duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 },
            className: "top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 blur-[100px]",
        },
        {
            initial: { scale: 1, x: 0, y: 0 },
            animate: shouldReduceMotion ? {} : {
                scale: [1, 1.1, 1],
                x: [0, 30, 0],
                y: [0, 30, 0],
            },
            transition: { duration: 35, repeat: Infinity, ease: "easeInOut", delay: 5 },
            className: "bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-purple-500/5 blur-[120px]",
        },
    ], [shouldReduceMotion]);

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background">
            {/* Noise Texture Overlay - Optimized with CSS pattern if possible, but keeping SVG for aesthetic */}
            <div
                className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Gradient Blobs */}
            {blobs.map((blob, i) => (
                <motion.div
                    key={i}
                    initial={blob.initial}
                    animate={blob.animate}
                    transition={blob.transition as any}
                    style={{ willChange: shouldReduceMotion ? "auto" : "transform, opacity" }}
                    className={`absolute rounded-full mix-blend-screen ${blob.className}`}
                />
            ))}
        </div>
    );
}
