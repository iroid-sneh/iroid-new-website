// app/page.tsx
import Hero from "@/components/Hero";
import TextReveal from "@/components/TextReveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <TextReveal />
      
      {/* Extra space at the bottom just so we can keep scrolling to test the effect */}
      <div className="h-screen bg-black"></div>
    </main>
  );
}