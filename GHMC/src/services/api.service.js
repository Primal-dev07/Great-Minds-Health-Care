import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default {
  // Auth endpoints
  login(credentials) {
    return apiClient.post('/auth/login', credentials)
  },
  register(userData) {
    return apiClient.post('/auth/register', userData)
  },
  
  // User endpoints
  getCurrentUser() {
    return apiClient.get('/users/profile')
  },
  updateProfile(userData) {
    return apiClient.put('/users/profile', userData)
  },
  changePassword(passwordData) {
    return apiClient.put('/users/password', passwordData)
  },
  
  // Services endpoints
  getServices() {
    return apiClient.get('/services')
  },
  getServiceById(id) {
    return apiClient.get(`/services/${id}`)
  },
  
  // Doctors endpoints
  getDoctors() {
    return apiClient.get('/doctors')
  },
  getDoctorById(id) {
    return apiClient.get(`/doctors/${id}`)
  },
  getDoctorsBySpecialty(specialty) {
    return apiClient.get(`/doctors/specialty/${specialty}`)
  },
  
  // Appointments endpoints
  getAppointments() {
    return apiClient.get('/appointments')
  },
  getAppointmentById(id) {
    return apiClient.get(`/appointments/${id}`)
  },
  createAppointment(appointmentData) {
    return apiClient.post('/appointments', appointmentData)
  },
  updateAppointment(id, appointmentData) {
    return apiClient.put(`/appointments/${id}`, appointmentData)
  },
  cancelAppointment(id) {
    return apiClient.delete(`/appointments/${id}`)
  },
  
  // Contact form endpoint
  submitContactForm(formData) {
    return apiClient.post('/contact', formData)
  },
  
  // Testimonials endpoints
  getTestimonials() {
    return apiClient.get('/testimonials')
  },
  submitTestimonial(testimonialData) {
    return apiClient.post('/testimonials', testimonialData)
  }
}
