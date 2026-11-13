import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSlider from './components/sections/HeroSlider';
import WhyChooseUs from './components/sections/WhyChooseUs';
import OurServices from './components/sections/OurServices';
import OurTeam from './components/sections/OurTeam';
import HireDriverBanner from './components/sections/HireDriverBanner';
import BookingModal from './components/sections/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBookingModal = () => setIsBookingOpen(true);
  const closeBookingModal = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-[#070c32] text-white flex flex-col font-sans selection:bg-[#f19e02] selection:text-[#070c32]">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenBooking={openBookingModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSlider onOpenBooking={openBookingModal} />

        {/* 3. Why Choose Us Section */}
        <WhyChooseUs onLearnMore={openBookingModal} />

        {/* 4. Our Services Section */}
        <OurServices onSelectService={() => openBookingModal()} />

        {/* 5. Our Team Section */}
        <OurTeam />

        {/* 6. Hire A Driver Call-To-Action Banner */}
        <HireDriverBanner onOpenBooking={openBookingModal} />
      </main>

      {/* 7. Footer */}
      <Footer onOpenBooking={openBookingModal} />

      {/* Global Interactive Booking & Quote Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBookingModal} />
    </div>
  );
}
