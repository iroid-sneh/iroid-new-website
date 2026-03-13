"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// City data extracted from your provided code
const cities = [
    { name: "New York", top: "25%", left: "28%", start: 0.45 },
    { name: "London", top: "15%", left: "48%", start: 0.48 },
    { name: "Warsaw", top: "25%", left: "58%", start: 0.51 },
    { name: "Dubai", top: "65%", left: "68%", start: 0.54 },
    { name: "Miami", top: "55%", left: "25%", start: 0.57 },
    { name: "Los Angeles", top: "45%", left: "10%", start: 0.6 },
    { name: "Kyiv", top: "15%", left: "62%", start: 0.63 },
    { name: "Milan", top: "30%", left: "52%", start: 0.66 },
    { name: "Revelstoke", top: "18%", left: "8%", start: 0.69 },
    { name: "Montreal", top: "12%", left: "22%", start: 0.72 },
    { name: "New Jersey", top: "32%", left: "26%", start: 0.75 },
    { name: "Atlanta", top: "40%", left: "22%", start: 0.78 },
    { name: "Mumbai", top: "72%", left: "75%", start: 0.81 },
    { name: "Paris", top: "28%", left: "45%", start: 0.84 },
    { name: "Switzerland", top: "32%", left: "48%", start: 0.87 },
    { name: "Japan", top: "40%", left: "85%", start: 0.9 },
];

export default function MapSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    // --- TEXT ANIMATION (Phase 1: 0 to 0.5) ---
    // Line 1 moves from right (100%) to way left (-150%)
    const line1X = useTransform(smoothProgress, [0, 0.45], ["120%", "-150%"]);
    // Line 2 moves slightly slower/delayed
    const line2X = useTransform(smoothProgress, [0.05, 0.5], ["120%", "-150%"]);
    // Line 3 moves even more delayed
    const line3X = useTransform(
        smoothProgress,
        [0.04, 0.45],
        ["120%", "-150%"]
    );

    return (
        <div
            ref={containerRef}
            className="relative h-[600vh] bg-[#f8f8f8] font-sans"
        >
            <div className="sticky-section-target sticky top-0 h-screen w-full overflow-hidden">
                {/* 1. Background Grid (Your SVG Code) */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <GridBackground />
                </div>

                {/* 2. Scrolling Text Lines */}
                <div className="absolute inset-0 flex flex-col justify-center items-end z-10 pointer-events-none">
                    <motion.div
                        style={{ x: line1X }}
                        className="text-[12vw] font-bold text-black leading-none uppercase whitespace-nowrap pr-20"
                    >
                        We have done
                    </motion.div>
                    <motion.div
                        style={{ x: line2X }}
                        className="text-[12vw] font-bold text-black leading-none uppercase whitespace-nowrap pr-40"
                    >
                        Projects Around
                    </motion.div>
                    <motion.div
                        style={{ x: line3X }}
                        className="text-[12vw] font-bold text-black leading-none uppercase whitespace-nowrap pr-10"
                    >
                        The World
                    </motion.div>
                </div>

                {/* 3. Map Section (Pins & Degrees) */}
                <div className="relative w-full h-full max-w-7xl mx-auto z-20">
                    {cities.map((city, idx) => (
                        <MapPin
                            key={idx}
                            city={city}
                            progress={smoothProgress}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MapPin({ city, progress }: { city: any; progress: any }) {
    // Fade in city after its specific 'start' point
    // They stay visible until the end of the section
    const opacity = useTransform(
        progress,
        [city.start, city.start + 0.05],
        [0, 1]
    );
    const y = useTransform(progress, [city.start, city.start + 0.05], [10, 0]);

    return (
        <motion.div
            style={{ top: city.top, left: city.left, opacity, y }}
            className="absolute flex items-start gap-2.5"
        >
            {/* Lollipop-style pin: circle on top, stick below */}
            <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
                <div className="w-[1.5px] h-4 bg-black/40" />
            </div>
            <span className="text-[13px] md:text-[14px] font-semibold text-black uppercase tracking-tighter mt-2.5 whitespace-nowrap">
                {city.name}
            </span>
        </motion.div>
    );
}

// Minimalist version of the SVG Grid from your source code
function GridBackground() {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
        >
            {[...Array(13)].map((_, i) => (
                <line
                    key={`v-${i}`}
                    x1={24.25 + i * 118}
                    y1="0"
                    x2={24.25 + i * 118}
                    y2="800"
                    stroke="black"
                    strokeWidth="0.2"
                    opacity="0.1"
                />
            ))}
            {[...Array(8)].map((_, i) => (
                <line
                    key={`h-${i}`}
                    x1="0"
                    y1={51.75 + i * 116}
                    x2="1440"
                    y2={51.75 + i * 116}
                    stroke="black"
                    strokeWidth="0.2"
                    opacity="0.1"
                />
            ))}
        </svg>
    );
}
