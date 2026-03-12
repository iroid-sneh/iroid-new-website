// components/Hero.tsx
"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        /* Added 'relative' and 'z-30' so it slides OVER the pinned yellow section */
        <section className="relative z-30 w-full h-screen bg-[#00024c] overflow-hidden flex flex-col items-center justify-center p-6">
            {/* 1. TOP HUD */}
            <div className="absolute top-10 w-full max-w-[94vw] flex justify-between items-start opacity-30 z-20">
                <div className="font-molika text-[10px] uppercase tracking-[0.5em] leading-loose text-white">
                    Systems / Architecture <br /> Specialized in SaaS
                </div>
                <div className="font-molika text-[10px] uppercase tracking-[0.5em] text-right leading-loose text-white">
                    iRoid Solutions <br /> Global Operations
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <motion.h1
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }} // Changed to whileInView for the overlap feel
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-retail font-normal text-white text-[13vw] leading-[0.8] tracking-[-0.04em] uppercase antialiased-text"
                >
                    Quality <br /> Matters.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-6 font-molika text-white text-xs md:text-sm uppercase tracking-[0.8em] pl-[0.8em]"
                >
                    Engineering High-Performance Digital Products
                </motion.p>

                {/* 3. SECONDARY DESCRIPTORS */}
                <div className="flex justify-between w-full max-w-[85vw] mt-24 px-4 opacity-40">
                    <div className="flex flex-col gap-2">
                        <span className="font-molika text-[9px] uppercase tracking-[0.3em] text-white">
                            Foundation
                        </span>
                        <span className="font-retail text-white text-lg tracking-wider italic text-white">
                            Est. 2015
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="font-molika text-[9px] uppercase tracking-[0.3em] text-white">
                            Core Values
                        </span>
                        <span className="font-retail text-white text-lg tracking-wider italic text-white">
                            Integrity / Growth
                        </span>
                    </div>
                </div>
            </div>

            {/* 4. SCROLL INDICATOR */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
                <div className="w-[1px] h-12 bg-white" />
                <span className="font-molika text-[8px] uppercase tracking-[1em] pl-[1em] text-white">
                    Explore
                </span>
            </div>
        </section>
    );
}
