<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="register-card">
            <h2>Create an Account</h2>
            <p>
              Join Great Minds Healthcare Center to access our services and manage your health online.
            </p>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="firstName" required>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" v-model="lastName" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <div class="mt-3 text-center">
              Already have an account?
              <router-link to="/login">Sign In</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register() {
      // Implement registration logic here (e.g., API call)
      console.log('Registering user:', this.firstName, this.lastName, this.email);
      // After successful registration, redirect to login or dashboard
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.register-page {
  background-color: #f8f9fa;
  padding: 80px 0;
}

.register-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 40px;
}

.register-card h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.register-card p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
}

.register-card .form-label {
  font-weight: 500;
  color: #333;
}

.register-card .form-control {
  border-radius: 8px;
}

.register-card .btn {
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: 500;
  transition: all 0.3s;
}

.register-card .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
}
</style>
