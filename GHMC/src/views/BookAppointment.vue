<template>
  <div class="book-appointment-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="section-title">
          <h1>Book an Appointment</h1>
          <p>Schedule a consultation with one of our healthcare professionals</p>
        </div>
      </div>
    </section>

    <!-- Booking Form Section -->
    <section class="booking-section">
      <div class="container">
        <div class="booking-container">
          <!-- Progress Steps -->
          <div class="booking-progress">
            <div class="progress-step" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
              <div class="step-number">1</div>
              <div class="step-label">Select Service</div>
            </div>
            <div class="progress-line" :class="{ 'active': currentStep > 1 }"></div>
            <div class="progress-step" :class="{ 'active': currentStep >= 2, 'completed': currentStep > 2 }">
              <div class="step-number">2</div>
              <div class="step-label">Choose Doctor</div>
            </div>
            <div class="progress-line" :class="{ 'active': currentStep > 2 }"></div>
            <div class="progress-step" :class="{ 'active': currentStep >= 3, 'completed': currentStep > 3 }">
              <div class="step-number">3</div>
              <div class="step-label">Select Date & Time</div>
            </div>
            <div class="progress-line" :class="{ 'active': currentStep > 3 }"></div>
            <div class="progress-step" :class="{ 'active': currentStep >= 4, 'completed': currentStep > 4 }">
              <div class="step-number">4</div>
              <div class="step-label">Your Information</div>
            </div>
            <div class="progress-line" :class="{ 'active': currentStep > 4 }"></div>
            <div class="progress-step" :class="{ 'active': currentStep >= 5 }">
              <div class="step-number">5</div>
              <div class="step-label">Confirmation</div>
            </div>
          </div>

          <!-- Form Content -->
          <div class="booking-content">
            <!-- Step 1: Select Service -->
            <div v-if="currentStep === 1" class="booking-step">
              <h2>Select a Service</h2>
              <p>Choose the type of service you need</p>

              <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div v-else class="service-selection">
                <div
                  v-for="service in services"
                  :key="service.id"
                  class="service-card"
                  :class="{ 'selected': selectedService === service.id }"
                  @click="selectService(service.id)"
                >
                  <div class="service-icon">
                    <img :src="`/src/assets/${service.icon}`" :alt="service.title">
                  </div>
                  <div class="service-info">
                    <h3>{{ service.title }}</h3>
                    <p>{{ service.description }}</p>
                  </div>
                  <div class="service-check">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>

              <div class="booking-actions">
                <button class="btn btn-outline-secondary" @click="$router.go(-1)">Cancel</button>
                <button
                  class="btn btn-primary"
                  @click="nextStep"
                  :disabled="!selectedService || loading"
                >
                  Continue
                </button>
              </div>
            </div>

            <!-- Step 2: Choose Doctor -->
            <div v-else-if="currentStep === 2" class="booking-step">
              <h2>Choose a Doctor</h2>
              <p>Select a healthcare professional for your appointment</p>

              <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div v-else class="doctor-selection">
                <div
                  v-for="doctor in doctors"
                  :key="doctor.id"
                  class="doctor-card"
                  :class="{ 'selected': selectedDoctor === doctor.id }"
                  @click="selectDoctor(doctor.id)"
                >
                  <div class="doctor-image">
                    <img :src="`/src/assets/images/${doctor.image}`" :alt="doctor.name">
                  </div>
                  <div class="doctor-info">
                    <h3>{{ doctor.name }}</h3>
                    <p class="specialty">{{ doctor.specialty }}</p>
                    <p class="bio">{{ doctor.bio }}</p>
                  </div>
                  <div class="doctor-check">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>

              <div class="booking-actions">
                <button class="btn btn-outline-secondary" @click="prevStep">Back</button>
                <button
                  class="btn btn-primary"
                  @click="nextStep"
                  :disabled="!selectedDoctor || loading"
                >
                  Continue
                </button>
              </div>
            </div>

            <!-- Step 3: Select Date & Time -->
            <div v-else-if="currentStep === 3" class="booking-step">
              <h2>Select Date & Time</h2>
              <p>Choose your preferred appointment date and time</p>

              <div class="date-time-selection">
                <div class="row">
                  <div class="col-lg-6 mb-4">
                    <h4 class="mb-3">Select a Date</h4>
                    <CalendarPicker
                      :selected-date="appointmentDate"
                      :min-date="minDate"
                      :doctor-id="selectedDoctor"
                      @date-selected="onDateSelected"
                    />
                  </div>

                  <div class="col-lg-6 mb-4">
                    <TimeSlotPicker
                      v-model="appointmentTime"
                      :selected-date="appointmentDate"
                      :doctor-id="selectedDoctor"
                    />
                  </div>
                </div>

                <div class="mb-4">
                  <label for="appointment-location" class="form-label">Location</label>
                  <select id="appointment-location" class="form-select" v-model="appointmentLocation">
                    <option value="" disabled selected>Select a location</option>
                    <option value="Accra Clinic">Accra Clinic</option>
                    <option value="Kumasi Hospital">Kumasi Hospital</option>
                    <option value="Online Consultation">Online Consultation</option>
                  </select>
                </div>

                <div v-if="appointmentDate && appointmentTime" class="selected-datetime-summary">
                  <div class="alert alert-info">
                    <i class="fas fa-calendar-check me-2"></i>
                    <strong>Selected Appointment:</strong> {{ formatDate(appointmentDate) }} at {{ formatTime(appointmentTime) }}
                  </div>
                </div>
              </div>

              <div class="booking-actions">
                <button class="btn btn-outline-secondary" @click="prevStep">Back</button>
                <button
                  class="btn btn-primary"
                  @click="nextStep"
                  :disabled="!isDateTimeValid"
                >
                  Continue
                </button>
              </div>
            </div>

            <!-- Step 4: Your Information -->
            <div v-else-if="currentStep === 4" class="booking-step">
              <h2>Your Information</h2>
              <p>Please provide additional details for your appointment</p>

              <div class="patient-info-form">
                <div class="mb-3">
                  <label for="appointment-reason" class="form-label">Reason for Visit</label>
                  <textarea
                    id="appointment-reason"
                    class="form-control"
                    rows="3"
                    v-model="appointmentReason"
                    placeholder="Please describe your symptoms or reason for the appointment"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="appointment-notes" class="form-label">Additional Notes</label>
                  <textarea
                    id="appointment-notes"
                    class="form-control"
                    rows="2"
                    v-model="appointmentNotes"
                    placeholder="Any additional information you'd like to share with the doctor"
                  ></textarea>
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="first-visit"
                    v-model="isFirstVisit"
                  >
                  <label class="form-check-label" for="first-visit">This is my first visit</label>
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="insurance"
                    v-model="hasInsurance"
                  >
                  <label class="form-check-label" for="insurance">I have health insurance</label>
                </div>

                <div v-if="hasInsurance" class="mb-3">
                  <label for="insurance-provider" class="form-label">Insurance Provider</label>
                  <input
                    type="text"
                    id="insurance-provider"
                    class="form-control"
                    v-model="insuranceProvider"
                    placeholder="Enter your insurance provider"
                  >
                </div>
              </div>

              <div class="booking-actions">
                <button class="btn btn-outline-secondary" @click="prevStep">Back</button>
                <button
                  class="btn btn-primary"
                  @click="nextStep"
                  :disabled="!appointmentReason"
                >
                  Review & Confirm
                </button>
              </div>
            </div>

            <!-- Step 5: Confirmation -->
            <div v-else-if="currentStep === 5" class="booking-step">
              <h2>Review & Confirm</h2>
              <p>Please review your appointment details before confirming</p>

              <div class="appointment-summary">
                <div class="summary-section">
                  <h3>Service</h3>
                  <p>{{ getServiceName(selectedService) }}</p>
                </div>

                <div class="summary-section">
                  <h3>Doctor</h3>
                  <p>{{ getDoctorName(selectedDoctor) }}</p>
                  <p class="text-muted">{{ getDoctorSpecialty(selectedDoctor) }}</p>
                </div>

                <div class="summary-section">
                  <h3>Date & Time</h3>
                  <p>{{ formatDate(appointmentDate) }}</p>
                  <p>{{ formatTime(appointmentTime) }}</p>
                </div>

                <div class="summary-section">
                  <h3>Location</h3>
                  <p>{{ appointmentLocation }}</p>
                </div>

                <div class="summary-section">
                  <h3>Reason for Visit</h3>
                  <p>{{ appointmentReason }}</p>
                </div>

                <div v-if="appointmentNotes" class="summary-section">
                  <h3>Additional Notes</h3>
                  <p>{{ appointmentNotes }}</p>
                </div>
              </div>

              <div class="booking-actions">
                <button class="btn btn-outline-secondary" @click="prevStep">Back</button>
                <button
                  class="btn btn-primary"
                  @click="confirmAppointment"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Booking...' : 'Confirm Appointment' }}
                </button>
              </div>
            </div>

            <!-- Step 6: Success -->
            <div v-else-if="currentStep === 6" class="booking-step success-step">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h2>Appointment Booked Successfully!</h2>
              <p>Your appointment has been scheduled for:</p>
              <div class="success-details">
                <p><strong>Date:</strong> {{ formatDate(appointmentDate) }}</p>
                <p><strong>Time:</strong> {{ formatTime(appointmentTime) }}</p>
                <p><strong>Doctor:</strong> {{ getDoctorName(selectedDoctor) }}</p>
                <p><strong>Location:</strong> {{ appointmentLocation }}</p>
              </div>
              <p class="confirmation-message">
                A confirmation has been sent to your email. You can view and manage your appointments in your dashboard.
              </p>
              <div class="booking-actions">
                <router-link to="/appointments" class="btn btn-outline-primary">View My Appointments</router-link>
                <router-link to="/" class="btn btn-primary">Return to Home</router-link>
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
import CalendarPicker from '../components/ui/CalendarPicker.vue'
import TimeSlotPicker from '../components/ui/TimeSlotPicker.vue'

