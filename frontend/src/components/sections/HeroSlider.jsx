import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Hero slide configurations:
// Background images and texts alternate together.
const HERO_SLIDES = [
  {
    id: 1,
    bgImage: '/images/hero/hero-slide-1.jpg',
    subHeadline: 'Professional Drivers for Hire.',
    paragraph:
      'Need to get a vehicle delivered safely, or looking for a trusted driver for a long-distance trip? We provide reliable, experienced, and professional drivers across Malawi and beyond.',
  },
  {
    id: 2,
    bgImage: '/images/hero/hero-slide-2.jpg',
    subHeadline: '"Your Journey, Our Responsibility!"',
    paragraph:
      "Whether you need a cross-border vehicle delivery from Dar es Salaam, or a private driver for your daily business errands, we've got you covered. Experience safe, stress-free travel with our expert team.",
  },
  {
    id: 3,
    bgImage: '/images/hero/hero-slide-3.jpg',
    subHeadline: 'Safe Vehicle Collection & Delivery',
    paragraph:
      'Let us handle the journey while you enjoy peace of mind. We safely deliver vehicles straight to your doorstep and handle long-distance trips within Malawi and beyond.',
  },
];

const TOP_BRUSH_IMAGE = '/images/hero/brush-top-clean.png';

export default function HeroSlider({ onOpenBooking, onExploreServices }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 6000ms (6-second) rotating timer alternating both images and texts
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-[580px] lg:min-h-[640px] bg-[#070c32] overflow-hidden flex items-center">
      {/* 1. Alternating Background Images with Smooth Crossfade */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
            style={{
              backgroundImage: `url('${slide.bgImage}')`,
            }}
          >
            {/* Deep navy gradient overlay on left for maximum text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070c32] via-[#070c32]/85 to-transparent sm:via-[#070c32]/80 sm:to-[#070c32]/30" />
          </div>
        );
      })}

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
          {/* Main Title with subtle Framer Motion entrance animation on load */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow"
          >
            HERMANOS DRIVERS
          </motion.h1>

          {/* Dynamic Alternating Sub-Headline & Paragraph Container */}
          <div className="relative min-h-[140px] sm:min-h-[130px] lg:min-h-[120px] mb-8 overflow-hidden">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 pointer-events-auto translate-y-0'
                      : 'opacity-0 pointer-events-none translate-y-2'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Sub-headline */}
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3 drop-shadow">
                    {slide.subHeadline}
                  </h2>

                  {/* Descriptive Paragraph */}
                  <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-xl drop-shadow">
                    {slide.paragraph}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary Action: Hire A Driver */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold px-7 py-3 rounded text-sm sm:text-base shadow-md active:scale-95 transition-transform duration-200"
            >
              <span>Hire A Driver</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Secondary Action: Explore Our Services */}
            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center justify-center gap-2.5 bg-[#070c32]/90 hover:bg-[#070c32] text-[#f19e02] border-2 border-[#f19e02] font-bold px-7 py-3 rounded text-sm sm:text-base active:scale-95 transition-transform duration-200 shadow-sm cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Alternating Slide Progress Indicator Dots */}
          <div className="flex items-center gap-2.5 mt-8">
            {HERO_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentSlide(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-500 active:scale-95 ${
                  dotIdx === currentSlide
                    ? 'w-8 bg-[#f19e02]'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
            <span className="text-xs text-gray-300 ml-2 font-mono">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
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
          <path d="M 0,65 Q 500,-10 1000,65 L 1000,65 L 0,65 Z" />
        </svg>
      </div>
    </section>
  );
}
