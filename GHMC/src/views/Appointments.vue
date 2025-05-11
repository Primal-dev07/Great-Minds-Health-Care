<template>
  <div class="appointments-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="section-title">
          <h1>My Appointments</h1>
          <p>
            View and manage your upcoming and past appointments with our healthcare professionals.
          </p>
        </div>
      </div>
    </section>

    <!-- Appointments Section -->
    <section class="appointments-section">
      <div class="container">
        <div class="appointments-actions mb-4">
          <div class="row align-items-center">
            <div class="col-md-6 mb-3 mb-md-0">
              <div class="btn-group" role="group">
                <button 
                  type="button" 
                  class="btn" 
                  :class="activeTab === 'upcoming' ? 'btn-primary' : 'btn-outline-primary'"
                  @click="activeTab = 'upcoming'"
                >
                  Upcoming
                </button>
                <button 
                  type="button" 
                  class="btn" 
                  :class="activeTab === 'past' ? 'btn-primary' : 'btn-outline-primary'"
                  @click="activeTab = 'past'"
                >
                  Past
                </button>
                <button 
                  type="button" 
                  class="btn" 
                  :class="activeTab === 'cancelled' ? 'btn-primary' : 'btn-outline-primary'"
                  @click="activeTab = 'cancelled'"
                >
                  Cancelled
                </button>
              </div>
            </div>
            <div class="col-md-6 text-md-end">
              <router-link to="/appointments/book" class="btn btn-success">
                <i class="fa fa-plus-circle me-2"></i> Book New Appointment
              </router-link>
            </div>
          </div>
        </div>
        
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading your appointments...</p>
        </div>
        
        <div v-else-if="filteredAppointments.length === 0" class="text-center py-5">
          <div class="empty-state">
            <i class="fa fa-calendar-times empty-icon"></i>
            <h3>No {{ activeTab }} appointments found</h3>
            <p v-if="activeTab === 'upcoming'">
              You don't have any upcoming appointments scheduled.
              <br>
              Would you like to book a new appointment?
            </p>
            <p v-else-if="activeTab === 'past'">
              You don't have any past appointments.
            </p>
            <p v-else>
              You don't have any cancelled appointments.
            </p>
            <router-link v-if="activeTab === 'upcoming'" to="/appointments/book" class="btn btn-primary mt-3">
              Book an Appointment
            </router-link>
          </div>
        </div>
        
        <div v-else>
          <div class="row">
            <div 
              v-for="appointment in filteredAppointments" 
              :key="appointment.id" 
              class="col-lg-6 mb-4"
            >
              <div class="appointment-card" :class="getAppointmentClass(appointment)">
                <div class="appointment-header">
                  <div class="appointment-date">
                    <div class="date-day">{{ formatDay(appointment.date) }}</div>
                    <div class="date-month">{{ formatMonth(appointment.date) }}</div>
                  </div>
                  <div class="appointment-time">
                    <i class="fa fa-clock"></i> {{ formatTime(appointment.time) }}
                  </div>
                  <div class="appointment-status">
                    <span :class="getStatusClass(appointment.status)">
                      {{ appointment.status }}
                    </span>
                  </div>
                </div>
                
                <div class="appointment-body">
                  <div class="appointment-doctor">
                    <h3>Dr. {{ appointment.doctor.name }}</h3>
                    <p>{{ appointment.doctor.specialty }}</p>
                  </div>
                  
                  <div class="appointment-details">
                    <div class="detail-item">
                      <i class="fa fa-stethoscope"></i>
                      <span>{{ appointment.service }}</span>
                    </div>
                    <div class="detail-item">
                      <i class="fa fa-map-marker-alt"></i>
                      <span>{{ appointment.location }}</span>
                    </div>
                    <div class="detail-item">
                      <i class="fa fa-notes-medical"></i>
                      <span>{{ appointment.notes || 'No additional notes' }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="appointment-footer">
                  <button 
                    v-if="appointment.status === 'Scheduled'" 
                    class="btn btn-sm btn-outline-danger"
                    @click="handleCancelAppointment(appointment.id)"
                    :disabled="cancelLoading === appointment.id"
                  >
                    <span v-if="cancelLoading === appointment.id" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ cancelLoading === appointment.id ? 'Cancelling...' : 'Cancel Appointment' }}
                  </button>
                  <button 
                    v-if="appointment.status === 'Scheduled'" 
                    class="btn btn-sm btn-outline-primary"
                    @click="rescheduleAppointment(appointment.id)"
                  >
                    Reschedule
                  </button>
                  <button 
                    v-if="appointment.status === 'Completed'" 
                    class="btn btn-sm btn-outline-success"
                    @click="viewMedicalRecord(appointment.id)"
                  >
                    View Medical Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppointmentsView',
  data() {
    return {
      activeTab: 'upcoming',
      cancelLoading: null
    }
  },
  computed: {
    ...mapGetters(['getAppointments', 'isLoading']),
    loading() {
      return this.isLoading
    },
    filteredAppointments() {
      if (!this.getAppointments.length) return []
      
      const now = new Date()
      
      if (this.activeTab === 'upcoming') {
        return this.getAppointments.filter(apt => 
          new Date(apt.date) >= now && apt.status === 'Scheduled'
        )
      } else if (this.activeTab === 'past') {
        return this.getAppointments.filter(apt => 
          new Date(apt.date) < now || apt.status === 'Completed'
        )
      } else {
        return this.getAppointments.filter(apt => 
          apt.status === 'Cancelled'
        )
      }
    }
  },
  methods: {
    ...mapActions(['fetchAppointments', 'cancelAppointment']),
    formatDay(dateString) {
      return new Date(dateString).getDate()
    },
    formatMonth(dateString) {
      return new Date(dateString).toLocaleString('default', { month: 'short' })
    },
    formatTime(timeString) {
      return timeString
    },
    getStatusClass(status) {
      switch (status) {
        case 'Scheduled':
          return 'status-scheduled'
        case 'Completed':
          return 'status-completed'
        case 'Cancelled':
          return 'status-cancelled'
        default:
          return ''
      }
    },
    getAppointmentClass(appointment) {
      switch (appointment.status) {
        case 'Scheduled':
          return 'appointment-scheduled'
        case 'Completed':
          return 'appointment-completed'
        case 'Cancelled':
          return 'appointment-cancelled'
        default:
          return ''
      }
    },
    async handleCancelAppointment(id) {
      this.cancelLoading = id
      try {
        await this.cancelAppointment(id)
        // Show success message
      } catch (error) {
        console.error('Error cancelling appointment:', error)
        // Show error message
      } finally {
        this.cancelLoading = null
      }
    },
    rescheduleAppointment(id) {
      this.$router.push(`/appointments/reschedule/${id}`)
    },
    viewMedicalRecord(id) {
      this.$router.push(`/medical-records/${id}`)
    }
  },
  created() {
    this.fetchAppointments()
  }
}
</script>

