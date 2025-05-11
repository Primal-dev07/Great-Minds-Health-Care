<template>
  <div class="forgot-password-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="forgot-password-card">
            <h2>Reset Your Password</h2>

            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>

            <div v-if="success" class="alert alert-success" role="alert">
              {{ success }}
            </div>

            <p v-if="!success">
              Enter your email address below and we'll send you instructions to reset your password.
            </p>

            <form v-if="!success" @submit.prevent="handleForgotPassword">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
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
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="loading || !email"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ loading ? 'Sending Reset Link...' : 'Send Reset Instructions' }}
              </button>
            </form>

            <div class="mt-3 text-center">
              <p v-if="success">
                <router-link to="/login" class="btn btn-outline-primary">
                  Back to Login
                </router-link>
              </p>
              <p v-else>
                Remember your password?
                <router-link to="/login">Sign In</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ForgotPassword',
  setup() {
    const store = useStore();

    // Form data
    const email = ref('');
    const error = ref('');
    const success = ref('');
    const loading = ref(false);

    // Methods
    const handleForgotPassword = async () => {
      try {
        loading.value = true;
        error.value = '';

        await store.dispatch('auth/forgotPassword', email.value);

        success.value = 'Password reset link has been sent to your email. Please check your inbox.';

        // Clear form
        email.value = '';
      } catch (err) {
        error.value = err.response?.data?.error || 'Failed to send reset link. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      error,
      success,
      loading,
      handleForgotPassword
    };
  }
}
</script>

<style scoped>
.forgot-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 40px 0;
}

.forgot-password-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 500px;
  margin: 0 auto;
}

.forgot-password-card h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #170752;
  text-align: center;
  background: linear-gradient(120deg, #007bff, #170752);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.forgot-password-card p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
}

.forgot-password-card .form-label {
  font-weight: 500;
  color: #333;
}

.input-group-text {
  background-color: #f8f9fa;
  border-right: none;
}

.form-control {
  border-left: none;
  border-radius: 0 8px 8px 0;
}

.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.btn-primary {
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.3);
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
  border-radius: 30px;
  padding: 8px 20px;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background: linear-gradient(120deg, #007bff, #170752);
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
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
