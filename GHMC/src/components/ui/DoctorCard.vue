<template>
  <div class="doctor-card">
    <div class="doctor-image">
      <img :src="doctor.image ? `/src/assets/images/${doctor.image}` : `/src/assets/physician.png`" :alt="doctor.name">
    </div>
    <div class="doctor-info">
      <h3 class="doctor-name">Dr. {{ doctor.name }}</h3>
      <p class="doctor-specialty">{{ doctor.specialty }}</p>
      <div class="doctor-rating">
        <i
          v-for="star in 5"
          :key="star"
          class="fa"
          :class="star <= doctor.rating ? 'fa-star' : 'fa-star-o'"
        ></i>
        <span>({{ doctor.reviewCount }})</span>
      </div>
      <p class="doctor-bio">{{ truncatedBio }}</p>
      <div class="doctor-actions">
        <router-link
          to="/contact"
          class="btn btn-primary btn-sm"
        >
          Book Appointment
        </router-link>
        <router-link
          :to="link"
          class="btn btn-outline-primary btn-sm"
          v-if="link"
        >
          Learn More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorCard',
  props: {
    doctor: {
      type: Object,
      required: true
    },
    link: {
      type: String,
      default: ''
    }
  },
  computed: {
    truncatedBio() {
      return this.doctor.bio && this.doctor.bio.length > 100
        ? this.doctor.bio.substring(0, 100) + '...'
        : this.doctor.bio
    }
  },
  methods: {}
}
</script>

<style scoped>
.doctor-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.doctor-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.doctor-image {
  height: 200px;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.doctor-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.doctor-specialty {
  color: #007bff;
  font-weight: 500;
  margin-bottom: 10px;
}

.doctor-rating {
  margin-bottom: 15px;
  color: #ffc107;
}

.doctor-rating span {
  color: #666;
  margin-left: 5px;
  font-size: 0.9rem;
}

.doctor-bio {
  color: #666;
  margin-bottom: 20px;
  flex-grow: 1;
}

.doctor-actions {
  display: flex;
  gap: 10px;
}

.doctor-actions .btn {
  flex: 1;
  border-radius: 20px;
  transition: all 0.3s;
}

.doctor-actions .btn-primary {
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
}

.doctor-actions .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
}
</style>
