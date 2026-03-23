const F1Poster = () => {
    const images = {
        mainBg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
        bradPitt:
            "https://www.themoviedb.org/t/p/original/m8mElt9idO6AogpL6364S966f9X.png",
        womanLeft:
            "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5fGVufDB8MHwwfHx8MA%3D%3D",
        javierTop:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
        walkingMan:
            "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop",
        raceCarBottom:
            "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?q=80&w=1000&auto=format&fit=crop",
        damsonIdris:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    };

    // FIX: Reverse skew + Scale to fill the diagonal gaps created by the tilt
    const skewClass = "-skew-x-[45deg]";
    const unskewClass = "skew-x-[45deg] scale-[2.2]";

    return (
        <div className="relative w-full h-screen bg-[#0d151a] overflow-hidden font-sans">
            {/* LAYER 1: BASE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <img
                    src={images.mainBg}
                    className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
                    alt="background"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* LAYER 2: BEHIND-SUBJECT SKEWED PANELS */}
            <div className="absolute inset-0 z-10 flex">
                <div className="relative w-full h-full flex">
                    <div
                        className={`w-[6%] h-full bg-black/80 ${skewClass} -ml-20 border-r border-white/10`}
                    />

                    {/* Woman Panel */}
                    <div
                        className={`relative w-[12%] h-[48%] right-[-15%] top-[20%] overflow-hidden ${skewClass}`}
                    >
                        <img
                            src={images.womanLeft}
                            // Added unskewClass and object-cover
                            className={`absolute inset-0 w-full h-full object-cover ${unskewClass}`}
                            alt="woman"
                        />
                    </div>
                </div>
            </div>

            {/* LAYER 3: THE MAIN CHARACTER */}
            <div className="absolute inset-0 z-20 flex justify-center items-start pt-10">
                <div className="relative w-[50%] h-[90%] flex justify-center">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/5c192087506fbef56360432f/6398b16c-e65b-4375-9e67-d86b971a938b/Brad+Pitt+F1.png"
                        className="h-full object-contain z-20 brightness-110"
                        alt="Main Character"
                    />
                </div>
            </div>

            {/* LAYER 4: OVER-SUBJECT SKEWED PANELS */}
            <div className="absolute inset-0 z-40">
                {/* Javier Bardem Style */}
                <div
                    className={`absolute right-[24%] top-[-5%] w-[14%] h-[40%] overflow-hidden ${skewClass} shadow-2xl`}
                >
                    <img
                        src={images.javierTop}
                        // Added unskewClass and changed object-fill to object-cover to prevent squashing
                        className={`w-full h-full object-cover ${unskewClass}`}
                        alt="top character"
                    />
                </div>

                {/* Walking Man */}
                <div
                    className={`absolute right-[15%] bottom-[30%] w-[16%] h-[56%] overflow-hidden ${skewClass} shadow-xl`}
                >
                    <img
                        src={images.walkingMan}
                        className={`w-full h-full object-cover ${unskewClass}`}
                        alt="walking man"
                    />
                </div>

                {/* Damson Idris */}
                <div
                    className={`absolute left-[25%] bottom-[5%] w-[12%] h-[40%] overflow-hidden ${skewClass}`}
                >
                    <img
                        src={images.damsonIdris}
                        className={`w-full h-full object-cover ${unskewClass}`}
                        alt="bottom left"
                    />
                </div>

                {/* Race Car */}
                <div
                    className={`absolute right-[-5%] bottom-[-5%] w-[25%] h-[35%] overflow-hidden ${skewClass}`}
                >
                    <img
                        src={images.raceCarBottom}
                        // Added unskewClass and changed object-fill to object-cover
                        className={`w-full h-full object-cover ${unskewClass}`}
                        alt="race car"
                    />
                </div>
            </div>

            {/* LAYER 5: SPEED LINES */}
            <div className="absolute inset-0 z-50 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute h-[150%] w-[1px] bg-white/20 -top-[25%] ${skewClass}`}
                        style={{ left: `${i * 12 + 5}%` }}
                    />
                ))}
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 text-center">
                <h1 className="text-black font-black text-6xl tracking-tighter italic opacity-20">
                    F1
                </h1>
            </div>
        </div>
    );
};

export default F1Poster;
