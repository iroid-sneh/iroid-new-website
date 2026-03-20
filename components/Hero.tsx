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
        <section className="relative z-30 w-full h-screen bg-[#00024c] overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
            {/* 2. MAIN CONTENT AREA */}
            <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-start justify-center">
                {/* MAIN HEADLINE */}
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-pressio-test43 text-[#F5F5F7] text-[10vw] md:text-[8vw] leading-[0.9] tracking-[-0.04em] uppercase antialiased-text text-left"
                >
                    Crafted <br />
                    <span className="text-transparent border-t-0 bg-clip-text bg-gradient-to-r from-[#F5F5F7] to-[#c4e7ff]/50">
                        Beyond the Surface
                    </span>
                </motion.h1>

                {/* THE EDITORIAL PARAGRAPH - Forced into 2 lines for "Premium" feel */}
                <div className="w-full flex justify-end mt-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="max-w-[380px] text-left" // Restricted width forces it into 2-3 lines
                    >
                        <p className="text-[#F5F5F7] text-[15px] leading-[1.6] font-right-grotesk-medium tracking-tight uppercase">
                            Invisible engineering, visible impact. We architect
                            digital products where uncompromising code meets
                            human purpose.
                        </p>

                        {/* THE CTA - Cleaned up to be more "Black Edition" minimal */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="mt-6 px-6 py-2 bg-[#F5F5F7] text-[#00024c] rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all hover:bg-white"
                        >
                            View Artifacts
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
