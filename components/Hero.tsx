// // components/Hero.tsx
// "use client";
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";

// // Dynamically import 3D to prevent SSR issues
// const Experience = dynamic(() => import("./Experience"), { ssr: false });

// export default function Hero() {
//     return (
//         <section className="relative w-full h-screen bg-[#000014] overflow-hidden">
//             {/* 1. THE 3D LAYER (Canvas) */}
//             <div className="absolute inset-0 z-0">
//                 <Experience />
//             </div>

//             {/* 2. THE UI OVERLAY (HUD) */}
//             <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 pointer-events-none">
//                 {/* TOP HUD */}
//                 <div className="flex justify-between items-start opacity-30">
//                     <div className="font-molika text-[10px] uppercase tracking-[0.5em] leading-loose">
//                         iOS / Android <br /> Native Systems
//                     </div>
//                     <div className="font-molika text-[10px] uppercase tracking-[0.5em] text-right leading-loose">
//                         iRoid Solutions <br /> Refined Integrity
//                     </div>
//                 </div>

//                 {/* CENTER CONTENT (Minimal text to let 3D shine) */}
//                 <div className="text-center">
//                     <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 0.6 }}
//                         transition={{ delay: 1, duration: 1 }}
//                         className="font-molika text-white text-[10px] uppercase tracking-[1.2em] pl-[1.2em]"
//                     >
//                         Engineering High-Performance Digital Products
//                     </motion.p>
//                 </div>

//                 {/* BOTTOM DESCRIPTORS */}
//                 <div className="flex justify-between w-full max-w-[94vw] mx-auto opacity-40 mb-10">
//                     <div className="flex flex-col gap-1">
//                         <span className="font-molika text-[9px] uppercase tracking-[0.3em]">
//                             Foundation
//                         </span>
//                         <span className="font-retail text-white text-lg italic">
//                             Est. 2015
//                         </span>
//                     </div>
//                     <div className="flex flex-col gap-1 text-right">
//                         <span className="font-molika text-[9px] uppercase tracking-[0.3em]">
//                             Core Values
//                         </span>
//                         <span className="font-retail text-white text-lg italic">
//                             Integrity / Growth
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* DARK VIGNETTE (Adds a premium cinematic feel) */}
//             <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000014_90%)]" />
//         </section>
//     );
// }

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
