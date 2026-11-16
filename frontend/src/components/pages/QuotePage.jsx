import React, { useState } from 'react';
import {
  Calculator,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
  Car,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  MessageSquare,
  HelpCircle,
  FileText,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { bookingService } from '../../services/api';

const SERVICE_OPTIONS = [
  {
    value: 'VEHICLE_DELIVERY',
    label: 'Vehicle Delivery (e.g. Dar es Salaam port to Malawi)',
    badge: 'Popular for Port Imports',
    description: 'Safe transportation of newly imported or relocated vehicles across borders and cities.',
  },
  {
    value: 'LONG_DISTANCE',
    label: 'Long-Distance Trips (Inter-city / Regional)',
    badge: 'Lilongwe • Blantyre • Mzuzu',
    description: 'Reliable point-to-point driving across major highways and remote destinations.',
  },
  {
    value: 'PRIVATE_DRIVING',
    label: 'Personal & Private Driving (Business & Daily)',
    badge: 'Chauffeur On Demand',
    description: 'Discreet, professional executive driving for business meetings, events, or VIPs.',
  },
  {
    value: 'VEHICLE_COLLECTION',
    label: 'Vehicle Collection & Doorstep Handover',
    badge: 'Convenient & Inspected',
    description: 'Vehicle pick-up from repair workshops, dealerships, or sellers with full checklist handover.',
  },
];

const VEHICLE_TYPES = [
  'Sedan / Saloon Car',
  'SUV / Crossover (4WD / AWD)',
  'Pickup / Double-Cab 4x4',
  'Van / Minibus / Passenger Van',
  'Commercial / Light Truck',
  'Luxury / Executive Vehicle',
  'Other / Unspecified',
];

const FAQS = [
  {
    q: 'How is my quote calculated?',
    a: 'Quotes are based on distance (mileage), journey duration, vehicle category, and specific border logistics for cross-border routes (e.g. Dar es Salaam to Malawi). Our pricing is fixed upfront with zero hidden surprises.',
  },
  {
    q: 'Can you collect my vehicle directly from Dar es Salaam port?',
    a: 'Yes. Our specialized cross-border drivers have active port passes, international driving permits, and extensive experience navigating port clearance and border crossings at Songwe/Kasumulu.',
  },
  {
    q: 'Are your drivers trained for both manual and automatic vehicles?',
    a: 'Absolutely. Every Hermanos chauffeur is verified for both manual and automatic transmissions, including modern electronic systems and heavy 4x4 off-road capabilities.',
  },
  {
    q: 'How fast will my booking be confirmed?',
    a: 'Once you submit this form, our dispatch control center reviews your details and contacts you via phone or WhatsApp within 15–30 minutes to confirm driver assignment.',
  },
];

export default function QuotePage({ initialService = '', onNavigate }) {
  const mapInitialService = (title) => {
    if (!title) return 'VEHICLE_DELIVERY';
    const t = title.toLowerCase();
    if (t.includes('long')) return 'LONG_DISTANCE';
    if (t.includes('private') || t.includes('personal')) return 'PRIVATE_DRIVING';
    if (t.includes('collection')) return 'VEHICLE_COLLECTION';
    return 'VEHICLE_DELIVERY';
  };

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    serviceType: mapInitialService(initialService),
    pickupLocation: '',
    dropoffLocation: '',
    travelDate: '',
    vehicleType: 'Sedan / Saloon Car',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      errors.customerName = 'Please enter your full name (at least 2 characters).';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required so our team can provide your quote.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    // Prepare payload for backend validator
    const combinedNotes = [
      formData.travelDate ? `Preferred Date: ${formData.travelDate}` : null,
      formData.vehicleType ? `Vehicle Category: ${formData.vehicleType}` : null,
      formData.notes ? `Details: ${formData.notes}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const payload = {
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      serviceType: formData.serviceType,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      notes: combinedNotes,
    };

    try {
      const response = await bookingService.createBooking(payload);
      setSuccessData(response.data?.booking || true);
    } catch (err) {
      setErrorMessage(
        err.message || 'Unable to submit quote request. Please try again or reach out directly on WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setErrorMessage('');
    setFieldErrors({});
    setFormData({
      customerName: '',
      phoneNumber: '',
      serviceType: 'VEHICLE_DELIVERY',
      pickupLocation: '',
      dropoffLocation: '',
      travelDate: '',
      vehicleType: 'Sedan / Saloon Car',
      notes: '',
    });
  };

  const activeServiceInfo =
    SERVICE_OPTIONS.find((s) => s.value === formData.serviceType) || SERVICE_OPTIONS[0];

  return (
    <div className="bg-[#070c32] text-white">
      {/* 1. Page Header Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#04081e] to-[#070c32] border-b border-white/10 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="inline-block mb-4">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-md">
              Instant Quote & Driver Booking
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            GET A QUOTE & BOOK A DRIVER
          </h1>

          <p className="text-base sm:text-xl text-[#f19e02] font-bold tracking-wide italic mb-4">
            "Your Journey, Our Responsibility!"
          </p>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Need a transparent fare estimate for your vehicle delivery, intercity trip, or private chauffeur? Submit your journey details below for an immediate, customized quote.
          </p>
        </div>
      </section>

      {/* 2. Main Quote Form & Details Section */}
      <section className="py-16 sm:py-24 bg-[#d9d9d9] text-[#070c32]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: The Interactive Form / Success Panel */}
            <div className="lg:col-span-7">
              <div className="bg-[#070c32] text-white rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/15 relative overflow-hidden">
                {/* Subtle accent border at top */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#f19e02] via-[#ffc72c] to-[#39b54a]" />

                {successData ? (
                  /* SUCCESS STATE */
                  <div className="text-center py-8 animate-fadeIn">
                    <div className="w-20 h-20 bg-[#39b54a]/20 text-[#39b54a] rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-[#39b54a]/40 shadow-lg">
                      <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#f19e02] block mb-1">
                      Request Confirmed
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                      Quote Request Received!
                    </h2>

                    <p className="text-gray-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.customerName}</strong>! Our dispatch operations team has received your trip specifications and is preparing your personalized quote.
                    </p>

                    {/* Booking Summary Box */}
                    <div className="bg-[#04081e] border border-white/10 rounded-xl p-5 mb-8 text-left text-xs sm:text-sm space-y-2.5">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-gray-400">Service:</span>
                        <span className="text-white font-bold">{activeServiceInfo.label}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-gray-400">Contact Number:</span>
                        <span className="text-[#f19e02] font-mono font-bold">{formData.phoneNumber}</span>
                      </div>
                      {(formData.pickupLocation || formData.dropoffLocation) && (
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-gray-400">Route:</span>
                          <span className="text-white">
                            {formData.pickupLocation || 'Specified'} → {formData.dropoffLocation || 'Destination'}
                          </span>
                        </div>
                      )}
                      {formData.vehicleType && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Vehicle:</span>
                          <span className="text-white">{formData.vehicleType}</span>
                        </div>
                      )}
                    </div>

                    {/* Fast Dispatch Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                      <a
                        href={`https://wa.me/265997096922?text=Hello%20Hermanos%20Drivers!%20I%20have%20submitted%20a%20quote%20request%20for%20${encodeURIComponent(
                          activeServiceInfo.label
                        )}%20(Name:%20${encodeURIComponent(formData.customerName)},%20Route:%20${encodeURIComponent(
                          (formData.pickupLocation || 'Pickup') + ' to ' + (formData.dropoffLocation || 'Dropoff')
                        )}).%20Please%20confirm%20my%20rate%20and%20driver.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#39b54a] hover:bg-[#2ea33e] text-white font-bold px-7 py-3.5 rounded-lg text-sm shadow-md active:scale-95 transition-transform duration-200"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>Chat With Dispatch on WhatsApp</span>
                      </a>

                      <a
                        href="tel:+265997096922"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f19e02] hover:bg-[#d98c00] text-[#070c32] font-bold px-7 py-3.5 rounded-lg text-sm shadow-md active:scale-95 transition-transform duration-200"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call +265 997 096 922</span>
                      </a>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={handleReset}
                        className="text-xs text-gray-400 hover:text-white underline underline-offset-4 active:scale-95 transition-transform duration-200"
                      >
                        Submit another trip or quote request
                      </button>
                    </div>
                  </div>
                ) : (
                  /* FORM STATE */
                  <div>
                    <div className="mb-6">
                      <span className="text-xs font-bold text-[#f19e02] uppercase tracking-wider block mb-1">
                        Request Form
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Enter Trip & Vehicle Details
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-300 mt-1">
                        Get transparent pricing and immediate driver scheduling.
                      </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name & Phone Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                            Full Name <span className="text-[#f19e02]">*</span>
                          </label>
                          <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="e.g. Chisomo Banda"
                            className={`w-full px-4 py-3 rounded-xl bg-[#04081e] border ${
                              fieldErrors.customerName
                                ? 'border-red-500 ring-1 ring-red-500'
                                : 'border-white/20'
                            } text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none placeholder-gray-500`}
                            required
                          />
                          {fieldErrors.customerName && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.customerName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                            Phone / WhatsApp <span className="text-[#f19e02]">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="e.g. +265 997 096 922"
                            className={`w-full px-4 py-3 rounded-xl bg-[#04081e] border ${
                              fieldErrors.phoneNumber
                                ? 'border-red-500 ring-1 ring-red-500'
                                : 'border-white/20'
                            } text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none placeholder-gray-500`}
                            required
                          />
                          {fieldErrors.phoneNumber && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.phoneNumber}</p>
                          )}
                        </div>
                      </div>

                      {/* Service Required */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                          Service Required <span className="text-[#f19e02]">*</span>
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[#04081e] border border-white/20 text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#070c32] text-white py-2">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-[#f19e02] font-semibold mt-1">
                          {activeServiceInfo.badge} — {activeServiceInfo.description}
                        </p>
                      </div>

                      {/* Pickup and Dropoff Locations */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                            Pickup Point
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="pickupLocation"
                              value={formData.pickupLocation}
                              onChange={handleChange}
                              placeholder="e.g. Lilongwe or Dar es Salaam"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#04081e] border border-white/20 text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none placeholder-gray-500"
                            />
                            <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                            Drop-Off Destination
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="dropoffLocation"
                              value={formData.dropoffLocation}
                              onChange={handleChange}
                              placeholder="e.g. Blantyre, Mzuzu or Zomba"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#04081e] border border-white/20 text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none placeholder-gray-500"
                            />
                            <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Category & Travel Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                            Vehicle Category
                          </label>
                          <div className="relative">
                            <select
                              name="vehicleType"
                              value={formData.vehicleType}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#04081e] border border-white/20 text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none"
                            >
                              {VEHICLE_TYPES.map((v) => (
                                <option key={v} value={v} className="bg-[#070c32] text-white">
                                  {v}
                                </option>
                              ))}
                            </select>
                            <Car className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                            Preferred Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="travelDate"
                              value={formData.travelDate}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#04081e] border border-white/20 text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none"
                            />
                            <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Notes / Special Instructions */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1.5">
                          Trip Specifics or Special Requests (Optional)
                        </label>
                        <textarea
                          rows="3"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Vehicle make/model, automatic or manual transmission, specific stops, port paperwork status, etc."
                          className="w-full px-4 py-3 rounded-xl bg-[#04081e] border border-white/20 text-white text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#f5a623] focus:outline-none placeholder-gray-500"
                        />
                      </div>

                      {/* Dynamic Inclusions Banner */}
                      <div className="p-4 rounded-xl bg-[#04081e] border border-white/10 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-[#f19e02] flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-gray-300 leading-relaxed">
                          <strong className="text-white">Included in Every Hermanos Quote:</strong> Driver identification verification, multi-point vehicle handover inspection checklist, transit GPS monitoring, and direct phone/WhatsApp dispatch assistance.
                        </div>
                      </div>

                      {/* Submit Action */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-[#f19e02] hover:bg-[#d98c00] disabled:opacity-50 disabled:cursor-not-allowed text-[#070c32] font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform duration-200"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Processing Your Quote...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Request & Get Instant Quote</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-400 text-center pt-1">
                        Encrypted & rate-limited. We never share customer data with third parties.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Transparent Pricing, Fast Contact & Standards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Fast-Track Dispatch Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg border border-gray-200 text-[#070c32]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d98c00] block mb-1">
                  Need Urgent Dispatch?
                </span>
                <h3 className="text-xl font-black text-[#070c32] mb-3">
                  Direct Dispatch Hotline
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
                  Have an urgent delivery departing today or an immediate chauffeur need? Reach out directly to our Lilongwe & Blantyre control desks.
                </p>

                <div className="space-y-3">
                  <a
                    href="tel:+265997096922"
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#f19e02] text-[#070c32] flex items-center justify-center font-bold flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-semibold block">Phone Hotline</span>
                      <span className="text-sm font-bold text-[#070c32]">+265 (0) 997 096 922</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/265997096922?text=Hello%20Hermanos%20Drivers,%20I%20would%20like%20to%20request%20an%20instant%20quote%20for%20a%20driver."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#39b54a] text-white flex items-center justify-center font-bold flex-shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-800 font-semibold block">WhatsApp 24/7</span>
                      <span className="text-sm font-bold text-emerald-900">+265 997 096 922</span>
                    </div>
                  </a>

                  <a
                    href="mailto:hermanosgroup265@gmail.com"
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#070c32] text-white flex items-center justify-center font-bold flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-semibold block">Email Dispatch</span>
                      <span className="text-sm font-bold text-[#070c32] truncate">hermanosgroup265@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Card 2: Transparent Pricing Structure */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg border border-gray-200 text-[#070c32]">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-5 h-5 text-[#f19e02]" />
                  <h3 className="text-lg font-black text-[#070c32]">
                    Transparent Rate Structure
                  </h3>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#39b54a] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#070c32] block">Vehicle Delivery (Cross-Border):</strong>
                      Fixed-fee package encompassing driver compensation, border transit handling, and safety checklist.
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#39b54a] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#070c32] block">Intercity Long-Distance:</strong>
                      Competitive flat rates between Lilongwe, Blantyre, Mzuzu, and rural hubs.
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#39b54a] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#070c32] block">Chauffeur & Daily Hire:</strong>
                      Daily or hourly executive packages tailored for business delegations and family events.
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39b54a] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#070c32] block">Zero Hidden Extras:</strong>
                      What we quote is what you pay. No unauthorized surcharges or sudden fee adjustments.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Card 3: Hermanos Peace of Mind Guarantee */}
              <div className="bg-[#0a103c] rounded-2xl p-6 sm:p-7 shadow-lg border border-white/10 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#f19e02]" />
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    Our 4-Point Safety Guarantee
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="text-[#f19e02] font-bold block mb-1">1. Vetted & Tested</span>
                    Police-cleared & tested on defensive road safety.
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="text-[#f19e02] font-bold block mb-1">2. Handover Sheet</span>
                    Photo verification of vehicle mileage & condition.
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="text-[#f19e02] font-bold block mb-1">3. Live GPS Updates</span>
                    Checkpoint notifications sent via WhatsApp.
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="text-[#f19e02] font-bold block mb-1">4. 24/7 Support</span>
                    Direct line with our central operations room.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-[#070c32] text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="bg-[#f19e02] text-[#070c32] font-black text-xs uppercase px-4 py-1.5 rounded-full inline-block shadow-sm mb-3">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0a103c] border border-white/10 rounded-xl p-5 sm:p-6 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#f19e02] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      {item.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick link to other sections */}
          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-gray-400 mb-3">
              Looking to learn more about our experienced team or view our branch locations?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-1.5 text-xs text-[#f19e02] hover:text-white font-bold transition"
              >
                <span>View Full Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-white/20">•</span>
              <button
                onClick={() => onNavigate('team')}
                className="inline-flex items-center gap-1.5 text-xs text-[#f19e02] hover:text-white font-bold transition"
              >
                <span>Meet Our Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-white/20">•</span>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-xs text-[#f19e02] hover:text-white font-bold transition"
              >
                <span>Contact Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
