"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function TextReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const split = new SplitType(textRef.current, { types: "lines" });

        split.lines?.forEach((line) => {
            if (line.querySelector(".line-mask")) return;

            line.style.width = "fit-content";
            line.style.margin = "0 auto";
            line.style.position = "relative";
            line.style.padding = "0.05em 0";

            const mask = document.createElement("div");
            mask.className = "line-mask";

            Object.assign(mask.style, {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "#C4E7FF",
                zIndex: "10",
                transformOrigin: "right",
                transform: "scaleX(1)",
            });

            line.appendChild(mask);
        });

        const masks = gsap.utils.toArray<HTMLElement>(".line-mask");

        // Use IntersectionObserver instead of ScrollTrigger so this
        // animation is fully isolated from other GSAP ScrollTriggers.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(masks, {
                            scaleX: 0,
                            stagger: 0.15,
                            ease: "power2.out",
                            duration: 1.2,
                        });
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.4, // fire when ~40% of the section is visible
            }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            split.revert();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#00024c] flex flex-col items-center justify-center py-32 px-4 md:px-12 lg:px-24"
        >
            <div className="w-full flex justify-center">
                <h2
                    ref={textRef}
                    className="text-white text-center text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] font-black uppercase tracking-tighter"
                >
                    Redefining limits,
                    <br />
                    fighting for <span className="text-[#25A4FF]">wins</span>,
                    <br />
                    bringing it all in
                    <br />
                    all ways. Defining a<br />
                    <span className="text-[#25A4FF]">legacy</span> in Web
                    Development
                    <br />
                    on and off the
                    <br />
                    screen.
                </h2>
            </div>
        </section>
    );
}
