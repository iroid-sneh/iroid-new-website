"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

export default function PixelTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(true); // Start active to cover initial load
    const router = useRouter();
    const pathname = usePathname();

    // Store context to kill animations on unmount
    const ctx = useRef<gsap.Context | null>(null);

    // 1. Generate Grid
    const generateGrid = () => {
        const container = containerRef.current;
        if (!container) return;

        // Clear existing
        container.innerHTML = "";

        const columns = window.innerWidth < 768 ? 6 : 8; // Adjust columns based on screen
        const blockSize = window.innerWidth / columns;
        const rowsNeeded = Math.ceil(window.innerHeight / blockSize);
        const totalBlocks = columns * rowsNeeded;

        // Apply Grid Styles directly
        container.style.display = "grid";
        container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;

        // Create blocks
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < totalBlocks; i++) {
            const block = document.createElement("div");
            block.classList.add("transition-block");
            // Initial state: If it's the very first load (isActive), make them visible
            block.style.opacity = isActive ? "1" : "0";
            fragment.appendChild(block);
        }
        container.appendChild(fragment);
    };

    // 2. Setup Grid on Mount & Resize
    useEffect(() => {
        generateGrid();

        // Animate OUT on initial load (Reference: Page Load Timeline)
        ctx.current = gsap.context(() => {
            if (isActive) {
                gsap.to(".transition-block", {
                    opacity: 0,
                    duration: 0.4, // Speed of fade out
                    stagger: { amount: 0.75, from: "random" },
                    onComplete: () => {
                        setIsActive(false);
                        if (containerRef.current)
                            containerRef.current.style.pointerEvents = "none";
                    },
                });
            }
        }, containerRef);

        window.addEventListener("resize", generateGrid);
        return () => {
            window.removeEventListener("resize", generateGrid);
            ctx.current?.revert();
        };
    }, []);

    // 3. Intercept Links (The "Enter" Animation)
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            // Validation: Ensure it's a valid internal link
            if (
                !link ||
                !link.href ||
                link.target === "_blank" ||
                link.href.startsWith("mailto:") ||
                link.href.startsWith("tel:") ||
                link.href.includes("#") ||
                link.href === window.location.href // Don't animate if clicking same page
            ) {
                return;
            }

            e.preventDefault();
            const href = link.getAttribute("href");

            if (href) {
                setIsActive(true); // Enable pointer events
                if (containerRef.current)
                    containerRef.current.style.pointerEvents = "all";

                // Animate IN (Cover Screen)
                ctx.current = gsap.context(() => {
                    gsap.set(".transition-block", { opacity: 0 }); // Ensure clean start
                    gsap.to(".transition-block", {
                        opacity: 1,
                        duration: 0.1, // Fast appear
                        stagger: { amount: 0.5, from: "random" },
                        onComplete: () => {
                            router.push(href); // Navigate after covered
                        },
                    });
                }, containerRef);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [router]);

    // 4. On Pathname Change (The "Exit" Animation)
    // This runs when the new page is ready
    useEffect(() => {
        // Only run if we are currently blocking the screen
        if (!isActive) return;

        ctx.current = gsap.context(() => {
            gsap.to(".transition-block", {
                opacity: 0,
                duration: 0.4,
                stagger: { amount: 0.75, from: "random" },
                onComplete: () => {
                    setIsActive(false);
                    if (containerRef.current)
                        containerRef.current.style.pointerEvents = "none";
                },
            });
        }, containerRef);
    }, [pathname]); // Triggers when route actually changes

    return (
        <div
            ref={containerRef}
            className={`transition-container ${isActive ? "active" : ""}`}
        />
    );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import gsap from "gsap";

// export default function SliceTransition() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [isActive, setIsActive] = useState(true);
//     const router = useRouter();
//     const pathname = usePathname();
//     const ctx = useRef<gsap.Context | null>(null);

//     // 1. Configuration: Match the Codrops "index.html" setup
//     const numSlices = 5; // The number of vertical columns
//     const slices = Array.from({ length: numSlices });

//     // 2. Initial Page Load (The "Reveal" Animation)
//     useEffect(() => {
//         ctx.current = gsap.context(() => {
//             if (isActive) {
//                 // Slices shrink to the top, revealing the newly loaded page
//                 gsap.to(".transition-slice", {
//                     scaleY: 0,
//                     transformOrigin: "top",
//                     duration: 1, // Smooth, slow duration like the demo
//                     ease: "power4.inOut",
//                     stagger: { amount: 0.4, from: "start" },
//                     onComplete: () => {
//                         setIsActive(false);
//                     },
//                 });
//             }
//         }, containerRef);

//         return () => ctx.current?.revert();
//     }, []);

//     // 3. Intercept Links (The "Cover" Animation)
//     useEffect(() => {
//         const handleClick = (e: MouseEvent) => {
//             const target = e.target as HTMLElement;
//             const link = target.closest("a");

//             if (
//                 !link ||
//                 !link.href ||
//                 link.target === "_blank" ||
//                 link.href.startsWith("mailto:") ||
//                 link.href.startsWith("tel:") ||
//                 link.href.includes("#") ||
//                 link.href === window.location.href
//             ) {
//                 return;
//             }

//             e.preventDefault();
//             const href = link.getAttribute("href");

//             if (href) {
//                 setIsActive(true);

//                 ctx.current = gsap.context(() => {
//                     // Slices grow from the bottom up to cover the screen
//                     gsap.set(".transition-slice", {
//                         transformOrigin: "bottom",
//                     });
//                     gsap.to(".transition-slice", {
//                         scaleY: 1,
//                         duration: 1,
//                         ease: "power4.inOut",
//                         stagger: { amount: 0.4, from: "start" },
//                         onComplete: () => {
//                             router.push(href); // Navigate once the screen is fully covered
//                         },
//                     });
//                 }, containerRef);
//             }
//         };

//         document.addEventListener("click", handleClick);
//         return () => document.removeEventListener("click", handleClick);
//     }, [router]);

//     // 4. On Route Change (The "Uncover" Animation for the Next Page)
//     useEffect(() => {
//         if (!isActive) return;

//         ctx.current = gsap.context(() => {
//             // Slices shrink to the top again to reveal the new page
//             gsap.to(".transition-slice", {
//                 scaleY: 0,
//                 transformOrigin: "top",
//                 duration: 1,
//                 ease: "power4.inOut",
//                 stagger: { amount: 0.4, from: "start" },
//                 onComplete: () => setIsActive(false),
//             });
//         }, containerRef);
//     }, [pathname]);

//     return (
//         <div
//             ref={containerRef}
//             className={`transition-container ${isActive ? "active" : ""}`}
//             style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100vw",
//                 height: "100vh",
//                 display: "flex", // Flexbox perfectly distributes the slices
//                 zIndex: 9999,
//                 pointerEvents: isActive ? "all" : "none",
//             }}
//         >
//             {slices.map((_, i) => (
//                 <div
//                     key={i}
//                     className="transition-slice"
//                     style={{
//                         flex: 1, // Ensures all slices have equal width automatically
//                         height: "100%",
//                         backgroundColor: "#ffffff", // Change this to your desired transition color
//                         transform: isActive ? "scaleY(1)" : "scaleY(0)",
//                         willChange: "transform",
//                     }}
//                 />
//             ))}
//         </div>
//     );
// }
