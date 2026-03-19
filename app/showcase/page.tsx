"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Reusable Block Reveal Component ---
interface BlockRevealProps {
    children: React.ReactNode;
    color?: string;
    direction?: "lr" | "rl" | "tb" | "bt";
    delay?: number;
}

const BlockReveal = ({
    children,
    color = "#5f27cd",
    direction = "lr",
    delay = 0,
}: BlockRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mask = maskRef.current;
        const content = contentRef.current;
        const container = containerRef.current;

        if (!mask || !content || !container) return;

        // Initial States based on direction
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
            },
            delay: delay,
        });

        if (direction === "lr") {
            gsap.set(mask, { scaleX: 0, transformOrigin: "left center" });
            gsap.set(content, { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 });

            tl.to(mask, { scaleX: 1, duration: 0.6, ease: "expo.inOut" })
                .to(
                    content,
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 0.6,
                        ease: "expo.inOut",
                    },
                    "-=0.6"
                )
                .to(mask, {
                    scaleX: 0,
                    transformOrigin: "right center",
                    duration: 0.6,
                    ease: "expo.out",
                });
        } else if (direction === "rl") {
            gsap.set(mask, { scaleX: 0, transformOrigin: "right center" });
            gsap.set(content, { clipPath: "inset(0% 0% 0% 100%)", opacity: 1 });

            tl.to(mask, { scaleX: 1, duration: 0.6, ease: "expo.inOut" })
                .to(
                    content,
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 0.6,
                        ease: "expo.inOut",
                    },
                    "-=0.6"
                )
                .to(mask, {
                    scaleX: 0,
                    transformOrigin: "left center",
                    duration: 0.6,
                    ease: "expo.out",
                });
        }

        return () => {
            tl.kill();
        };
    }, [direction, delay]);

    return (
        <div
            ref={containerRef}
            className="relative inline-block overflow-hidden"
        >
            <div ref={contentRef} className="opacity-0">
                {children}
            </div>
            <div
                ref={maskRef}
                className="absolute inset-0 z-10"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};

// --- Main Showcase Page ---
export default function BlockRevealShowcase() {
    return (
        <main className="bg-[#e9e9e9] text-[#111] font-sans selection:bg-purple-500 selection:text-white">
            {/* SECTION 1: HERO - Cascading Lines */}
            <section className="min-h-screen flex flex-col items-center justify-center p-10">
                <div className="flex flex-col items-center space-y-4">
                    <BlockReveal color="#ff9f43" direction="lr">
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                            Self-imposed
                        </h1>
                    </BlockReveal>

                    <BlockReveal color="#5f27cd" direction="rl" delay={0.2}>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                            limitations
                        </h1>
                    </BlockReveal>
                </div>
                <p className="mt-12 font-mono text-sm uppercase tracking-widest opacity-50">
                    Scroll down to see more
                </p>
            </section>

            {/* SECTION 2: IMAGE REVEAL - LEFT SIDE */}
            <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-20 px-10 md:px-20">
                <BlockReveal color="#1dd1a1" direction="lr">
                    <div className="aspect-[4/5] w-full bg-gray-300">
                        <img
                            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1000"
                            alt="Demo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </BlockReveal>

                <div className="space-y-6">
                    <BlockReveal color="#ee5253" direction="rl">
                        <h2 className="text-4xl font-bold uppercase">
                            The Fox and the Forest
                        </h2>
                    </BlockReveal>
                    <BlockReveal color="#2e86de" direction="rl" delay={0.1}>
                        <p className="text-xl max-w-md leading-relaxed">
                            Every revolution was once a thought in one man's
                            mind. Re-evaluating the standard for digital motion.
                        </p>
                    </BlockReveal>
                </div>
            </section>

            {/* SECTION 3: ALTERNATING TRIO (The 3rd logic you liked) */}
            <section className="min-h-screen flex flex-col justify-center space-y-10 px-10">
                <div className="w-full text-left">
                    <BlockReveal color="#ff6b6b" direction="lr">
                        <span className="text-5xl md:text-8xl font-black italic">
                            FUNKY TEXTS
                        </span>
                    </BlockReveal>
                </div>

                <div className="w-full text-right">
                    <BlockReveal color="#48dbfb" direction="rl" delay={0.1}>
                        <span className="text-5xl md:text-8xl font-black italic">
                            LOVE TECHNOLOGY
                        </span>
                    </BlockReveal>
                </div>

                <div className="w-full text-center">
                    <BlockReveal color="#feca57" direction="lr" delay={0.2}>
                        <span className="text-5xl md:text-8xl font-black italic">
                            AND REVEALS
                        </span>
                    </BlockReveal>
                </div>
            </section>

            {/* SECTION 4: THE BIG FINISH */}
            <section className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center p-10 text-center">
                <BlockReveal color="#ffffff" direction="lr">
                    <h2 className="text-7xl md:text-[12rem] font-black leading-none">
                        END.
                    </h2>
                </BlockReveal>
                <p className="mt-10 font-mono opacity-40">
                    Codrops Inspired Block Revealers
                </p>
            </section>
        </main>
    );
}
