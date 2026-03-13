import Hero from "@/components/Hero";
import TextReveal from "@/components/TextReveal";
import AwardsVideoScroll from "@/components/AwardsVideoScroll";
import ClientMapSection from "@/components/ClientMapSection";
import PerspectiveGrid from "@/components/PerspectiveGrid";
import LandoExperience from "@/components/lando/LandoExperience";
import LandoBackground from "@/components/lando/LandoBackground";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="bg-black">
            <LandoBackground />
            <LandoExperience />
            <Hero />
            <TextReveal />
            <AwardsVideoScroll />
            <ClientMapSection />

            {/* 3D Perspective Grid – only activates when you scroll to it */}
            <PerspectiveGrid />

            <Footer />
        </main>
    );
}
