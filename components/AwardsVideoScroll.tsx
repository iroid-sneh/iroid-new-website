// "use client";
// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const AWARDS_DATA = [
//     { title: "15 Years", desc: "of Expertise in Digital Craft" },
//     { title: "60+", desc: "International Honors & Achievements" },
//     { title: "1200+", desc: "Successful Projects Delivered" },
//     { title: "30+", desc: "International Strategic Partners" },
// ];

// export default function AwardsVideoScroll() {
//     const containerRef = useRef(null);
//     const videoWrapperRef = useRef(null);
//     const introTextRef = useRef(null);
//     const awardsRef = useRef<HTMLDivElement[]>([]);

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "+=1000%", // Longer duration to allow distinct steps
//                     pin: true,
//                     scrub: 1,
//                 },
//             });

//             // --- PHASE 1: MOBILE SIZE ENTRY ---
//             // Video slides up from bottom in a small phone shape
//             tl.fromTo(
//                 videoWrapperRef.current,
//                 {
//                     y: "100vh",
//                     scale: 0.8,
//                     clipPath: "inset(18% 38% 18% 38% round 40px)", // Phone-like size
//                 },
//                 {
//                     y: "0vh",
//                     duration: 3,
//                     ease: "power2.out",
//                 }
//             );

//             // --- PHASE 2: THE PAUSE ---
//             // Stays in mobile size for a brief scroll duration
//             tl.to({}, { duration: 1 });

//             // --- PHASE 3: THE 3D FLIP ---
//             // Flips 180 degrees while staying in mobile size
//             tl.to(videoWrapperRef.current, {
//                 rotationY: 180,
//                 duration: 3,
//                 ease: "power1.inOut",
//             });

//             // --- PHASE 4: THE EXPANSION (Scaling to Full Screen) ---
//             // Happens ONLY AFTER the flip is finished
//             tl.to(videoWrapperRef.current, {
//                 clipPath: "inset(0% 0% 0% 0% round 0px)",
//                 scale: 1,
//                 duration: 4,
//                 ease: "expo.inOut",
//             });

//             // Fade out the intro text as the video expands to cover it
//             tl.to(
//                 introTextRef.current,
//                 {
//                     opacity: 0,
//                     duration: 1,
//                 },
//                 "-=3.5"
//             ); // Starts fading mid-way through expansion

//             // --- PHASE 5: SEQUENTIAL OVERLAY TEXT ---
//             AWARDS_DATA.forEach((award, index) => {
//                 // Text enters from bottom
//                 tl.fromTo(
//                     awardsRef.current[index],
//                     { y: "150%", opacity: 0 },
//                     { y: "0%", opacity: 1, duration: 3, ease: "power2.out" }
//                 );

//                 // Pause on text
//                 tl.to({}, { duration: 2 });

//                 // Text leaves to top
//                 tl.to(awardsRef.current[index], {
//                     y: "-150%",
//                     opacity: 0,
//                     duration: 3,
//                     ease: "power2.in",
//                 });
//             });
//         });
//         return () => ctx.revert();
//     }, []);

//     return (
//         <div
//             ref={containerRef}
//             className="relative w-full h-screen bg-[#000014] overflow-hidden"
//             style={{ perspective: "2500px" }}
//         >
//             {/* LAYER 0: INTRO TEXT (BEHIND EVERYTHING) */}
//             <div
//                 ref={introTextRef}
//                 className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-6"
//             >
//                 <h2 className="font-heading text-6xl md:text-[100px] leading-none uppercase text-white opacity-80">
//                     5 Reasons <br /> To be with iRoid
//                 </h2>
//             </div>

//             {/* LAYER 1: THE VIDEO (STRECHED TO SCREEN, CLIPPED BY GSAP) */}
//             <div
//                 ref={videoWrapperRef}
//                 className="absolute inset-0 z-10 w-full h-full flex items-center justify-center overflow-hidden"
//                 style={{
//                     transformStyle: "preserve-3d",
//                     willChange: "clip-path, transform",
//                 }}
//             >
//                 <video
//                     className="w-full h-full object-cover"
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                 >
//                     <source src="/media/achieve-2.mp4" type="video/mp4" />
//                 </video>
//             </div>

