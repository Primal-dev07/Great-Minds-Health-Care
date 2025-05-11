<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title">Welcome to the Great Minds Healthcare Center</h1>
              <p class="hero-text">
                We provide progressive and affordable healthcare services in Kumasi and Accra,
                accessible both online and in person.
              </p>
              <div class="hero-buttons">
                <router-link to="/contact" class="btn btn-primary me-3">Book Appointment</router-link>
                <router-link to="/services" class="btn btn-outline-primary">Our Services</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <img src="/src/assets/healthcare.png" alt="Healthcare Illustration" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="section-title">
          <h2>Our Services</h2>
          <p>
            We provide the best choices for your health needs. Make sure you undergo treatment with our
            highly qualified doctors. You can consult with us which type of service is suitable for your health.
          </p>
        </div>

        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <template v-else>
            <div
              v-for="service in services"
              :key="service.id"
              class="col-lg-4 col-md-6 mb-4"
            >
              <ServiceCard :service="service" />
            </div>
          </template>
        </div>

        <div class="text-center mt-4">
          <router-link to="/services" class="btn btn-primary">View All Services</router-link>
        </div>
      </div>
    </section>

    <!-- Aims Section -->
    <section class="aims-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-1 order-2">
            <div class="aims-image">
              <img src="/src/assets/aims.png" alt="Aims and Objectives Illustration" class="img-fluid">
            </div>
          </div>
          <div class="col-lg-6 order-lg-2 order-1">
            <div class="aims-content">
              <h2>Aims and Objectives</h2>
              <p>
                The Great Minds Health Care aims to provide comprehensive and compassionate healthcare
                services to our community, focusing on preventive care, early intervention, and patient-centered treatment.
              </p>
              <p>
                Our mission is to improve the health and wellbeing of the communities we serve through
                excellence in healthcare, education, research, and community engagement.
              </p>
              <router-link to="/about" class="btn btn-outline-primary mt-3">Learn More</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Doctors Section -->
    <section class="doctors-section">
      <div class="container">
        <div class="section-title">
          <h2>Meet Our Doctors</h2>
          <p>
            Our team of experienced and qualified doctors are ready to provide you with the best healthcare services.
          </p>
        </div>

        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <template v-else>
            <div
              v-for="doctor in featuredDoctors"
              :key="doctor.id"
              class="col-lg-4 col-md-6 mb-4"
            >
              <DoctorCard :doctor="doctor" :link="`/doctor/${doctor.id}`" />
            </div>
          </template>
        </div>

        <div class="text-center mt-4">
          <router-link to="/about" class="btn btn-primary">Learn More</router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-title">
          <h2>What Our Patients Say</h2>
          <p>
            Read testimonials from our satisfied patients about their experience with our healthcare services.
          </p>
        </div>

        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <template v-else>
            <div
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              class="col-lg-4 col-md-6 mb-4"
            >
              <TestimonialCard :testimonial="testimonial" />
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="section-title">
          <h2>Our Achievements</h2>
          <p>
            Patients have rated us highly among other healthcare providers.
          </p>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="stats-card">
              <div class="stats-number">900+</div>
              <div class="stats-title">Verified Specialists</div>
              <div class="stats-subtitle">Highly Qualified</div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <div class="stats-card">
              <div class="stats-number">75,000+</div>
              <div class="stats-title">Happy Patients</div>
              <div class="stats-subtitle">Great Performance</div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <div class="stats-card">
              <div class="stats-number">96.8%</div>
              <div class="stats-title">Positive Feedback</div>
              <div class="stats-subtitle">Customer Approval</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Appointment Section -->
    <section class="appointment-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="appointment-content">
              <h2>Make a schedule in advance with our available doctors</h2>
              <p>
                Healthcare is a very important process, especially if you're not taking care of your health
                and having regular check-ups. Great Minds Healthcare Center makes it easier for everyone
                to schedule a doctor's appointment.
              </p>
              <p>
                Our online booking system allows you to choose the right specialist for your needs
                and find a time that works for you.
              </p>
              <router-link to="/appointments/book" class="btn btn-primary mt-3">Book An Appointment</router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="appointment-image">
              <img src="/src/assets/physician.png" alt="Doctor Illustration" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ServiceCard from '../components/ui/ServiceCard.vue'
