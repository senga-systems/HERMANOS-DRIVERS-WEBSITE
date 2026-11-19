import React from 'react';
import { ArrowRight, Car, Navigation, Briefcase, Key, ShieldCheck, CheckCircle2 } from 'lucide-react';
import HireDriverBanner from '../sections/HireDriverBanner';

const DETAILED_SERVICES = [
  {
    id: 'vehicle-delivery',
    title: 'Vehicle Delivery',
    subtitle: 'Cross-Border & Intercity Vehicle Transit',
    description:
      'We safely transport imported or newly purchased vehicles from regional ports (such as Dar es Salaam, Tanzania) directly to your doorstep in Malawi. Our drivers adhere to strict customs compliance, safe road speed limits, and route tracking.',
    features: [
      'Port-to-doorstep delivery from Dar es Salaam to Malawi',
      'Intercity vehicle relocation across Lilongwe, Blantyre, and Mzuzu',
      'Pre-trip & post-trip multi-point inspection report',
      'Real-time transit updates and route tracking',
    ],
    serviceCode: 'VEHICLE_DELIVERY',
  },
  {
    id: 'long-distance',
    title: 'Long-Distance Trips',
    subtitle: 'Intercity & Regional Highway Travel',
    description:
      'Need to travel between cities for work, family visits, or business meetings without the fatigue of driving? Our experienced highway chauffeurs navigate the primary corridors safely and efficiently.',
    features: [
      'Lilongwe - Blantyre - Mzuzu corridors covered',
      'Comfortable, fatigue-free chauffeured journeys',
      'Flexible departure times tailored to your schedule',
      'Fuel-efficient and defensive driving practices',
    ],
    serviceCode: 'LONG_DISTANCE',
  },
  {
    id: 'private-driving',
    title: 'Personal & Private Driving',
    subtitle: 'Executive & Daily Private Chauffeur',
    description:
      'Hire a dedicated professional driver for your personal vehicle for daily commutes, executive business meetings, airport transfers, weddings, or family events.',
    features: [
      'Available for hourly, daily, or monthly hire',
      'Polished, punctual, and discreet drivers',
      'VIP guest handling and airport transfers',
      'Zero stress with traffic, parking, or unfamiliar routes',
    ],
    serviceCode: 'PRIVATE_DRIVING',
  },
  {
    id: 'vehicle-collection',
    title: 'Vehicle Collection',
    subtitle: 'Service Centers, Bond Yards & Handover',
    description:
      'Save time and hassle. Let our professional team collect your vehicle from mechanics, dealerships, clearing yards, or previous owners and safely bring it home.',
    features: [
      'Pickup from auto garages, ports, or customs bond yards',
      'Document and condition verification before handover',
      'Safe driving back to your designated location',
      'Digital receipt and photo confirmation upon delivery',
    ],
    serviceCode: 'VEHICLE_COLLECTION',
  },
];

export default function ServicesPage({ onOpenBooking, onSelectService }) {
  return (
    <div className="bg-[#070c32] text-white">
      {/* 1. Header Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#04081e] to-[#070c32] border-b border-white/10 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="inline-block mb-4">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-md">
              What We Do
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            OUR PROFESSIONAL SERVICES
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Reliable driving and automotive transport solutions tailored to individuals, corporate fleets, and vehicle importers across Malawi and East Africa.
          </p>
        </div>
      </section>

      {/* 2. Detailed Services Grid */}
      <section className="py-16 sm:py-24 bg-[#d9d9d9] text-[#070c32]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          {DETAILED_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Number & Title */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-black tracking-widest text-[#f19e02] uppercase bg-[#070c32] px-3 py-1 rounded-md inline-block">
                  Service 0{index + 1}
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-[#070c32] tracking-tight">
                  {service.title}
                </h2>

                <p className="text-sm font-semibold text-[#d98c00]">
                  {service.subtitle}
                </p>

                <p className="text-sm text-gray-700 leading-relaxed pt-2">
                  {service.description}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      if (onSelectService) onSelectService(service.title);
                      else onOpenBooking();
                    }}
                    className="inline-flex items-center gap-2 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold px-6 py-3 rounded text-sm shadow-md active:scale-95 transition-transform duration-200"
                  >
                    <span>Book {service.title}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Features Checklist */}
              <div className="lg:col-span-7 bg-[#f4f5f8] rounded-xl p-6 sm:p-8 border border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#070c32] mb-4">
                  Key Service Highlights
                </h3>

                <ul className="space-y-3.5">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#39b54a] flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-800">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA */}
      <HireDriverBanner
        onOpenBooking={onOpenBooking}
        onExploreServices={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
}
