<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <router-view />
    </div>
    <PageFooter />
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import PageFooter from './components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 60px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 40px 0;
  }
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
}

.section-title h2 {
  font-size: 2.5rem;
  color: #4D6DF4;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.section-title h2:after {
  content: '';
  position: absolute;
  width: 50px;
  height: 3px;
  background: linear-gradient(120deg, #007bff, #170752);
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.section-title p {
  color: #666;
  max-width: 700px;
  margin: 0 auto;
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.mb-1 {
  margin-bottom: 0.5rem;
}

.mb-2 {
  margin-bottom: 1rem;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 2rem;
}

.mt-1 {
  margin-top: 0.5rem;
}

.mt-2 {
  margin-top: 1rem;
}

.mt-3 {
  margin-top: 1.5rem;
}

.mt-4 {
  margin-top: 2rem;
}

.py-1 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-2 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-3 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.py-4 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.px-1 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.px-2 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-3 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.px-4 {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
