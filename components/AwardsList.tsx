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
            // Check if cursor is still inside one of the award rows
            const row = el?.closest("[data-award-row]");
            if (!row) {
                setHoveredIndex(null);
            } else {
                const idx = Number(row.getAttribute("data-award-row"));
                setHoveredIndex(idx);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(
        () => {
            // 1. THE ENTRANCE ANIMATION (Your existing code)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            rowsRef.current.forEach((row, index) => {
                const mask = row.querySelector(".row-mask");
                tl.fromTo(
                    row,
                    { x: "100%", opacity: 0 },
                    { x: "0%", opacity: 1, duration: 0.8, ease: "power4.out" },
                    index * 0.1
                ).to(
                    mask,
                    { scaleX: 0, duration: 0.8, ease: "power2.inOut" },
                    "-=0.6"
                );
            });

            // 2. THE FIX: RESET HOVER STATE ON SCROLL EXIT
            // This ensures the image disappears when you scroll past the section
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top bottom", // When top of section enters bottom of viewport
                end: "bottom top", // When bottom of section leaves top of viewport
                onLeave: () => setHoveredIndex(null), // Scrolling down past the section
                onLeaveBack: () => setHoveredIndex(null), // Scrolling up past the section
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col"
        >
            {/* FLOATING IMAGE */}
            <div
                ref={imageRef}
                className="fixed top-0 left-0 w-[280px] h-[380px] pointer-events-none z-50 overflow-hidden rounded-xl opacity-0 shadow-2xl"
                style={{
                    opacity: hoveredIndex !== null ? 1 : 0,
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease", // Increased duration for smoother hide
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

            <div className="max-w-screen w-full mx-auto px-10 pt-6">
                <p className="font-molika text-[10px] uppercase tracking-[0.5em] text-blue-500">
                    Recognition / Honors
                </p>
            </div>

            <div className="flex-grow flex flex-col max-w-screen w-full mx-auto px-10 mt-4">
                {AWARDS.map((award, index) => (
                    <div
                        key={award.id}
                        ref={(el) => (rowsRef.current[index] = el!)}
                        data-award-row={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative flex-1 flex items-center justify-between border-b border-white/10 cursor-none overflow-hidden"
                    >
                        <div className="row-mask absolute inset-0 bg-[#C4E7FF] z-20 origin-right" />

                        <div className="row-content relative z-10 w-full flex items-center justify-between group-hover:px-4 transition-all duration-500">
                            <div className="flex flex-col">
                                <span className="font-molika text-[9px] opacity-30 uppercase tracking-widest">
                                    Award 0{index + 1}
                                </span>
                                <h3 className="text-xl md:text-5xl font-black uppercase leading-none">
                                    {award.title}
                                </h3>
                            </div>

                            <div className="hidden md:block">
                                <p className="font-retail-italic italic text-xl text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {award.category}
                                </p>
                            </div>

                            <div className="text-right">
                                <span className="font-molika text-sm md:text-lg opacity-20 group-hover:opacity-100 transition-opacity">
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
