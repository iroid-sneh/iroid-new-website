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
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500",
    },
    {
        id: 2,
        title: "Top Mobile App Dev",
        category: "Tech Behemoths",
        org: "2023",
        img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=500",
    },
    {
        id: 3,
        title: "Top Web Development",
        category: "Tech Behemoths",
        org: "2023",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500",
    },
    {
        id: 4,
        title: "Top React JS Dev",
        category: "Tech Behemoths",
        org: "2023",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500",
    },
    {
        id: 5,
        title: "Top Mobile App Dev",
        category: "TrueFirms",
        org: "2023",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500",
    },
    {
        id: 6,
        title: "Excellence in SaaS",
        category: "SOTY Nominee",
        org: "2025",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500",
    },
];

export default function AwardsRevealList() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<HTMLDivElement[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // 1. SMOOTH MOUSE FOLLOW LOGIC (QuickTo for 60fps performance)
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
                xTo(e.clientX);
                yTo(e.clientY);
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () =>
                window.removeEventListener("mousemove", handleMouseMove);
        },
        { scope: containerRef }
    );

    // 2. THE SLIDE-IN + REVEAL ANIMATION
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    once: true, // Only happens once
                },
            });

            rowsRef.current.forEach((row, index) => {
                const mask = row.querySelector(".row-mask");
                const content = row.querySelector(".row-content");

                // Individual Timeline for each row
                tl.fromTo(
                    row,
                    { x: "100%", opacity: 0 },
                    { x: "0%", opacity: 1, duration: 0.8, ease: "power4.out" },
                    index * 0.15 // The "One by one in delay" effect
                ).to(
                    mask,
                    {
                        scaleX: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    "-=0.6"
                ); // Wipes the reveal mask while the row is still moving
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-black text-white py-40 overflow-hidden"
        >
            {/* THE FLOATING HOVER IMAGE (Z-50) */}
            <div
                ref={imageRef}
                className="fixed top-0 left-0 w-[400px] h-[280px] pointer-events-none z-50 overflow-hidden rounded-lg opacity-0"
                style={{
                    opacity: hoveredIndex !== null ? 1 : 0,
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.1s ease",
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

            <div className="max-w-[1400px] mx-auto px-10">
                {/* SECTION HEADER */}
                <p className="font-molika text-[10px] uppercase tracking-[0.5em] text-blue-500 mb-10">
                    Recognition / Honors
                </p>

                {/* THE LIST */}
                <div className="flex flex-col">
                    {AWARDS.map((award, index) => (
                        <div
                            key={award.id}
                            ref={(el) => (rowsRef.current[index] = el!)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative flex items-center justify-between py-12 border-b border-white/10 cursor-none"
                        >
                            {/* THE REVEAL MASK (The wipe effect) */}
                            <div className="row-mask absolute inset-0 bg-[#C4E7FF] z-20 origin-right" />

                            {/* THE CONTENT */}
                            <div className="row-content relative z-10 w-full flex items-center justify-between group-hover:px-8 transition-all duration-500">
                                {/* Left: Title */}
                                <div className="flex flex-col">
                                    <span className="font-molika text-[10px] opacity-40 uppercase tracking-widest mb-2">
                                        Award {index + 1}
                                    </span>
                                    <h3 className="text-3xl md:text-6xl font-black uppercase leading-none">
                                        {award.title}
                                    </h3>
                                </div>

                                {/* Center: Category */}
                                <div className="hidden md:block">
                                    <p className="font-retail-italic italic text-2xl text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {award.category}
                                    </p>
                                </div>

                                {/* Right: Year/Org */}
                                <div className="text-right">
                                    <span className="font-molika text-lg md:text-xl opacity-20 group-hover:opacity-100 transition-opacity">
                                        {award.org}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
