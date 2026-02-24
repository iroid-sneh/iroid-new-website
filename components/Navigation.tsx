"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";

// Register CustomEase
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { contextSafe } = useGSAP();
  const tl = useRef<gsap.core.Timeline>();

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
          ".sidenav__button-label",
          { yPercent: 0 },
          { yPercent: -100, stagger: 0.2 }
        )
        .fromTo(".sidenav__button-icon", { rotate: 0 }, { rotate: 315 }, "<")
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
        .to(".sidenav__button-label", { yPercent: 0 }, "<")
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
      <header className="fixed top-8 right-8 z-[100] flex justify-end">
        <button
          onClick={toggleMenu}
          className="sidenav__toggle-text-color flex items-center gap-2 bg-transparent border-none cursor-pointer text-white transition-colors duration-300"
        >
          <div className="flex flex-col items-end justify-start h-[1.4em] overflow-hidden">
            <p className="sidenav__button-label m-0 text-xl font-medium leading-[1.4em]">
              Menu
            </p>
            <p className="sidenav__button-label m-0 text-xl font-medium leading-[1.4em]">
              Close
            </p>
          </div>

          <div className="sidenav__button-icon flex justify-center items-center w-5 h-5">
            <svg width="100%" viewBox="0 0 16 16" fill="none">
              <path d="M7.33333 16V0H8.66667V16H7.33333Z" fill="currentColor" />
              <path d="M16 8.66667H0V7.33333H16V8.66667Z" fill="currentColor" />
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
            <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#e04645] rounded-l-[1.25em]" />
            <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#131313] rounded-l-[1.25em]" />
            <div className="sidenav__menu-bg-panel absolute inset-0 bg-[#ebdcc5] rounded-l-[1.25em]" />
          </div>

          {/* Links */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            <ul className="flex flex-col w-full pl-8 md:pl-16">
              {[
                { title: "About", slug: "about", id: "01" },
                { title: "Work", slug: "work", id: "02" },
                { title: "Services", slug: "services", id: "03" },
                { title: "Blog", slug: "blog", id: "04" },
                { title: "Contact", slug: "contact", id: "05" },
              ].map((item, i) => (
                <li key={i} className="relative overflow-hidden h-20 md:h-24">
                  <Link
                    href={`/${item.slug}`}
                    className="sidenav__menu-link flex items-start gap-3 w-full h-full py-3 text-[#131313]"
                    onClick={toggleMenu}
                  >
                    <p className="text-5xl md:text-[5.625em] font-bold leading-[0.8] tracking-tight uppercase m-0">
                      {item.title}
                    </p>
                    <p className="text-[#e04645] font-mono text-sm pt-2">
                      {item.id}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex flex-col gap-5 pl-8 md:pl-16 mt-8">
              <p className="sidenav__fade text-[#131313] text-lg opacity-0 font-medium">
                Socials
              </p>
              <div className="flex flex-wrap gap-6">
                {["Instagram", "LinkedIn", "X/Twitter", "Awwwards"].map(
                  (social, i) => (
                    <a
                      key={i}
                      href="#"
                      className="sidenav__fade text-[#131313] text-lg opacity-0 hover:text-[#e04645] transition-colors"
                    >
                      {social}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
