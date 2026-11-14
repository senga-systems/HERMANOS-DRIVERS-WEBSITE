import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import Logo from '../common/Logo';

export default function Footer({ onOpenBooking, onSelectTab }) {
  const handleLink = (tab) => {
    if (onSelectTab) {
      onSelectTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#070c32] text-white pt-14 pb-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <button onClick={() => handleLink('home')} className="text-left focus:outline-none">
              <Logo />
            </button>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xs pt-1">
              Hermanos Drivers - Your Journey is Our Responsibility!
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#f19e02] hover:text-[#070c32] text-gray-300 flex items-center justify-center transition-colors text-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#twitter"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#f19e02] hover:text-[#070c32] text-gray-300 flex items-center justify-center transition-colors text-xs"
                aria-label="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#linkedin"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#f19e02] hover:text-[#070c32] text-gray-300 flex items-center justify-center transition-colors text-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#f19e02] hover:text-[#070c32] text-gray-300 flex items-center justify-center transition-colors text-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('services')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('team')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('location')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => handleLink('services')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Vehicle Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('services')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Long Distance Trips
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('services')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Personal & Private Driving
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('services')}
                  className="hover:text-[#f19e02] transition-colors text-left"
                >
                  Vehicle Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Location (Span 2) */}
          <div id="location" className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Location
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>Lilongwe</li>
              <li>Blantyre</li>
              <li>Mzuzu</li>
              <li className="pt-1 text-[#f19e02] text-[11px] font-semibold">
                + Dar es Salaam Route
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-3">
          <p>© 2024 Hermanos Group. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-gray-200 transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#terms" className="hover:text-gray-200 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
