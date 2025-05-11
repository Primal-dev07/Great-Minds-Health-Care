<template>
  <div class="service-card">
    <div class="service-icon">
      <img :src="`/src/assets/icons/${service.icon}`" :alt="service.title">
    </div>
    <h3 class="service-title">{{ service.title }}</h3>
    <p class="service-description">{{ service.description }}</p>
    <router-link
      :to="link"
      class="service-link"
      v-if="link"
    >
      Learn More <i class="fa fa-arrow-right"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true
    },
    link: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.service-card {
  background: linear-gradient(120deg, #ffffff, #e1ddf0);
  padding: 30px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon img {
  max-width: 100%;
  max-height: 100%;
}

.service-title {
  font-size: 1.25rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
}

.service-description {
  color: #666;
  margin-bottom: 20px;
  flex-grow: 1;
}

.service-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  transition: all 0.3s;
}

.service-link i {
  margin-left: 5px;
  transition: transform 0.3s;
}

.service-link:hover {
  color: #0056b3;
}

.service-link:hover i {
  transform: translateX(5px);
}
</style>
