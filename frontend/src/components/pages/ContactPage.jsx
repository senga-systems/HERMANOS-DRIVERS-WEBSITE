import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage({ onOpenBooking }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#070c32] text-white">
      {/* 1. Header Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#04081e] to-[#070c32] border-b border-white/10 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="inline-block mb-4">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-md">
              Get In Touch
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            CONTACT HERMANOS DRIVERS
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Have questions about hiring a driver, cross-border deliveries, or corporate chauffeuring? Our dispatch team is ready to assist.
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Form */}
      <section className="py-16 sm:py-24 bg-[#d9d9d9] text-[#070c32]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
                <h2 className="text-xl font-black text-[#070c32] mb-6">
                  Direct Dispatch Lines
                </h2>

                <div className="space-y-5">
                  <a
                    href="tel:+265997096922"
                    className="flex items-center gap-4 group p-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#f19e02] text-[#070c32] flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Call Us</p>
                      <p className="text-sm sm:text-base font-bold text-[#070c32] group-hover:text-[#d98c00] transition">
                        +265 (0) 997 096 922
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/265997096922?text=Hello%20Hermanos%20Drivers,%20I%20would%20like%20to%20hire%20a%20driver."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#39b54a] text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">WhatsApp Quick Chat</p>
                      <p className="text-sm sm:text-base font-bold text-[#070c32] group-hover:text-[#2ea33e] transition">
                        Chat on WhatsApp
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:hermanosgroup265@gmail.com"
                    className="flex items-center gap-4 group p-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#070c32] text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-105 transition">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Email Support</p>
                      <p className="text-sm sm:text-base font-bold text-[#070c32] group-hover:text-[#d98c00] transition break-all">
                        hermanosgroup265@gmail.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="bg-[#070c32] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-[#f19e02]" />
                  <h3 className="font-bold text-base text-white">Operating Hours</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Driver dispatches and deliveries operate 24/7 across Malawi and regional routes. Customer booking desk available daily: 7:00 AM – 9:00 PM CAT.
                </p>
              </div>
            </div>

            {/* Right: Quick Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-black text-[#070c32] mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Fill in the details below and a dispatch agent will reply within 30 minutes.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#39b54a] mx-auto mb-3" />
                  <h4 className="font-bold text-base text-[#070c32] mb-1">Message Received!</h4>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Thank you for reaching out. We will call or WhatsApp you at{' '}
                    <span className="font-bold">{formData.phone}</span> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#070c32] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Banda"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#070c32] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +265 997 096 922"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#070c32] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. yourname@email.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#070c32] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Vehicle Delivery Quote from Dar es Salaam"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#070c32] mb-1">
                      Trip Details / Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the vehicle, pickup location, destination, and preferred dates..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-black py-3 rounded-lg text-sm shadow-md active:scale-95 transition-transform duration-200"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
