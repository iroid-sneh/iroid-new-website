// "use client";
// import { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// const PROJECTS = [
//     {
//         id: "01",
//         title: "CHILLBASE",
//         category: "SaaS / Fintech",
//         year: "2024",
//         img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600",
//         color: "#FF3E00",
//     },
//     {
//         id: "02",
//         title: "FINANCIELLE",
//         category: "Mobile App / AI",
//         year: "2025",
//         img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600",
//         color: "#2D62E8",
//     },
//     {
//         id: "03",
//         title: "NITE RIOT",
//         category: "Web / 3D Experience",
//         year: "2023",
//         img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
//         color: "#C4E7FF",
//     },
//     {
//         id: "04",
//         title: "MANEVA AI",
//         category: "Industrial SaaS",
//         year: "2024",
//         img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600",
//         color: "#1A00FF",
//     },
//     {
//         id: "05",
//         title: "UPLINK",
//         category: "Web3 / Infrastructure",
//         year: "2025",
//         img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600",
//         color: "#FFD700",
//     },
// ];

// export default function HorizontalProjects() {
//     const sectionRef = useRef<HTMLDivElement>(null);
//     const scrollRef = useRef<HTMLDivElement>(null);

//     useGSAP(
//         () => {
//             if (!scrollRef.current) return;

//             const totalWidth = scrollRef.current.scrollWidth;
//             const amountToScroll = totalWidth - window.innerWidth;

//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: sectionRef.current,
//                     start: "top top",
//                     // end determines how long the user has to scroll to finish the section
//                     end: `+=${totalWidth}`,
//                     pin: true,
//                     scrub: 1,
//                     invalidateOnRefresh: true,
//                 },
//             });

//             tl.to(scrollRef.current, {
//                 x: -amountToScroll,
//                 ease: "none",
//             });

//             // Parallax effect on the project images
//             gsap.utils.toArray(".project-img").forEach((img: any) => {
//                 gsap.to(img, {
//                     x: -100, // Slightly increased for more depth
//                     ease: "none",
//                     scrollTrigger: {
//                         trigger: img,
//                         containerAnimation: tl,
//                         scrub: true,
//                     },
//                 });
//             });
//         },
//         { scope: sectionRef }
//     );

//     return (
//         <section
//             ref={sectionRef}
//             className="relative h-screen bg-[#00024c] overflow-hidden"
//         >
//             {/* BACKGROUND TITLE */}
//             <div className="absolute top-10 left-10 z-0 opacity-100 pointer-events-none">
//                 <h2 className="font-national-extrabold text-[20vw] leading-none uppercase text-white">
//                     Selected <br /> Works
//                 </h2>
//             </div>

//             {/* THE HORIZONTAL WRAPPER */}
//             {/* CHANGED: Removed gap and padding to ensure exactly 100vw logic */}
//             <div
//                 ref={scrollRef}
//                 className="flex h-full items-center will-change-transform"
//             >
//                 {PROJECTS.map((project) => (
//                     /* CHANGED: w-screen ensures this container fills the whole view perfectly */
//                     <div
//                         key={project.id}
//                         className="relative flex-shrink-0 w-screen h-full flex items-center justify-center group cursor-none"
//                     >
//                         {/* THE CARD CONTENT - We keep this at 80vw to show margins, but container is 100vw */}
//                         <div className="relative w-[85vw] h-[70vh]">
//                             {/* PROJECT METADATA */}
//                             <div className="absolute -top-12 left-0 flex justify-between w-full font-molika text-[10px] uppercase tracking-[0.4em] text-white/40">
//                                 <span>{project.id} / PROJECT</span>
//                                 <span>{project.year}</span>
//                             </div>

