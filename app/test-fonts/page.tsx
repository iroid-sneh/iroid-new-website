"use client";

export default function FontTest() {
    const fontList = [
        {
            name: "Neue Power Ultra",
            class: "font-neue-ultra",
            type: "Display/Headline",
        },
        {
            name: "Neue Power Bold",
            class: "font-neue-bold",
            type: "Display/Headline",
        },
        { name: "Nexa Heavy", class: "font-nexa", type: "Brutal/Headline" },
        { name: "Anton Regular", class: "font-anton", type: "Tall/Impact" },
        { name: "Trois Mille", class: "font-troismille", type: "Wide/Modern" },
        {
            name: "Mramor Pro Bold",
            class: "font-mramor",
            type: "Classic/Title",
        },
        {
            name: "Ibarra Real Nova",
            class: "font-ibarra",
            type: "Serif/Elegant",
        },
        {
            name: "Ibarra Italic",
            class: "font-ibarra-italic",
            type: "Serif/Luxury",
        },
        { name: "Mixta Didone", class: "font-mixta", type: "Artistic/Serif" },
        { name: "Molika Sans", class: "font-molika", type: "Body/Clean" },
        { name: "Ufficio Sans", class: "font-ufficio", type: "Technical/SaaS" },
        { name: "Cochin Roman", class: "font-cochin", type: "Editorial/Serif" },
        {
            name: "Retail Variable",
            class: "font-retail-variable",
            type: "Technical/SaaS",
        },
    ];

    return (
        <div className="p-10 bg-[#000014] min-h-screen text-white">
            <h1 className="text-blue-500 font-mono text-sm mb-20 border-b border-blue-500/20 pb-4">
                iRoid Solutions / Typography Playground v1.0
            </h1>

            <div className="space-y-32">
                {fontList.map((font) => (
                    <section
                        key={font.name}
                        className="group border-l border-white/10 pl-8 hover:border-blue-500 transition-colors"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-blue-600 text-[10px] px-2 py-1 rounded font-mono">
                                {font.type}
                            </span>
                            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
                                {font.name}
                            </p>
                        </div>

                        {/* Test Case 1: Headline */}
                        <h2
                            className={`${font.class} text-7xl md:text-9xl uppercase leading-none tracking-tighter mb-4`}
                        >
                            Engineering Quality.
                        </h2>

                        {/* Test Case 2: Mix with Italic (Testing iRoid Look) */}
                        <p
                            className={`${font.class} text-2xl md:text-4xl leading-tight max-w-4xl`}
                        >
                            Since 2015, we have been{" "}
                            <span className="font-ibarra-italic italic">
                                redefining momentum
                            </span>{" "}
                            through code and integrity.
                        </p>
                    </section>
                ))}
            </div>

            {/* WINNING COMBO SUGGESTION */}
            <div className="mt-40 p-20 bg-blue-600 text-white rounded-3xl">
                <p className="font-mono text-xs uppercase mb-8">
                    Best SOTY Pairing for iRoid:
                </p>
                <h3 className="font-neue-ultra text-[120px] leading-[0.8] uppercase mb-4">
                    Quality <br />
                    <span className="font-ibarra-italic italic text-[100px] lowercase pr-4">
                        is the
                    </span>{" "}
                    <br />
                    Ultimate Truth.
                </h3>
                <p className="font-molika text-xl max-w-md opacity-80">
                    (This uses Neue Power Ultra + Ibarra Italic + Molika Sans)
                </p>
            </div>
        </div>
    );
}
