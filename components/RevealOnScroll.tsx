"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import gsap from "gsap";
import SplitType from "split-type";

type RevealOnScrollProps = {
    as?: ElementType;
    className?: string;
    children: ReactNode;
    threshold?: number;
    stagger?: number;
    duration?: number;
    ghostColor?: string;
    primaryColor?: string;
};

export default function RevealOnScroll({
    as: Tag = "div",
    className,
    children,
    threshold = 0.1,
    stagger = 0.15,
    duration = 0.7,
    ghostColor = "#25A4FF",
    primaryColor = "#c4e7ff",
}: RevealOnScrollProps) {
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const split = new SplitType(containerRef.current, { types: "lines" });
        if (!split.lines || split.lines.length === 0) return;

        split.lines.forEach((line) => {
            Object.assign(line.style, {
                position: "relative",
                display: "block",
                width: "fit-content",
                overflow: "visible",
                clipPath: "inset(0% 100% 0% 0%)",
                webkitClipPath: "inset(0% 100% 0% 0%)",
            });

            const ghost = document.createElement("div");
            ghost.className = "reveal-ghost-mask";
            Object.assign(ghost.style, {
                position: "absolute",
                top: "-2%",
                left: "0",
                width: "100%",
                height: "104%",
                backgroundColor: ghostColor,
                zIndex: "10",
                pointerEvents: "none",
                transform: "scaleX(0)",
                transformOrigin: "left center",
            });

            const primary = document.createElement("div");
            primary.className = "reveal-primary-mask";
            Object.assign(primary.style, {
                position: "absolute",
                inset: "0",
                backgroundColor: primaryColor,
                zIndex: "11",
                pointerEvents: "none",
                transform: "scaleX(0)",
                transformOrigin: "left center",
            });

            line.appendChild(ghost);
            line.appendChild(primary);
        });

        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "expo.inOut", duration },
        });

        split.lines.forEach((line, index) => {
            const ghost = line.querySelector(".reveal-ghost-mask");
            const primary = line.querySelector(".reveal-primary-mask");
            const startTime = index * stagger;

            tl.to(
                ghost,
                { scaleX: 1, transformOrigin: "left center" },
                startTime
            )
                .to(
                    line,
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        webkitClipPath: "inset(0% 0% 0% 0%)",
                    },
                    startTime
                )
                .to(
                    primary,
                    { scaleX: 1, transformOrigin: "left center" },
                    startTime + 0.1
                )
                .to(
                    ghost,
                    { scaleX: 0, transformOrigin: "right center" },
                    startTime + duration
                )
                .to(
                    primary,
                    { scaleX: 0, transformOrigin: "right center" },
                    startTime + duration + 0.1
                );
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        tl.play();
                        observer.disconnect();
                    }
                });
            },
            { threshold }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            tl.kill();
            split.revert();
        };
    }, [duration, ghostColor, primaryColor, stagger, threshold]);

    return (
        <Tag ref={containerRef as never} className={className}>
            {children}
        </Tag>
    );
}
