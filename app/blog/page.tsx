export default function BlogPage() {
    return (
      <main className="min-h-screen bg-[#F4F4ED] text-[#131313] px-8 md:px-20 py-32">
        <section className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-16">
            Insights
          </h1>
  
          <div className="space-y-12">
            {[1, 2, 3].map((post) => (
              <div key={post} className="border-b border-[#d9d9d0] pb-10">
                <h2 className="text-3xl font-semibold mb-4">
                  Building Modern SaaS Systems in 2026
                </h2>
                <p className="opacity-70 text-lg">
                  Strategies, architecture patterns, and lessons learned from scaling platforms.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }
  