//             {/* LAYER 2: OVERLAY SCROLLING TEXT (ON TOP OF VIDEO) */}
//             <div className="absolute inset-0 z-20 pointer-events-none">
//                 {AWARDS_DATA.map((award, i) => (
//                     <div
//                         key={i}
//                         ref={(el) => {
//                             if (el) awardsRef.current[i] = el;
//                         }}
//                         className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
//                     >
//                         <h3 className="font-heading text-6xl md:text-[120px] text-white uppercase leading-none mb-4">
//                             {award.title}
//                         </h3>
//                         <p className="font-accent text-xl md:text-3xl text-white italic opacity-80">
//                             {award.desc}
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AWARDS_DATA = [
    {
        title: "15 YEARS",
        desc: "OF EXPERTISE",
        sub: "A proven track record...",
    },
    {
        title: "60+",
        desc: "INTERNATIONAL AWARDS",
        sub: "Recognized by top international juries.",
    },
    {
        title: "1200+",
        desc: "PROJECTS",
        sub: "Successful projects delivered globally.",
    },
    {
        title: "30+",
        desc: "INTERNATIONAL PARTNERS",
        sub: "Collaborating with global leaders.",
    },
];

export default function AwardsVideoScroll() {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const introTextRef = useRef(null);
    const awardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=800%", // Long enough for all steps
                    pin: true,
                    scrub: 1,
                },
            });

            // 1. Initial State: Card is below screen
            // 2. Slide card up into the middle of the text
            tl.fromTo(
                cardRef.current,
                { y: "100vh", rotationY: -20, scale: 0.8 },
                { y: "0vh", rotationY: 0, scale: 1, duration: 2 }
            );

            // 3. The 3D Flip (Rotating the card to show the video/front face)
            // Note: In the video, it flips specifically to reveal the project
            tl.to(cardRef.current, {
                rotationY: 180,
                duration: 2,
                ease: "power2.inOut",
            });

            // 4. Expansion: Grow the card to fill the screen
            // We use a combination of scale and clipPath to make it seamless
            tl.to(
                cardRef.current,
                {
                    scale: 1,
                    width: "100vw",
                    height: "100vh",
                    borderRadius: "0px",
                    duration: 3,
                    ease: "none",
                },
                "-=0.5"
            );

            // 5. Fade out the background "5 Reasons" text as video fills screen
            tl.to(introTextRef.current, { opacity: 0, duration: 1 }, "-=2");

            // 6. Sequential Stats Overlay
            AWARDS_DATA.forEach((_, index) => {
                // Text comes up
                tl.fromTo(
                    awardsRef.current[index],
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2 }
                );

                // Stay for a bit (Scrubbing delay)
                tl.to({}, { duration: 2 });

                // Text goes up and out (except the last one if you want it to stay)
                if (index !== AWARDS_DATA.length - 1) {
                    tl.to(awardsRef.current[index], {
                        y: -100,
                        opacity: 0,
                        duration: 2,
                    });
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-[#f1f1f1] overflow-hidden"
        >
            {/* BACKGROUND TEXT LAYER */}
            {/* BACKGROUND TEXT LAYER */}
            <div
                ref={introTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-0 w-full overflow-hidden"
            >
                {/* Small Top Label */}
                <span className="text-[14px] md:text-[18px] font-bold text-black tracking-[0.3em] mb-4 uppercase">
                    5 Reasons
                </span>

                {/* Main Large Heading Row */}
                <div className="flex items-center justify-center w-full px-10">
                    <h2 className="text-[12vw] font-black leading-none text-black whitespace-nowrap uppercase tracking-tighter">
                        To Be
                    </h2>

                    {/* THE GAP: This width should match the initial width of your card (cardRef) */}
                    <div className="w-[25vw] md:w-[20vw] flex-shrink-0"></div>

                    <h2 className="text-[12vw] font-black leading-none text-black whitespace-nowrap uppercase tracking-tighter">
                        iRoid
                    </h2>
                </div>
            </div>

            {/* 3D CARD WRAPPER */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div
                    ref={cardRef}
                    className="relative w-[300px] h-[450px] bg-black rounded-xl overflow-hidden shadow-2xl"
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                    }}
                >
                    {/* BACK FACE (The wooden slats seen in recording 1) */}
                    <div className="absolute inset-0 w-full h-full bg-[#222] backface-hidden flex items-center justify-center">
                        <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-[#332211] h-full w-full rounded-sm"
                                />
                            ))}
                        </div>
                    </div>

                    {/* FRONT FACE (The Video) */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source
                                src="/media/achieve-2.mp4"
                                type="video/mp4"
                            />
                        </video>
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>
            </div>

            {/* STATS TEXT OVERLAY */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {AWARDS_DATA.map((award, i) => (
                    <div
                        key={i}
                        ref={(el) => (awardsRef.current[i] = el)}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 opacity-0"
                    >
                        <h3 className="text-[8vw] font-bold leading-none">
                            {award.title}
                        </h3>
                        <h4 className="text-[3vw] font-light tracking-widest mt-2">
                            {award.desc}
                        </h4>
                        <p className="max-w-md mt-6 text-lg opacity-70">
                            {award.sub}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
