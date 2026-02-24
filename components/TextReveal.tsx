"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // 1. Split Text into lines
    const split = new SplitType(textRef.current, { types: "lines" });

    // 2. CREATE THE EXACT-WIDTH & CENTERED BLOCKS
    split.lines?.forEach((line) => {
      if (line.querySelector(".line-mask")) return;

      line.style.width = "fit-content"; 
      
      // THE FIX FOR CENTERING: This perfectly centers the exact-width line block!
      line.style.margin = "0 auto"; 
      
      line.style.position = "relative";
      line.style.padding = "0.05em 0"; 

      // Create the solid massive block
      const mask = document.createElement("div");
      mask.className = "line-mask";

      // Style the block
      Object.assign(mask.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "#c6e53c", // Lando Lime Green
        zIndex: "10", 
        transformOrigin: "right", // Wipes away to the right
        transform: "scaleX(1)", 
      });

      // Inject the block into the line
      line.appendChild(mask);
    });

    // 3. ANIMATE THE BLOCKS WIPING AWAY
    gsap.to(".line-mask", {
      scaleX: 0,
      stagger: 0.15,
      ease: "power2.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none", 
        once: true, // ensures it runs only once
      },
    });
    

    return () => {
      split.revert(); 
    };
  }, { scope: containerRef });

  return (
    // Changed back to flex-col items-center justify-center
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#1c2018] flex flex-col items-center justify-center py-32 px-4 md:px-12 lg:px-24"
    >
      <div className="w-full flex justify-center">
        {/* Added text-center, tightened the leading (line-height) to match Lando, and mapped exact <br/> tags */}
        <h2 
          ref={textRef}
          className="text-[#e2e1d8] text-center text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] font-black uppercase tracking-tighter"
        >
          Redefining limits,<br />
          fighting for <span className="text-[#c6e53c]">wins</span>,<br />
          bringing it all in<br />
          all ways. Defining a<br />
          <span className="text-[#c6e53c]">legacy</span> in Web Development<br />
          on and off the<br />
          screen.
        </h2>
      </div>
    </section>
  );
}