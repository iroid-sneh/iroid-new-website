const F1Poster = () => {
    const images = {
        mainBg: "https://images.unsplash.com/photo-1586260790835-e055196a768b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhY2tncm91bnxlbnwwfDB8MHx8fDA%3D",
        bradPitt:
            "https://images.unsplash.com/photo-1530939986565-c0c17d114071?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFja2dyb3VufGVufDB8MHwwfHx8MA%3D%3D",
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

    const skewClass = "-skew-x-[45deg]";
    // Inner wrapper: counter-skew + expand far enough horizontally to fill the parallelogram
    const innerStyle = {
        top: "-25%",
        bottom: "-25%",
        left: "-150%",
        right: "-150%",
    };

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

            {/* LAYER 2: BEHIND-SUBJECT PANELS */}
            <div className="absolute inset-0 z-40 flex">
                <div className="relative w-full h-full flex">
                    <div
                        className={`w-[6%] h-full bg-black/80 ${skewClass} -ml-20 border-r border-white/10`}
                    />

                    {/* Woman Panel */}
                    <div
                        className={`relative w-[12%] h-[48%] right-[-15%] top-[20%] overflow-hidden ${skewClass}`}
                    >
                        <div
                            className="absolute skew-x-[45deg]"
                            style={innerStyle}
                        >
                            <img
                                src={images.womanLeft}
                                className="w-full h-full object-cover"
                                alt="woman"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* LAYER 3: THE MAIN CHARACTER */}
            <div className="absolute inset-0 z-20 flex justify-center items-start pt-10">
                <div className="relative w-[50%] h-[90%] flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1530939986565-c0c17d114071?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFja2dyb3VufGVufDB8MHwwfHx8MA%3D%3D"
                        className="h-full object-contain z-20 brightness-110"
                        alt="Main Character"
                    />
                </div>
            </div>

            {/* LAYER 4: OVER-SUBJECT SKEWED PANELS */}
            <div className="absolute inset-0">
                {/* Javier Bardem Style */}
                <div
                    className={`absolute z-10 right-[24%] top-[-5%] w-[14%] h-[40%] overflow-hidden ${skewClass} shadow-2xl`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.javierTop}
                            className="w-full h-full object-cover"
                            alt="top character"
                        />
                    </div>
                </div>

                {/* Walking Man */}
                <div
                    className={`absolute z-40 right-[15%] bottom-[30%] w-[16%] h-[56%] overflow-hidden ${skewClass} shadow-xl`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.walkingMan}
                            className="w-full h-full object-cover"
                            alt="walking man"
                        />
                    </div>
                </div>

                {/* Damson Idris */}
                <div
                    className={`absolute z-40 left-[25%] bottom-[5%] w-[12%] h-[40%] overflow-hidden ${skewClass}`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.damsonIdris}
                            className="w-full h-full object-cover"
                            alt="bottom left"
                        />
                    </div>
                </div>

                {/* Race Car */}
                <div
                    className={`absolute right-[-5%] bottom-[-5%] w-[25%] h-[35%] overflow-hidden ${skewClass}`}
                >
                    <div className="absolute skew-x-[45deg]" style={innerStyle}>
                        <img
                            src={images.raceCarBottom}
                            className="w-full h-full object-cover"
                            alt="race car"
                        />
                    </div>
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
