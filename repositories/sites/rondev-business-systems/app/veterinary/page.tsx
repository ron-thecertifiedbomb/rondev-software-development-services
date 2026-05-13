import { appVeterinaryConfig } from "@/config/app.config";
import Navbar from "../components/NavBar";

export default function Home() {
    const c = appVeterinaryConfig;
  
    return (
      <main className="bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
  
        {/* NAVBAR */}
        <Navbar />
  
        {/* MOBILE FLOATING CTA */}
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl shadow-xl text-lg font-semibold active:scale-95 transition">
            🐾 Book Free Check Now
          </button>
        </div>
  
        {/* HERO */}
        <section className="px-6 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-center">
  
            {/* LEFT */}
            <div className="space-y-8">
  
              <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                {c.hero.title}
                <span className="block text-blue-600 mt-3">
                  {c.hero.highlight}
                </span>
              </h1>
  
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                {c.hero.description}
              </p>
  
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition">
                  {c.hero.ctaPrimary}
                </button>
  
                <button className="border border-gray-300 px-8 py-4 rounded-2xl hover:bg-gray-100 transition">
                  {c.hero.ctaSecondary}
                </button>
              </div>
  
              <p className="text-sm text-gray-500 pt-2">
                ✅ Free consultation • ✅ Limited slots • ✅ Trusted care
              </p>
            </div>
  
            {/* IMAGE */}
            <div className="relative">
              <img
                src={c.hero.image}
                alt="Veterinary care"
                className="w-full h-[480px] object-cover rounded-[28px] shadow-2xl"
              />
  
              <div className="hidden md:block absolute -bottom-6 -left-6 bg-white shadow-lg rounded-xl px-4 py-3 text-sm">
                🐾 Trusted by 1,000+ pet owners
              </div>
            </div>
  
          </div>
        </section>
  
        {/* TRUST */}
        <section className="py-12 border-y bg-white/70 backdrop-blur">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold">{c.trust.headline}</h3>
            <p className="text-gray-500 mt-2">{c.trust.sub}</p>
          </div>
        </section>
  
        {/* SERVICES */}
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Premium Veterinary Care
            </h2>
  
            <div className="grid md:grid-cols-3 gap-10">
              {c.services.map((s, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-white shadow hover:shadow-2xl hover:-translate-y-3 transition"
                >
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                    🐾
                  </div>
  
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* OFFER */}
        <section className="py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto bg-blue-600 text-white p-12 rounded-[40px] shadow-2xl">
  
            <h2 className="text-4xl font-bold">
              🎉 {c.offer.title}
            </h2>
  
            <p className="mt-4 text-lg">
              {c.offer.desc}
            </p>
  
            <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
              {c.offer.cta}
            </button>
          </div>
        </section>
  
        {/* TESTIMONIALS */}
        <section className="py-28 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-14">
              Loved by Pet Owners ❤️
            </h2>
  
            <div className="grid md:grid-cols-2 gap-10">
              {c.testimonials.map((t, i) => (
                <div
                  key={i}
                  className="p-8 bg-white rounded-3xl shadow hover:shadow-xl transition"
                >
                  <p className="italic text-lg">"{t}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* FINAL CTA */}
        <section className="py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">
              {c.finalCta.title}
            </h2>
  
            <p className="mt-6 text-gray-600 text-lg">
              {c.finalCta.desc}
            </p>
  
            <button className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl shadow hover:scale-105 transition">
              {c.finalCta.button}
            </button>
          </div>
        </section>
  
        {/* CONTACT */}
        <section className="pb-24 px-6 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold">Contact Us</h3>
            <p className="mt-6 text-gray-600">📍 {c.contact.location}</p>
            <p>📞 {c.contact.phone}</p>
            <p>📧 {c.contact.email}</p>
          </div>
        </section>
  
        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          © {new Date().getFullYear()} {c.brand.name}
        </footer>
  
      </main>
    );
  }
  ``