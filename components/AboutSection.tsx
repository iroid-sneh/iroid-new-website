"use client";
import RevealOnScroll from "./RevealOnScroll";

export default function AboutSection() {
    return (
        <section className="relative w-full min-h-screen bg-[#00024c] overflow-hidden flex flex-col justify-center px-6 md:px-20 py-24">
            {/* 1. THE DECORATIVE ARC/SPHERE (Inspired by Lusion's blue circle) */}
            {/* This adds that "3D Depth" look over your topographic background */}
            <div className="absolute top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full border-[1px] border-[#c4e7ff]/10 pointer-events-none" />
            {/* <div className="absolute -bottom-[20%] right-[5%] w-[40vw] h-[40vw] bg-[#c4e7ff]/5 blur-[120px] rounded-full pointer-events-none" /> */}

            <div className="relative z-10 max-w-[1600px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* 2. THE MASSIVE HEADLINE (Top/Left Area) */}
                <div className="md:col-span-10">
                    <RevealOnScroll
                        as="h2"
                        className="font-national-extrabold text-[#F5F5F7] text-[12vw] md:text-[10vw] leading-[0.85] tracking-[-0.03em] uppercase"
                    >
                        Engineered <br />
                        Beyond <br />
                        Expectations
                    </RevealOnScroll>
                </div>

                {/* 3. THE CONTENT BLOCK (Bottom/Right Area - exactly like Lusion) */}
                <div className="md:col-start-7 md:col-span-7 flex flex-col items-start gap-10 mt-12 md:mt-0">
                    <RevealOnScroll
                        as="p"
                        stagger={0.1}
                        className="text-[#F5F5F7] text-2xl md:text-3xl lg:text-[2.6vw] leading-[1.2] font-right-grotesk-medium tracking-tight"
                    >
                        iRoid is a boutique digital architecture studio. We
                        transform complex technological problems into elegant,
                        human-centric solutions that scale with your ambition
                        and define your digital legacy.
                    </RevealOnScroll>

                    {/* THE PILL BUTTON WITH DOT */}
                    <button className="group flex items-center gap-4 bg-[#F5F5F7] px-8 py-4 rounded-full">
                        <div className="w-2 h-2 bg-[#00024c] rounded-full group-hover:scale-125 transition-transform" />
                        <span className="text-[#00024c] text-xs font-bold uppercase tracking-[0.2em]">
                            About Studio
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
