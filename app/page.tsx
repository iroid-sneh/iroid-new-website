import Hero from "@/components/Hero";
import AwardsList from "@/components/AwardsList";
import TextReveal from "@/components/TextReveal";
import AwardsVideoScroll from "@/components/AwardsVideoScroll";
import ClientMapSection from "@/components/ClientMapSection";
import PerspectiveGrid from "@/components/PerspectiveGrid";
import LandoExperience from "@/components/lando/LandoExperience";
import LandoBackground from "@/components/lando/LandoBackground";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import SelectedWorksTitle from "@/components/SelectedWorksTitle";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import F1PosterFull from "@/components/F1PosterFull";
import HorizontalShowcase from "@/components/HorizontalShowcase";

export default function Home() {
    return (
        <main className="bg-black">
            {/* <LandoBackground /> */}
            {/* <LandoExperience /> */}
            <Hero />
            <AboutSection />
            <TextReveal />
            {/* <HorizontalShowcase /> */}
            {/* <F1PosterFull /> */}
            {/* <ProjectsCarousel>
                <SelectedWorksTitle />
            </ProjectsCarousel> */}
            {/* <AwardsList /> */}
            <AwardsVideoScroll />
            <ClientMapSection />

            {/* 3D Perspective Grid – only activates when you scroll to it */}
            <PerspectiveGrid />

            <Footer />
        </main>
    );
}
