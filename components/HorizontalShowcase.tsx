"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Project {
    id: number;
    title: string;
    month: string;
    category: string;
    description: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    mainImg: string;
    introImg: string; // The "Isometric/Figma" parallax image
    type: "mobile" | "desktop";
}

const projects: Project[] = [
    {
        id: 1,
        title: "Neural Analytics",
        month: "JANUARY",
        category: "AI INFRASTRUCTURE",
        description:
            "An exploration of motion design through a precise, technical aesthetic.",
        bgColor: "#f5b8c9",
        textColor: "#1a1c1f",
        accentColor: "#ffffff",
        mainImg:
            "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1200&h=800&fit=crop",
        introImg:
            "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&h=1000&fit=crop",
        type: "desktop",
    },
    {
        id: 2,
        title: "Netflix Dream Team",
        month: "FEBRUARY",
        category: "DIGITAL EXPERIENCE",
        description:
            "Our work for Netflix goes live. Ta-dum! We redesigned the jobs site.",
        bgColor: "#18b0ae",
        textColor: "#f0d866",
        accentColor: "#e96d8e",
        mainImg:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=800&fit=crop",
        introImg:
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&h=1000&fit=crop",
        type: "mobile",
    },
    {
        id: 3,
        title: "Salon of the Future",
        month: "MARCH",
        category: "WEB / L'OREAL",
        description:
            "Breaking the system. A modular approach to future beauty standards.",
        bgColor: "#cdf270",
        textColor: "#070706",
        accentColor: "#ffffff",
        mainImg:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&h=800&fit=crop",
        introImg:
            "https://images.unsplash.com/photo-1526045612212-70caf35c11bc?q=80&w=1000&h=1000&fit=crop",
        type: "desktop",
    },
    {
        id: 5,
        title: "Klook: The Best You",
        month: "MAY",
        category: "DIGITAL / INTERACTIVE",
        description:
            "Interactive quiz which gained 1 million unique visits in the first month.",
        bgColor: "#000000",
        textColor: "#ffffff",
        accentColor: "#FF5733",
        mainImg:
            "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&h=800&fit=crop",
        introImg:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&h=1000&fit=crop",
        type: "mobile",
    },
    {
        id: 4,
        title: "Blue Yard",
        month: "APRIL",
        category: "VENTURE CAPITAL",
        description:
            "Interactive petal experiments and cellular synchronization.",
        bgColor: "#000000",
        textColor: "#0aa8ff",
        accentColor: "#ffffff",
        mainImg: "./tikaGradientImage.png",
        introImg: "./tikaGradientImage2.png",
        type: "desktop",
    },
];

const HorizontalShowcase = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Map vertical scroll to horizontal move.
    // We have 5 projects, each with an Intro + Content (10 slides total)
    // Each slide is roughly 100vw.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    return (
        <section ref={targetRef} className="relative z-10 h-[1200vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex h-full">
                    {projects.map((project) => (
                        <React.Fragment key={project.id}>
                            {/* SLIDE A: THE PARALLAX INTRO (Figma/Isometric Indication) */}
                            <div
                                className="relative flex h-full shrink-0 items-center overflow-hidden"
                                style={{ backgroundColor: project.bgColor }}
                            >
                                <div className="relative h-full">
                                    <img
                                        src={project.introImg}
                                        className="h-full w-full object-cover"
                                        alt={project.title}
                                    />
                                </div>
                            </div>

                            {/* SLIDE B: THE MAIN PROJECT CONTENT */}
                            <div
                                className="relative flex h-full w-[130vw] shrink-0 items-center px-24"
                                style={{ backgroundColor: project.bgColor }}
                            >
                                <div className="flex w-full items-center justify-between gap-20">
                                    {/* Left Column: Typography */}
                                    <div className="max-w-xl">
                                        <div
                                            className="mb-12 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em]"
                                            style={{ color: project.textColor }}
                                        >
                                            <span
                                                className="border px-2 py-1 opacity-50"
                                                style={{
                                                    borderColor:
                                                        project.textColor,
                                                }}
                                            >{`0${project.id}`}</span>
                                            <span
                                                style={{
                                                    color: project.accentColor,
                                                }}
                                            >
                                                [{project.category}]
                                            </span>
                                        </div>

                                        <h2
                                            className="text-[7vw] font-bold leading-[0.9] tracking-tighter"
                                            style={{ color: project.textColor }}
                                        >
                                            {project.title}
                                        </h2>

                                        <p
                                            className="mt-10 text-xl font-light leading-relaxed opacity-80"
                                            style={{ color: project.textColor }}
                                        >
                                            {project.description}
                                        </p>

                                        <button
                                            className="mt-12 group flex items-center gap-4 font-mono text-xs tracking-widest uppercase"
                                            style={{ color: project.textColor }}
                                        >
                                            <span className="h-[1px] w-8 bg-current transition-all group-hover:w-16" />
                                            View Case Study [+]
                                        </button>
                                    </div>

                                    {/* Right Column: Main UI Frame */}
                                    <div className="relative flex-1 flex justify-center">
                                        <div
                                            className={`relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden
                        ${
                            project.type === "mobile"
                                ? "w-[320px] h-[640px] rounded-[3rem] border-[10px] border-zinc-900 bg-zinc-800"
                                : "w-full aspect-video rounded-xl bg-zinc-800"
                        }`}
                                        >
                                            <img
                                                src={project.mainImg}
                                                className="h-full w-full object-cover"
                                                alt=""
                                            />
                                        </div>

                                        {/* Month Script Overlay (The elegant "March/April" text) */}
                                        <h3
                                            className="absolute -top-10 -left-10 text-[12vw] pointer-events-none opacity-10 italic font-serif"
                                            style={{ color: project.textColor }}
                                        >
                                            {project.month.toLowerCase()}
                                        </h3>
                                    </div>
                                </div>

                                {/* Connecting SVG Line (Visual Polish) */}
                                <svg
                                    className="absolute bottom-0 left-0 w-full h-32 opacity-10"
                                    viewBox="0 0 1440 320"
                                >
                                    <path
                                        fill="none"
                                        stroke={project.textColor}
                                        strokeWidth="2"
                                        d="M0,160 C320,300 420,0 720,160 C1020,320 1120,20 1440,160"
                                    />
                                </svg>
                            </div>
                        </React.Fragment>
                    ))}

                    {/* END SECTION */}
                    <div className="flex h-full w-screen shrink-0 flex-col items-center justify-center bg-black text-white">
                        <h2 className="text-[10vw] font-black tracking-tighter italic">
                            LETS TALK
                        </h2>
                        <p className="font-mono text-sm tracking-widest opacity-50 uppercase">
                            Create your next plot twist
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HorizontalShowcase;