//                             {/* IMAGE CONTAINER */}
//                             <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 shadow-2xl">
//                                 <img
//                                     src={project.img}
//                                     className="project-img absolute inset-0 w-[120%] h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
//                                     alt={project.title}
//                                 />
//                                 {/* OVERLAY ON HOVER */}
//                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
//                                     <span className="bg-white text-black px-8 py-3 rounded-full font-neue-ultra text-xs uppercase tracking-widest">
//                                         View Case
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* PROJECT TITLE (Bottom Overlap) */}
//                             <div className="absolute -bottom-8 -left-4 z-10">
//                                 <h3 className="font-retail text-[8vw] leading-none text-white uppercase drop-shadow-lg">
//                                     {project.title}
//                                 </h3>
//                                 <p className="font-retail-italic italic text-2xl text-blue-500 lowercase mt-2">
//                                     {project.category}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {/* THE "VIEW ALL" END CAP - Also made w-screen to stay consistent */}
//                 <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center text-center">
//                     <h4 className="font-retail text-white text-5xl uppercase mb-8">
//                         Ready to see <br /> everything?
//                     </h4>
//                     <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 cursor-pointer group">
//                         <span className="font-molika text-[10px] uppercase tracking-widest">
//                             All Work
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "01",
        title: "CHILLBASE",
        category: "SaaS / Fintech",
        year: "2024",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600",
        color: "#FF3E00",
    },
    {
        id: "02",
        title: "FINANCIELLE",
        category: "Mobile App / AI",
        year: "2025",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600",
        color: "#2D62E8",
    },
    {
        id: "03",
        title: "NITE RIOT",
        category: "Web / 3D Experience",
        year: "2023",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
        color: "#C4E7FF",
    },
    {
        id: "04",
        title: "MANEVA AI",
        category: "Industrial SaaS",
        year: "2024",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600",
        color: "#1A00FF",
    },
    {
        id: "05",
        title: "UPLINK",
        category: "Web3 / Infrastructure",
        year: "2025",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600",
        color: "#FFD700",
    },
];

export default function HorizontalProjects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // TEXT REVEAL — independent of scrollRef, so it runs even if horizontal content is commented out
            gsap.from(".reveal-text", {
                yPercent: 100,
                stagger: 0.2,
                ease: "power3.out",
                duration: 2.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            if (!scrollRef.current) return;

            const totalWidth = scrollRef.current.scrollWidth;
            const amountToScroll = totalWidth - window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(scrollRef.current, {
                x: -amountToScroll,
                ease: "none",
            });

            gsap.utils.toArray(".project-img").forEach((img: any) => {
                gsap.to(img, {
                    x: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        containerAnimation: tl,
                        scrub: true,
                    },
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-[#00024c] overflow-hidden"
        >
            {/* BACKGROUND TITLE - UPDATED WITH REVEAL STRUCTURE */}
            <div className="absolute top-[4vw] left-10 z-0 opacity-100 pointer-events-none">
                <h2 className="font-national-extrabold text-[19vw] leading-[0.85] uppercase text-white flex flex-col">
                    {/* Line 1 Mask */}
                    <span className="relative overflow-hidden inline-block">
                        <span className="reveal-text inline-block">
                            Selected
                        </span>
                    </span>
                    {/* Line 2 Mask */}
                    <span className="relative overflow-hidden inline-block">
                        <span className="reveal-text inline-block">Works</span>
                    </span>
                </h2>
            </div>

            <div
                ref={scrollRef}
                className="flex h-full items-center will-change-transform"
            >
                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className="relative flex-shrink-0 w-screen h-full flex items-center justify-center group cursor-none"
                    >
                        <div className="relative w-[85vw] h-[70vh]">
                            <div className="relative w-full h-full overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                                <img
                                    src={project.img}
                                    className="project-img absolute inset-0 w-[120%] h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
                                    alt={project.title}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="bg-white text-black px-8 py-3 rounded-full font-neue-ultra text-xs uppercase tracking-widest">
                                        View Case
                                    </span>
                                </div>
                            </div>

                            <div className="absolute -bottom-8 -left-4 z-10">
                                <h3 className="font-retail text-[8vw] leading-none text-white uppercase drop-shadow-lg">
                                    {project.title}
                                </h3>
                                <p className="font-retail-italic italic text-2xl text-blue-500 lowercase mt-2">
                                    {project.category}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center text-center">
                    <h4 className="font-retail text-white text-5xl uppercase mb-8">
                        Ready to see <br /> everything?
                    </h4>
                    <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 cursor-pointer group">
                        <span className="font-molika text-[10px] uppercase tracking-widest">
                            All Work
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
