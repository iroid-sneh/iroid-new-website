// "use client";
// import { useRef, type ReactNode } from "react";
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

// export default function ProjectsCarousel({
//     children,
// }: {
//     children?: ReactNode;
// }) {
//     const sectionRef = useRef<HTMLDivElement>(null);
//     const scrollRef = useRef<HTMLDivElement>(null);

//     useGSAP(
//         () => {
//             if (!scrollRef.current) return;

//             const totalWidth = scrollRef.current.scrollWidth;
//             const amountToScroll = totalWidth - window.innerWidth;
//             const entryDistance = window.innerWidth;

//             // Start projects off-screen to the right
//             gsap.set(scrollRef.current, { x: entryDistance });

//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: sectionRef.current,
//                     start: "top top",
//                     end: `+=${totalWidth + entryDistance}`,
//                     pin: true,
//                     scrub: 1,
//                     invalidateOnRefresh: true,
//                 },
//             });

//             // Phase 1: Projects slide in from the right
//             tl.to(scrollRef.current, {
//                 x: 0,
//                 ease: "none",
//                 duration: entryDistance,
//             });

//             // Phase 2: Normal horizontal scroll through projects
//             tl.to(scrollRef.current, {
//                 x: -amountToScroll,
//                 ease: "none",
//                 duration: amountToScroll,
//             });

//             gsap.utils.toArray(".project-img").forEach((img: any) => {
//                 gsap.to(img, {
//                     x: -100,
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
//             {children}

//             <div
//                 ref={scrollRef}
//                 className="flex h-full items-center will-change-transform"
//             >
//                 {PROJECTS.map((project) => (
//                     <div
//                         key={project.id}
//                         className="relative flex-shrink-0 w-screen h-full flex items-center justify-center group cursor-none"
//                     >
//                         <div className="relative w-[85vw] h-[70vh]">
//                             <div className="relative w-full h-full overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
//                                 <img
//                                     src={project.img}
//                                     className="project-img absolute inset-0 w-[120%] h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
//                                     alt={project.title}
//                                 />
//                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
//                                     <span className="bg-white text-black px-8 py-3 rounded-full font-neue-ultra text-xs uppercase tracking-widest">
//                                         View Case
//                                     </span>
//                                 </div>
//                             </div>

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
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "01",
        title: "CHILLBASE",
        category: "SaaS / Fintech",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600",
    },
    {
        id: "02",
        title: "FINANCIELLE",
        category: "Mobile App / AI",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600",
    },
    {
        id: "03",
        title: "NITE RIOT",
        category: "Web / 3D Experience",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
    },
    {
        id: "04",
        title: "MANEVA AI",
        category: "Industrial SaaS",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600",
    },
];

export default function ProjectsCarousel({
    children,
}: {
    children?: ReactNode;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!scrollRef.current) return;

            const totalWidth = scrollRef.current.scrollWidth;
            const amountToScroll = totalWidth - window.innerWidth;
            const firstProject = scrollRef.current.children[0];

            // 1. Initial State for the "Big Entrance"
            // We make it huge, tilted, and positioned way below
            gsap.set(firstProject, {
                y: "130vh",
                rotation: 12,
                scale: 1.2,
                transformOrigin: "center center",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    // Increase end distance for a "slower" feel
                    end: `+=${totalWidth + 1800}`,
                    pin: true,
                    scrub: 2, // Increased for extra smoothness (mass/inertia)
                    invalidateOnRefresh: true,
                },
            });

            // PHASE 1: The "Flow Party" Entrance
            // Animates the first project from bottom to center with rotation snap
            tl.to(firstProject, {
                y: "0vh",
                rotation: 0,
                scale: 1,
                ease: "power2.out",
                duration: 2, // Relative length of the entrance
            });

            // PHASE 2: Horizontal Scroll
            // Starts immediately after the first project is in place
            tl.to(scrollRef.current, {
                x: -amountToScroll,
                ease: "none",
                duration: 6, // Relative length of the horizontal scroll
            });

            // Optional: Image parallax during horizontal scroll
            gsap.utils.toArray(".project-img").forEach((img: any) => {
                gsap.to(img, {
                    x: -150,
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
            {/* Background elements (like your earth video) go here */}
            {children}

            <div
                ref={scrollRef}
                className="flex h-full items-center will-change-transform"
            >
                {PROJECTS.map((project, index) => (
                    <div
                        key={project.id}
                        className="relative flex-shrink-0 w-screen h-full flex items-center justify-center group"
                    >
                        {/* The Wrapper that rotates */}
                        <div className="relative w-[92vw] h-[85vh]">
                            <div className="relative w-full h-full overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl rounded-sm">
                                <img
                                    src={project.img}
                                    className="project-img absolute inset-0 w-[140%] h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                                    alt={project.title}
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em]">
                                        View Project
                                    </span>
                                </div>
                            </div>

                            {/* Text labels */}
                            <div className="absolute -bottom-12 -left-6 z-10 pointer-events-none">
                                <h3 className="text-[10vw] font-black leading-[0.8] text-white uppercase italic tracking-tighter drop-shadow-2xl">
                                    {project.title}
                                </h3>
                                <p className="text-blue-400 text-xl font-medium mt-4 uppercase tracking-widest ml-2">
                                    {project.category}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* End Section */}
                <div className="flex-shrink-0 w-[50vw] h-full flex flex-col items-center justify-center">
                    <div className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-700 cursor-pointer">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4">
                            See All Work
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
