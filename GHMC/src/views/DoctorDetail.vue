<template>
  <div class="doctor-detail-page">
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img :src="`/src/assets/images/${doctor.image}`" :alt="doctor.name" class="doctor-image">
          </div>
          <div class="col-md-6">
            <div class="doctor-info">
              <h1>{{ doctor.name }}</h1>
              <p class="specialty">{{ doctor.specialty }}</p>
              <p class="bio">{{ doctor.bio }}</p>
              <router-link to="/contact" class="btn btn-primary">Book Appointment</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <h2>More About Dr. {{ doctor.name.split(' ')[1] }}</h2>
        <p>
          Dr. {{ doctor.name.split(' ')[1] }} is committed to providing the highest quality of care to
          patients. With years of experience in {{ doctor.specialty }}, Dr. {{ doctor.name.split(' ')[1] }}
          has developed a deep understanding of patient needs and concerns.
        </p>
        <h3>Education</h3>
        <ul>
          <li>Medical School: Example Medical School</li>
          <li>Residency: Example Residency Program</li>
        </ul>
        <h3>Certifications</h3>
        <ul>
          <li>Board Certified in {{ doctor.specialty }}</li>
          <li>Advanced Cardiac Life Support (ACLS)</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DoctorDetail',
  computed: {
    ...mapGetters(['getDoctors']),
    doctor() {
      const doctorId = parseInt(this.$route.params.id);
      return this.getDoctors.find(doctor => doctor.id === doctorId);
    }
  },
  created() {
    if (!this.doctor) {
      this.$router.push('/not-found'); // Redirect to a 404 page if doctor not found
    }
  }
};
</script>

<style scoped>
.doctor-detail-page {
  background-color: #f8f9fa;
}

.hero-section {
  padding: 80px 0;
  background-color: #fff;
}

.doctor-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.doctor-info {
  padding: 20px;
}

.doctor-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.doctor-info .specialty {
  font-size: 1.2rem;
  color: #007bff;
  margin-bottom: 20px;
}

.doctor-info .bio {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.content-section {
  padding: 80px 0;
}

.content-section h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.content-section p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.content-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #333;
}

.content-section ul {
  list-style: disc;
  padding-left: 20px;
}

.content-section li {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}
</style>
