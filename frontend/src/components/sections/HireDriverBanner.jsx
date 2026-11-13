import React from 'react';
import { Phone, Mail } from 'lucide-react';

export default function HireDriverBanner({ onOpenBooking }) {
  return (
    <section className="bg-[#f19e02] py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Inner Dark Navy Card */}
        <div className="bg-[#070c32] rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-2xl relative">
          {/* Top Badge */}
          <div className="inline-block mb-5">
            <span className="bg-[#f19e02] text-[#070c32] font-bold text-xs uppercase px-4 py-1.5 rounded shadow-sm">
              Hire A Driver
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            HIRE A PROFESSIONAL DRIVER TODAY
          </h2>

          {/* Slogan */}
          <p className="text-xs sm:text-sm text-gray-300 font-normal mb-8 tracking-wide">
            Your Journey, Our Responsibility!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold px-7 py-2.5 rounded text-sm shadow-md transition-all duration-200 active:scale-95"
            >
              Hire A Driver
            </button>

            <a
              href="#services"
              className="w-full sm:w-auto border border-[#f19e02] hover:bg-[#f19e02]/10 text-[#f19e02] font-bold px-7 py-2.5 rounded text-sm transition-all duration-200"
            >
              Explore Our Services
            </a>
          </div>

          {/* Divider line */}
          <div className="w-full max-w-lg mx-auto h-px bg-white/10 mb-6" />

          {/* Bottom Contact Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-xs text-gray-300">
            <a
              href="tel:+265997096922"
              className="flex items-center gap-2 hover:text-[#f19e02] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#f19e02]" />
              <span>+265 (0) 997 096 922</span>
            </a>
            <a
              href="mailto:hermanosgroup265@gmail.com"
              className="flex items-center gap-2 hover:text-[#f19e02] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#f19e02]" />
              <span>hermanosgroup265@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
