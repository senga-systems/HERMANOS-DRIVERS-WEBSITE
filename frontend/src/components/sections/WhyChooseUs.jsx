import React from 'react';
import { ArrowRight } from 'lucide-react';
import FadeUp from '../common/FadeUp';

export default function WhyChooseUs({ onLearnMore }) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#d9d9d9] text-[#070c32]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Driver Photo */}
          <FadeUp className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-gray-300">
              <img
                src="/images/why-us/driver-clean.png"
                alt="Professional Hermanos Driver behind the steering wheel"
                className="w-full h-[380px] sm:h-[420px] object-cover object-center"
              />
            </div>
          </FadeUp>

          {/* Right Column: Copy & Action */}
          <FadeUp delay={0.2} className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#070c32] tracking-tight mb-6">
              WHY CHOOSE US
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed font-normal mb-8">
              At Hermanos Drivers, we know trusting someone with your vehicle requires peace of mind. That’s why every driver on our team is vetted, licensed, and trained for the highest standard of professionalism. From delivering vehicles from Dar es Salaam to driving you to business meetings, we treat every journey with the same care. When you choose Hermanos, you partner with a team that respects your vehicle and your time.
            </p>

            <div>
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold px-7 py-3 rounded text-sm sm:text-base shadow-md active:scale-95 transition-transform duration-200"
              >
                <span>See More About Us</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
