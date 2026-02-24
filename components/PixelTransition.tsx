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
        if(isActive) {
            gsap.to(".transition-block", {
                opacity: 0,
                duration: 0.4, // Speed of fade out
                stagger: { amount: 0.75, from: "random" },
                onComplete: () => {
                    setIsActive(false);
                    if(containerRef.current) containerRef.current.style.pointerEvents = "none";
                }
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
        if(containerRef.current) containerRef.current.style.pointerEvents = "all";

        // Animate IN (Cover Screen)
        ctx.current = gsap.context(() => {
            gsap.set(".transition-block", { opacity: 0 }); // Ensure clean start
            gsap.to(".transition-block", {
                opacity: 1,
                duration: 0.1, // Fast appear
                stagger: { amount: 0.5, from: "random" },
                onComplete: () => {
                    router.push(href); // Navigate after covered
                }
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
                if(containerRef.current) containerRef.current.style.pointerEvents = "none";
            },
        });
    }, containerRef);

  }, [pathname]); // Triggers when route actually changes

  return (
    <div 
      ref={containerRef} 
      className={`transition-container ${isActive ? 'active' : ''}`}
    />
  );
}