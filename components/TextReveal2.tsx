"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({
    text,
    className,
    delay = 0,
}: TextRevealProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!rootRef.current) return;

        const words = rootRef.current.querySelectorAll(".word");

        gsap.to(words, {
            y: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power4.out",
            delay: delay,
            scrollTrigger: {
                trigger: rootRef.current,
                start: "top 85%", // Starts when the text is 85% down the screen
                toggleActions: "play none none none", // Only plays once
            },
        });
    }, [delay]);

    // Split text into words and wrap them in a hidden overflow container (the mask)
    const words = text.split(" ");

    return (
        <div ref={rootRef} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden mr-[0.25em] py-1"
                >
                    <span
                        className="word inline-block translate-y-[110%]"
                        style={{ willChange: "transform" }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </div>
    );
}
