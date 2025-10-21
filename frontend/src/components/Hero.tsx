export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-[#0C0B1D] text-white">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0B1D] via-[#120F2E] to-[#0C0B1D] opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="space-y-6 z-10">
          {/* Brand logo / name */}
          {/* <div className="inline-flex items-center rounded-full bg-[#E5B8CC]/10 backdrop-blur-md border border-pink-500/30 px-6 py-2 shadow-lg">
            <span className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Basiq
            </span>
          </div> */}

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug">
            We Help{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              E-commerce & Info Product Businesses
            </span>{" "}
            Produce Spine-Chilling ROI Via Paid Advertising
          </h1>

          {/* Supporting text */}
          <p className="text-gray-300 max-w-lg text-base sm:text-lg">
            Stop wasting time and money on faulty and ineffective ad campaigns.
          </p>
          <p className="text-gray-300 max-w-lg text-base sm:text-lg">
            It's time to make your ad-budget count, scale your business, and
            blow up your sales.
          </p>

          {/* CTA */}
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-white font-semibold text-base sm:text-lg shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200"
            >
              Speak To Our Team Today
              <div className="text-xs font-light mt-1">
                Schedule Your FREE Audit Call Now
              </div>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-500/20 blur-[100px] rounded-full"></div>
          <img
            src="/smm-illustration.png"
            alt="Marketing Illustration"
            className="w-72 md:w-[30rem] relative z-10 drop-shadow-[0_0_25px_rgba(236,72,153,0.3)]"
          />
        </div>
      </div>
    </header>
  );
}
