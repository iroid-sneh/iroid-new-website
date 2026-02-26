// components/Hero.tsx
"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        // <section className="relative w-full h-screen bg-[#000014] overflow-hidden flex flex-col justify-between p-6 md:p-12">
        <section className="relative w-full h-screen bg-[#00024c] overflow-hidden flex flex-col justify-between p-6 md:p-12">
            {/* 1. TOP HUD (Heads-Up Display) */}
            <div className="relative z-20 flex justify-between items-start w-full opacity-50">
                <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-white">
                    iRoid Solutions <br /> Specialized in SaaS
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-white text-right">
                    Est. 2015 <br /> Quality First
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto mb-20">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                    {/* Headline: Broken for visual rhythm */}
                    <div className="w-full lg:w-2/3">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="text-white text-5xl md:text-[120px] leading-[0.85] font-bold tracking-tighter uppercase"
                        >
                            Engineering <br />
                            <span className="text-transparent stroke-text italic font-light">
                                The Momentum
                            </span>{" "}
                            <br />
                            Of Success.
                        </motion.h1>
                    </div>

                    {/* Sub-headline: Offset to the right for "Editorial" look */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="w-full lg:w-[350px] space-y-6"
                    >
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed tracking-wide">
                            We don&apos;t just build apps, we accelerate
                            visions. Fusing 10 years of seasoned expertise with
                            an obsession to deliver software that scales as fast
                            as your ambition.
                        </p>

                        {/* Minimalist CTA */}
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="h-[1px] w-12 bg-white/20 group-hover:w-20 transition-all duration-500" />
                            <span className="text-[10px] uppercase tracking-widest text-white">
                                Get Started
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 3. BOTTOM BAR */}
            <div className="relative z-20 flex justify-between items-end w-full">
                <div className="flex gap-8">
                    {/* Placeholder for your social links / navigation items */}
                    <span className="text-[10px] text-white/30 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                        Linkedin
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                        Clutch
                    </span>
                </div>

                {/* Scroll Indicator */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] vertical-text mb-4">
                        Scroll
                    </span>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
                </div>
            </div>

            {/* 4. THREE.JS LAYER PLACEHOLDER */}
            <div className="absolute inset-0 z-0 opacity-40">
                {/* Your Three.js canvas will go here */}
                {/* Imagine the word "SUCCESS" floating in 3D glass behind the text */}
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                }
                .vertical-text {
                    writing-mode: vertical-rl;
                }
            `}</style>
        </section>
    );
}
