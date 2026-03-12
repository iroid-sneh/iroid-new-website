"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandoBackground() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-white">
            {/* Topographic Lines - The background that gets revealed */}
            <motion.div
                style={{ y, opacity: 0.1 }}
                className="absolute inset-0 w-full h-[110%] bg-[url('/media/topo-pattern.svg')] bg-repeat"
            />
            {/* Subtle light blobs for depth */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gray-100 rounded-full blur-[120px]" />
        </div>
    );
}
