"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionBuffer() {
    const { scrollYProgress } = useScroll();

    // Subtle light beam that grows as you scroll through the empty space
    const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 0.3]);
    const scale = useTransform(scrollYProgress, [0.1, 0.2], [0.8, 1.2]);

    return (
        <div className="relative w-full h-[50vh] bg-gradient-to-b from-[#000014] to-[#00024c] overflow-hidden flex items-center justify-center">
            {/* A cinematic "Lens Flare" or "Light Core" that appears in the blank space */}
            <motion.div
                style={{ opacity, scale }}
                className="w-[60vw] h-[60vw] rounded-full bg-blue-500/20 blur-[120px]"
            />

            {/* Technical HUD line to keep the "System" feel */}
            <div className="absolute bottom-0 w-full h-[1px] bg-white/5 mx-auto max-w-[80vw]" />
        </div>
    );
}
