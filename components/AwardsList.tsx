"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
    {
        id: 1,
        title: "Top Leading App Dev",
        category: "Clutch India",
        org: "2022",
        img: "../clutch2022.png",
    },
    {
        id: 2,
        title: "Top Mobile App Dev",
        category: "Tech Behemoths",
        org: "2023",
        img: "../TechBehemoths2023.png",
    },
    {
        id: 3,
        title: "Top Web Development",
        category: "Tech Behemoths",
        org: "2023",
        img: "../TechBehemothsWeb2023.png",
    },
    {
        id: 4,
        title: "Top React JS Dev",
        category: "Tech Behemoths",
        org: "2023",
        img: "../TechBehemothsReactJS2023.png",
    },
    {
        id: 5,
        title: "Top Mobile App Dev",
        category: "TrueFirms",
        org: "2023",
        img: "../TrueFirms2024.png",
    },
    {
        id: 6,
        title: "Excellence in SaaS",
        category: "SOTY Nominee",
        org: "2025",
        img: "../TechBehemoths2023.png",
    },
];

export default function AwardsRevealList() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<HTMLDivElement[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useGSAP(
        () => {
            const xTo = gsap.quickTo(imageRef.current, "x", {
                duration: 0.6,
                ease: "power3",
            });
            const yTo = gsap.quickTo(imageRef.current, "y", {
                duration: 0.6,
                ease: "power3",
            });
            const handleMouseMove = (e: MouseEvent) => {
                mousePos.current = { x: e.clientX, y: e.clientY };
                xTo(e.clientX);
                yTo(e.clientY);
            };
            window.addEventListener("mousemove", handleMouseMove);
            return () =>
                window.removeEventListener("mousemove", handleMouseMove);
        },
        { scope: containerRef }
    );

    useEffect(() => {
        const handleScroll = () => {
            const { x, y } = mousePos.current;
            const el = document.elementFromPoint(x, y);
            const row = el?.closest("[data-award-row]");
            if (!row) setHoveredIndex(null);
            else setHoveredIndex(Number(row.getAttribute("data-award-row")));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            rowsRef.current.forEach((row, index) => {
                const ghost = row.querySelector(".row-mask-ghost");
                const primary = row.querySelector(".row-mask-primary");
                const content = row.querySelector(".row-content");
                const startTime = index * 0.12; // Mechanical stagger

                // Initial Setup
                gsap.set(row, { opacity: 0, x: 20 });
                gsap.set([ghost, primary], {
                    scaleX: 0,
                    transformOrigin: "right center",
                });
                gsap.set(content, { clipPath: "inset(0% 0% 0% 100%)" });

                tl.to(
                    row,
                    { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
                    startTime
                )

                    // --- REVEAL PHASE (Double Trail) ---
                    // 1. Ghost Mask Leads
                    .to(
                        ghost,
                        { scaleX: 1, duration: 0.5, ease: "expo.inOut" },
                        startTime
                    )
                    // 2. Content unclips with the ghost leader
                    .to(
                        content,
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            duration: 0.5,
                            ease: "expo.inOut",
                        },
                        startTime
                    )
                    // 3. Primary Mask Follows (0.1s lag)
                    .to(
                        primary,
                        { scaleX: 1, duration: 0.5, ease: "expo.inOut" },
                        startTime + 0.1
                    )

                    // --- EXIT PHASE (Trail at end) ---
                    // 4. Primary (Top) leaves first
                    .to(
                        primary,
                        {
                            scaleX: 0,
                            transformOrigin: "left center",
                            duration: 0.5,
                            ease: "expo.inOut",
                        },
                        startTime + 0.7
                    )
                    // End phase uses only the primary mask (no trailing ghost).
                    .set(ghost, { scaleX: 0 }, startTime + 0.7);
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-[#00024c] text-[#F5F5F7] overflow-hidden flex flex-col"
        >
            <div
                ref={imageRef}
                className="hidden md:block fixed top-0 left-0 w-[280px] h-[430px] pointer-events-none z-50 overflow-hidden opacity-0 shadow-2xl"
                style={{
                    opacity: hoveredIndex !== null ? 1 : 0,
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease",
                }}
            >
                {AWARDS.map((item, i) => (
                    <img
                        key={i}
                        src={item.img}
                        alt="Award"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredIndex === i ? "opacity-100" : "opacity-0"} scale-110`}
                    />
                ))}
            </div>

            <div className="max-w-screen w-full mx-auto px-4 sm:px-10 pt-8 sm:pt-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-blue-500">
                    Recognition / Honors
                </p>
            </div>

            <div className="flex-grow flex flex-col max-w-screen w-full mx-auto px-4 sm:px-10 mt-4 mb-8 sm:mb-12 border-t border-white/10">
                {AWARDS.map((award, index) => (
                    <div
                        key={award.id}
                        ref={(el) => {
                            if (el) rowsRef.current[index] = el;
                        }}
                        data-award-row={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative flex-1 flex items-center justify-between border-b border-white/10 cursor-default md:cursor-none overflow-hidden transition-colors duration-300 hover:bg-[#C4E7FF] px-1 sm:px-0"
                    >
                        {/* THE GHOST SHUTTERS */}
                        <div className="row-mask-ghost absolute inset-0 bg-[#25A4FF] z-20 pointer-events-none" />
                        <div className="row-mask-primary absolute inset-0 bg-[#C4E7FF] z-21 pointer-events-none" />

                        <div className="row-content relative z-10 w-full flex items-center justify-between transition-all duration-500">
                            <div className="flex flex-col">
                                <span className="font-mono text-[9px] opacity-30 uppercase tracking-widest transition-colors duration-300 group-hover:text-[#00024c] group-hover:opacity-100">
                                    Award 0{index + 1}
                                </span>
                                <h3 className="text-base sm:text-xl md:text-5xl font-black uppercase leading-none transition-colors duration-300 group-hover:text-[#00024c]">
                                    {award.title}
                                </h3>
                            </div>

                            <div className="hidden md:block">
                                <p className="font-serif italic text-xl text-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-[#00024c]">
                                    {award.category}
                                </p>
                            </div>

                            <div className="text-right">
                                <span className="font-mono text-sm md:text-lg opacity-20 transition-all duration-300 group-hover:opacity-100 group-hover:text-[#00024c]">
                                    {award.org}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
