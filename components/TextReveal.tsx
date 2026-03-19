"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function TextReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        // 1. Split text into lines
        const split = new SplitType(textRef.current, { types: "lines" });
        if (!split.lines) return;

        split.lines.forEach((line) => {
            // Line Container Styling
            Object.assign(line.style, {
                position: "relative",
                display: "block",
                width: "fit-content",
                margin: "0 auto",
                overflow: "visible", // Allows ghost trail to peek out slightly
                clipPath: "inset(0% 100% 0% 0%)",
                webkitClipPath: "inset(0% 100% 0% 0%)",
            });

            // GHOST MASK (The Leader - Bright Blue)
            const ghost = document.createElement("div");
            ghost.className = "ghost-mask";
            Object.assign(ghost.style, {
                position: "absolute",
                top: "-2%", // Slightly taller to ensure visibility
                left: "0",
                width: "100%",
                height: "104%",
                backgroundColor: "#25A4FF",
                // backgroundColor: "#2D62E8",
                // backgroundColor: "#9CB8FF",
                // backgroundColor: "#EDEECE",
                // backgroundColor: "#69DFCA",
                // backgroundColor: "#E2D6D1",
                // backgroundColor: "#ffffff",
                zIndex: "10",
                pointerEvents: "none",
                transform: "scaleX(0)",
                transformOrigin: "left center",
            });

            // PRIMARY MASK (The Follower - Light Blue)
            const primary = document.createElement("div");
            primary.className = "primary-mask";
            Object.assign(primary.style, {
                position: "absolute",
                inset: "0",
                backgroundColor: "#c4e7ff",
                zIndex: "11",
                pointerEvents: "none",
                transform: "scaleX(0)",
                transformOrigin: "left center",
            });

            line.appendChild(ghost);
            line.appendChild(primary);
        });

        // 2. The Animation Timeline
        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "expo.inOut", duration: 0.7 },
        });

        split.lines.forEach((line, index) => {
            const ghost = line.querySelector(".ghost-mask");
            const primary = line.querySelector(".primary-mask");
            const startTime = index * 0.15; // Fast mechanical stagger

            tl.to(
                ghost,
                { scaleX: 1, transformOrigin: "left center" },
                startTime
            )
                // Reveal text exactly with the lead ghost mask
                .to(
                    line,
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        webkitClipPath: "inset(0% 0% 0% 0%)",
                    },
                    startTime
                )
                // Secondary mask follows 0.1s later for the "trail" effect
                .to(
                    primary,
                    { scaleX: 1, transformOrigin: "left center" },
                    startTime + 0.1
                )

                // EXIT PHASE: Shrink to the right
                .to(
                    ghost,
                    { scaleX: 0, transformOrigin: "right center" },
                    startTime + 0.7
                )
                .to(
                    primary,
                    { scaleX: 0, transformOrigin: "right center" },
                    startTime + 0.8
                );
        });

        // 3. Intersection Observer to trigger when scrolled into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        tl.play();
                        observer.disconnect(); // Play once
                    }
                });
            },
            { threshold: 0.1 }
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
                    className="text-white text-center text-4xl md:text-6xl lg:text-[7.5rem] leading-[0.9] font-black uppercase tracking-tighter"
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

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import SplitType from "split-type";

// export default function LandoTextReveal() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const textRef = useRef<HTMLHeadingElement>(null);

//     useEffect(() => {
//         if (!containerRef.current || !textRef.current) return;

//         // 1. Split text into lines
//         const split = new SplitType(textRef.current, { types: "lines" });

//         split.lines?.forEach((line) => {
//             // Line Styling to match Lando's F12 exact CSS
//             Object.assign(line.style, {
//                 position: "relative",
//                 display: "block",
//                 width: "fit-content",
//                 // Lando's site uses center alignment usually
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 overflow: "hidden",
//                 // The secret: Text starts clipped out
//                 clipPath: "inset(0% 100% 0% 0%)",
//                 webkitClipPath: "inset(0% 100% 0% 0%)",
//             });

//             // Create the "high-line-reveal" block
//             const mask = document.createElement("div");
//             mask.className = "high-line-reveal";

//             Object.assign(mask.style, {
//                 position: "absolute",
//                 top: "0",
//                 left: "0",
//                 width: "100%",
//                 height: "100%",
//                 // Exact Lando Lime-Off Color
//                 backgroundColor: "#b2c73a",
//                 zIndex: "5",
//                 transform: "scaleX(0)",
//                 transformOrigin: "left center",
//             });

//             line.appendChild(mask);
//         });

//         // 2. The Animation Timeline
//         const tl = gsap.timeline({ paused: true });

//         split.lines?.forEach((line, index) => {
//             const mask = line.querySelector(".high-line-reveal");
//             const lineStagger = index * 0.15; // Faster stagger for that mechanical feel

//             tl.to(mask, {
//                 scaleX: 1,
//                 duration: 0.5,
//                 ease: "expo.inOut",
//                 transformOrigin: "left center",
//             }, lineStagger)
//             .to(line, {
//                 clipPath: "inset(0% 0% 0% 0%)",
//                 webkitClipPath: "inset(0% 0% 0% 0%)",
//                 duration: 0.5,
//                 ease: "expo.inOut",
//             }, lineStagger)
//             // The "Shrink to Right" phase
//             .to(mask, {
//                 scaleX: 0,
//                 duration: 0.5,
//                 ease: "expo.inOut",
//                 transformOrigin: "right center",
//             }, lineStagger + 0.5); // Starts exactly when the first half ends
//         });

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         tl.play();
//                     }
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         observer.observe(containerRef.current);

//         return () => {
//             observer.disconnect();
//             split.revert();
//         };
//     }, []);

//     return (
//         <section
//             ref={containerRef}
//             className="relative w-full min-h-screen bg-[#101400] flex flex-col items-center justify-center py-32 px-4"
//         >
//             <div className="w-full max-w-6xl">
//                 <h2
//                     ref={textRef}
//                     style={{ fontFamily: 'var(--font-mona), sans-serif' }}
//                     className="text-white text-center text-5xl md:text-7xl lg:text-[8.25rem] leading-[0.83] font-bold uppercase tracking-[-0.1875rem]"
//                 >
//                     Redefining <br />
//                     limits, fighting <br />
//                     for <span style={{ color: "#b2c73a", fontFamily: 'serif' }}>wins</span>, <br />
//                     bringing it all <br />
//                     in all ways. <br />
//                     Defining a <span style={{ color: "#b2c73a", fontFamily: 'serif' }}>legacy</span>
//                 </h2>
//             </div>
//         </section>
//     );
// }
