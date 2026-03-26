"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import Image from "next/image";

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
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between p-6 md:p-10">
                <Link href="/" onClick={() => isOpen && toggleMenu()}>
                    <Image
                        src="/iRoidLogoWhite.svg"
                        alt="logo"
                        width={100}
                        height={24}
                        className="w-20 md:w-28 h-auto"
                    />
                </Link>

                {/* Simplified Toggle (No text, just icon) */}
                <button
                    onClick={toggleMenu}
                    className="relative z-[110] w-10 h-10 flex flex-col justify-center items-center group"
                    aria-label="Toggle Menu"
                >
                    <span
                        className={`block w-8 h-0.5 bg-white transition-all duration-500 ease-main ${isOpen ? "rotate-45 translate-y-[2px]" : "-translate-y-1"}`}
                    ></span>
                    <span
                        className={`block w-8 h-0.5 bg-white transition-all duration-500 ease-main ${isOpen ? "-rotate-45 -translate-y-[2px]" : "translate-y-1"}`}
                    ></span>
                </button>
            </header>

            {/* Full Screen Navigation */}
            <div className="sidenav__nav hidden fixed inset-0 z-[90] w-full h-screen overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#2D62E8]" />
                    <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#0a0a0a]" />
                </div>

                <nav className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    {/* Centered Links - Using vh units to ensure it fits screen height */}
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
                                className="relative overflow-hidden py-1 md:py-2"
                            >
                                <Link
                                    href={`/${item.slug}`}
                                    className="sidenav__menu-link block text-white group"
                                    onClick={toggleMenu}
                                >
                                    {/* Using 11vh ensures 6-7 items fit perfectly in any screen height */}
                                    <span className="text-[7vh] sm:text-[9vh] md:text-[11vh] font-bold uppercase leading-[0.9] tracking-tighter transition-opacity duration-300 hover:opacity-50">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Socials / Footer */}
                    <div className="absolute bottom-6 md:bottom-10 w-full flex flex-col md:flex-row items-center justify-between px-10 gap-4">
                        <div className="sidenav__fade flex gap-6">
                            {["Instagram", "LinkedIn", "Twitter"].map(
                                (social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="text-gray-400 hover:text-white text-[10px] md:text-xs uppercase tracking-[0.2em]"
                                    >
                                        {social}
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
