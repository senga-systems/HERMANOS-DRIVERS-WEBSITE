import React, { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import Logo from '../common/Logo';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* 1. TOP GOLDEN BAR */}
      <div className="bg-[#f19e02] py-2 px-4 sm:px-8 text-xs font-semibold text-[#070c32]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Contact Details */}
          <div className="flex items-center space-x-6">
            <a
              href="tel:+265997096922"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#070c32]" />
              <span>+265 (0) 997 096 922</span>
            </a>
            <span className="hidden sm:inline text-[#070c32]/40">|</span>
            <a
              href="mailto:hermanosgroup265@gmail.com"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#070c32]" />
              <span>hermanosgroup265@gmail.com</span>
            </a>
          </div>

          {/* Action Button */}
          <div className="flex items-center">
            <button
              onClick={onOpenBooking}
              className="bg-[#070c32] hover:bg-[#04081e] text-white font-bold px-4 py-1.5 rounded text-xs transition duration-200 shadow-sm"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="bg-[#070c32] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <a href="#home">
              <Logo />
            </a>
            <span className="hidden md:inline-block text-sm text-white font-normal tracking-normal border-l border-white/20 pl-6">
              Your Journey, Our Responsibility!
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <a
              href="#home"
              className="bg-white text-[#070c32] font-bold px-4 py-1.5 rounded-md shadow-sm transition-all hover:bg-gray-100"
            >
              Home
            </a>
            <a href="#about" className="text-white hover:text-[#f19e02] transition-colors">
              About
            </a>
            <a href="#services" className="text-white hover:text-[#f19e02] transition-colors">
              Services
            </a>
            <a href="#team" className="text-white hover:text-[#f19e02] transition-colors">
              Our Team
            </a>
            <a href="#location" className="text-white hover:text-[#f19e02] transition-colors">
              Location
            </a>
            <a href="#contact" className="text-white hover:text-[#f19e02] transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-200 hover:text-white p-2"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-2 pb-2">
            <div className="text-xs text-gray-300 font-medium px-3 pb-2 italic">
              Your Journey, Our Responsibility!
            </div>
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-bold text-[#070c32] bg-white"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-medium text-white hover:bg-white/5"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-medium text-white hover:bg-white/5"
            >
              Services
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-medium text-white hover:bg-white/5"
            >
              Our Team
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-medium text-white hover:bg-white/5"
            >
              Location
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-base font-medium text-white hover:bg-white/5"
            >
              Contact
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#f19e02] text-[#070c32] font-bold py-2.5 rounded text-sm shadow-md"
              >
                Get a Quote / Hire A Driver
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
