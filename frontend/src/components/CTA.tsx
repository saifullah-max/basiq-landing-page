import React, { useState } from "react";
// import axios from 'axios'

export default function CTA() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // Using 'idle' for the initial state for better clarity
  const [status, setStatus] = useState("idle");

  // Function to handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.status === "ok") {
        setStatus("ok");
        setForm({ name: "", email: "", message: "" });
      } else {
        console.error("Server Error:", data.message);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setStatus("error");
    }
  };

  return (
    // Dark background matching the philosophy section
    <section id="contact" className="py-20 bg-[#120722] text-white">
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="text-4xl font-extrabold text-center text-white">
          Schedule Your <span className="text-[#ff66b2]">FREE Audit Call</span>
        </h3>
        <p className="text-center mt-3 text-lg text-white/70">
          Tell us about your business goals and let's start scaling.
        </p>

        <form
          onSubmit={submit}
          className="mt-12 grid gap-6 bg-[#190a33] p-8 rounded-xl shadow-2xl border border-white/10"
        >
          {/* Input Fields */}
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name (Required)"
            className="p-4 bg-[#231440] border border-white/20 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-[#c77dff] focus:border-[#c77dff] transition-all outline-none"
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Best Email (Required)"
            className="p-4 bg-[#231440] border border-white/20 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-[#c77dff] focus:border-[#c77dff] transition-all outline-none"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your business, current ad spend, and goals..."
            className="p-4 border bg-[#231440] border-white/20 text-white placeholder-white/50 rounded-lg h-32 focus:ring-2 focus:ring-[#c77dff] focus:border-[#c77dff] transition-all outline-none resize-none"
          />

          {/* Submission and Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <button
              type="submit"
              disabled={status === "loading" || status === "ok"}
              className={`
                w-full sm:w-auto px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 transform
                ${
                  status === "loading" || status === "ok"
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.03]"
                }
              `}
              // Apply the distinct button styling
              style={{
                background: "linear-gradient(90deg, #8a2be2, #c77dff)",
                boxShadow:
                  status === "idle"
                    ? "0 0 15px rgba(138, 43, 226, 0.5)"
                    : "none",
              }}
            >
              {status === "loading" ? "Scheduling..." : "Schedule Call"}
            </button>

            <div className="text-center sm:text-right">
              {status === "loading" && (
                <span className="text-white/80 animate-pulse">
                  Sending Request...
                </span>
              )}
              {status === "ok" && (
                <span className="text-[#3cff8c] font-semibold flex items-center justify-center sm:justify-end">
                  &#10003; Success! We'll be in touch shortly.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-500 font-semibold flex items-center justify-center sm:justify-end">
                  &#9888; Error sending request. Please try again.
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
