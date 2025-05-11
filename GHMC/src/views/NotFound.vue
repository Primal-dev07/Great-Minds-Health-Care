<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <router-link to="/" class="btn btn-primary">
          <i class="fa fa-home me-2"></i> Return to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 50px 0;
  text-align: center;
}

.not-found-content {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 8rem;
  font-weight: 700;
  color: #4D6DF4;
  margin-bottom: 0;
  line-height: 1;
}

h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
}

.btn-primary {
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
}

@media (max-width: 768px) {
  h1 {
    font-size: 6rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}
</style>
