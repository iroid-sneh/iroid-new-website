import React from "react";

const F1PosterFull = () => {
    const images = {
        sky: "https://images.unsplash.com/photo-1536697246787-1f7ad502a16d?q=80&w=1000&auto=format&fit=crop",
        woman: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
        damsonIdris:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        javierBardem:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
        walkingMan:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
        raceTrack:
            "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?q=80&w=1000&auto=format&fit=crop",
    };

    const skew = "-skew-x-[42deg]";
    const unskew = "skew-x-[42deg]";

    return (
        // Changed to relative and h-screen so it's visible in the scroll flow
        <div className="relative w-full h-screen bg-[#0d151a] overflow-hidden flex items-center justify-center border-b border-white/10">
            {/* BACKGROUND GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#132029] to-black" />

            {/* STRIPS CONTAINER - Widened to ensure it bleeds off screen */}
            <div className="relative flex w-[120%] h-full -left-[10%]">
                {/* COLUMN 1: FAR LEFT (Sky) */}
                <div
                    className={`relative w-[12%] h-full ${skew} border-r-[2px] border-black/30 overflow-hidden z-10`}
                >
                    <div className="absolute bottom-0 w-full h-[40%] overflow-hidden">
                        <img
                            src={images.sky}
                            className={`w-[400%] h-full object-cover ${unskew} scale-150 opacity-60`}
                            alt=""
                        />
                    </div>
                </div>

                {/* COLUMN 2: BLACK THIN STRIP */}
                <div
                    className={`relative w-[4%] h-full bg-black/90 ${skew} z-10`}
                />

                {/* COLUMN 3: LEFT HERO (Damson Idris strip) */}
                <div
                    className={`relative w-[18%] h-full flex flex-col ${skew} border-r-4 border-black z-10`}
                >
                    <div className="h-[45%] overflow-hidden border-b-8 border-black"></div>
                    {/* <div className="flex-1" /> */}
                    <div className="h-[35%] overflow-hidden">
                        <img
                            src={images.damsonIdris}
                            className={`w-[250%] h-full object-cover ${unskew} scale-150`}
                            alt=""
                        />
                    </div>
                </div>

                {/* COLUMN 4: CENTER (THE TEXT REPLACING BRAD PITT) */}
                {/* Z-INDEX 20: Middle layer */}
                <div
                    className={`relative w-[28%] h-full ${skew} bg-white/[0.02] z-20 shadow-[0_0_80px_rgba(0,0,0,0.9)] border-x-4 border-black/40 overflow-hidden`}
                >
                    {/* THE INTENSE WHITE FOG (Bottom element) */}
                    <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-white via-white/90 to-transparent z-10" />
                </div>

                {/* COLUMN 5: RIGHT HERO (Javier Bardem strip) */}
                {/* Z-INDEX 30: This sits ON TOP of the center strip edges */}
                <div
                    className={`relative w-[20%] h-full flex flex-col ${skew} z-30 border-r-4 border-black shadow-[-20px_0_40px_rgba(0,0,0,0.5)]`}
                >
                    <div className="h-[35%] overflow-hidden border-b-8 border-black">
                        <img
                            src={images.javierBardem}
                            className={`w-[250%] h-full object-cover ${unskew} scale-110`}
                            alt=""
                        />
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <div className="absolute top-[10%] w-full h-[50%] overflow-hidden">
                            <img
                                src={images.walkingMan}
                                className={`w-[250%] h-full object-cover ${unskew}`}
                                alt=""
                            />
                        </div>
                        {/* Blend the bottom of this strip into the white center fog */}
                        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
                    </div>
                </div>

                {/* COLUMN 6: FAR RIGHT (Race Track) */}
                <div
                    className={`relative flex-1 h-full ${skew} overflow-hidden z-10`}
                >
                    <div className="absolute bottom-0 w-full h-[45%] overflow-hidden">
                        <img
                            src={images.raceTrack}
                            className={`w-[200%] h-full object-cover ${unskew} scale-150`}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            {/* SPEED LINE OVERLAYS (Highest Z-index) */}
            <div className="absolute inset-0 z-40 pointer-events-none opacity-10">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-[200%] w-[1px] bg-white -top-1/2 -skew-x-[22deg]"
                        style={{ left: `${i * 10}%` }}
                    />
                ))}
            </div>

            {/* DARK VIGNETTE BOTTOM */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/20 to-transparent z-[50]" />
        </div>
    );
};

export default F1PosterFull;
