import { Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0C0B1D] text-white border-t border-white/10 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B1D] via-[#120F2E] to-[#0C0B1D] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold mb-3">
              <span className="bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Basiq
              </span>
            </h3>
            <p className="text-gray-400 text-sm">
              Driving ROI through strategic paid advertising
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <a
              href="tel:+12722404181"
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <Phone size={18} className="text-pink-400" />
              </div>
              <span className="font-medium">+1 (272) 240-4181</span>
            </a>

            <a
              href="https://www.instagram.com/basiq_agency/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <div className="p-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <Instagram size={18} className="text-pink-400" />
              </div>
              <span className="font-medium">@basiq_agency</span>
            </a>
          </div>

          {/* Additional Info */}
          {/* <div className="text-center md:text-right text-gray-400 text-sm">
            <p className="mb-2">IAG Online Services</p>
            <p>Company Number: 11178977</p>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Basiq Agency. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse"></div>
              <span className="text-gray-500 text-sm">Made with precision</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
