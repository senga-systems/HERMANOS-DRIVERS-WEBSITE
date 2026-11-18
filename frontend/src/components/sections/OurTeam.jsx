import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Gershom Mpinganjira',
    image: '/images/our_team/gershom_mpinganjira.jpg',
  },
  {
    id: 2,
    name: 'Imran Lupiya',
    image: '/images/our_team/imran_lupiya.jpg',
  },
  {
    id: 3,
    name: 'James Mphandauyo',
    image: '/images/our_team/james_mphandauyo.jpg',
  },
];

export default function OurTeam() {
  // Center active index defaults to 1 (Imran Lupiya)
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  return (
    <section id="team" className="py-16 sm:py-24 bg-[#d9d9d9] text-[#070c32] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Left Badge */}
        <div className="mb-10 sm:mb-14 text-left">
          <span className="inline-flex items-center gap-2 bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-5 py-2 rounded-full shadow-sm tracking-wide">
            <span>OUR TEAM</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        </div>

        {/* Arch Members Container - Mobile Friendly Horizontal Swipe / Center Layout */}
        <div className="flex items-end justify-start sm:justify-center gap-3 sm:gap-6 lg:gap-8 overflow-x-auto pb-8 pt-8 px-2 no-scrollbar snap-x snap-mandatory">
          {TEAM_MEMBERS.map((member, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={member.id}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer flex flex-col items-center flex-shrink-0 snap-center select-none grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500 ${
                  isActive
                    ? 'scale-105 sm:scale-110 z-20 opacity-100 grayscale-0'
                    : 'scale-90 sm:scale-95 opacity-80 hover:opacity-100'
                }`}
                style={{
                  width: isActive ? '210px' : '160px',
                }}
              >
                {/* Outer Framing Arch */}
                <div className="relative w-full flex flex-col items-center">
                  {/* Subtle outer arch wireframe line matching the design */}
                  {isActive && (
                    <div className="absolute -inset-2.5 rounded-t-full border border-gray-400/70 pointer-events-none -top-4" />
                  )}

                  {/* Main Arch-shaped Portrait Frame */}
                  <div
                    className={`relative w-full aspect-[3/4.2] rounded-t-full rounded-b-xl overflow-hidden shadow-xl transition-all duration-500 bg-gray-400 ${
                      isActive ? 'shadow-2xl ring-1 ring-gray-400' : ''
                    }`}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top pointer-events-none"
                    />
                  </div>
                </div>

                {/* Member Name */}
                <div className="text-center mt-3 sm:mt-4">
                  <h3
                    className={`font-black tracking-tight transition-colors ${
                      isActive ? 'text-base sm:text-lg text-[#070c32]' : 'text-xs sm:text-sm text-gray-800'
                    }`}
                  >
                    {member.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slider Controls: Horizontal Track on left, Arrows on right */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-400/30 max-w-4xl mx-auto">
          {/* Slider track line with active progress bar */}
          <div className="flex-1 max-w-xs sm:max-w-md h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-600 rounded-full transition-all duration-300"
              style={{
                width: `${((activeIndex + 1) / TEAM_MEMBERS.length) * 100}%`,
              }}
            />
          </div>

          {/* Left and Right navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 flex items-center justify-center active:scale-95 transition-transform duration-200 shadow-sm"
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 flex items-center justify-center active:scale-95 transition-transform duration-200 shadow-sm"
              aria-label="Next team member"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
