"use client";
import { motion } from "framer-motion";
import TextReveal2 from "./TextReveal2";

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-[#EEEDE4] overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
            {/* 2. MAIN CONTENT AREA */}
            <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-start justify-center">
                {/* MAIN HEADLINE */}
                <motion.h1 className="font-national-extrabold text-[#0D3479] text-[10vw] md:text-[8vw] leading-[0.9] tracking-tighter uppercase antialiased-text text-left">
                    <TextReveal2 text="Crafting" />
                    <TextReveal2 text="Beyond the Surface" />
                </motion.h1>

                {/* THE EDITORIAL PARAGRAPH - Forced into 2 lines for "Premium" feel */}
                <div className="w-full flex justify-end mt-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="max-w-[380px] text-left" // Restricted width forces it into 2-3 lines
                    >
                        <p className="text-[#0D3479] text-[15px] leading-[1.6] font-right-grotesk-medium tracking-tight uppercase">
                            Invisible engineering, visible impact. We architect
                            digital products where uncompromising code meets
                            human purpose.
                        </p>

                        {/* THE CTA */}
                        <button className="button-hyperion mt-6 text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-2">
                            <span className="button-hyperion__label">
                                <span className="button-hyperion__text">
                                    View Artifacts
                                </span>
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
