import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[85%] md:w-[90%] lg:w-[85%] transition-all duration-300 ${
            scrolled 
                ? "bg-[#0C0B1D]/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(236,72,153,0.15)]" 
                : "bg-[#0C0B1D]/80 backdrop-blur-md border border-white/10 shadow-lg"
        } rounded-full`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-3.5 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="/"
                    className="text-2xl font-extrabold tracking-tight text-white group transition-transform duration-300 hover:scale-105"
                >
                    <span className="pl-2 md:pl-4 lg:pl-8 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(236,72,153,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300">
                        Basiq
                    </span>
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm lg:text-base">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className="relative px-4 py-2 text-gray-300 font-medium hover:text-white transition-all duration-300 group"
                            >
                                <span className="relative z-10">{item.label}</span>
                                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-3/4 transition-all duration-300"></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#0C0B1D]/98 backdrop-blur-xl border-t border-white/10 rounded-b-3xl mx-2 mt-3 shadow-xl animate-fade-in-down overflow-hidden">
                    <ul className="flex flex-col items-center space-y-2 py-6 text-gray-200 font-medium">
                        {navItems.map((item) => (
                            <li key={item.label} className="w-full">
                                <a
                                    href={item.href}
                                    className="block px-6 py-3 mx-4 rounded-full hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 hover:text-white transition-all duration-300 text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
