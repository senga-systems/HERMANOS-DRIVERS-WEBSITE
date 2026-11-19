import React from 'react';
import OurTeam from '../sections/OurTeam';
import HireDriverBanner from '../sections/HireDriverBanner';
import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function TeamPage({ onOpenBooking, onNavigate }) {
  return (
    <div className="bg-[#070c32] text-white">
      {/* 1. Header Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#04081e] to-[#070c32] border-b border-white/10 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="inline-block mb-4">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-md">
              Meet The Drivers
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            OUR PROFESSIONAL TEAM
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The heart of Hermanos Drivers: certified, disciplined, and customer-focused chauffeurs committed to keeping you and your vehicle secure.
          </p>
        </div>
      </section>

      {/* 2. Interactive Arch Carousel (The exact beloved design) */}
      <OurTeam />

      {/* 3. Team Standards */}
      <section className="py-16 sm:py-20 bg-[#070c32] text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-[#0a103c] border border-white/10 rounded-2xl p-6 sm:p-8">
              <ShieldCheck className="w-10 h-10 text-[#f19e02] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">100% Background Screened</h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Rigorous police clearance, driving history verification, and health screenings for every driver.
              </p>
            </div>

            <div className="bg-[#0a103c] border border-white/10 rounded-2xl p-6 sm:p-8">
              <Award className="w-10 h-10 text-[#f19e02] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Advanced Route Experience</h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Extensive experience navigating Malawian roads, cross-border highways, and mountain passes safely.
              </p>
            </div>

            <div className="bg-[#0a103c] border border-white/10 rounded-2xl p-6 sm:p-8">
              <HeartHandshake className="w-10 h-10 text-[#f19e02] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Customer First Etiquette</h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Polite, respectful, and well-presented chauffeurs who treat your vehicle with unmatched care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <HireDriverBanner
        onOpenBooking={onOpenBooking}
        onExploreServices={() => onNavigate && onNavigate('services')}
      />
    </div>
  );
}
