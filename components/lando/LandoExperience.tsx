"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandoExperience() {
    // Existing Refs
    const shrinkContainerRef = useRef(null);
    const blackBoxRef = useRef(null);
    const horizontalSectionRef = useRef(null);
    const horizontalWrapperRef = useRef(null);

    // NEW: Ref for the sticky yellow section
    const stickyYellowRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. THE SHRINK ANIMATION
            gsap.to(blackBoxRef.current, {
                scale: 0.5,
                ease: "none",
                scrollTrigger: {
                    trigger: shrinkContainerRef.current,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    scrub: 1,
                    pinSpacing: true,
                },
            });

            // 2. THE HORIZONTAL SCROLL LOGIC
            const totalWidth = horizontalWrapperRef.current?.scrollWidth;
            const amountToScroll = totalWidth - window.innerWidth;

            gsap.to(horizontalWrapperRef.current, {
                x: -amountToScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: horizontalSectionRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 3. NEW: THE STICKY YELLOW TRANSITION (Codrops Style)
            // This pins the yellow div but allows the NEXT component (Hero) to slide over it
            ScrollTrigger.create({
                trigger: stickyYellowRef.current,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: false, // This is what creates the overlap effect
            });

            // 4. PARALLAX CARDS
            gsap.utils.toArray(".parallax-item").forEach((item: any) => {
                gsap.to(item, {
                    y: -150,
                    scrollTrigger: {
                        trigger: item,
                        scrub: true,
                    },
                });
            });

            // Recalculate all ScrollTriggers after setting up these pinned sections,
            // so downstream triggers (like TextReveal) get correct positions.
            ScrollTrigger.refresh();
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full">
            {/* SECTION 1: SHRINKING BOX */}
            <div
                ref={shrinkContainerRef}
                className="relative w-full h-screen bg-white overflow-visible border-none"
            >
                <div
                    ref={blackBoxRef}
                    className="w-full h-full bg-[#000014] flex flex-col items-center justify-center overflow-hidden border-none"
                    style={{
                        outline: "1px solid transparent",
                        backfaceVisibility: "hidden",
                    }}
                >
                    <section className="relative w-full h-full flex items-center justify-center px-10 mesh-visible">
                        <h1 className="font-druk text-[12vw] leading-none uppercase text-white text-center">
                            Quality <br /> Matters
                        </h1>
                        <div className="parallax-item absolute top-[60vh] right-[10%] w-[25vw] z-10">
                            <video
                                className="w-full h-full object-cover rounded-lg shadow-2xl border border-white/10"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source
                                    src="/media/achieve-3.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </section>
                </div>
            </div>

            {/* SECTION 2: HORIZONTAL SCROLL */}
            <section
                ref={horizontalSectionRef}
                className="relative h-screen bg-white overflow-hidden z-20 mt-[-1px]"
            >
                <div
                    ref={horizontalWrapperRef}
                    className="flex h-full w-[300vw] will-change-transform"
                >
                    <div className="w-screen h-full flex items-center px-20 shrink-0">
                        <h3 className="font-druk text-[8vw] text-black uppercase leading-[0.8]">
                            Your Vision. <br /> Our Integrity.
                        </h3>
                    </div>
                    <div className="w-screen h-full flex items-center px-20 shrink-0 bg-white">
                        <div className="max-w-4xl">
                            <span className="text-blue-600 font-mono text-sm tracking-widest uppercase mb-4 block">
                                02 / Expertise
                            </span>
                            <h4 className="font-druk text-[6vw] text-black uppercase leading-none">
                                Scalable Architecture
                            </h4>
                        </div>
                    </div>
                    <div className="w-screen h-full flex items-center px-20 shrink-0">
                        <h4 className="font-druk text-[6vw] text-black uppercase leading-none">
                            Driven by <br /> Results
                        </h4>
                    </div>
                </div>
            </section>

            {/* SECTION 3: THE STICKY YELLOW (Modified to use ref) */}
            <div
                ref={stickyYellowRef}
                className="h-screen w-full bg-white flex items-center justify-center z-10"
            >
                <h2 className="font-druk text-black text-[20vh] uppercase italic">
                    iRoid / Background Chapter
                </h2>
            </div>
        </div>
    );
}
