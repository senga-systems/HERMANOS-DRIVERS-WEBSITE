import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Vehicle Delivery',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
        <path d="M2 8h4M1 5h6" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Long Distance Trips',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" />
        <circle cx="12" cy="6" r="1.5" />
        <path d="M6 18c0-2 2-3 4-3s4 1 4 3" />
        <circle cx="6" cy="19" r="1.5" />
        <circle cx="14" cy="19" r="1.5" />
        <path d="M18 17l3 3m0-3l-3 3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Personal & Private Driving',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Vehicle Collection',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 0 1 2 2v4a7 7 0 0 1-7 7H9a7 7 0 0 1-7-7v-2" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M21 19.5l2 2" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function OurServices({ onSelectService }) {
  return (
    <section id="services" className="py-20 lg:py-24 bg-[#070c32] text-white relative">
      {/* Subtle radial glow from top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-900/20 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Top Left Badge */}
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 bg-[#f19e02] text-[#070c32] font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-sm">
            <span>Our Services</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        </div>

        {/* 4 Cards Horizontal Grid with Staggered Framer Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              onClick={() => onSelectService(service.title)}
              className="group cursor-pointer bg-[#d9d9d9] hover:bg-white text-[#070c32] rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-95 transition-transform flex flex-col items-center justify-center min-h-[200px] shadow-lg"
            >
              {/* Gray Square Icon Container */}
              <div className="w-16 h-16 rounded-xl bg-[#6b7280] text-white group-hover:bg-[#f19e02] group-hover:text-[#070c32] flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#070c32] group-hover:text-black transition-colors">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
