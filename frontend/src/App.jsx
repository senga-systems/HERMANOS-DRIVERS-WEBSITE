import React, { useState } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
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
import QuotePage from './components/pages/QuotePage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [focusedServiceId, setFocusedServiceId] = useState('');

  const navigateToQuote = (serviceName = '') => {
    setSelectedService(serviceName);
    setFocusedServiceId('');
    setActiveTab('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToServices = (serviceId = '') => {
    setFocusedServiceId(serviceId);
    setActiveTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingModal = (serviceName = '') => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedService('');
  };

  const handleSelectTab = (tab) => {
    setFocusedServiceId('');
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#070c32] text-white flex flex-col font-sans selection:bg-[#f19e02] selection:text-[#070c32]">
        {/* 1. Sticky Navigation Bar with active tab tracking & mobile-first drawer */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenBooking={() => navigateToQuote()}
        />

        {/* Main Content Sections with Framer Motion AnimatePresence Page Transitions */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Hero Section with Alternating Background Images and Texts */}
                <HeroSlider
                  onOpenBooking={() => navigateToQuote()}
                  onExploreServices={() => handleSelectTab('services')}
                />

                {/* Why Choose Us Section */}
                <WhyChooseUs onLearnMore={() => handleSelectTab('about')} />

                {/* Our Services 4-Card Section */}
                <OurServices
                  onSelectService={(serviceId) => navigateToServices(serviceId)}
                />

                {/* Our Team Arch Carousel Section */}
                <OurTeam />

                {/* Hire A Driver Call-To-Action Banner */}
                <HireDriverBanner
                  onOpenBooking={() => navigateToQuote()}
                  onExploreServices={() => handleSelectTab('services')}
                />
              </motion.div>
            )}

            {/* Dedicated About Section / View */}
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AboutPage
                  onOpenBooking={() => navigateToQuote()}
                  onNavigate={handleSelectTab}
                />
              </motion.div>
            )}

            {/* Dedicated Services Section / View */}
            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ServicesPage
                  focusedServiceId={focusedServiceId}
                  onOpenBooking={() => navigateToQuote()}
                  onSelectService={(serviceTitle) => navigateToQuote(serviceTitle)}
                />
              </motion.div>
            )}

            {/* Dedicated Team Section / View */}
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <TeamPage
                  onOpenBooking={() => navigateToQuote()}
                  onNavigate={handleSelectTab}
                />
              </motion.div>
            )}

            {/* Dedicated Location Section / View */}
            {activeTab === 'location' && (
              <motion.div
                key="location"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <LocationPage
                  onOpenBooking={() => navigateToQuote()}
                  onNavigate={handleSelectTab}
                />
              </motion.div>
            )}

            {/* Dedicated Contact Section / View */}
            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ContactPage onOpenBooking={() => navigateToQuote()} />
              </motion.div>
            )}

            {/* Dedicated Get a Quote Section / View */}
            {activeTab === 'quote' && (
              <motion.div
                key="quote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <QuotePage
                  initialService={selectedService}
                  onNavigate={handleSelectTab}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer
          onOpenBooking={() => navigateToQuote()}
          onSelectTab={handleSelectTab}
        />

        {/* Global Interactive Booking & Quote Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={closeBookingModal}
          initialService={selectedService}
        />
      </div>
    </MotionConfig>
  );
}
