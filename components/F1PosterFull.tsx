"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// This component renders the design layout.
// We will use this twice: one for the "Current" images and one for the "Next" images.
const PosterLayout = ({ images, title, clipPath = "none" }) => {
    const skewClass = "-skew-x-[45deg]";
    const innerStyle = {
        top: "-25%",
        bottom: "-25%",
        left: "-150%",
        right: "-150%",
    };

    return (
        <div
            className="absolute inset-0 w-full h-screen bg-[#0d151a] overflow-hidden"
            style={{ clipPath: clipPath }}
        >
            {/* LAYER 1: BASE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <img
                    src={images.mainBg}
                    className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
                    alt="bg"
                />
            </div>

            {/* LAYER 2: BEHIND-SUBJECT PANELS */}
            <div className="absolute inset-0 z-10 flex">
                <div
                    className={`w-[6%] h-full bg-black/80 ${skewClass} -ml-20 border-r border-white/10`}
                />
                <div
                    className={`relative w-[12%] h-[48%] right-[-15%] top-[20%] overflow-hidden ${skewClass}`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.womanLeft}
                            className="w-full h-full object-cover"
                            alt="w"
                        />
                    </div>
                </div>
            </div>

            {/* LAYER 3: MAIN CHARACTER */}
            <div className="absolute inset-0 z-20 flex justify-center items-start pt-10">
                <div className="relative w-[50%] h-[90%] flex justify-center">
                    <img
                        src={images.mainCharacter}
                        className="h-full object-contain z-20 brightness-110"
                        alt="main"
                    />
                </div>
            </div>

            {/* LAYER 4: OVER-SUBJECT SKEWED PANELS */}
            <div className="absolute inset-0 z-30">
                <div
                    className={`absolute right-[24%] top-[-5%] w-[14%] h-[40%] overflow-hidden ${skewClass} shadow-2xl`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.javierTop}
                            className="w-full h-full object-cover"
                            alt="j"
                        />
                    </div>
                </div>
                <div
                    className={`absolute right-[15%] bottom-[30%] w-[16%] h-[56%] overflow-hidden ${skewClass} shadow-xl`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.walkingMan}
                            className="w-full h-full object-cover"
                            alt="m"
                        />
                    </div>
                </div>
                <div
                    className={`absolute left-[25%] bottom-[5%] w-[12%] h-[40%] overflow-hidden ${skewClass}`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.damsonIdris}
                            className="w-full h-full object-cover"
                            alt="d"
                        />
                    </div>
                </div>
            </div>

            {/* LAYER 5: SPEED LINES */}
            <div className="absolute inset-0 z-50 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute h-[150%] w-[1px] bg-white/20 -top-[25%] ${skewClass}`}
                        style={{ left: `${i * 12 + 5}%` }}
                    />
                ))}
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 text-center">
                <h1 className="text-white font-black text-6xl tracking-tighter italic opacity-20 uppercase">
                    {title}
                </h1>
            </div>
        </div>
    );
};

const F1PosterFull = () => {
    const containerRef = useRef();
    const revealLineRef = useRef();

    const data = [
        {
            title: "Driver One",
            images: {
                mainBg: "https://images.unsplash.com/photo-1586260790835-e055196a768b?w=1000",
                womanLeft:
                    "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=600",
                javierTop:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
                walkingMan:
                    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600",
                damsonIdris:
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
                mainCharacter:
                    "https://images.unsplash.com/photo-1773853431084-eceaebe061c9?w=800",
            },
        },
        {
            title: "Challenger",
            images: {
                mainBg: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=1000",
                womanLeft:
                    "https://images.unsplash.com/photo-1530939986565-c0c17d114071?w=600",
                javierTop:
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
                walkingMan:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
                damsonIdris:
                    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600",
                mainCharacter:
                    "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800",
            },
        },
    ];

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%", // Scroll distance
                    pin: true,
                    scrub: 1,
                },
            });

            // Animate the clip-path of the top layer from right to left
            // inset(top right bottom left)
            tl.fromTo(
                ".overlay-layer",
                { clipPath: "inset(0% 0% 0% 100%)" },
                { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }
            );

            // Optional: Animate a "Scanner Line" to make the transition clear
            tl.fromTo(
                revealLineRef.current,
                { left: "100%" },
                { left: "0%", ease: "none" },
                0 // Start at same time as clipPath
            );
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-black"
        >
            {/* SECTION 1: BOTTOM LAYER */}
            <div className="absolute inset-0">
                <PosterLayout images={data[0].images} title={data[0].title} />
            </div>

            {/* SECTION 2: TOP LAYER (REVEALED ON SCROLL) */}
            <div className="overlay-layer absolute inset-0 z-40">
                <PosterLayout images={data[1].images} title={data[1].title} />
            </div>

            {/* THE CHANGING LINE (Visual Scanner) */}
            <div
                ref={revealLineRef}
                className="absolute top-0 bottom-0 w-[2px] bg-white z-[100] shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                style={{ left: "100%" }}
            />
        </div>
    );
};

export default F1PosterFull;
