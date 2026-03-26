"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Grid--3 from Scroll3DGrid demo: exact image order (img/18.jpg, img/29.jpg, ...)
const GRID3_IMAGE_ORDER = [
    18, 29, 6, 37, 15, 32, 41, 23, 5, 12, 27, 1, 46, 35, 20, 39, 8, 25, 2, 44,
    43, 17, 26, 11, 14, 7, 33, 30, 10, 21, 16, 31, 24, 36, 42, 3, 38, 9, 4, 40,
    28, 22, 34, 13, 19, 47, 45, 48,
];

// Images copied from Scroll3DGrid-main/Scroll3DGrid-main/img to public/media/scroll3dgrid/
function gridImageUrl(index: number) {
    return `/media/scroll3dgrid/${index}.jpg`;
}

function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        setIsMobile(window.innerWidth < 640);
    }, []);
    return isMobile;
}

export default function PerspectiveGrid() {
    const contentRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const gridWrapRef = useRef<HTMLDivElement>(null);
    const isMobileView = useIsMobile();

    useEffect(() => {
        if (!contentRef.current || !gridRef.current || !gridWrapRef.current)
            return;

        const grid = gridRef.current;
        const gridWrap = gridWrapRef.current;
        const gridItems = gridWrap.querySelectorAll(".grid__item");
        const gridItemsInner = [...gridItems].map((el) =>
            el.querySelector(".grid__item-inner")
        );

        // type3 CSS vars (same as Scroll3DGrid grid--3)
        const isMobile = window.innerWidth < 640;
        const cols = isMobile ? 4 : 8;
        grid.style.setProperty("--grid-width", "105%");
        grid.style.setProperty("--grid-columns", String(cols));
        grid.style.setProperty("--perspective", "1500px");
        grid.style.setProperty("--grid-inner-scale", "0.5");
        gridWrap.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        // Timeline: scrub while section scrolls (no pin) — same as demo
        const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: gridWrap,
                start: "top bottom+=5%",
                end: "bottom top-=5%",
                scrub: true,
                refreshPriority: -1,
            },
        });

        // type3 animation (grid--3)
        tl.set(gridItems, {
            transformOrigin: "50% 0%",
            z: () => gsap.utils.random(-5000, -2000),
            rotationX: () => gsap.utils.random(-65, -25),
            filter: "brightness(0%)",
        })
            .to(
                gridItems,
                {
                    xPercent: () => gsap.utils.random(-150, 150),
                    yPercent: () => gsap.utils.random(-300, 300),
                    rotationX: 0,
                    filter: "brightness(200%)",
                },
                0
            )
            .to(
                gridWrap,
                {
                    z: 6500,
                },
                0
            )
            .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0);

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={contentRef}
            className="relative z-40 overflow-hidden bg-black isolate"
            style={{
                paddingTop: isMobileView ? "30vh" : "60vh",
                paddingBottom: isMobileView ? "30vh" : "60vh",
                // Extra space below so Footer only appears after grid is fully out of view (keeps 3D feel)
                marginBottom: isMobileView ? "150vh" : "400vh",
            }}
        >
            <div
                ref={gridRef}
                className="grid grid--3 flex place-items-center p-8 w-full"
                style={{
                    perspective: "var(--perspective, 1500px)",
                    // CSS vars set in useEffect
                    ["--grid-width" as string]: "105%",
                    ["--grid-columns" as string]: "8",
                    ["--grid-inner-scale" as string]: "0.5",
                }}
            >
                <div
                    ref={gridWrapRef}
                    className="grid-wrap grid w-full"
                    style={{
                        width: "var(--grid-width, 105%)",
                        transformStyle: "preserve-3d",
                        gridTemplateColumns: "repeat(8, 1fr)",
                        gap: "var(--grid-gap, 2vw)",
                    }}
                >
                    {GRID3_IMAGE_ORDER.map((imgNum, i) => (
                        <div
                            key={i}
                            className="grid__item w-full overflow-hidden relative rounded-lg grid place-items-center"
                            style={{
                                aspectRatio: 1.5,
                            }}
                        >
                            <div
                                className="grid__item-inner rounded-lg bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${gridImageUrl(imgNum)})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 50%",
                                    position: "relative",
                                    width: "calc(1 / var(--grid-inner-scale, 1) * 100%)",
                                    height: "calc(1 / var(--grid-inner-scale, 1) * 100%)",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Title overlay — same as demo: left, bottom */}
            <div
                className="absolute inset-0 pointer-events-none flex items-end justify-start p-[10vw] z-10"
                style={{
                    top: "50%",
                    left: "50%",
                    margin: "-50vh 0 0 -50vw",
                    height: "100vh",
                    width: "100vw",
                    padding: "0 10vw",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    textAlign: "left",
                }}
            >
                <h3 className="font-retail text-white font-light text-[clamp(1.5rem,15vw,6.5rem)] leading-tight">
                    Embrace now,
                    <br />
                    tomorrow may fade.
                </h3>
            </div>
        </section>
    );
}
