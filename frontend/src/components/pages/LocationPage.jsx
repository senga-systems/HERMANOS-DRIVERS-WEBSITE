import React from 'react';
import { MapPin, Navigation, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import HireDriverBanner from '../sections/HireDriverBanner';

const HUBS = [
  {
    city: 'Lilongwe',
    region: 'Central Region Hub & Head Office',
    desc: 'Full coverage for personal driving, corporate fleets, and vehicle delivery hub connecting nationwide routes.',
    routes: ['Lilongwe - Blantyre corridor', 'Lilongwe - Mzuzu corridor', 'Airport transfers (KIA)'],
  },
  {
    city: 'Blantyre',
    region: 'Southern Commercial Hub',
    desc: 'Commercial operations, executive driver hire, business event chauffeuring, and southern district transit.',
    routes: ['Blantyre - Lilongwe transit', 'Blantyre - Zomba route', 'Southern border routes'],
  },
  {
    city: 'Mzuzu',
    region: 'Northern Region Hub',
    desc: 'Strategic northern staging ground for transit between northern borders (Songwe) and key northern lakeshore routes.',
    routes: ['Songwe border entry point', 'Mzuzu - Lilongwe corridor', 'Northern district transit'],
  },
  {
    city: 'Dar es Salaam (Tanzania)',
    region: 'Cross-Border Vehicle Delivery Route',
    desc: 'Specialized port transit route. We pick up freshly cleared vehicles from Dar es Salaam and deliver them to your doorstep in Malawi.',
    routes: ['Dar es Salaam to Songwe Border', 'Border customs clearance assistance', 'Direct doorstep handover in Malawi'],
  },
];

export default function LocationPage({ onOpenBooking }) {
  return (
    <div className="bg-[#070c32] text-white">
      {/* 1. Header Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#04081e] to-[#070c32] border-b border-white/10 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="inline-block mb-4">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-md">
              Coverage & Hubs
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            OUR LOCATIONS & ROUTES
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Operating across Malawi's primary hubs and managing vital cross-border automotive corridors between Tanzania and Malawi.
          </p>
        </div>
      </section>

      {/* 2. Hubs Grid */}
      <section className="py-16 sm:py-24 bg-[#d9d9d9] text-[#070c32]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HUBS.map((hub, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 sm:p-9 shadow-lg border border-gray-200 flex flex-col justify-between hover:-translate-y-1 transition duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#070c32] text-[#f19e02] flex items-center justify-center font-bold">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#070c32]">
                        {hub.city}
                      </h2>
                      <p className="text-xs font-bold text-[#d98c00]">{hub.region}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {hub.desc}
                  </p>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">
                      Key Connections:
                    </h3>
                    <ul className="space-y-1.5">
                      {hub.routes.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-2 text-xs text-gray-800">
                          <CheckCircle2 className="w-4 h-4 text-[#39b54a]" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <button
                    onClick={onOpenBooking}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold py-2.5 rounded text-sm transition shadow-sm"
                  >
                    <span>Request a Driver for {hub.city}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <HireDriverBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}