export default {
  name: 'BookAppointment',
  components: {
    CalendarPicker,
    TimeSlotPicker
  },
  data() {
    return {
      currentStep: 1,
      selectedService: null,
      selectedDoctor: null,
      appointmentDate: '',
      appointmentTime: '',
      appointmentLocation: '',
      appointmentReason: '',
      appointmentNotes: '',
      isFirstVisit: false,
      hasInsurance: false,
      insuranceProvider: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['getServices', 'getDoctors', 'isLoading']),
    services() {
      return this.getServices
    },
    doctors() {
      return this.getDoctors
    },
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    isDateTimeValid() {
      return this.appointmentDate && this.appointmentTime && this.appointmentLocation
    }
  },
  methods: {
    ...mapActions(['fetchServices', 'fetchDoctors', 'bookAppointment']),
    selectService(serviceId) {
      this.selectedService = serviceId
    },
    selectDoctor(doctorId) {
      this.selectedDoctor = doctorId
      // Reset date and time when doctor changes
      this.appointmentDate = ''
      this.appointmentTime = ''
    },
    nextStep() {
      this.currentStep++
      window.scrollTo(0, 0)
    },
    prevStep() {
      this.currentStep--
      window.scrollTo(0, 0)
    },
    onDateSelected(date) {
      this.appointmentDate = date
      // Reset time when date changes
      this.appointmentTime = ''
    },
    formatTime(time) {
      if (!time) return ''

      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12

      return `${hour12}:${minutes} ${ampm}`
    },
    formatDate(date) {
      if (!date) return ''

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
    getServiceName(serviceId) {
      const service = this.services.find(s => s.id === serviceId)
      return service ? service.title : ''
    },
    getDoctorName(doctorId) {
      const doctor = this.doctors.find(d => d.id === doctorId)
      return doctor ? doctor.name : ''
    },
    getDoctorSpecialty(doctorId) {
      const doctor = this.doctors.find(d => d.id === doctorId)
      return doctor ? doctor.specialty : ''
    },
    async confirmAppointment() {
      this.loading = true

      try {
        const appointmentData = {
          date: this.appointmentDate,
          time: this.appointmentTime,
          service: this.getServiceName(this.selectedService),
          doctor: {
            name: this.getDoctorName(this.selectedDoctor),
            specialty: this.getDoctorSpecialty(this.selectedDoctor)
          },
          location: this.appointmentLocation,
          notes: this.appointmentReason + (this.appointmentNotes ? ` - ${this.appointmentNotes}` : ''),
          isFirstVisit: this.isFirstVisit,
          hasInsurance: this.hasInsurance,
          insuranceProvider: this.hasInsurance ? this.insuranceProvider : null
        }

        await this.bookAppointment(appointmentData)
        this.nextStep() // Move to success step
      } catch (error) {
        console.error('Error booking appointment:', error)
        // Handle error
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.fetchServices()
    this.fetchDoctors()
  }
}
</script>

<style scoped>
.book-appointment-page {
  background-color: #f8f9fa;
}

.hero-section {
  padding: 60px 0;
  background-color: #fff;
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

.booking-section {
  padding: 60px 0;
}

.booking-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 40px;
}

.booking-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  overflow-x: auto; /* Allow horizontal scrolling on very small screens */
  padding-bottom: 10px; /* Add padding for scrollbar */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  flex-shrink: 0; /* Prevent steps from shrinking */
  min-width: 80px; /* Ensure minimum width for each step */
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e9ecef;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 10px;
  transition: all 0.3s;
  /* Make touch targets larger */
  touch-action: manipulation;
}

.step-label {
  font-size: 0.9rem;
  color: #6c757d;
  text-align: center;
  transition: all 0.3s;
  white-space: nowrap; /* Prevent text wrapping */
}

.progress-line {
  flex: 1;
  height: 3px;
  background-color: #e9ecef;
  margin: 0 10px;
  position: relative;
  top: -25px;
  z-index: 0;
  transition: all 0.3s;
  min-width: 20px; /* Ensure minimum width for the line */
}

.progress-step.active .step-number {
  background-color: #007bff;
  color: #fff;
  /* Add subtle shadow for emphasis */
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

.progress-step.active .step-label {
  color: #007bff;
  font-weight: 600;
}

.progress-step.completed .step-number {
  background-color: #28a745;
  color: #fff;
}

.progress-line.active {
  background-color: #28a745;
}

.booking-step {
  padding: 20px 0;
}

.booking-step h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.booking-step p {
  color: #666;
  margin-bottom: 30px;
}

.service-selection, .doctor-selection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.service-card, .doctor-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  border: 2px solid transparent;
  /* Improve touch interaction */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on iOS */
  min-height: 100px; /* Ensure minimum height for touch targets */
}

.service-card:hover, .doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

/* Add active state for touch devices */
.service-card:active, .doctor-card:active {
  background-color: #e9ecef;
  transform: translateY(0);
}

.service-card.selected, .doctor-card.selected {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.05);
  /* Add shadow for better visual feedback */
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
}

.service-icon, .doctor-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  flex-shrink: 0;
}

