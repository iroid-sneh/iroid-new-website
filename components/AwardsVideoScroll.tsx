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
import { useRef, useEffect, useCallback, useState } from "react";
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
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoLayerRef = useRef<HTMLDivElement>(null);
    const introTextRef = useRef(null);
    const awardsRef = useRef<HTMLDivElement[]>([]);
    const hasFlippedRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
    }, []);

    const tryPlayVideo = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force muted for mobile autoplay compliance
        video.muted = true;
        video.defaultMuted = true;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented
            });
        }
    }, []);

    useEffect(() => {
        const playOnInteraction = () => {
            tryPlayVideo();
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("scroll", playOnInteraction);
        };
        document.addEventListener("touchstart", playOnInteraction, {
            passive: true,
        });
        document.addEventListener("scroll", playOnInteraction, {
            passive: true,
        });

        return () => {
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("scroll", playOnInteraction);
        };
    }, [tryPlayVideo]);

    useEffect(() => {
        const isMobileCheck = window.innerWidth < 640;
        const video = videoRef.current;

        if (video) {
            // Programmatic attribute forcing for Mobile Safari
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
            video.setAttribute("webkit-playsinline", "");
            video.muted = true;
            video.load();
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: isMobileCheck ? "+=600%" : "+=800%",
                    pin: true,
                    scrub: 1,
                    onEnter: () => {
                        tryPlayVideo(); // Start playing as soon as we enter section
                    },
                    onUpdate: (self) => {
                        const flipMidpoint = 3 / (isMobileCheck ? 11 : 15);
                        if (
                            self.progress > flipMidpoint &&
                            !hasFlippedRef.current
                        ) {
                            hasFlippedRef.current = true;
                            if (videoLayerRef.current) {
                                videoLayerRef.current.style.opacity = "1";
                            }
                            tryPlayVideo();
                        }
                        if (
                            self.progress < flipMidpoint &&
                            hasFlippedRef.current
                        ) {
                            hasFlippedRef.current = false;
                            if (videoLayerRef.current) {
                                videoLayerRef.current.style.opacity = "0.01"; // Keep at 0.01 for mobile
                            }
                        }
                    },
                },
            });

            tl.fromTo(
                cardRef.current,
                { y: "100vh", rotationY: -20, scale: 0.8 },
                { y: "0vh", rotationY: 0, scale: 1, duration: 2 }
            );

            tl.to(cardRef.current, {
                rotationY: 180,
                duration: 2,
                ease: "power2.inOut",
            });

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

            tl.to(
                videoLayerRef.current,
                {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: "0px",
                    duration: 3,
                    ease: "none",
                },
                "-=3"
            );

            tl.to(introTextRef.current, { opacity: 0, duration: 1 }, "-=2");

            AWARDS_DATA.forEach((_, index) => {
                tl.fromTo(
                    awardsRef.current[index],
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2 }
                );
                tl.to({}, { duration: 2 });
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
    }, [tryPlayVideo]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-white overflow-hidden"
        >
            <div
                ref={introTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-0 w-full overflow-hidden"
            >
                <span className="text-[10px] sm:text-[14px] md:text-[18px] font-bold text-black tracking-[0.3em] sm:tracking-[0.6em] mb-2 sm:mb-4 uppercase">
                    5 Reasons
                </span>
                <div className="flex flex-col sm:flex-row items-center justify-center w-full px-4 sm:px-10">
                    <h2 className="text-[14vw] sm:text-[12vw] font-black font-druk leading-none text-black whitespace-nowrap uppercase">
                        To Be
                    </h2>
                    <div className="hidden sm:block w-[25vw] md:w-[20vw] flex-shrink-0"></div>
                    <div className="block sm:hidden h-[55vw]"></div>
                    <h2 className="text-[14vw] sm:text-[12vw] font-black font-druk leading-none text-black whitespace-nowrap uppercase">
                        iRoid
                    </h2>
                </div>
            </div>

            <div
                ref={videoLayerRef}
                className="absolute z-[11] rounded-xl overflow-hidden pointer-events-none"
                style={{
                    opacity: 0.01, // 0.01 prevents mobile from pausing video to save energy
                    width: isMobile ? "40vw" : "300px",
                    height: isMobile ? "50vw" : "450px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease",
                }}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto" // auto ensures mobile device pre-fetches the video
                >
                    <source src="/media/Reel.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                style={{ perspective: "1000px" }}
            >
                <div
                    ref={cardRef}
                    className="relative w-[40vw] h-[50vw] sm:w-[300px] sm:h-[450px] bg-black rounded-xl overflow-hidden shadow-2xl"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
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

                    <div
                        className="absolute inset-0 w-full h-full backface-hidden bg-black"
                        style={{ transform: "rotateY(180deg)" }}
                    />
                </div>
            </div>

            <div className="absolute inset-0 z-20 pointer-events-none">
                {AWARDS_DATA.map((award, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) awardsRef.current[i] = el;
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 opacity-0"
                    >
                        <h3 className="text-[10vw] sm:text-[8vw] font-bold leading-none">
                            {award.title}
                        </h3>
                        <h4 className="text-[3.5vw] sm:text-[3vw] font-light tracking-widest mt-1 sm:mt-2">
                            {award.desc}
                        </h4>
                        <p className="max-w-[80vw] sm:max-w-md mt-3 sm:mt-6 text-xs sm:text-lg opacity-70 px-4">
                            {award.sub}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
