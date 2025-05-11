<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="login-card">
            <div class="card shadow">
              <div class="card-header bg-primary text-white text-center py-4">
                <h2 class="mb-0">Login</h2>
              </div>
              <div class="card-body p-4">
                <!-- Error message from auth store -->
                <div v-if="error" class="alert alert-danger" role="alert">
                  {{ error }}
                </div>

                <!-- Auth redirect message -->
                <div v-if="authMessage" class="alert alert-info" role="alert">
                  <i class="fas fa-info-circle me-2"></i> {{ authMessage }}
                </div>

                <form @submit.prevent="handleLogin">
                  <div class="mb-3">
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

                  <div class="mb-3">
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
                      >
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="togglePassword"
                      >
                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                      </button>
                    </div>
                  </div>

                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe">
                    <label class="form-check-label" for="rememberMe">Remember me</label>
                    <router-link to="/forgot-password" class="float-end">Forgot password?</router-link>
                  </div>

                  <div class="d-grid gap-2">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      :disabled="loading"
                    >
                      <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ loading ? 'Logging in...' : 'Login' }}
                    </button>
                  </div>
                </form>

                <div class="text-center mt-4">
                  <p>Don't have an account? <router-link to="/register">Register</router-link></p>
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
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // Form data
    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const showPassword = ref(false);
    const authMessage = ref('');

    // Computed properties
    const loading = computed(() => store.state.auth.loading);
    const error = computed(() => store.state.auth.error);

    // Check for redirect message on component mount
    onMounted(() => {
      // Check if there's a stored message from a redirect
      const redirectMessage = localStorage.getItem('auth_redirect_message');
      if (redirectMessage) {
        authMessage.value = redirectMessage;
        // Clear the message so it doesn't show again on refresh
        localStorage.removeItem('auth_redirect_message');
      }

      // Pre-fill email from query params if available
      if (route.query.email) {
        email.value = route.query.email;
      }
    });

    // Methods
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      try {
        await store.dispatch('auth/login', {
          email: email.value,
          password: password.value
        });

        // Check if there's a redirect URL in the query parameters
        const redirectPath = route.query.redirect;

        if (redirectPath) {
          // Redirect to the original destination
          router.push(redirectPath);
        } else {
          // Redirect based on user role if no specific redirect
          const user = store.getters['auth/currentUser'];
          if (user.role === 'admin') {
            router.push('/admin/dashboard');
          } else if (user.role === 'doctor') {
            router.push('/doctor/dashboard');
          } else {
            router.push('/dashboard');
          }
        }
      } catch (err) {
        // Error is handled in the store and displayed via the error computed property
        console.error('Login error:', err);
      }
    };

    return {
      email,
      password,
      rememberMe,
      showPassword,
      loading,
      error,
      authMessage,
      togglePassword,
      handleLogin
    };
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 40px 0;
}

.login-card {
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

.btn-primary:hover {
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
