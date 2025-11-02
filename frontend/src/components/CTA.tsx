import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// --- Animated Background ---
function AnimatedBackground({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resizeCanvas = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    };

    const numParticles = 100;
    const particles: Particle[] = [];

    const colors = [
      "rgba(0, 255, 255, 0.8)", // cyan
      "rgba(0, 180, 255, 0.8)", // blue-cyan
      "rgba(255, 255, 255, 0.8)", // white
      "rgba(0, 200, 180, 0.8)", // teal
    ];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      if (!isActive) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = 1 - dist / 120;
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // bounce
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

// --- Floating Shapes ---
function FloatingShapes() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-12 left-12 w-16 h-16 border border-[#c77dff]/20"
          style={{ transform: "rotate(45deg)", animation: "spin 20s linear infinite" }}
        ></div>
        <div
          className="absolute top-24 right-16 w-12 h-12 bg-[#c77dff]/10 rounded-full"
          style={{ animation: "float 5s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-24 left-8 w-10 h-10 bg-gradient-to-r from-[#c77dff]/30 to-transparent"
          style={{ transform: "rotate(45deg)", animation: "pulse 3s ease-in-out infinite" }}
        ></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

// --- Main CTA Component ---
interface FormData {
  name: string;
  email: string;
  message: string;
}

type Status = "idle" | "loading" | "ok" | "error";

export default function CTA() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [isVisible] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal, // Add timeout signal
      });

      clearTimeout(timeoutId); // Clear timeout if request succeeds

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.status === "ok") {
        setStatus("ok");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error: unknown) {
      console.error("Contact form error:", error);
      // Handle timeout specifically
      if (error instanceof Error && error.name === 'AbortError') {
        setStatus("error");
        // Show user-friendly message for timeout
        setTimeout(() => {
          alert("Request timed out. The server might be sleeping. Please try again in a moment.");
        }, 100);
      } else {
        setStatus("error");
      }
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-[#120722] text-white overflow-hidden">
      <AnimatedBackground isActive={isVisible} />
      <FloatingShapes />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h3 className="text-4xl font-extrabold text-center text-white">
          Schedule Your <span className="text-[#c77dff]">FREE Audit Call</span>
        </h3>
        <p className="text-center mt-3 text-lg text-white/70">
          Tell us about your business goals and let's start scaling.
        </p>

        <form
          onSubmit={submit}
          className="mt-12 grid gap-6 bg-[#190a33]/90 p-8 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm"
        >
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name (Required)"
            className="p-4 bg-[#231440] border border-white/20 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-[#c77dff] transition-all outline-none"
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Best Email (Required)"
            className="p-4 bg-[#231440] border border-white/20 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-[#c77dff] transition-all outline-none"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your business, current ad spend, and goals..."
            className="p-4 border bg-[#231440] border-white/20 text-white placeholder-white/50 rounded-lg h-32 focus:ring-2 focus:ring-[#c77dff] transition-all outline-none resize-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <button
              type="submit"
              disabled={status === "loading" || status === "ok"}
              className={`w-full sm:w-auto px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 transform ${status === "loading" || status === "ok"
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-[1.03]"
                }`}
              style={{
                background: "linear-gradient(90deg, #8a2be2, #c77dff)",
                boxShadow:
                  status === "idle" ? "0 0 15px rgba(138, 43, 226, 0.5)" : "none",
              }}
            >
              {status === "loading" ? "Scheduling..." : "Schedule Call"}
            </button>

            <div className="text-center sm:text-right">
              {status === "loading" && (
                <span className="text-white/80 animate-pulse">Sending...</span>
              )}
              {status === "ok" && (
                <span className="text-[#3cff8c] font-semibold">
                  ✓ Success! We'll be in touch shortly.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-500 font-semibold">
                  ⚠ Error sending request. Please try again.
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