<style scoped>
.hero-section {
  padding: 60px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
}

.hero-section p {
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.appointments-section {
  padding: 60px 0;
  background-color: #fff;
}

.btn-group .btn {
  border-radius: 0;
  padding: 10px 20px;
  font-weight: 500;
}

.btn-group .btn:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.btn-group .btn:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.btn-success {
  background: linear-gradient(120deg, #28a745, #20c997);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-success:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

.empty-state {
  padding: 40px;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  color: #dee2e6;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.empty-state p {
  color: #666;
  margin-bottom: 20px;
}

.appointment-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.appointment-scheduled {
  border-left: 4px solid #007bff;
}

.appointment-completed {
  border-left: 4px solid #28a745;
}

.appointment-cancelled {
  border-left: 4px solid #dc3545;
  opacity: 0.8;
}

.appointment-header {
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.appointment-date {
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 5px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.date-day {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
}

.date-month {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
}

.appointment-time {
  font-weight: 500;
  color: #333;
}

.appointment-time i {
  color: #007bff;
  margin-right: 5px;
}

.appointment-status {
  font-size: 0.9rem;
  font-weight: 500;
}

.status-scheduled {
  color: #007bff;
}

.status-completed {
  color: #28a745;
}

.status-cancelled {
  color: #dc3545;
}

.appointment-body {
  padding: 20px;
  flex-grow: 1;
}

.appointment-doctor h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.appointment-doctor p {
  color: #007bff;
  font-weight: 500;
  margin-bottom: 15px;
}

.appointment-details {
  margin-top: 15px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.detail-item i {
  color: #6c757d;
  margin-right: 10px;
  width: 20px;
}

.detail-item span {
  color: #666;
}

.appointment-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .appointments-section {
    padding: 40px 0;
  }
}
</style>
