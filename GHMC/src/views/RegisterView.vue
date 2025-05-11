<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="register-card">
            <div class="card shadow">
              <div class="card-header bg-primary text-white text-center py-4">
                <h2 class="mb-0">Create an Account</h2>
              </div>
              <div class="card-body p-4">
                <div v-if="error" class="alert alert-danger" role="alert">
                  {{ error }}
                </div>
                
                <form @submit.prevent="handleRegister">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="name" class="form-label">Full Name</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fas fa-user"></i>
                        </span>
                        <input 
                          type="text" 
                          class="form-control" 
                          id="name" 
                          v-model="name" 
                          placeholder="Enter your full name"
                          required
                        >
                      </div>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                      <label for="email" class="form-label">Email address</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fas fa-envelope"></i>
                        </span>
                        <input 
                          type="email" 
                          class="form-control" 
                          id="email" 
                          v-model="email" 
                          placeholder="Enter your email"
                          required
                        >
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="password" class="form-label">Password</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fas fa-lock"></i>
                        </span>
                        <input 
                          :type="showPassword ? 'text' : 'password'" 
                          class="form-control" 
                          id="password" 
                          v-model="password" 
                          placeholder="Enter your password"
                          required
                          minlength="6"
                        >
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button"
                          @click="togglePassword"
                        >
                          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                      <div class="form-text">Password must be at least 6 characters long.</div>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                      <label for="confirmPassword" class="form-label">Confirm Password</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fas fa-lock"></i>
                        </span>
                        <input 
                          :type="showConfirmPassword ? 'text' : 'password'" 
                          class="form-control" 
                          id="confirmPassword" 
                          v-model="confirmPassword" 
                          placeholder="Confirm your password"
                          required
                        >
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button"
                          @click="toggleConfirmPassword"
                        >
                          <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                      <div v-if="passwordMismatch" class="text-danger mt-1">
                        Passwords do not match.
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="phone" class="form-label">Phone Number</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fas fa-phone"></i>
                        </span>
                        <input 
                          type="tel" 
                          class="form-control" 
                          id="phone" 
                          v-model="phone" 
                          placeholder="Enter your phone number"
                        >
                      </div>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                      <label for="gender" class="form-label">Gender</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <i class="fas fa-venus-mars"></i>
                        </span>
                        <select class="form-select" id="gender" v-model="gender">
                          <option value="" disabled selected>Select your gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="termsAgreed" v-model="termsAgreed" required>
                    <label class="form-check-label" for="termsAgreed">
                      I agree to the <a href="#" @click.prevent="showTerms">Terms and Conditions</a> and <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <div class="d-grid gap-2">
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg"
                      :disabled="loading || passwordMismatch || !termsAgreed"
                    >
                      <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ loading ? 'Creating Account...' : 'Register' }}
                    </button>
                  </div>
                </form>
                
                <div class="text-center mt-4">
                  <p>Already have an account? <router-link to="/login">Login</router-link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    // Form data
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const phone = ref('');
    const gender = ref('');
    const termsAgreed = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    
    // Computed properties
    const loading = computed(() => store.state.auth.loading);
    const error = computed(() => store.state.auth.error);
    const passwordMismatch = computed(() => {
      return password.value && confirmPassword.value && password.value !== confirmPassword.value;
    });
    
    // Methods
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };
    
    const showTerms = () => {
      alert('Terms and Conditions will be displayed here.');
    };
    
    const showPrivacy = () => {
      alert('Privacy Policy will be displayed here.');
    };
    
    const handleRegister = async () => {
      if (passwordMismatch.value) {
        return;
      }
      
      try {
        await store.dispatch('auth/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          phone: phone.value,
          gender: gender.value,
          role: 'patient' // Default role for registration
        });
        
        // Redirect to verification page or dashboard
        router.push('/email-verification');
      } catch (err) {
        // Error is handled in the store and displayed via the error computed property
        console.error('Registration error:', err);
      }
    };
    
    return {
      name,
      email,
      password,
      confirmPassword,
      phone,
      gender,
      termsAgreed,
      showPassword,
      showConfirmPassword,
      loading,
      error,
      passwordMismatch,
      togglePassword,
      toggleConfirmPassword,
      showTerms,
      showPrivacy,
      handleRegister
    };
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 40px 0;
}

.register-card {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: none;
  border-radius: 15px;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(120deg, #007bff, #170752);
}

.input-group-text {
  background-color: #f8f9fa;
  border-right: none;
}

.form-control, .form-select {
  border-left: none;
}

.form-control:focus, .form-select:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.btn-primary {
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.btn-outline-secondary {
  border-left: none;
}

.btn-outline-secondary:hover,
.btn-outline-secondary:focus {
  background-color: transparent;
  color: #6c757d;
  border-color: #ced4da;
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