import DoctorCard from '../components/ui/DoctorCard.vue'
import TestimonialCard from '../components/ui/TestimonialCard.vue'

export default {
  name: 'HomePage',
  components: {
    ServiceCard,
    DoctorCard,
    TestimonialCard
  },
  computed: {
    ...mapGetters(['getServices', 'getDoctors', 'isLoading']),
    services() {
      // Get first 6 services for homepage
      return this.getServices.slice(0, 6)
    },
    featuredDoctors() {
      // Get first 3 doctors for homepage
      return this.getDoctors.slice(0, 3)
    },
    loading() {
      return this.isLoading
    },
    // Mock testimonials data (would come from API in real app)
    testimonials() {
      return [
        {
          id: 1,
          name: 'Nana Addo Dankwa Akufo-Addo',
          content: 'The care I received at The Great Minds Health Care was exceptional. The staff were knowledgeable, compassionate, and went above and beyond to ensure my well-being.',
          rating: 5,
          date: '2023-08-15',
          avatar: null
        },
        {
          id: 2,
          name: 'Jane Doe',
          content: 'I had a wonderful experience with Dr. Boateng. He took the time to listen to my concerns and provided clear explanations about my treatment options.',
          rating: 5,
          date: '2023-09-22',
          avatar: null
        },
        {
          id: 3,
          name: 'John Smith',
          content: 'The online appointment booking system is very convenient. I was able to schedule my visit quickly and received excellent care from the medical team.',
          rating: 4,
          date: '2023-10-05',
          avatar: null
        }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchServices', 'fetchDoctors'])
  },
  created() {
    // Fetch data when component is created
    this.fetchServices()
    this.fetchDoctors()
  }
}
</script>

<style scoped>
.hero-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.1), rgba(23, 7, 82, 0.1));
  z-index: 1;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -150px;
  left: -150px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(23, 7, 82, 0.05), rgba(0, 123, 255, 0.05));
  z-index: 1;
}

.hero-content {
  padding-right: 30px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.hero-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #007bff, #170752);
  border-radius: 4px;
}

.hero-text {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 35px;
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.hero-buttons .btn {
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.hero-buttons .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #007bff, #170752);
  z-index: -1;
  transition: opacity 0.3s ease;
  opacity: 0;
  border-radius: 50px;
}

.hero-buttons .btn-primary {
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.hero-buttons .btn-outline-primary {
  border: 2px solid #007bff;
  color: #007bff;
  background: rgba(255, 255, 255, 0.8);
}

.hero-buttons .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 123, 255, 0.3);
}

.hero-buttons .btn-outline-primary:hover {
  color: white;
  border-color: transparent;
}

.hero-buttons .btn-outline-primary:hover::before {
  opacity: 1;
}

.hero-image {
  position: relative;
  z-index: 2;
}

.hero-image::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.1), rgba(23, 7, 82, 0.1));
  border-radius: 50%;
  z-index: -1;
  filter: blur(40px);
  opacity: 0.8;
}

.hero-image img {
  max-width: 100%;
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15));
  position: relative;
  z-index: 2;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(1deg); }
  50% { transform: translateY(-20px) rotate(0deg); }
  75% { transform: translateY(-15px) rotate(-1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.services-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
}

.services-section::before {
  content: '';
  position: absolute;
  top: -200px;
  left: -200px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.03), rgba(23, 7, 82, 0.03));
  z-index: 1;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}

.section-title h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.section-title h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #007bff, #170752);
  border-radius: 4px;
}

.section-title p {
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

.aims-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  position: relative;
  overflow: hidden;
}

.aims-section::before {
  content: '';
  position: absolute;
  bottom: -200px;
  right: -200px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.03), rgba(23, 7, 82, 0.03));
  z-index: 1;
}

