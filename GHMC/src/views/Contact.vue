<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="contact-hero-box">
          <h1>Contact Us</h1>
          <p>We're here to assist you. Please reach out to us for any inquiries or appointments.</p>
          <div class="contact-buttons">
            <a href="mailto:info@gmhc.com" class="btn btn-light">
              <i class="fa fa-envelope"></i> Email Us
            </a>
            <a href="tel:+233557852345" class="btn btn-outline-light">
              <i class="fa fa-phone"></i> Call Us
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="form-section" id="contact-form">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="contact-form-container">
              <h2>Leave A Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              <div v-if="formSubmitted" class="success-message">
                <div class="success-icon">
                  <i class="fa fa-check-circle"></i>
                </div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                <button @click="resetForm" class="btn btn-primary mt-3">
                  Send Another Message
                </button>
              </div>

              <div v-if="error" class="alert alert-danger" role="alert">
                <i class="fa fa-exclamation-circle"></i> {{ error }}
              </div>

              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="form.name"
                    required
                    :disabled="loading || formSubmitted"
                  >
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="form.email"
                    required
                    :disabled="loading || formSubmitted"
                  >
                </div>

                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="form.phone"
                    :disabled="loading || formSubmitted"
                  >
                </div>

                <div class="mb-3">
                  <label for="subject" class="form-label">Subject</label>
                  <input
                    type="text"
                    class="form-control"
                    id="subject"
                    v-model="form.subject"
                    :disabled="loading || formSubmitted"
                  >
                </div>

                <div class="mb-3">
                  <label for="message" class="form-label">Message</label>
                  <textarea
                    class="form-control"
                    id="message"
                    rows="5"
                    v-model="form.message"
                    required
                    :disabled="loading || formSubmitted"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="loading || formSubmitted"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="contact-info">
              <h2>Contact Information</h2>
              <p>Feel free to reach out to us using any of the contact methods below.</p>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fa fa-map-marker"></i>
                </div>
                <div class="info-content">
                  <h3>Our Location</h3>
                  <p>123 Healthcare Avenue, Kumasi, Ghana</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fa fa-phone"></i>
                </div>
                <div class="info-content">
                  <h3>Phone Numbers</h3>
                  <p>+233 55 785 2345 (Main)</p>
                  <p>+233 30 785 2345 (Appointment Center)</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fa fa-envelope"></i>
                </div>
                <div class="info-content">
                  <h3>Email Addresses</h3>
                  <p>info@gmhc.com (General Inquiries)</p>
                  <p>appointments@gmhc.com (Appointments)</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fa fa-clock-o"></i>
                </div>
                <div class="info-content">
                  <h3>Working Hours</h3>
                  <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: 9:00 AM - 5:00 PM</p>
                  <p>Sunday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <h2 class="text-center mb-4">Find Us On The Map</h2>
        <div class="map-container">
          <img src="/src/assets/map.jpg" alt="Hospital Location Map" class="img-fluid rounded">
          <div class="map-overlay">
            <p>Interactive map would be embedded here in a production environment</p>
            <a href="https://maps.google.com" target="_blank" class="btn btn-primary">Open in Google Maps</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="cta-box">
              <h2>Book an Appointment</h2>
              <p>Schedule a consultation with one of our specialists</p>
              <router-link to="/appointments/book" class="btn btn-light">Book Now</router-link>
            </div>
          </div>

          <div class="col-md-6">
            <div class="cta-box">
              <h2>Emergency? Call Us</h2>
              <p>Our emergency line is available 24/7</p>
              <a href="tel:+233557852345" class="btn btn-light">Call Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      loading: false,
      formSubmitted: false,
      error: null
    }
  },
  methods: {
    ...mapActions(['submitContactForm']),
    async submitForm() {
      this.loading = true
      this.error = null

      try {
        await this.submitContactForm(this.form)
        this.formSubmitted = true

        // Reset form
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to submit form. Please try again.'
        console.error('Form submission error:', error)
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.formSubmitted = false;
      this.error = null;
    }
  }
}
</script>

<style scoped>
.contact-page {
  background-color: #f8f9fa;
}

.hero-section {
  padding: 80px 0;
  background: linear-gradient(120deg, #007bff, #170752);
  color: #fff;
}

.contact-hero-box {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.contact-hero-box h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.contact-hero-box p {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.contact-buttons .btn {
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.3s;
}

.contact-buttons .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.form-section {
  padding: 80px 0;
  background-color: #fff;
}

.contact-form-container {
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.contact-form-container h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.contact-form-container p {
  color: #666;
  margin-bottom: 30px;
}

.success-message {
  text-align: center;
  padding: 30px 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 30px;
}

.success-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(120deg, #28a745, #20c997);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.success-message p {
  color: #666;
  margin-bottom: 20px;
}

.form-control {
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  padding: 12px 25px;
  border-radius: 8px;
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
}

.contact-info {
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 10px;
  height: 100%;
}

.contact-info h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.contact-info > p {
  color: #666;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  margin-bottom: 25px;
}

.info-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(120deg, #007bff, #170752);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.info-icon i {
  color: #fff;
  font-size: 1.25rem;
}

.info-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.info-content p {
  color: #666;
  margin-bottom: 5px;
}

.map-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.map-container {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 20px;
}

.map-overlay p {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.cta-section {
  padding: 80px 0;
  background: linear-gradient(120deg, #007bff, #170752);
  color: #fff;
}

.cta-box {
  text-align: center;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 30px;
  transition: all 0.3s;
}

.cta-box:hover {
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.2);
}

.cta-box h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.cta-box p {
  margin-bottom: 20px;
  opacity: 0.9;
}

.cta-box .btn {
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: 500;
  transition: all 0.3s;
}

.cta-box .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 992px) {
  .contact-info {
    margin-top: 30px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  .contact-hero-box h1 {
    font-size: 2rem;
  }

  .form-section, .map-section, .cta-section {
    padding: 60px 0;
  }

  .contact-buttons {
    flex-direction: column;
  }
}
</style>
