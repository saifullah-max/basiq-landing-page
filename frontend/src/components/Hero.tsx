export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-[#0C0B1D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side text */}
        <div className="text-white">
          <h4 className="uppercase tracking-wide font-bold text-sm text-gray-200">
            Modern Day Alchemy
          </h4>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug">
            <span className="text-pink-500">
              We Help E-commerce & Info Product Businesses Produce
              Spine-Chilling ROI Via Paid Advertising
            </span>
          </h1>
          <p className="mt-6 text-base text-gray-300 max-w-lg">
            Stop wasting time and money on faulty and ineffective ad campaigns.
          </p>
          <p className="mt-3 text-base text-gray-300 max-w-lg">
            It's time to make your ad-budget count, scale your business and blow
            up your sales.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-white font-bold shadow-lg hover:opacity-90 transition"
            >
              Speak To Our Team Today
              <div className="text-xs font-normal">
                Schedule Your FREE Audit Call Now
              </div>
            </a>
          </div>
        </div>

        {/* Right side image */}
        <div className="relative flex justify-center lg:justify-end">
          <img
            src="/Wizard-Illustration.jpg"
            alt="Hero Image"
            className="w-80 lg:w-[28rem] relative z-10"
          />
        </div>
      </div>

      {/* Slanted white divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white transform -skew-y-3 origin-bottom-left" />
    </header>
  );
}
