import React from 'react';

export default function Logo({ className = '', showTagline = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo_official.png"
        alt="Hermanos Group"
        className="h-8 sm:h-9 w-auto object-contain"
      />
      {showTagline && (
        <span className="hidden lg:inline-block ml-3 pl-3 border-l border-white/20 text-xs sm:text-sm text-white font-normal">
          Your Journey, Our Responsibility!
        </span>
      )}
    </div>
  );
}
