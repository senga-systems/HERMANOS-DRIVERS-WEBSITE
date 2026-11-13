import React from 'react';

export default function Logo({ className = '', showTagline = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 4-color quadrant emblem */}
      <svg
        className="w-9 h-9 flex-shrink-0"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-left: Green */}
        <path
          d="M19 6C11.82 6 6 11.82 6 19H19V6Z"
          fill="#39B54A"
        />
        {/* Top-right: Orange/Red */}
        <path
          d="M21 6V19H34C34 11.82 28.18 6 21 6Z"
          fill="#EF4444"
        />
        {/* Bottom-right: Cyan/Blue */}
        <path
          d="M21 21V34C28.18 34 34 28.18 34 21H21Z"
          fill="#00AEEF"
        />
        {/* Bottom-left: Amber/Yellow */}
        <path
          d="M6 21C6 28.18 11.82 34 19 34V21H6Z"
          fill="#F59E0B"
        />
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-start">
          <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans">
            Hermanos
          </span>
          <span className="text-[9px] text-gray-300 font-bold ml-0.5 mt-0.5">®</span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-gray-200 tracking-wide font-sans mt-0.5">
          Group
        </span>
      </div>

      {showTagline && (
        <span className="hidden lg:inline-block ml-3 pl-3 border-l border-white/20 text-xs sm:text-sm text-white font-normal">
          Your Journey, Our Responsibility!
        </span>
      )}
    </div>
  );
}