.aims-content {
  padding-left: 30px;
  position: relative;
  z-index: 2;
}

.aims-content h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: #333;
  position: relative;
  display: inline-block;
}

.aims-content h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #007bff, #170752);
  border-radius: 4px;
}

.aims-content p {
  margin-bottom: 20px;
  color: #555;
  line-height: 1.7;
  font-size: 1.05rem;
}

.doctors-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
}

.doctors-section::after {
  content: '';
  position: absolute;
  top: -150px;
  right: -150px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.03), rgba(23, 7, 82, 0.03));
  z-index: 1;
}

.testimonials-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  position: relative;
  overflow: hidden;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(23, 7, 82, 0.05), rgba(0, 123, 255, 0.05));
  z-index: 1;
}

.stats-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
}

.stats-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 40px 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 2;
}

.stats-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 15px 40px rgba(0, 123, 255, 0.2);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 15px;
  z-index: -1;
}

.stats-card:hover {
  transform: translateY(-15px);
}

.stats-card:hover::after {
  opacity: 1;
}

.stats-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(120deg, #007bff, #170752);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 15px;
  display: inline-block;
}

.stats-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
}

.stats-subtitle {
  color: #555;
  font-size: 0.95rem;
}

.appointment-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  position: relative;
  overflow: hidden;
}

.appointment-section::before {
  content: '';
  position: absolute;
  top: -150px;
  left: -150px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.05), rgba(23, 7, 82, 0.05));
  z-index: 1;
}

.appointment-content {
  position: relative;
  z-index: 2;
}

.appointment-content h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: #333;
  position: relative;
  display: inline-block;
  line-height: 1.3;
}

.appointment-content h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #007bff, #170752);
  border-radius: 4px;
}

.appointment-content p {
  margin-bottom: 20px;
  color: #555;
  line-height: 1.7;
  font-size: 1.05rem;
}

.appointment-image {
  position: relative;
  z-index: 2;
}

.appointment-image::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.1), rgba(23, 7, 82, 0.1));
  border-radius: 50%;
  z-index: -1;
  filter: blur(40px);
  opacity: 0.8;
}

.appointment-image img {
  max-width: 100%;
  animation: float2 6s ease-in-out infinite;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15));
  position: relative;
  z-index: 2;
}

@keyframes float2 {
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-1deg); }
  50% { transform: translateY(-15px) rotate(0deg); }
  75% { transform: translateY(-10px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* Responsive styles */
@media (max-width: 992px) {
  .hero-section, .aims-section, .appointment-section,
  .services-section, .doctors-section, .testimonials-section, .stats-section {
    padding: 70px 0;
  }

  .hero-content, .aims-content, .appointment-content {
    padding: 0;
    margin-bottom: 50px;
    text-align: center;
  }

  .hero-title, .aims-content h2, .appointment-content h2 {
    font-size: 2.2rem;
  }

  .hero-title::after, .aims-content h2::after, .appointment-content h2::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .section-title h2 {
    font-size: 2.2rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .stats-card {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .hero-section, .aims-section, .appointment-section,
  .services-section, .doctors-section, .testimonials-section, .stats-section {
    padding: 50px 0;
  }

  .hero-title, .aims-content h2, .appointment-content h2 {
    font-size: 1.8rem;
  }

  .hero-text, .aims-content p, .appointment-content p {
    font-size: 1rem;
  }

  .section-title h2 {
    font-size: 1.8rem;
  }

  .section-title p {
    font-size: 1rem;
  }

  .stats-number {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .hero-section, .aims-section, .appointment-section,
  .services-section, .doctors-section, .testimonials-section, .stats-section {
    padding: 40px 0;
  }

  .hero-title, .aims-content h2, .appointment-content h2 {
    font-size: 1.6rem;
  }

  .section-title h2 {
    font-size: 1.6rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .hero-buttons .btn {
    width: 100%;
  }
}
</style>
