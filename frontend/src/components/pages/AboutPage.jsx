import React from 'react';
import { ShieldCheck, Award, Clock, MapPin, CheckCircle2, ArrowRight, Phone, Car } from 'lucide-react';
import HireDriverBanner from '../sections/HireDriverBanner';

export default function AboutPage({ onOpenBooking, onNavigate }) {
  return (
    <div className="bg-[#070c32] text-white">
      {/* 1. Page Header Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#04081e] to-[#070c32] border-b border-white/10 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-900/20 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-md">
              About Us
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            ABOUT HERMANOS DRIVERS
          </h1>

          <p className="text-base sm:text-xl text-[#f19e02] font-bold tracking-wide italic mb-6">
            "Your Journey, Our Responsibility!"
          </p>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Malawi's premier professional driver hire and cross-border automotive delivery service. We connect vehicle owners, businesses, and individuals with vetted, dependable, and experienced chauffeurs.
          </p>
        </div>
      </section>

      {/* 2. Company Story & Vision */}
      <section className="py-16 sm:py-24 bg-[#d9d9d9] text-[#070c32]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image with frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-300">
                <img
                  src="/images/why-us/driver-enhanced.png"
                  alt="Hermanos Professional Driver"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center"
                />
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d98c00] mb-2 block">
                Who We Are
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-[#070c32] tracking-tight leading-tight mb-6">
                BUILT ON TRUST, PROFESSIONALISM, AND RESPECT FOR YOUR VEHICLE
              </h2>

              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-normal mb-4">
                At Hermanos Drivers, we know that handing over your car keys or sitting in the passenger seat requires absolute confidence. That is why every driver on our team undergoes rigorous identity verification, driving record assessments, and defensive driving training.
              </p>

              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-normal mb-8">
                Whether you need a newly imported car transported safely from Dar es Salaam port to Lilongwe, require an executive driver for corporate meetings across Blantyre, or need reliable intercity transit to Mzuzu, Hermanos Drivers delivers peace of mind every kilometer of the way.
              </p>

              {/* Core Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-800">100% Vetted & Verified</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-800">Cross-Border Specialists</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-800">Door-to-Door Delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-800">Fixed Transparent Rates</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold px-7 py-3 rounded text-sm sm:text-base shadow-md active:scale-95 transition-transform duration-200"
                >
                  <span>Hire A Driver Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#070c32] text-[#070c32] hover:bg-[#070c32] hover:text-white font-bold px-7 py-3 rounded text-sm sm:text-base active:scale-95 transition-transform duration-200"
                >
                  <span>View Our Services</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Core Pillars */}
      <section className="py-16 sm:py-24 bg-[#070c32] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full inline-block shadow-sm mb-3">
              Our Standards
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              WHY THOUSANDS TRUST HERMANOS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0a103c] border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#f19e02] text-[#070c32] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Vetted & Licensed</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Every chauffeur undergoes comprehensive criminal background verification, medical checks, and advanced driver testing.
              </p>
            </div>

            <div className="bg-[#0a103c] border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#f19e02] text-[#070c32] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cross-Border Reach</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Specialized in long-distance intercity transit across Malawi and cross-border delivery from Dar es Salaam port.
              </p>
            </div>

            <div className="bg-[#0a103c] border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#f19e02] text-[#070c32] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <Car className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Vehicle Care Protocol</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Strict multi-point pre-trip and post-trip vehicle inspection checklist with photo verification and handover signatures.
              </p>
            </div>

            <div className="bg-[#0a103c] border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#f19e02] text-[#070c32] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Punctual & Courteous</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Polite, discreet, and prompt drivers who value your time and prioritize safety above everything else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Call To Action Banner */}
      <HireDriverBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}
