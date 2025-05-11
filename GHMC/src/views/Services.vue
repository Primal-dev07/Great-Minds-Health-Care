<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="section-title">
          <h1>{{ searchQuery ? 'Search Results' : 'Our Healthcare Services' }}</h1>
          <p v-if="searchQuery">
            Showing results for: <strong>"{{ searchQuery }}"</strong>
            <button @click="clearSearch" class="btn btn-sm btn-outline-secondary ms-2">
              <i class="fa fa-times"></i> Clear Search
            </button>
          </p>
          <p v-else>
            We provide a wide range of medical services to meet your healthcare needs.
            Our team of experienced professionals is dedicated to delivering high-quality care.
          </p>
        </div>
      </div>
    </section>

    <!-- Services List Section -->
    <section class="services-list-section">
      <div class="container">
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-else-if="searchQuery && services.length === 0" class="col-12 text-center py-5">
            <div class="no-results">
              <i class="fa fa-search fa-3x text-muted mb-3"></i>
              <h3>No Results Found</h3>
              <p>We couldn't find any services matching your search for "{{ searchQuery }}".</p>
              <button @click="clearSearch" class="btn btn-primary mt-3">
                View All Services
              </button>
            </div>
          </div>

          <template v-else>
            <div
              v-for="service in services"
              :key="service.id"
              class="col-lg-4 col-md-6 mb-4"
            >
              <ServiceCard :service="service" :link="`/services/${service.id}`" />
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Special Services Section -->
    <section class="special-services-section">
      <div class="container">
        <div class="section-title text-center mb-5">
          <h2>Specialized Care</h2>
          <p>
            In addition to our general services, we offer specialized care in the following areas:
          </p>
        </div>

        <div class="row">
          <div class="col-lg-6 mb-4">
            <div class="special-service-card">
              <div class="special-service-icon">
                <i class="fa fa-heartbeat"></i>
              </div>
              <div class="special-service-content">
                <h3>Cardiology</h3>
                <p>
                  Our cardiology department provides comprehensive care for heart conditions,
                  including diagnostic tests, treatment, and preventive care. Our team of experienced
                  cardiologists uses state-of-the-art technology to diagnose and treat a wide range of
                  heart conditions, from hypertension to complex cardiac diseases.
                </p>
                <ul class="service-features">
                  <li><i class="fa fa-check-circle"></i> Echocardiography</li>
                  <li><i class="fa fa-check-circle"></i> Electrocardiogram (ECG/EKG)</li>
                  <li><i class="fa fa-check-circle"></i> Holter Monitoring</li>
                  <li><i class="fa fa-check-circle"></i> Cardiac Rehabilitation</li>
                </ul>
                <router-link to="/services/cardiology" class="btn btn-outline-primary">Learn More</router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="special-service-card">
              <div class="special-service-icon">
                <i class="fa fa-brain"></i>
              </div>
              <div class="special-service-content">
                <h3>Neurology</h3>
                <p>
                  Our neurology specialists diagnose and treat disorders of the nervous system,
                  including the brain, spinal cord, and peripheral nerves. We provide comprehensive care
                  for conditions such as stroke, epilepsy, multiple sclerosis, Parkinson's disease,
                  and other neurological disorders.
                </p>
                <ul class="service-features">
                  <li><i class="fa fa-check-circle"></i> Electroencephalogram (EEG)</li>
                  <li><i class="fa fa-check-circle"></i> Electromyography (EMG)</li>
                  <li><i class="fa fa-check-circle"></i> Nerve Conduction Studies</li>
                  <li><i class="fa fa-check-circle"></i> Cognitive Assessments</li>
                </ul>
                <router-link to="/services/neurology" class="btn btn-outline-primary">Learn More</router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="special-service-card">
              <div class="special-service-icon">
                <i class="fa fa-baby"></i>
              </div>
              <div class="special-service-content">
                <h3>Pediatrics</h3>
                <p>
                  Our pediatric department provides comprehensive healthcare services for children,
                  from newborns to adolescents. Our pediatricians are dedicated to providing compassionate
                  care in a child-friendly environment, focusing on both preventive care and treatment
                  of childhood illnesses and conditions.
                </p>
                <ul class="service-features">
                  <li><i class="fa fa-check-circle"></i> Well-Child Visits</li>
                  <li><i class="fa fa-check-circle"></i> Immunizations</li>
                  <li><i class="fa fa-check-circle"></i> Developmental Assessments</li>
                  <li><i class="fa fa-check-circle"></i> Pediatric Consultations</li>
                </ul>
                <router-link to="/services/pediatrics" class="btn btn-outline-primary">Learn More</router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="special-service-card">
              <div class="special-service-icon">
                <i class="fa fa-bone"></i>
              </div>
              <div class="special-service-content">
                <h3>Orthopedics</h3>
                <p>
                  Our orthopedic specialists diagnose and treat conditions affecting the musculoskeletal system,
                  including bones, joints, ligaments, tendons, and muscles. We provide both surgical and
                  non-surgical treatments for a wide range of orthopedic conditions, from sports injuries
                  to degenerative joint diseases.
                </p>
                <ul class="service-features">
                  <li><i class="fa fa-check-circle"></i> Joint Replacement Surgery</li>
                  <li><i class="fa fa-check-circle"></i> Fracture Care</li>
                  <li><i class="fa fa-check-circle"></i> Sports Medicine</li>
                  <li><i class="fa fa-check-circle"></i> Physical Therapy</li>
                </ul>
                <router-link to="/services/orthopedics" class="btn btn-outline-primary">Learn More</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <h3>Need Specialized Care?</h3>
          <p>Our team of specialists is ready to provide you with the highest quality of care.</p>
          <router-link to="/contact" class="btn btn-primary">Book an Appointment</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ServiceCard from '../components/ui/ServiceCard.vue'

