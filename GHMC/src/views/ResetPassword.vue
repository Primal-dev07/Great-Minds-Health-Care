<template>
  <div class="reset-password-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="reset-card">
            <div class="card shadow">
              <div class="card-header bg-primary text-white text-center py-4">
                <h2 class="mb-0">Reset Password</h2>
              </div>
              <div class="card-body p-4">
                <div v-if="error" class="alert alert-danger" role="alert">
                  {{ error }}
                </div>
                
                <div v-if="success" class="alert alert-success" role="alert">
                  {{ success }}
                </div>
                
                <form v-if="!success" @submit.prevent="handleResetPassword">
                  <div class="mb-3">
                    <label for="password" class="form-label">New Password</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-lock"></i>
                      </span>
                      <input 
                        :type="showPassword ? 'text' : 'password'" 
                        class="form-control" 
                        id="password" 
                        v-model="password" 
                        placeholder="Enter your new password"
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
                  
                  <div class="mb-4">
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
                        placeholder="Confirm your new password"
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
                  
                  <div class="d-grid gap-2">
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg"
                      :disabled="loading || passwordMismatch || !password"
                    >
                      <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ loading ? 'Resetting Password...' : 'Reset Password' }}
                    </button>
                  </div>
                </form>
                
                <div v-if="success" class="text-center mt-3">
                  <router-link to="/login" class="btn btn-primary">
                    Go to Login
                  </router-link>
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
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ResetPassword',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    
    // Form data
    const password = ref('');
    const confirmPassword = ref('');
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const error = ref('');
    const success = ref('');
    const loading = ref(false);
    const token = ref('');
    
    // Computed properties
    const passwordMismatch = computed(() => {
      return password.value && confirmPassword.value && password.value !== confirmPassword.value;
    });
    
    // Get token from URL
    onMounted(() => {
      token.value = route.params.token;
      
      if (!token.value) {
        error.value = 'Invalid or missing reset token. Please request a new password reset link.';
      }
    });
    
    // Methods
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };
    
    const handleResetPassword = async () => {
      if (passwordMismatch.value) {
        return;
      }
      
      if (!token.value) {
        error.value = 'Invalid or missing reset token. Please request a new password reset link.';
        return;
      }
      
      try {
        loading.value = true;
        error.value = '';
        
        await store.dispatch('auth/resetPassword', {
          token: token.value,
          password: password.value
        });
        
        success.value = 'Your password has been successfully reset. You can now log in with your new password.';
        
        // Clear form
        password.value = '';
        confirmPassword.value = '';
      } catch (err) {
        error.value = err.response?.data?.error || 'Failed to reset password. Please try again.';
      } finally {
        loading.value = false;
      }
    };
    
    return {
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      error,
      success,
      loading,
      passwordMismatch,
      togglePassword,
      toggleConfirmPassword,
      handleResetPassword
    };
  }
};
</script>

<style scoped>
.reset-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 40px 0;
}

.reset-card {
  max-width: 500px;
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

.form-control {
  border-left: none;
}

.form-control:focus {
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
</style>
