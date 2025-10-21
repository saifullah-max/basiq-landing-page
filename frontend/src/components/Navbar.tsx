import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[80%] md:w-[90%] bg-[#0C0B1D]  border border-white/10 rounded-full shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="/"
                    className="text-2xl font-extrabold tracking-tight text-white"
                >
                    <span className="pl-8 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
                        Basiq
                    </span>
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className="hover:text-white transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-300 hover:text-white transition"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#0C0B1D]/95 backdrop-blur-lg border-t border-gray-700/30 rounded-b-3xl mx-3 mt-2 animate-fade-in-down">
                    <ul className="flex flex-col items-center space-y-4 py-6 text-gray-200 font-medium">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="block px-4 py-2 hover:text-pink-400 transition-colors duration-200"
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
