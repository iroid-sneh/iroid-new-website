"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorksTitle() {
    const titleRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(".reveal-text", {
                yPercent: 100,
                stagger: 0.2,
                ease: "power3.out",
                duration: 2.5,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });
        },
        { scope: titleRef }
    );

    return (
        <div
            ref={titleRef}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
            <h2 className="font-national-extrabold text-[19vw] leading-[0.85] uppercase text-white flex flex-col items-center text-center">
                {/* Line 1 Mask */}
                <span className="relative overflow-hidden inline-block">
                    <span className="reveal-text inline-block">
                        Selected
                    </span>
                </span>
                {/* Line 2 Mask */}
                <span className="relative overflow-hidden inline-block">
                    <span className="reveal-text inline-block">Works</span>
                </span>
            </h2>
        </div>
    );
}
