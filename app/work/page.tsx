export default function WorkPage() {
    return (
      <main className="min-h-screen bg-[#F4F4ED] text-[#131313] px-8 md:px-20 py-32">
        <section className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-16">
            Our Work
          </h1>
  
          <div className="grid md:grid-cols-2 gap-12">
            {["FinTech Platform", "AI Dashboard", "Enterprise CRM", "EdTech SaaS"].map((project, i) => (
              <div key={i} className="border border-[#d9d9d0] p-10 rounded-xl">
                <h3 className="text-3xl font-semibold mb-4">{project}</h3>
                <p className="text-lg opacity-80">
                  Scalable architecture, performance optimization, and seamless UX.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }
  