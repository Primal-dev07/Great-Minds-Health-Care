<template>
  <div class="service-detail-page">
    <section class="hero-section">
      <div class="container">
        <div class="section-title">
          <h1>{{ service.title }}</h1>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="service-content">
              <h2>Overview</h2>
              <p>
                This is a detailed overview of the {{ service.title }} service.
                Here, you can provide more specific information about what the service includes,
                how it benefits patients, and any other relevant details.
              </p>
              <h3>Benefits</h3>
              <ul>
                <li>Benefit 1 of {{ service.title }}</li>
                <li>Benefit 2 of {{ service.title }}</li>
                <li>Benefit 3 of {{ service.title }}</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="service-sidebar">
              <h3>Book an Appointment</h3>
              <p>Ready to experience the benefits of {{ service.title }}? Book an appointment today!</p>
              <router-link to="/contact" class="btn btn-primary">Book Now</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ServiceDetail',
  computed: {
    ...mapGetters(['getServices']),
    service() {
      const serviceId = parseInt(this.$route.params.id);
      return this.getServices.find(service => service.id === serviceId);
    }
  },
  created() {
    if (!this.service) {
      this.$router.push('/not-found'); // Redirect to a 404 page if service not found
    }
  }
};
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

.content-section {
  padding: 80px 0;
  background-color: #fff;
}

.service-content h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.service-content p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.service-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #333;
}

.service-content ul {
  list-style: disc;
  padding-left: 20px;
}

.service-content li {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

.service-sidebar {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
}

.service-sidebar h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.service-sidebar p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.service-sidebar .btn {
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: 500;
  transition: all 0.3s;
}

.service-sidebar .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
}
</style>
