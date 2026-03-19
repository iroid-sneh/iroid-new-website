"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// We slightly compressed the start times (0.02 increments) so the final pin
// arrives earlier, giving us a massive amount of scroll space for the transition.
const cities = [
    { name: "New York", top: "25%", left: "28%", start: 0.45 },
    { name: "London", top: "15%", left: "48%", start: 0.47 },
    { name: "Warsaw", top: "25%", left: "58%", start: 0.49 },
    { name: "Dubai", top: "65%", left: "68%", start: 0.51 },
    { name: "Miami", top: "55%", left: "25%", start: 0.53 },
    { name: "Los Angeles", top: "45%", left: "10%", start: 0.55 },
    { name: "Kyiv", top: "15%", left: "62%", start: 0.57 },
    { name: "Milan", top: "30%", left: "52%", start: 0.59 },
    { name: "Revelstoke", top: "18%", left: "8%", start: 0.61 },
    { name: "Montreal", top: "12%", left: "22%", start: 0.63 },
    { name: "New Jersey", top: "32%", left: "26%", start: 0.65 },
    { name: "Atlanta", top: "40%", left: "22%", start: 0.67 },
    { name: "Mumbai", top: "72%", left: "75%", start: 0.69 },
    { name: "Paris", top: "28%", left: "45%", start: 0.71 },
    { name: "Switzerland", top: "32%", left: "48%", start: 0.73 },
    { name: "Japan", top: "40%", left: "85%", start: 0.75 }, // Last pin appears at 0.75 now
];

export default function MapSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    const line1X = useTransform(smoothProgress, [0, 0.45], ["120%", "-150%"]);
    const line2X = useTransform(smoothProgress, [0.05, 0.5], ["120%", "-150%"]);
    const line3X = useTransform(
        smoothProgress,
        [0.04, 0.45],
        ["120%", "-150%"]
    );

    return (
        <div
            ref={containerRef}
            // If you still want the whole section to be even slower, change 600vh to 800vh
            className="relative h-[600vh] bg-[#f8f8f8] font-sans"
        >
            <div className="sticky-section-target sticky top-0 h-screen w-full overflow-hidden">
                {/* 1. Background Grid */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <GridBackground />
                </div>

                {/* 2. Scrolling Text Lines */}
                <div className="absolute inset-0 flex flex-col justify-center items-end z-10 pointer-events-none">
                    <motion.div
                        style={{ x: line1X }}
                        className="text-[14vw] sm:text-[12vw] font-bold text-black leading-none uppercase whitespace-nowrap pr-4 sm:pr-20"
                    >
                        We have done
                    </motion.div>
                    <motion.div
                        style={{ x: line2X }}
                        className="text-[14vw] sm:text-[12vw] font-bold text-black leading-none uppercase whitespace-nowrap pr-8 sm:pr-40"
                    >
                        Projects Around
                    </motion.div>
                    <motion.div
                        style={{ x: line3X }}
                        className="text-[14vw] sm:text-[12vw] font-bold text-black leading-none uppercase whitespace-nowrap pr-2 sm:pr-10"
                    >
                        The World
                    </motion.div>
                </div>

                {/* 3. Map Section */}
                <div className="relative w-full h-full max-w-7xl mx-auto z-20">
                    {cities.map((city, idx) => (
                        <MapPin
                            key={idx}
                            city={city}
                            progress={smoothProgress}
                            isTransitionPin={idx === cities.length - 1} // Tag the final pin
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MapPin({
    city,
    progress,
    isTransitionPin,
}: {
    city: any;
    progress: any;
    isTransitionPin?: boolean;
}) {
    // Normal entrance animation
    const opacity = useTransform(
        progress,
        [city.start, city.start + 0.05],
        [0, 1]
    );
    const y = useTransform(progress, [city.start, city.start + 0.05], [10, 0]);

    // TRANSITION ANIMATIONS (Only applies to the last pin)

    // We dynamically calculate the start of the scale animation so it begins right after
    // the pin drops in (0.07 after the start time).
    const expandStart = city.start + 0.07;

    // Scale takes up the ENTIRE rest of the scroll area (0.82 to 0.99)
    // This is more than twice as slow/smooth as the previous version.
    const scale = useTransform(progress, [expandStart, 0.99], [1, 800]);

    // Fade out the pin's stick and text gradually as it begins to grow
    const fadeOut = useTransform(
        progress,
        [expandStart, expandStart + 0.05],
        [1, 0]
    );

    return (
        <motion.div
            style={{ top: city.top, left: city.left, opacity, y }}
            // Use z-[100] on the transition pin so it covers all other pins when scaling
            className={`absolute flex items-start gap-2.5 ${isTransitionPin ? "z-[100]" : "z-10"}`}
        >
            <div className="flex flex-col items-center relative">
                {/* The Circle */}
                <motion.div
                    style={isTransitionPin ? { scale } : {}}
                    className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-black shrink-0 origin-center relative z-20"
                />
                {/* The Stick */}
                <motion.div
                    style={isTransitionPin ? { opacity: fadeOut } : {}}
                    className="w-[1px] sm:w-[1.5px] h-2 sm:h-4 bg-black/40 relative z-10"
                />
            </div>

            {/* The Text */}
            <motion.span
                style={isTransitionPin ? { opacity: fadeOut } : {}}
                className="text-[9px] sm:text-[13px] md:text-[14px] font-semibold text-black uppercase tracking-tighter mt-1.5 sm:mt-2.5 whitespace-nowrap"
            >
                {city.name}
            </motion.span>
        </motion.div>
    );
}

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
