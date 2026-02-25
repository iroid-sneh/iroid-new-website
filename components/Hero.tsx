// components/Hero.tsx
"use client";

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-[#000014] flex flex-col items-center justify-center text-center">
            <div className="relative z-10">
                <h1 className="text-white text-6xl md:text-9xl font-bold tracking-tighter uppercase">
                    iRoid Solutions
                </h1>
                <p className="text-gray-400 mt-6 text-xl md:text-2xl max-w-2xl mx-auto">
                    We are redesigning the future. Scroll down.
                </p>
            </div>
        </section>
    );
}
