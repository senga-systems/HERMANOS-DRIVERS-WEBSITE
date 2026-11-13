import axios from 'axios';

/**
 * Axios API client instance pointing to the backend URL via environment variables.
 * Automatically injects authorization tokens and handles standardized error formats.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor: attach bearer token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hermanos_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: streamline error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      'Unable to connect to Hermanos Drivers server. Please check your connection or contact us via WhatsApp.';
    return Promise.reject(new Error(customMessage));
  }
);

/**
 * Booking API Services
 */
export const bookingService = {
  // Submit new booking request
  createBooking: async (payload) => {
    const response = await apiClient.post('/bookings', payload);
    return response.data;
  },

  // Fetch bookings list (Admin/protected)
  getBookings: async (params = {}) => {
    const response = await apiClient.get('/bookings', { params });
    return response.data;
  },

  // System health check
  checkHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient;
