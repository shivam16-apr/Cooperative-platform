import apiClient from './client';

/**
 * Authentication API Endpoints
 */
export const authApi = {
  /**
   * POST /api/auth/login
   * @param {{ email: string, password: string }} credentials
   */
  login: async ({ email, password }) => {
    return await apiClient.post('/auth/login', { email, password });
  },

  /**
   * POST /api/auth/register
   */
  register: async (userData) => {
    return await apiClient.post('/auth/register', userData);
  },

  /**
   * GET /api/health
   */
  checkHealth: async () => {
    return await apiClient.get('/health');
  },

  /**
   * GET /api/protected (Token verification)
   */
  verifySession: async () => {
    return await apiClient.get('/protected');
  }
};

/**
 * Admin Operational & Analytics API Endpoints
 */
export const adminApi = {
  /**
   * GET /api/admin/dashboard
   * Returns aggregated platform metrics (workers, customers, bookings, revenue)
   */
  getDashboard: async () => {
    return await apiClient.get('/admin/dashboard');
  },

  /**
   * GET /api/admin/workers (or fallback /api/workers)
   */
  getWorkers: async () => {
    try {
      return await apiClient.get('/admin/workers');
    } catch (err) {
      // Fallback to /api/workers if admin route isn't available yet
      if (err.status === 404) {
        return await apiClient.get('/workers');
      }
      throw err;
    }
  },

  /**
   * GET /api/admin/customers
   */
  getCustomers: async () => {
    return await apiClient.get('/admin/customers');
  },

  /**
   * GET /api/bookings
   * Admin role receives all bookings
   */
  getBookings: async () => {
    return await apiClient.get('/admin/bookings');
  },

  /**
 * GET /api/admin/demand-forecast
 */
  getDemandForecast: async (service) => {
    const endpoint = service
      ? `/admin/demand-forecast?service=${encodeURIComponent(service)}`
      : '/admin/demand-forecast';

    return await apiClient.get(endpoint);
  },

/**
 * GET /api/admin/workforce-allocation
 */
  getWorkforceAllocation: async () => {
    return await apiClient.get('/admin/workforce-allocation');
  },

  /**
   * GET /api/admin/welfare
   */
  getWelfare: async () => {
    return await apiClient.get('/admin/welfare');
  },

  /**
   * GET /api/admin/reviews
   */
  getReviews: async () => {
    return await apiClient.get('/admin/reviews');
  },
  /**
   * GET /api/services
   */
  getServices: async () => {
    return await apiClient.get('/services');
  },

  /**
   * POST /api/admin/workers
   */
  createWorker: async (workerData) => {
    try {
      return await apiClient.post('/admin/workers', workerData);
    } catch (err) {
      if (err.status === 404) {
        return await apiClient.post('/workers', workerData);
      }
      throw err;
    }
  },

  /**
   * POST /api/admin/customers
   */
  createCustomer: async (customerData) => {
    try {
      return await apiClient.post('/admin/customers', customerData);
    } catch (err) {
      if (err.status === 404) {
        return await apiClient.post('/auth/register', {
          ...customerData,
          role: 'CUSTOMER'
        });
      }
      throw err;
    }
  },

  /**
   * POST /api/bookings
   */
  createBooking: async (bookingData) => {
    return await apiClient.post('/bookings', bookingData);
  },

  /**
   * PATCH /api/bookings/:id/status
   */
  updateBookingStatus: async (bookingId, status) => {
    return await apiClient.patch(`/bookings/${bookingId}/status`, { status });
  },

  /**
   * PATCH /api/workers/:id/availability
   */
  updateWorkerAvailability: async (workerId, isAvailable) => {
    return await apiClient.patch(`/workers/${workerId}/availability`, { isAvailable });
  }
};

export default {
  auth: authApi,
  admin: adminApi
};
