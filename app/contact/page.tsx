export default function ContactPage() {
    return (
      <main className="min-h-screen bg-[#F4F4ED] text-[#131313] px-8 md:px-20 py-32">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-16">
            Contact Us
          </h1>
  
          <form className="space-y-8">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-[#d9d9d0] p-4 rounded-lg bg-transparent"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-[#d9d9d0] p-4 rounded-lg bg-transparent"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-[#d9d9d0] p-4 rounded-lg bg-transparent"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#131313] text-white rounded-lg"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    );
  }
  