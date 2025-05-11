<template>
  <div class="doctors-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="section-title">
          <h1>Our Medical Team</h1>
          <p>
            Meet our team of experienced and dedicated healthcare professionals committed to providing
            exceptional care to all our patients.
          </p>
        </div>
      </div>
    </section>

    <!-- Doctors List Section -->
    <section class="doctors-list-section">
      <div class="container">
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <template v-else>
            <div
              v-for="doctor in doctors"
              :key="doctor.id"
              class="col-lg-3 col-md-6 mb-4"
            >
              <div class="doctor-card">
                <div class="doctor-image">
                  <img :src="`/src/assets/images/${doctor.image}`" :alt="doctor.name">
                </div>
                <div class="doctor-info">
                  <h3>{{ doctor.name }}</h3>
                  <p class="specialty">{{ doctor.specialty }}</p>
                  <p class="bio">{{ doctor.bio.substring(0, 100) }}...</p>
                  <router-link :to="`/doctors/${doctor.id}`" class="btn btn-primary">View Profile</router-link>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Why Choose Our Doctors Section -->
    <section class="why-choose-section">
      <div class="container">
        <div class="section-title text-center mb-5">
          <h2>Why Choose Our Medical Team</h2>
          <p>Our doctors are committed to providing the highest quality of care</p>
        </div>

        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-user-md"></i>
              </div>
              <h3>Experienced Specialists</h3>
              <p>
                Our team consists of highly qualified specialists with years of experience in their respective fields.
                They stay updated with the latest medical advancements to provide you with the best care possible.
              </p>
            </div>
          </div>

          <div class="col-lg-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-heartbeat"></i>
              </div>
              <h3>Patient-Centered Approach</h3>
              <p>
                We believe in a patient-centered approach to healthcare. Our doctors take the time to listen to your
                concerns, answer your questions, and develop personalized treatment plans tailored to your needs.
              </p>
            </div>
          </div>

          <div class="col-lg-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-certificate"></i>
              </div>
              <h3>Board Certified</h3>
              <p>
                All our doctors are board-certified in their specialties, ensuring that they meet the highest
                standards of medical knowledge, expertise, and patient care in their respective fields.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Our Team Section -->
    <section class="join-team-section">
      <div class="container">
        <div class="join-team-content">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <h2>Join Our Medical Team</h2>
              <p>
                We're always looking for talented and passionate healthcare professionals to join our team.
                If you're committed to providing exceptional patient care and want to be part of a
                collaborative and supportive environment, we'd love to hear from you.
              </p>
              <router-link to="/contact" class="btn btn-primary">Contact Us</router-link>
            </div>
            <div class="col-lg-4">
              <div class="join-team-image">
                <img src="/src/assets/healthcare.png" alt="Join Our Team" class="img-fluid">
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
  name: 'DoctorsView',
  computed: {
    ...mapGetters(['getDoctors', 'isLoading']),
    doctors() {
      return this.getDoctors;
    },
    loading() {
      return this.isLoading
    }
  },
  methods: {
    ...mapActions(['fetchDoctors'])
  },
  created() {
    this.fetchDoctors()
  }
}
</script>

<style scoped>
.hero-section {
  padding: 80px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}

.hero-section p {
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.doctors-list-section {
  padding: 80px 0;
  background-color: #fff;
}

.doctor-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s;
  height: 100%;
}

.doctor-card:hover {
  transform: translateY(-10px);
}

.doctor-image {
  height: 250px;
  overflow: hidden;
}

.doctor-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.doctor-card:hover .doctor-image img {
  transform: scale(1.1);
}

.doctor-info {
  padding: 20px;
}

.doctor-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.doctor-info .specialty {
  color: #007bff;
  font-weight: 500;
  margin-bottom: 10px;
}

.doctor-info .bio {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.doctor-info .btn {
  border-radius: 20px;
  padding: 0.375rem 1.5rem;
  transition: all 0.3s;
}

.doctor-info .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
}

.why-choose-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.feature-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  height: 100%;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.join-team-section {
  padding: 80px 0;
  background-color: #fff;
}

.join-team-content {
  background: linear-gradient(120deg, #f8f9fa, #e9ecef);
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.join-team-content h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.join-team-content p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.join-team-content .btn {
  border-radius: 20px;
  padding: 0.5rem 2rem;
  transition: all 0.3s;
}

.join-team-content .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
}

.join-team-image img {
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section p {
    font-size: 1rem;
  }
}
</style>
