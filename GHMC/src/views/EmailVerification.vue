<template>
  <div class="email-verification-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="verification-card">
            <div class="card shadow">
              <div class="card-body p-5 text-center">
                <div class="verification-icon mb-4">
                  <i class="fas fa-envelope-open-text"></i>
                </div>
                
                <h2 class="mb-3">Verify Your Email</h2>
                
                <p class="lead mb-4">
                  We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                </p>
                
                <div v-if="error" class="alert alert-danger" role="alert">
                  {{ error }}
                </div>
                
                <div v-if="success" class="alert alert-success" role="alert">
                  {{ success }}
                </div>
                
                <div class="mb-4">
                  <p>Didn't receive the email?</p>
                  <button 
                    class="btn btn-primary"
                    @click="resendVerificationEmail"
                    :disabled="loading || countdown > 0"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend Verification Email' }}
                  </button>
                </div>
                
                <div class="mt-4">
                  <p>Already verified your email?</p>
                  <router-link to="/login" class="btn btn-outline-primary">
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'EmailVerification',
  setup() {
    const route = useRoute();
    const store = useStore();
    
    const loading = ref(false);
    const error = ref('');
    const success = ref('');
    const countdown = ref(0);
    let countdownTimer = null;
    
    // Check if there's a token in the URL
    onMounted(() => {
      const token = route.query.token;
      
      if (token) {
        verifyEmail(token);
      }
    });
    
    // Clear countdown timer when component is destroyed
    onUnmounted(() => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    });
    
    // Verify email with token
    const verifyEmail = async (token) => {
      try {
        loading.value = true;
        error.value = '';
        success.value = '';
        
        await store.dispatch('auth/verifyEmail', token);
        
        success.value = 'Your email has been successfully verified! You can now log in.';
      } catch (err) {
        error.value = err.response?.data?.error || 'Failed to verify email. Please try again.';
      } finally {
        loading.value = false;
      }
    };
    
    // Resend verification email
    const resendVerificationEmail = async () => {
      if (countdown.value > 0) return;
      
      try {
        loading.value = true;
        error.value = '';
        success.value = '';
        
        // This would typically call an API endpoint to resend the verification email
        // For now, we'll just simulate it with a timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        success.value = 'Verification email has been resent. Please check your inbox.';
        
        // Start countdown for resend button
        countdown.value = 60;
        countdownTimer = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(countdownTimer);
          }
        }, 1000);
      } catch (err) {
        error.value = 'Failed to resend verification email. Please try again.';
      } finally {
        loading.value = false;
      }
    };
    
    return {
      loading,
      error,
      success,
      countdown,
      resendVerificationEmail
    };
  }
};
</script>

<style scoped>
.email-verification-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 40px 0;
}

.verification-card {
  max-width: 500px;
  margin: 0 auto;
}

.card {
  border: none;
  border-radius: 15px;
  overflow: hidden;
}

.verification-icon {
  font-size: 4rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.verification-icon i {
  background: linear-gradient(120deg, #007bff, #170752);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background: linear-gradient(120deg, #007bff, #170752);
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}
</style>
