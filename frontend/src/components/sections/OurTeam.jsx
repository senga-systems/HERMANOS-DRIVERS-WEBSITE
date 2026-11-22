import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Gershom Mpinganjira',
    image: '/images/our_team/gershom_mpinganjira.jpg',
    phone: '+265 995 06 12 32',
    phoneRaw: '265995061232',
  },
  {
    id: 2,
    name: 'Imran Lupiya',
    image: '/images/our_team/imran_lupiya.jpg',
    phone: '+265 884 83 11 85',
    phoneRaw: '265884831185',
  },
  {
    id: 3,
    name: 'James Mphandauyo',
    image: '/images/our_team/james_mphandauyo.jpg',
    phone: '+265 997 09 69 22',
    phoneRaw: '265997096922',
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
                  width: isActive ? '220px' : '175px',
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

                {/* Member Name & WhatsApp Contact */}
                <div className="text-center mt-3 sm:mt-4 flex flex-col items-center w-full">
                  <h3
                    className={`font-black tracking-tight transition-colors ${
                      isActive ? 'text-base sm:text-lg text-[#070c32]' : 'text-xs sm:text-sm text-gray-800'
                    }`}
                  >
                    {member.name}
                  </h3>

                  <a
                    href={`https://wa.me/${member.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md cursor-pointer ${
                      isActive
                        ? 'bg-[#25D366] hover:bg-[#20ba59] text-white text-xs shadow-md ring-2 ring-[#25D366]/30'
                        : 'bg-white hover:bg-[#25D366] text-gray-800 hover:text-white text-[11px] border border-gray-300'
                    }`}
                    title={`Chat with ${member.name} on WhatsApp`}
                    aria-label={`Open WhatsApp chat with ${member.name} (${member.phone})`}
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current flex-shrink-0" />
                    <span className="tracking-tight whitespace-nowrap">{member.phone}</span>
                  </a>
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