.service-icon img, .doctor-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.service-info, .doctor-info {
  flex: 1;
}

.service-info h3, .doctor-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.service-info p, .doctor-info p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0;
}

.doctor-info .specialty {
  color: #007bff;
  font-weight: 500;
  margin-bottom: 5px;
}

.doctor-info .bio {
  font-size: 0.85rem;
}

.service-check, .doctor-check {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #007bff;
  font-size: 1.25rem;
  opacity: 0;
  transition: all 0.3s;
}

.service-card.selected .service-check, .doctor-card.selected .doctor-check {
  opacity: 1;
}

.date-time-selection {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

.selected-datetime-summary {
  margin-top: 20px;
}

.selected-datetime-summary .alert {
  border-radius: 8px;
  padding: 15px;
}

.booking-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.appointment-summary {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

.summary-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.summary-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.summary-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.summary-section p {
  margin-bottom: 5px;
}

.success-step {
  text-align: center;
}

.success-icon {
  font-size: 5rem;
  color: #28a745;
  margin-bottom: 20px;
}

.success-details {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  text-align: left;
}

.confirmation-message {
  margin: 20px 0;
}

/* Tablet Optimizations */
@media (max-width: 992px) {
  .booking-container {
    padding: 30px 25px;
  }

  .booking-step h2 {
    font-size: 1.6rem;
  }

  .service-selection, .doctor-selection {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section p {
    font-size: 1rem;
  }

  .booking-section {
    padding: 30px 0;
  }

  .booking-container {
    padding: 25px 20px;
    border-radius: 8px;
  }

  .booking-progress {
    flex-direction: column;
    align-items: flex-start;
    overflow-x: visible;
  }

  .progress-step {
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
    min-width: auto;
  }

  .step-number {
    margin-bottom: 0;
    margin-right: 10px;
  }

  .progress-line {
    width: 3px;
    height: 20px;
    margin: 5px 0;
    margin-left: 18px;
    top: 0;
    min-width: auto;
  }

  .service-selection, .doctor-selection {
    grid-template-columns: 1fr;
  }

  .booking-actions {
    flex-direction: column;
    gap: 10px;
  }

  .booking-actions button {
    width: 100%;
  }

  .booking-step {
    padding: 15px 0;
  }

  .booking-step h2 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  .booking-step p {
    margin-bottom: 20px;
  }

  .service-card, .doctor-card {
    padding: 15px;
  }

  .service-icon, .doctor-image {
    width: 50px;
    height: 50px;
  }

  .appointment-summary {
    padding: 15px;
  }

  .summary-section {
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
}

/* Small Mobile Optimizations */
@media (max-width: 576px) {
  .hero-section {
    padding: 30px 0;
  }

  .hero-section h1 {
    font-size: 1.8rem;
  }

  .booking-section {
    padding: 20px 0;
  }

  .booking-container {
    padding: 20px 15px;
  }

  .booking-step h2 {
    font-size: 1.3rem;
  }

  .booking-step p {
    font-size: 0.9rem;
  }

  .service-info h3, .doctor-info h3 {
    font-size: 1rem;
  }

  .service-info p, .doctor-info p {
    font-size: 0.85rem;
  }

  .success-icon {
    font-size: 4rem;
  }

  .success-details {
    padding: 15px;
  }

  /* Improve touch targets */
  .booking-actions button {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 0.95rem;
  }
}
</style>
