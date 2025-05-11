import { createStore } from 'vuex'
import auth from './modules/auth'

// Mock data (will be replaced with API calls)
const mockServices = [
  {
    id: 1,
    title: 'General Consultation',
    description: 'Comprehensive health check-ups and consultations for all age groups.',
    icon: 'consultation.png'
  },
  {
    id: 2,
    title: 'Emergency Services',
    description: '24/7 emergency care for critical conditions requiring immediate attention.',
    icon: 'emergency.png'
  },
  {
    id: 3,
    title: 'Pharmacy Services',
    description: 'Full-service pharmacy providing prescription medications and health products.',
    icon: 'pharm.png'
  },
  {
    id: 4,
    title: 'Health Information',
    description: 'Educational resources and information to help you make informed health decisions.',
    icon: 'info.png'
  },
  {
    id: 5,
    title: 'Patient Tracking',
    description: 'Advanced patient monitoring and tracking systems for continuous care.',
    icon: 'tracking.png'
  },
  {
    id: 6,
    title: 'Medical Search',
    description: 'Find the right specialist or service for your specific health needs.',
    icon: 'search icon.png'
  }
];

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: 'doctor1.jpg',
    bio: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience.'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    image: 'doctor2.jpg',
    bio: 'Dr. Chen specializes in pediatric care and has been practicing for 10 years.'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Obstetrics & Gynecology',
    image: 'doctor3.jpg',
    bio: 'Dr. Rodriguez is dedicated to providing comprehensive women\'s healthcare.'
  },
  {
    id: 4,
    name: 'Dr. David Osei',
    specialty: 'General Medicine',
    image: 'doctor4.jpg',
    bio: 'Dr. Osei has extensive experience in general medicine and preventive care.'
  }
];

const mockAppointments = [
  {
    id: 1,
    date: '2024-08-10',
    time: '10:00',
    service: 'General Consultation',
    doctor: { name: 'Dr. Sarah Johnson' },
    location: 'Accra Clinic',
    notes: 'Bring all medical records',
    status: 'Scheduled'
  },
  {
    id: 2,
    date: '2024-07-20',
    time: '14:30',
    service: 'Emergency Services',
    doctor: { name: 'Dr. Michael Chen' },
    location: 'Kumasi Hospital',
    notes: 'Follow up appointment',
    status: 'Completed'
  },
  {
    id: 3,
    date: '2024-08-15',
    time: '11:00',
    service: 'Pharmacy Services',
    doctor: { name: 'Dr. Emily Rodriguez' },
    location: 'Online Consultation',
    notes: 'Discuss medication options',
    status: 'Scheduled'
  },
  {
    id: 4,
    date: '2024-06-28',
    time: '09:00',
    service: 'Health Information',
    doctor: { name: 'Dr. David Osei' },
    location: 'Accra Clinic',
    notes: 'Yearly checkup',
    status: 'Cancelled'
  }
];

const mockCurrentUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar: 'avatar1.jpg'
};

export default createStore({
  modules: {
    auth
  },
  state: {
    services: mockServices,
    doctors: mockDoctors,
    appointments: mockAppointments,
    currentUser: mockCurrentUser,
    loading: false,
    error: null
  },
  getters: {
    getServices: state => state.services,
    getDoctors: state => state.doctors,
    getAppointments: state => state.appointments,
    getCurrentUser: state => state.currentUser,
    isLoading: state => state.loading,
    getError: state => state.error
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = null
      state.appointments = [...mockAppointments]
    },
    SET_APPOINTMENTS(state, appointments) {
      state.appointments = appointments
    },
    ADD_APPOINTMENT(state, appointment) {
      const newAppointment = {
        ...appointment,
        id: state.appointments.length > 0 ? Math.max(...state.appointments.map(a => a.id)) + 1 : 1,
        status: 'Scheduled'
      }
      state.appointments.push(newAppointment)
    }
  },
  actions: {
    // Services actions
    fetchServices({ commit, state }) {
      commit('SET_LOADING', true)
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_LOADING', false)
          resolve(state.services)
        }, 500)
      })
    },

    // Doctors actions
    fetchDoctors({ commit, state }) {
      commit('SET_LOADING', true)
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_LOADING', false)
          resolve(state.doctors)
        }, 500)
      })
    },

    // Appointments actions
    fetchAppointments({ commit }) {
      commit('SET_LOADING', true)
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_LOADING', false)
          commit('SET_APPOINTMENTS', mockAppointments)
          resolve(mockAppointments)
        }, 500)
      })
    },
    cancelAppointment({ commit }, appointmentId) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockAppointments.findIndex(appointment => appointment.id === appointmentId)
          if (index !== -1) {
            mockAppointments[index] = { ...mockAppointments[index], status: 'Cancelled' }
            commit('SET_APPOINTMENTS', mockAppointments)
            commit('SET_LOADING', false)
            resolve()
          } else {
            commit('SET_ERROR', 'Appointment not found')
            commit('SET_LOADING', false)
            reject('Appointment not found')
          }
        }, 500)
      })
    },

    // Contact form action
    submitContactForm({ commit }) {
      commit('SET_LOADING', true)
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_LOADING', false)
          resolve({ success: true, message: 'Thank you for your message. We will get back to you soon!' })
        }, 1000)
      })
    },
    // Logout action
    logout({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Clear user-related data from state
          commit('CLEAR_ERROR')
          resolve()
        }, 500)
      })
    },

    // Clear error action
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },

    // Book appointment action
    bookAppointment({ commit }, appointmentData) {
      commit('SET_LOADING', true)
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('ADD_APPOINTMENT', appointmentData)
          commit('SET_LOADING', false)
          resolve({ success: true, message: 'Appointment booked successfully!' })
        }, 1000)
      })
    }
  }
})
