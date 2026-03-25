"use client";
import RevealOnScroll from "./RevealOnScroll";

export default function AboutSection() {
    return (
        <section className="relative w-full min-h-screen bg-[#00024c] overflow-hidden flex flex-col justify-center px-6 md:px-20 py-24">
            {/* Decorative Arc remains as is */}
            <div className="absolute top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full border-[1px] border-[#c4e7ff]/10 pointer-events-none" />

            <div className="relative z-10 max-w-[1600px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* THE HEADLINE - Now punchier and less "AI-generated" */}
                <div className="md:col-span-10">
                    <RevealOnScroll
                        as="h2"
                        className="font-national-extrabold text-[#F5F5F7] text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase"
                    >
                        Engineered <br />
                        Beyond <br />
                        Expectations
                    </RevealOnScroll>
                </div>

                {/* THE CONTENT BLOCK - More natural, human, and authoritative */}
                <div className="md:col-start-7 md:col-span-7 flex flex-col items-start gap-10 mt-12 md:mt-0">
                    <RevealOnScroll
                        as="p"
                        className="text-[#F5F5F7] text-2xl md:text-3xl lg:text-[2.2vw] leading-[1.3] font-right-grotesk-medium tracking-tight"
                    >
                        We build the things others call impossible. By merging
                        deep logic with the speed of modern AI, we engineer
                        high-performance systems that actually work. No fluff,
                        no jargon—just honest code and world-class results.
                    </RevealOnScroll>

                    {/* THE BUTTON */}
                    <button className="button-hyperion text-xs font-bold uppercase tracking-[0.2em] px-8 py-4">
                        <span className="button-hyperion__label">
                            <span className="button-hyperion__text">Our Manifesto</span>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
