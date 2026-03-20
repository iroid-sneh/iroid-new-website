"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import Image from "next/image";

// Register CustomEase
if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
}

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { contextSafe } = useGSAP();
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        tl.current = gsap.timeline({
            defaults: {
                ease: "main",
                duration: 0.7,
            },
        });
    });

    const toggleMenu = contextSafe(() => {
        const nextState = !isOpen;
        setIsOpen(nextState);

        tl.current?.clear();

        if (nextState) {
            // OPEN
            tl.current
                ?.set(".sidenav__nav", { display: "block" })
                .set(".sidenav__menu", { xPercent: 0 }, "<")
                .fromTo(
                    ".sidenav__button-icon",
                    { rotate: 0 },
                    { rotate: 315 },
                    "<"
                )
                .to(".sidenav__toggle-text-color", { color: "#131313" }, "<")
                .fromTo(
                    ".sidenav__overlay",
                    { autoAlpha: 0 },
                    { autoAlpha: 1 },
                    "<"
                )
                .fromTo(
                    ".sidenav__menu-bg-panel",
                    { xPercent: 101 },
                    { xPercent: 0, stagger: 0.12, duration: 0.575 },
                    "<"
                )
                .fromTo(
                    ".sidenav__menu-link",
                    { yPercent: 140, rotate: 10 },
                    { yPercent: 0, rotate: 0, stagger: 0.05 },
                    "<+=0.35"
                )
                .fromTo(
                    ".sidenav__fade",
                    { autoAlpha: 0, yPercent: 50 },
                    { autoAlpha: 1, yPercent: 0, stagger: 0.04 },
                    "<+=0.2"
                );

            document.body.style.overflow = "hidden";
        } else {
            // CLOSE
            tl.current
                ?.to(".sidenav__overlay", { autoAlpha: 0 })
                .to(".sidenav__menu", { xPercent: 120 }, "<")
                .to(".sidenav__button-icon", { rotate: 0 }, "<")
                .to(".sidenav__toggle-text-color", { color: "#ffffff" }, "<")
                .set(".sidenav__nav", { display: "none" });

            document.body.style.overflow = "auto";
        }
    });

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                toggleMenu();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, toggleMenu]);

    return (
        <>
            {/* Toggle Button */}
            <header className="fixed top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 z-[100] flex items-center justify-between">
                <Link href="/" aria-label="Go to home">
                    <Image
                        src="/iRoidLogoWhite.svg"
                        alt="iRoid logo"
                        width={112}
                        height={24}
                        className="h-6 w-auto"
                        priority
                    />
                </Link>
                <button
                    onClick={toggleMenu}
                    className="sidenav__toggle-text-color flex items-center justify-center bg-transparent border-none cursor-pointer text-white transition-colors duration-300"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <div className="sidenav__button-icon flex justify-center items-center w-6 h-6">
                        <svg width="100%" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M3 6.5H21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M3 17.5H21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </button>
            </header>

            {/* Navigation */}
            <div className="sidenav__nav hidden fixed inset-0 z-[90] w-full h-screen">
                <div
                    onClick={toggleMenu}
                    className="sidenav__overlay absolute inset-0 bg-[#13131366] cursor-pointer opacity-0"
                />

                <nav className="sidenav__menu relative flex flex-col justify-between w-full md:w-[35em] h-full ml-auto pt-32 pb-8 overflow-hidden">
                    {/* Background Panels */}
                    <div className="absolute inset-0 z-0">
                        <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#2D62E8] rounded-l-[1.25em]" />
                        <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#131313] rounded-l-[1.25em]" />
                        <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#C4E7FF] rounded-l-[1.25em]" />
                    </div>

                    {/* Links */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <ul className="flex flex-col w-full pl-8 md:pl-16">
                            {[
                                { title: "About", slug: "about", id: "01" },
                                { title: "Work", slug: "work", id: "02" },
                                {
                                    title: "Services",
                                    slug: "services",
                                    id: "03",
                                },
                                { title: "Blog", slug: "blog", id: "04" },
                                { title: "Contact", slug: "contact", id: "05" },
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="relative overflow-hidden h-14 sm:h-20 md:h-24"
                                >
                                    <Link
                                        href={`/${item.slug}`}
                                        className="sidenav__menu-link flex items-start gap-2 sm:gap-3 w-full h-full py-2 sm:py-3 text-[#102458]"
                                        onClick={toggleMenu}
                                    >
                                        <p className="text-3xl sm:text-5xl md:text-[5.625em] font-bold leading-[0.8] tracking-tight uppercase m-0">
                                            {item.title}
                                        </p>
                                        <p className="text-[#e04645] font-mono text-xs sm:text-sm pt-1 sm:pt-2">
                                            {item.id}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Socials */}
                        <div className="flex flex-col gap-3 sm:gap-5 pl-8 md:pl-16 mt-6 sm:mt-8">
                            <p className="sidenav__fade text-[#131313] text-base sm:text-lg opacity-0 font-medium">
                                Socials
                            </p>
                            <div className="flex flex-wrap gap-4 sm:gap-6">
                                {[
                                    "Instagram",
                                    "LinkedIn",
                                    "X/Twitter",
                                    "Awwwards",
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="sidenav__fade text-[#131313] text-base sm:text-lg opacity-0 hover:text-[#e04645] transition-colors"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
