"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase, ScrollTrigger);
    CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
}

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { contextSafe } = useGSAP();
    const tl = useRef<gsap.core.Timeline | null>(null);
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        tl.current = gsap.timeline({
            paused: true,
            defaults: { ease: "main", duration: 0.7 },
        });

        tl.current
            .set(".sidenav__nav", { display: "block" })
            .fromTo(
                ".sidenav__menu-bg-panel",
                { xPercent: 101 },
                { xPercent: 0, stagger: 0.1, duration: 0.8 }
            )
            .fromTo(
                ".sidenav__menu-link",
                { yPercent: 140, rotate: 5 },
                { yPercent: 0, rotate: 0, stagger: 0.05 },
                "-=0.4"
            )
            .fromTo(
                ".sidenav__fade",
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, stagger: 0.1 },
                "-=0.3"
            );

        // Hide header on scroll down, show on scroll up
        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (!headerRef.current) return;
                // Don't hide when menu is open
                if (self.direction === 1) {
                    // Scrolling down
                    gsap.to(headerRef.current, {
                        yPercent: -100,
                        duration: 0.4,
                        ease: "power3.out",
                    });
                } else {
                    // Scrolling up
                    gsap.to(headerRef.current, {
                        yPercent: 0,
                        duration: 0.4,
                        ease: "power3.out",
                    });
                }
            },
        });
    });

    // UPDATED HOVER: Snappy "Expo" feel like the video
    const handleLinkEnter = contextSafe((e: React.MouseEvent) => {
        const topLetters = e.currentTarget.querySelectorAll(".top-letter");
        const bottomLetters =
            e.currentTarget.querySelectorAll(".bottom-letter");

        gsap.killTweensOf([topLetters, bottomLetters]);

        // Move both layers up.
        // Top goes from 0 to -100. Bottom goes from 0 to -100 (which brings it into view)
        gsap.to(topLetters, {
            yPercent: -100,
            stagger: 0.015, // Faster stagger = more "magnetic" feel
            duration: 0.6,
            ease: "expo.out",
        });
        gsap.to(bottomLetters, {
            yPercent: -100,
            stagger: 0.015,
            duration: 0.6,
            ease: "expo.out",
        });
    });

    const handleLinkLeave = contextSafe((e: React.MouseEvent) => {
        const topLetters = e.currentTarget.querySelectorAll(".top-letter");
        const bottomLetters =
            e.currentTarget.querySelectorAll(".bottom-letter");

        gsap.killTweensOf([topLetters, bottomLetters]);

        // Reset back down
        gsap.to(topLetters, {
            yPercent: 0,
            stagger: 0.015,
            duration: 0.6,
            ease: "expo.out",
        });
        gsap.to(bottomLetters, {
            yPercent: 0,
            stagger: 0.015,
            duration: 0.6,
            ease: "expo.out",
        });
    });

    const toggleMenu = contextSafe(() => {
        if (!isOpen) {
            tl.current?.play();
            document.body.style.overflow = "hidden";
        } else {
            tl.current?.reverse();
            document.body.style.overflow = "auto";
        }
        setIsOpen(!isOpen);
    });

    return (
        <>
            <header ref={headerRef} className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between p-6 md:p-10">
                <Link href="/" onClick={() => isOpen && toggleMenu()}>
                    <Image
                        src="/iRoidLogoWhite.svg"
                        alt="logo"
                        width={100}
                        height={24}
                        className="w-20 md:w-28 h-auto"
                    />
                </Link>
                <button
                    onClick={toggleMenu}
                    className="relative z-[110] w-10 h-10 flex flex-col justify-center items-center"
                >
                    <span
                        className={`block w-8 h-0.5 bg-white transition-all duration-500 ${isOpen ? "rotate-45 translate-y-[1px]" : "-translate-y-1"}`}
                    ></span>
                    <span
                        className={`block w-8 h-0.5 bg-white transition-all duration-500 ${isOpen ? "-rotate-45 -translate-y-[1px]" : "translate-y-1"}`}
                    ></span>
                </button>
            </header>

            <div className="sidenav__nav hidden fixed inset-0 z-[90] w-full h-screen overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#2D62E8]" />
                    <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#0a0a0a]" />
                </div>

                <nav className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <ul className="flex flex-col items-center justify-center list-none p-0 m-0">
                        {[
                            { title: "Home", slug: "" },
                            { title: "About", slug: "about" },
                            { title: "Works", slug: "work" },
                            { title: "Services", slug: "services" },
                            { title: "Blog", slug: "blog" },
                            { title: "Contact", slug: "contact" },
                        ].map((item, i) => (
                            <li
                                key={i}
                                className="relative overflow-hidden py-1"
                            >
                                <Link
                                    href={`/${item.slug}`}
                                    className="sidenav__menu-link block text-white relative group"
                                    onClick={toggleMenu}
                                    onMouseEnter={handleLinkEnter}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    {/* The container MUST have overflow-hidden to clip the text */}
                                    <div className="relative flex flex-col overflow-hidden leading-[0.85]">
                                        {/* Original word */}
                                        <span className="flex text-[8vh] md:text-[11vh] font-bold uppercase tracking-tighter">
                                            {item.title
                                                .split("")
                                                .map((char, j) => (
                                                    <span
                                                        key={j}
                                                        className="top-letter inline-block"
                                                    >
                                                        {char === " "
                                                            ? "\u00A0"
                                                            : char}
                                                    </span>
                                                ))}
                                        </span>
                                        {/* Duplicate word sitting exactly below the container */}
                                        <span className="flex absolute top-full left-0 text-[8vh] md:text-[11vh] font-bold uppercase tracking-tighter">
                                            {item.title
                                                .split("")
                                                .map((char, j) => (
                                                    <span
                                                        key={j}
                                                        className="bottom-letter inline-block"
                                                    >
                                                        {char === " "
                                                            ? "\u00A0"
                                                            : char}
                                                    </span>
                                                ))}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
