import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Leo Martin',
    role: 'Senior Transit Chauffeur',
    image: '/images/team/leo_martin_mockup.png',
  },
  {
    id: 2,
    name: 'Nish Nguyen',
    role: 'Long-Distance Specialist',
    image: '/images/team/nish_nguyen_mockup.png',
  },
  {
    id: 3,
    name: 'Taylor Jones',
    role: 'Head of Operations',
    image: '/images/team/taylor_jones_mockup.png',
  },
  {
    id: 4,
    name: 'Aisha Rahman',
    role: 'Executive Private Chauffeur',
    image: '/images/team/aisha_rahman_mockup.png',
  },
  {
    id: 5,
    name: 'Arjun Lim',
    role: 'Fleet Safety Director',
    image: '/images/team/arjun_lim_mockup.png',
  },
];

export default function OurTeam() {
  const [activeIndex, setActiveIndex] = useState(2);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  return (
    <section id="team" className="py-20 bg-[#d9d9d9] text-[#070c32]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Top Left Badge matching design */}
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 bg-[#f19e02] text-[#070c32] font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-sm">
            <span>Our Team</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        </div>

        {/* 5 Members Carousel / Grid */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 overflow-x-auto pb-6 pt-4 no-scrollbar">
          {TEAM_MEMBERS.map((member, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={member.id}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer transition-all duration-300 transform flex flex-col items-center flex-shrink-0 ${
                  isActive
                    ? 'scale-105 z-20 opacity-100'
                    : 'scale-95 opacity-80 hover:opacity-100 grayscale hover:grayscale-0'
                }`}
                style={{ width: isActive ? '210px' : '170px' }}
              >
                {/* Arch-shaped Portrait Frame */}
                <div
                  className={`relative w-full aspect-[3/4.2] rounded-t-full rounded-b-2xl overflow-hidden shadow-lg transition-all duration-300 bg-gray-400 ${
                    isActive ? 'ring-2 ring-gray-400 shadow-xl' : ''
                  }`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Active member social overlay buttons */}
                  {isActive && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5">
                      <div className="bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-2 shadow-md">
                        <a
                          href="#facebook"
                          onClick={(e) => e.stopPropagation()}
                          className="w-5 h-5 rounded-full bg-gray-200 hover:bg-[#070c32] hover:text-white text-gray-700 flex items-center justify-center transition"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-3 h-3" />
                        </a>
                        <a
                          href="#linkedin"
                          onClick={(e) => e.stopPropagation()}
                          className="w-5 h-5 rounded-full bg-gray-200 hover:bg-[#070c32] hover:text-white text-gray-700 flex items-center justify-center transition"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-3 h-3" />
                        </a>
                        <a
                          href="#twitter"
                          onClick={(e) => e.stopPropagation()}
                          className="w-5 h-5 rounded-full bg-gray-200 hover:bg-[#070c32] hover:text-white text-gray-700 flex items-center justify-center transition"
                          aria-label="Twitter / X"
                        >
                          <Twitter className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Member Name & Subtitle */}
                <div className="text-center mt-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#070c32]">
                    {member.name}
                  </h3>
                  {isActive && (
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      {member.role}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slider Controls: Track on left/center, Arrows on right */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-400/30 max-w-4xl mx-auto">
          {/* Slider track indicator line */}
          <div className="flex-1 max-w-xs h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-500 rounded-full transition-all duration-300"
              style={{
                width: `${((activeIndex + 1) / TEAM_MEMBERS.length) * 100}%`,
              }}
            />
          </div>

          {/* Left and Right navigation arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 flex items-center justify-center transition active:scale-95 shadow-sm"
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 flex items-center justify-center transition active:scale-95 shadow-sm"
              aria-label="Next team member"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
