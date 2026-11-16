import React, { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import Logo from '../common/Logo';

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'team', label: 'Our Team' },
  { key: 'location', label: 'Location' },
  { key: 'contact', label: 'Contact' },
];

export default function Navbar({ onOpenBooking, activeTab = 'home', onSelectTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (key) => {
    if (onSelectTab) {
      onSelectTab(key);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* 1. TOP GOLDEN BAR */}
      <div className="bg-[#f19e02] py-2 px-3 sm:px-8 text-xs font-semibold text-[#070c32]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Contact Details */}
          <div className="flex items-center space-x-3 sm:space-x-6 overflow-hidden text-[11px] sm:text-xs">
            <a
              href="tel:+265997096922"
              className="flex items-center gap-1.5 hover:text-black transition-colors whitespace-nowrap active:scale-95 transition-transform"
            >
              <Phone className="w-3.5 h-3.5 text-[#070c32] flex-shrink-0" />
              <span>+265 (0) 997 096 922</span>
            </a>
            <span className="hidden sm:inline text-[#070c32]/40">|</span>
            <a
              href="mailto:hermanosgroup265@gmail.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-black transition-colors truncate active:scale-95 transition-transform"
            >
              <Mail className="w-3.5 h-3.5 text-[#070c32] flex-shrink-0" />
              <span>hermanosgroup265@gmail.com</span>
            </a>
          </div>

          {/* Action Button: Get a Quote Section */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNavClick('quote')}
              className={`${
                activeTab === 'quote'
                  ? 'bg-white text-[#070c32] font-black ring-2 ring-[#070c32] shadow-md'
                  : 'bg-[#070c32] hover:bg-[#04081e] text-white'
              } font-bold px-3 sm:px-4 py-1.5 rounded text-xs active:scale-95 transition-transform duration-200 shadow-sm`}
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="bg-[#070c32] px-4 sm:px-8 py-3.5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none active:scale-95 transition-transform"
              aria-label="Hermanos Home"
            >
              <Logo />
            </button>
            <span className="hidden lg:inline-block text-xs sm:text-sm text-white font-normal tracking-normal border-l border-white/20 pl-4 sm:pl-6">
              Your Journey, Our Responsibility!
            </span>
          </div>

          {/* Desktop Nav Links with Animated Underline Effect */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-7 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`relative py-1 text-sm transition-all duration-300 active:scale-95 transition-transform after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#f5a623] after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-[#f5a623] font-bold after:w-full'
                      : 'text-white hover:text-[#f5a623] font-medium after:w-0 hover:after:w-full'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-200 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] active:scale-95 transition-transform"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu with Touch Friendly Layout */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-1.5 pb-3 animate-fadeIn">
            <div className="text-xs text-gray-300 font-medium px-3 pb-2 italic">
              Your Journey, Our Responsibility!
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-base active:scale-95 transition-transform duration-200 ${
                    isActive
                      ? 'font-bold text-[#070c32] bg-white shadow-sm'
                      : 'font-medium text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-3 px-1">
              <button
                onClick={() => handleNavClick('quote')}
                className={`w-full ${
                  activeTab === 'quote'
                    ? 'bg-white text-[#070c32] ring-2 ring-[#070c32]'
                    : 'bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32]'
                } font-black py-3 rounded-lg text-sm shadow-md active:scale-95 transition-transform duration-200`}
              >
                Get a Quote / Book A Driver
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
