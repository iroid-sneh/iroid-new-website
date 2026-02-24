// app/page.tsx
import Hero from "@/components/Hero";
import TextReveal from "@/components/TextReveal";
import Footer from "@/components/Footer"; // 1. Import the Footer component

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <TextReveal />
      {/* 2. Place the Footer at the end of your content */}
      <Footer />
    </main>
  );
}