export default {
  name: 'ServicesView',
  components: {
    ServiceCard
  },
  computed: {
    ...mapGetters(['getServices', 'isLoading']),
    services() {
      // Filter services based on search query if present
      if (this.$route.query.search) {
        const searchTerm = this.$route.query.search.toLowerCase();
        return this.getServices.filter(service =>
          service.title.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm)
        );
      }
      return this.getServices;
    },
    loading() {
      return this.isLoading
    },
    searchQuery() {
      return this.$route.query.search || '';
    }
  },
  methods: {
    ...mapActions(['fetchServices']),
    clearSearch() {
      // Remove the search query and navigate back to the services page
      this.$router.push({ path: '/services' });
    }
  },
  created() {
    this.fetchServices()
  }
}
</script>

<style scoped>
.hero-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  text-align: center;
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

.section-title {
  position: relative;
  z-index: 2;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 25px;
  color: #333;
  position: relative;
  display: inline-block;
}

.hero-section h1::after {
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

.hero-section p {
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  position: relative;
  z-index: 2;
}

.services-list-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
}

.services-list-section::before {
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

.special-services-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  position: relative;
  overflow: hidden;
}

.special-services-section::after {
  content: '';
  position: absolute;
  bottom: -200px;
  right: -200px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.05), rgba(23, 7, 82, 0.05));
  z-index: 1;
}

.special-service-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 2;
}

.special-service-card::after {
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

.special-service-card:hover {
  transform: translateY(-15px);
}

.special-service-card:hover::after {
  opacity: 1;
}

.special-service-icon {
  width: 120px;
  background: linear-gradient(120deg, #007bff, #170752);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  position: relative;
  overflow: hidden;
}

.special-service-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.special-service-card:hover .special-service-icon::before {
  opacity: 1;
}

.special-service-content {
  padding: 30px;
  flex-grow: 1;
}

.special-service-content h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
  position: relative;
  display: inline-block;
}

.special-service-content h3::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #007bff, #170752);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.special-service-card:hover .special-service-content h3::after {
  width: 60px;
}

.special-service-content p {
  color: #555;
  margin-bottom: 20px;
  line-height: 1.7;
  font-size: 1.05rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
}

.service-features li {
  margin-bottom: 12px;
  color: #555;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.05);
}

.service-features li:last-child {
  border-bottom: none;
}

.special-service-card:hover .service-features li {
  transform: translateX(5px);
}

.service-features li i {
  color: #28a745;
  margin-right: 12px;
  font-size: 1rem;
  background: rgba(40, 167, 69, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.special-service-card:hover .service-features li i {
  transform: scale(1.2);
  background: rgba(40, 167, 69, 0.2);
}

.special-service-content .btn {
  border-radius: 50px;
  padding: 10px 25px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 2px solid #007bff;
}

.special-service-content .btn::before {
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

.special-service-content .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
  color: white;
}

.special-service-content .btn:hover::before {
  opacity: 1;
}

@media (max-width: 992px) {
  .special-service-card {
    flex-direction: column;
  }

  .special-service-icon {
    width: 100%;
    height: 120px;
  }

  .hero-section, .services-list-section, .special-services-section {
    padding: 70px 0;
  }

  .hero-section h1 {
    font-size: 2.5rem;
  }
}

.no-results {
  padding: 60px 30px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 15px;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
}

.no-results::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(0, 123, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
  z-index: -1;
  border-radius: 50%;
}

.no-results i {
  color: #007bff;
  opacity: 0.7;
  margin-bottom: 10px;
}

.no-results h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 15px 0;
  color: #333;
}

.no-results p {
  color: #555;
  margin-bottom: 25px;
  font-size: 1.1rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.no-results .btn {
  border-radius: 50px;
  padding: 12px 30px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.no-results .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 123, 255, 0.4);
}

@media (max-width: 768px) {
  .hero-section, .services-list-section, .special-services-section {
    padding: 50px 0;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section p {
    font-size: 1rem;
  }

  .special-service-content {
    padding: 20px;
  }

  .special-service-content h3 {
    font-size: 1.3rem;
  }

  .special-service-content p {
    font-size: 1rem;
  }

  .no-results {
    padding: 40px 20px;
  }

  .no-results h3 {
    font-size: 1.5rem;
  }

  .no-results p {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-section, .services-list-section, .special-services-section {
    padding: 40px 0;
  }

  .hero-section h1 {
    font-size: 1.7rem;
  }

  .special-service-icon {
    height: 100px;
  }
}
</style>
