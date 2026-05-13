import { appTravelConfig } from "@/config/app.config";

export default function Home() {
  const c = appTravelConfig;

  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${c.hero.image})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            {c.hero.title}
            <span className="block text-blue-400 mt-2">
              {c.hero.highlight}
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            {c.hero.description}
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button className="bg-blue-600 px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition">
              {c.hero.ctaPrimary}
            </button>

            <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition">
              {c.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </section>


      {/* DESTINATIONS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Popular Destinations
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {c.destinations.map((d, i) => (
         <div
         key={i}
         className="relative h-[350px] rounded-3xl overflow-hidden group cursor-pointer"
       >
       
         {/* IMAGE */}
         <div
           className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700"
           style={{ backgroundImage: `url(${d.image})` }}
         />
       
         {/* DARK OVERLAY */}
         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
       
         {/* TEXT */}
         <div className="absolute bottom-0 p-6 text-white">
           <h3 className="text-xl font-semibold">{d.title}</h3>
           <p className="text-sm opacity-80">{d.desc}</p>
         </div>
       
       </div>
       
            ))}
          </div>
        </div>
      </section>


      {/* OFFER */}
      <section className="py-24 px-6 text-center bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold">{c.offer.title}</h2>
          <p className="mt-4 text-lg">{c.offer.desc}</p>

          <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
            {c.offer.cta}
          </button>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">
            What Travelers Say 🌍
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {c.testimonials.map((t, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-3xl shadow"
              >
                <p className="italic text-lg">"{t}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold">{c.finalCta.title}</h2>
        <p className="mt-6 text-gray-600 text-lg">{c.finalCta.desc}</p>

        <button className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-xl hover:scale-105 transition">
          {c.finalCta.button}
        </button>
      </section>


      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-6">
        © {new Date().getFullYear()} {c.brand.name}
      </footer>

    </main>
  );
}
