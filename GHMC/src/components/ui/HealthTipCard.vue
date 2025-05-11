<template>
  <div class="health-tip-card" @click="$emit('click')">
    <div class="tip-icon">
      <i :class="tip.icon"></i>
    </div>
    <div class="tip-content">
      <h3 class="tip-title">{{ tip.title }}</h3>
      <p class="tip-category">{{ tip.category }}</p>
      <p class="tip-description">{{ tip.description }}</p>
      <button class="btn btn-sm btn-link" @click.stop="$emit('read-more')">Read More</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HealthTipCard',
  props: {
    tip: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.health-tip-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.health-tip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.tip-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(120deg, #007bff, #170752);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.tip-icon i {
  color: #fff;
  font-size: 1.25rem;
}

.tip-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.tip-category {
  font-size: 0.8rem;
  color: #007bff;
  font-weight: 500;
  margin-bottom: 10px;
}

.tip-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  flex: 1;
}

.btn-link {
  padding-left: 0;
  text-align: left;
  color: #007bff;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
