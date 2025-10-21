import React from "react";

export default function Services() {
  const services = [
    {
      title: "PAID ADVERTISING",
      desc: "Ads, just ads. We focus purely on paid ads and scaling ROI for ecommerce & info products.",
    },
    {
      title: "AD STRATEGY",
      desc: "Full funnel ad strategy with tracking and analytics to measure ROAS & profit.",
    },
    {
      title: "CREATIVE TESTING",
      desc: "High-tempo creative testing to find top converting assets quickly.",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-24 bg-[#0C0B1D] text-white overflow-hidden"
    >
      {/* Soft background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/20 blur-[150px] rounded-full"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          What We Offer
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14 text-lg">
          We don’t do everything — we specialize in one thing: generating insane ROI
          through paid advertising that actually scales.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-8 rounded-2xl bg-gradient-to-b from-gray-900/70 to-gray-800/50 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(236,72,153,0.08)] hover:shadow-[0_0_25px_rgba(236,72,153,0.18)] transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                ✦
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {s.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
