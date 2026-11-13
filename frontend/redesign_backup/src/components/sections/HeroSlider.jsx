import React from 'react';
import { ArrowRight } from 'lucide-react';

// Hero image path stored in dedicated public assets folder for easy future replacement
const HERO_BG_IMAGE = '/images/hero/hero-driver.jpg';
const TOP_BRUSH_IMAGE = '/images/hero/brush-top-clean.png';

export default function HeroSlider({ onOpenBooking }) {
  return (
    <section id="home" className="relative w-full min-h-[580px] lg:min-h-[640px] bg-[#070c32] overflow-hidden flex items-center">
      {/* 1. Background Image (Interior of car with driver hand on steering wheel) */}
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${HERO_BG_IMAGE}')`,
        }}
      >
        {/* Navy gradient overlay on left for sharp text contrast matching Image 2 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070c32] via-[#070c32]/85 to-transparent sm:via-[#070c32]/80 sm:to-[#070c32]/30" />
      </div>

      {/* 2. Top Brush Stroke Transition */}
      <div
        className="absolute top-0 left-0 right-0 h-7 sm:h-9 z-20 pointer-events-none bg-repeat-x bg-contain opacity-95"
        style={{
          backgroundImage: `url('${TOP_BRUSH_IMAGE}')`,
        }}
      />

      {/* 3. Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow">
            HERMANOS DRIVERS
          </h1>

          {/* Sub-headline */}
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-5 drop-shadow">
            Professional Drivers for Hire.
          </h2>

          {/* Descriptive Copy */}
          <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed font-normal mb-8 max-w-xl drop-shadow">
            Need to get a vehicle delivered safely, or looking for a trusted driver for a long-distance trip? We provide reliable, experienced, and professional drivers across Malawi and beyond.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary Action: Hire A Driver */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold px-7 py-3 rounded text-sm sm:text-base shadow-md transition-all duration-200 active:scale-95"
            >
              <span>Hire A Driver</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Secondary Action: Explore Our Services */}
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2.5 bg-[#070c32]/90 hover:bg-[#070c32] text-[#f19e02] border-2 border-[#f19e02] font-bold px-7 py-3 rounded text-sm sm:text-base transition-all duration-200 shadow-sm"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Bottom Upward Arc Transition to Light Gray Background */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1000 65"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#d9d9d9] fill-current"
        >
          {/* Smooth upward convex curve matching the design */}
          <path d="M 0,65 Q 500,-10 1000,65 L 1000,65 L 0,65 Z" />
        </svg>
      </div>
    </section>
  );
}
