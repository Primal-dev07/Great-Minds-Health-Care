<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card login-card">
            <div class="card-body">
              <h1 class="card-title text-center mb-4">Welcome Back!</h1>
              
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="email" 
                    required
                    :disabled="loading"
                  >
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    v-model="password" 
                    required
                    :disabled="loading"
                  >
                </div>
                
                <div class="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    id="rememberMe" 
                    v-model="rememberMe"
                    :disabled="loading"
                  >
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                
                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary" 
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Signing in...' : 'Sign In' }}
                  </button>
                </div>
                
                <div class="text-center mt-3">
                  <router-link to="/forgot-password">Forgot Password?</router-link>
                </div>
              </form>
              
              <hr class="my-4">
              
              <div class="text-center">
                <p>Don't have an account?</p>
                <router-link to="/register" class="btn btn-outline-primary">Register Now</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      loading: false,
      error: null
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      this.loading = true
      this.error = null
      
      try {
        await this.login({
          email: this.email,
          password: this.password
        })
        
        // Redirect to dashboard or intended page
        const redirectPath = this.$route.query.redirect || '/dashboard'
        this.$router.push(redirectPath)
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to sign in. Please check your credentials.'
        console.error('Login error:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  padding: 60px 0;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
}

.login-card {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: none;
}

.card-title {
  color: #333;
  font-weight: 600;
}

.form-control {
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
}

.btn-outline-primary {
  border-radius: 8px;
  font-weight: 500;
  padding: 10px 20px;
  transition: all 0.3s;
}

.btn-outline-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
}

a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
