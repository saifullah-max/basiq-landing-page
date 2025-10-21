import React from "react";

export default function Philosophy() {
  return (
    // The main section is dark purple/blue, matching the background of the image.
    // The 'py-20' provides vertical padding.
    <section className="bg-[#190a33] py-20 text-white" id="about">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        {/* --- Left Column: What We Offer (Paid Advertising Focus) --- */}
        <div className="lg:pr-16">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white/80">
            What we offer
          </h2>
          <h1 className="text-6xl font-extrabold mt-2 text-[#ff66b2]">
            PAID ADVERTISING
          </h1>
          <p className="text-white/70 mt-4 text-lg">Ads. Just. Ads.</p>

          <p className="mt-6 text-lg leading-relaxed">
            We do one thing - we just do it with a monastic focus and better
            than anyone else. If you want an agency that offers a full service
            solution of everything that won't move the needle forward, we're not
            for you.
          </p>

          <p className="mt-4 text-lg leading-relaxed">
            If you want an agency where with two clicks, you can get a clear
            breakdown of how much was spent, how much was made & what your net
            profit was - we're for you.
          </p>

          {/* Call to Action Button */}
          <div className="mt-10">
            <a
              href="#audit"
              className="inline-block px-10 py-4 text-lg font-semibold text-white bg-[#8a2be2] rounded-full hover:bg-[#9932cc] transition-colors shadow-xl"
              style={{
                // Custom gradient/shadow to match the distinct button look
                background: "linear-gradient(90deg, #8a2be2, #c77dff)",
                boxShadow: "0 0 20px rgba(138, 43, 226, 0.7)",
              }}
            >
              Speak To Our Team Today
              <span className="block text-sm font-normal opacity-90 mt-1">
                Schedule Your FREE Audit Call Now
              </span>
            </a>
          </div>
        </div>

        {/* --- Right Column: Mastery Demands Focus (Exclusion List) --- */}
        <div className="lg:pl-16 lg:border-l border-white/10">
          <p className="text-xl font-bold tracking-wider text-white">
            MASTERY DEMANDS FOCUS SO...
          </p>
          <p className="text-xl mt-2 italic text-white/90">
            We don't offer any other services except for{" "}
            <span className="font-extrabold not-italic text-[#ff66b2]">
              paid advertising...
            </span>
          </p>

          <ul className="mt-8 space-y-4">
            {/* List Items with X icon and bold text */}
            {[
              "WEBDESIGN",
              "CONTENT CREATION",
              "EMAIL MARKETING",
              "SOCIAL MEDIA MANAGEMENT",
              "INSTAGRAM GROWTH",
              "PR SERVICE",
            ].map((service) => (
              <li key={service} className="flex items-center text-lg">
                {/* Red X icon - using a simple 'X' or an actual icon if an icon library was available (like Font Awesome) */}
                <span className="text-red-500 mr-4 text-2xl font-bold">
                  &#9747;
                </span>
                <span className="font-bold uppercase tracking-wide">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Original Philosophy Content (moved below for structural comparison but not in the image) --- */}
      {/* <div className="max-w-4xl mx-auto px-6 text-center mt-20">
        <h3 className="text-2xl font-bold">Our Philosophy</h3>
        <p className="mt-4 text-lg">
          Here at IAG Media, we've worked with the best in the industry to produce millions of dollars in return on ad spend...
        </p>
        <div className="mt-8">
          <a href="#audit" className="underline font-semibold">Speak to Our Team Today — Schedule Your FREE Audit Call Now</a>
        </div>
      </div> 
      */}
    </section>
  );
}
