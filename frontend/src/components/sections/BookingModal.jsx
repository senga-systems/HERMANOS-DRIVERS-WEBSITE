import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, Phone, MessageSquare } from 'lucide-react';
import { bookingService } from '../../services/api';

const SERVICE_OPTIONS = [
  { value: 'VEHICLE_DELIVERY', label: 'Vehicle Delivery (e.g. Dar es Salaam to Malawi)' },
  { value: 'LONG_DISTANCE', label: 'Long-Distance Trips (Inter-city / Regional)' },
  { value: 'PRIVATE_DRIVING', label: 'Personal & Private Driving (Business & Daily)' },
  { value: 'VEHICLE_COLLECTION', label: 'Vehicle Collection & Doorstep Handover' },
];

export default function BookingModal({ isOpen, onClose, initialService = '' }) {
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
    notes: '',
  });

  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: mapInitialService(initialService) }));
    }
  }, [initialService]);

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) setErrorMessage('');
  };

  const validateLocal = () => {
    const errors = {};
    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      errors.customerName = 'Please enter your full name (at least 2 characters).';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required for booking confirmation.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateLocal();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await bookingService.createBooking(formData);
      setSuccessData(response.data?.booking || true);
    } catch (err) {
      setErrorMessage(
        err.message || 'An error occurred while submitting your booking. Please try again.'
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
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#070c32] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          /* SUCCESS STATE */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#39b54a]/20 text-[#39b54a] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#39b54a]/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">
              Booking Request Received!
            </h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Thank you for trusting <span className="text-[#f19e02] font-semibold">Hermanos Drivers</span>. Our dispatch team is reviewing your trip details and will contact you via phone or WhatsApp at <span className="font-mono text-white">{formData.phoneNumber}</span> immediately.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/265997096922?text=Hello%20Hermanos%20Drivers,%20I%20just%20submitted%20a%20booking%20for%20${encodeURIComponent(
                  formData.serviceType
                )}%20under%20the%20name%20${encodeURIComponent(formData.customerName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#39b54a] hover:bg-[#2ea33e] text-white font-bold px-6 py-3 rounded-lg text-sm shadow transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Now</span>
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM STATE */
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#f19e02] uppercase tracking-wider">
                Instant Request
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Book a Professional Driver
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Safe, vetted drivers for vehicle delivery & personal trips across Malawi.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-500/15 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">
                  Your Full Name <span className="text-[#f19e02]">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="e.g. Chisomo Banda"
                  className={`w-full px-4 py-2.5 rounded-lg bg-[#04081e] border ${
                    fieldErrors.customerName ? 'border-red-500' : 'border-white/20 focus:border-[#f19e02]'
                  } text-white text-sm outline-none transition`}
                  required
                />
                {fieldErrors.customerName && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.customerName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">
                  Phone / WhatsApp Number <span className="text-[#f19e02]">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. +265 997 096 922"
                  className={`w-full px-4 py-2.5 rounded-lg bg-[#04081e] border ${
                    fieldErrors.phoneNumber ? 'border-red-500' : 'border-white/20 focus:border-[#f19e02]'
                  } text-white text-sm outline-none transition`}
                  required
                />
                {fieldErrors.phoneNumber && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.phoneNumber}</p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">
                  Service Required <span className="text-[#f19e02]">*</span>
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#04081e] border border-white/20 focus:border-[#f19e02] text-white text-sm outline-none transition"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#070c32] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup & Dropoff Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="e.g. Lilongwe or Dar es Salaam"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#04081e] border border-white/20 focus:border-[#f19e02] text-white text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">
                    Drop-off Destination
                  </label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    placeholder="e.g. Blantyre or Mzuzu"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#04081e] border border-white/20 focus:border-[#f19e02] text-white text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">
                  Trip Details or Special Requirements (Optional)
                </label>
                <textarea
                  rows="2"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Vehicle make/model, preferred departure date, etc."
                  className="w-full px-4 py-2 rounded-lg bg-[#04081e] border border-white/20 focus:border-[#f19e02] text-white text-sm outline-none transition"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f19e02] hover:bg-[#d98c00] disabled:opacity-50 text-[#070c32] font-bold py-3.5 rounded-lg text-base flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Secure Booking...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Request Driver</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security & Spam Notice */}
              <p className="text-[11px] text-gray-400 text-center pt-1">
                Protected by rate limiting & end-to-end data encryption. Your information is never shared with third parties.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
