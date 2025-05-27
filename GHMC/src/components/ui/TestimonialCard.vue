<template>
  <div class="testimonial-card">
    <div class="testimonial-content">
      <div class="testimonial-quote">
        <i class="fas fa-quote-left"></i>
      </div>
      <p class="testimonial-text">{{ testimonial.content }}</p>
      <div class="testimonial-rating">
        <i
          v-for="star in 5"
          :key="star"
          class="fas"
          :class="star <= testimonial.rating ? 'fa-star' : 'fa-star'"
          :style="{ color: star <= testimonial.rating ? '#ffc107' : '#e4e5e9' }"
        ></i>
      </div>
    </div>
    <div class="testimonial-author">
      <div class="testimonial-avatar">
        <img
          :src="
            testimonial.avatar
              ? `/src/assets/avatars/${testimonial.avatar}`
              : `/src/assets/health.png`
          "
          :alt="testimonial.name"
        />
      </div>
      <div class="testimonial-info">
        <h4 class="testimonial-name">{{ testimonial.name }}</h4>
        <p class="testimonial-date">{{ formatDate(testimonial.date) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialCard',
  props: {
    testimonial: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''

      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
  },
}
</script>

<style scoped>
.testimonial-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
  flex-grow: 1;
  position: relative;
}

.testimonial-quote {
  font-size: 2rem;
  color: #e1ddf0;
  margin-bottom: 15px;
}

.testimonial-text {
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
}

.testimonial-rating {
  color: #ffc107;
  margin-bottom: 20px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.testimonial-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-info {
  flex-grow: 1;
}

.testimonial-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.testimonial-date {
  font-size: 0.85rem;
  color: #999;
  margin: 0;
}
</style>
