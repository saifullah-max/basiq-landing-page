import React from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Philosophy from "./components/Philosophy";
import Team from "./components/Team";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <main className="flex-1">
        <Philosophy />
        <Services />
        {/* <Team /> */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
