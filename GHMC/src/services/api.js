import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Include cookies in requests
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateDetails: (userData) => api.put('/auth/updatedetails', userData),
  updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData),
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (token, password) => api.put(`/auth/resetpassword/${token}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`)
};

// User API
export const userAPI = {
  getUsers: (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`)
};

// Doctor API
export const doctorAPI = {
  getDoctors: (page = 1, limit = 10) => api.get(`/doctors?page=${page}&limit=${limit}`),
  getDoctor: (id) => api.get(`/doctors/${id}`),
  createDoctor: (doctorData) => api.post('/doctors', doctorData),
  updateDoctor: (id, doctorData) => api.put(`/doctors/${id}`, doctorData),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
  addReview: (id, reviewData) => api.post(`/doctors/${id}/reviews`, reviewData),
  updateReview: (doctorId, reviewId, reviewData) => api.put(`/doctors/${doctorId}/reviews/${reviewId}`, reviewData)
};

// Appointment API
export const appointmentAPI = {
  getAppointments: (page = 1, limit = 10) => api.get(`/appointments?page=${page}&limit=${limit}`),
  getPatientAppointments: () => api.get('/appointments/patient'),
  getDoctorAppointments: () => api.get('/appointments/doctor'),
  getAppointment: (id) => api.get(`/appointments/${id}`),
  createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  updateAppointment: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`)
};

// Service API
export const serviceAPI = {
  getServices: (page = 1, limit = 10) => api.get(`/services?page=${page}&limit=${limit}`),
  getService: (id) => api.get(`/services/${id}`),
  getServiceBySlug: (slug) => api.get(`/services/slug/${slug}`),
  getServicesByCategory: (category) => api.get(`/services/category/${category}`),
  createService: (serviceData) => api.post('/services', serviceData),
  updateService: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  deleteService: (id) => api.delete(`/services/${id}`),
  addDoctorToService: (id, doctorId) => api.put(`/services/${id}/doctors`, { doctorId }),
  removeDoctorFromService: (id, doctorId) => api.delete(`/services/${id}/doctors/${doctorId}`)
};

// Health Tips API
export const healthTipAPI = {
  getHealthTips: (page = 1, limit = 10) => api.get(`/health-tips?page=${page}&limit=${limit}`),
  getHealthTip: (id) => api.get(`/health-tips/${id}`),
  getHealthTipBySlug: (slug) => api.get(`/health-tips/slug/${slug}`),
  getHealthTipsByCategory: (category) => api.get(`/health-tips/category/${category}`),
  createHealthTip: (healthTipData) => api.post('/health-tips', healthTipData),
  updateHealthTip: (id, healthTipData) => api.put(`/health-tips/${id}`, healthTipData),
  deleteHealthTip: (id) => api.delete(`/health-tips/${id}`),
  likeHealthTip: (id) => api.put(`/health-tips/${id}/like`),
  addComment: (id, commentData) => api.post(`/health-tips/${id}/comments`, commentData),
  removeComment: (id, commentId) => api.delete(`/health-tips/${id}/comments/${commentId}`)
};

export default api;
