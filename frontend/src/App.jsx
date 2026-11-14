import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSlider from './components/sections/HeroSlider';
import WhyChooseUs from './components/sections/WhyChooseUs';
import OurServices from './components/sections/OurServices';
import OurTeam from './components/sections/OurTeam';
import HireDriverBanner from './components/sections/HireDriverBanner';
import BookingModal from './components/sections/BookingModal';

// Dedicated Page Views
import AboutPage from './components/pages/AboutPage';
import ServicesPage from './components/pages/ServicesPage';
import TeamPage from './components/pages/TeamPage';
import LocationPage from './components/pages/LocationPage';
import ContactPage from './components/pages/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBookingModal = (serviceName = '') => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedService('');
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070c32] text-white flex flex-col font-sans selection:bg-[#f19e02] selection:text-[#070c32]">
      {/* 1. Sticky Navigation Bar with active tab tracking & mobile-first drawer */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={() => openBookingModal()}
      />

      {/* Main Content Sections Based on Active Navigation Tab */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Section with Alternating Background Images and Texts */}
            <HeroSlider onOpenBooking={() => openBookingModal()} />

            {/* Why Choose Us Section */}
            <WhyChooseUs onLearnMore={() => handleSelectTab('about')} />

            {/* Our Services 4-Card Section */}
            <OurServices
              onSelectService={(serviceTitle) => openBookingModal(serviceTitle)}
            />

            {/* Our Team Arch Carousel Section */}
            <OurTeam />

            {/* Hire A Driver Call-To-Action Banner */}
            <HireDriverBanner onOpenBooking={() => openBookingModal()} />
          </div>
        )}

        {/* Dedicated About Section / View */}
        {activeTab === 'about' && (
          <div className="animate-fadeIn">
            <AboutPage
              onOpenBooking={() => openBookingModal()}
              onNavigate={handleSelectTab}
            />
          </div>
        )}

        {/* Dedicated Services Section / View */}
        {activeTab === 'services' && (
          <div className="animate-fadeIn">
            <ServicesPage
              onOpenBooking={() => openBookingModal()}
              onSelectService={(serviceTitle) => openBookingModal(serviceTitle)}
            />
          </div>
        )}

        {/* Dedicated Team Section / View */}
        {activeTab === 'team' && (
          <div className="animate-fadeIn">
            <TeamPage onOpenBooking={() => openBookingModal()} />
          </div>
        )}

        {/* Dedicated Location Section / View */}
        {activeTab === 'location' && (
          <div className="animate-fadeIn">
            <LocationPage onOpenBooking={() => openBookingModal()} />
          </div>
        )}

        {/* Dedicated Contact Section / View */}
        {activeTab === 'contact' && (
          <div className="animate-fadeIn">
            <ContactPage onOpenBooking={() => openBookingModal()} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => openBookingModal()}
        onSelectTab={handleSelectTab}
      />

      {/* Global Interactive Booking & Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBookingModal}
        initialService={selectedService}
      />
    </div>
  );
}
