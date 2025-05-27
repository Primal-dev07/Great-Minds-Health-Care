<template>
  <footer class="footer">
    <!-- Newsletter Section -->
    <div class="newsletter-section">
      <div class="container">
        <div class="newsletter-container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <h3 class="newsletter-title">Subscribe to Our Newsletter</h3>
              <p class="newsletter-text">
                Stay updated with the latest health tips, services, and special offers.
              </p>
            </div>
            <div class="col-lg-6">
              <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter your email address"
                    v-model="email"
                    required
                  />
                  <button class="btn btn-primary" type="submit">
                    <span v-if="!subscribing">Subscribe</span>
                    <span
                      v-else
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </button>
                </div>
                <div
                  v-if="subscriptionMessage"
                  class="subscription-message"
                  :class="{ success: subscriptionSuccess }"
                >
                  {{ subscriptionMessage }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="main-footer">
      <div class="container">
        <div class="row">
          <!-- Company Info -->
          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div class="footer-brand">
              <img
                src="/src/assets/GMHC.png"
                alt="The Great Minds Health Care Logo"
                class="footer-logo-small"
              />
              <h2 class="footer-title">Great Mind Healthcare Center</h2>
            </div>
            <p class="footer-text">
              Always providing progressive and affordable healthcare, accessible both online and in
              person for everyone
            </p>

            <!-- Social Media Links -->
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-links">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/services">Our Services</router-link></li>
              <li><router-link to="/doctors">Our Doctors</router-link></li>
              <li><router-link to="/health-tips">Health Tips</router-link></li>
              <li><router-link to="/faq">FAQ</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
              <li><router-link to="/about">About Us</router-link></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h3 class="footer-heading">Services</h3>
            <ul class="footer-links">
              <li><router-link to="/services">Primary Care</router-link></li>
              <li><router-link to="/services">Specialist Consultations</router-link></li>
              <li><router-link to="/services">Diagnostic Services</router-link></li>
              <li><router-link to="/services">Preventive Care</router-link></li>
              <li><router-link to="/services">Telemedicine</router-link></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="col-lg-4 col-md-6">
            <h3 class="footer-heading">Contact Us</h3>
            <ul class="footer-contact">
              <li>
                <div class="contact-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="contact-text">
                  <span>123 Healthcare Ave, Kumasi, Ghana</span>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="contact-text">
                  <span>+233 55 785 2345</span>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-text">
                  <span>info@gmhc.com</span>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="far fa-clock"></i>
                </div>
                <div class="contact-text">
                  <span>Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 1:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="footer-bottom">
          <div class="copyright">
            &copy; {{ currentYear }} Great Minds Healthcare Center. All Rights Reserved
          </div>
          <div class="footer-bottom-links">
            <router-link to="/privacy-policy">Privacy Policy</router-link>
            <router-link to="/terms-of-service">Terms of Service</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'GhmcFooter',
  data() {
    return {
      email: '',
      subscribing: false,
      subscriptionMessage: '',
      subscriptionSuccess: false,
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    subscribeNewsletter() {
      // Validate email
      if (!this.validateEmail(this.email)) {
        this.subscriptionMessage = 'Please enter a valid email address.'
        this.subscriptionSuccess = false
        return
      }

      // Simulate API call
      this.subscribing = true
      this.subscriptionMessage = ''

      setTimeout(() => {
        this.subscribing = false
        this.subscriptionSuccess = true
        this.subscriptionMessage = 'Thank you for subscribing to our newsletter!'
        this.email = ''

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.subscriptionMessage = ''
        }, 5000)
      }, 1500)
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
  },
}
</script>

<style scoped>
/* Footer Base Styles */
.footer {
  margin-top: 80px;
  color: #333;
}

/* Newsletter Section */
.newsletter-section {
  background: linear-gradient(120deg, #007bff, #170752);
  padding: 60px 0;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
}

.newsletter-container {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.newsletter-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.newsletter-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.newsletter-text {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
  line-height: 1.6;
}

.newsletter-form .input-group {
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.newsletter-form .input-group:focus-within {
  box-shadow: 0 15px 35px rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.newsletter-form .form-control {
  border: none;
  padding: 18px 25px;
  font-size: 1.05rem;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

.newsletter-form .form-control:focus {
  background: #ffffff;
}

.newsletter-form .btn {
  padding: 0 30px;
  background: linear-gradient(120deg, #ffffff, #f8f9fa);
  color: #007bff;
  border: none;
  font-weight: 700;
  min-width: 140px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.newsletter-form .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0));
  transition: all 0.4s ease;
}

.newsletter-form .btn:hover {
  background: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.newsletter-form .btn:hover::before {
  left: 100%;
}

.subscription-message {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ff6b6b;
  text-align: left;
  padding-left: 10px;
}

.subscription-message.success {
  color: #51cf66;
}

/* Main Footer */
.main-footer {
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  padding: 80px 0 30px;
  position: relative;
  box-shadow: inset 0 15px 30px rgba(0, 0, 0, 0.05);
}

.main-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #007bff, #170752, #007bff);
  box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
}

.main-footer::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
}

/* Footer Brand */
.footer-brand {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.footer-logo-small {
  width: 50px;
  height: auto;
  margin-right: 15px;
}

.footer-title {
  color: #170752;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.footer-text {
  color: #666;
  margin-bottom: 25px;
  line-height: 1.6;
}

/* Footer Headings */
.footer-heading {
  color: #170752;
  margin-bottom: 25px;
  font-size: 1.3rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 12px;
  letter-spacing: 0.5px;
}

.footer-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #007bff, #170752);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.footer-heading:hover::after {
  width: 70px;
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 14px;
}

.footer-links a {
  color: #555;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-block;
  position: relative;
  padding-left: 18px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.footer-links a::before {
  content: '›';
  position: absolute;
  left: 0;
  color: #007bff;
  font-size: 1.3rem;
  line-height: 1;
  transition: all 0.3s;
  opacity: 0.8;
}

.footer-links a:hover {
  color: #007bff;
  transform: translateX(8px);
}

.footer-links a:hover::before {
  transform: translateX(3px) scale(1.2);
  opacity: 1;
}

/* Contact Info */
.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-contact li {
  margin-bottom: 18px;
  display: flex;
  transition: transform 0.3s ease;
}

.footer-contact li:hover {
  transform: translateX(5px);
}

.contact-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(120deg, #007bff, #170752);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.footer-contact li:hover .contact-icon {
  transform: scale(1.1);
}

.footer-contact li:hover .contact-icon::before {
  opacity: 1;
}

.contact-icon i {
  color: white;
  font-size: 1.1rem;
}

.contact-text {
  color: #555;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.2px;
}

/* Social Links */
.social-links {
  display: flex;
  margin-top: 25px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: linear-gradient(120deg, #007bff, #170752);
  color: white;
  border-radius: 50%;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.social-link:hover {
  transform: translateY(-8px) rotate(360deg);
  box-shadow: 0 10px 25px rgba(0, 123, 255, 0.4);
  color: white;
}

.social-link:hover::before {
  opacity: 1;
}

/* Footer Bottom */
.footer-bottom {
  margin-top: 50px;
  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
}

.copyright {
  color: #555;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.footer-bottom-links {
  display: flex;
}

.footer-bottom-links a {
  color: #555;
  text-decoration: none;
  margin-left: 25px;
  font-size: 0.95rem;
  transition: all 0.3s;
  font-weight: 500;
  position: relative;
  padding-bottom: 3px;
}

.footer-bottom-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #007bff, #170752);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.footer-bottom-links a:hover {
  color: #007bff;
}

.footer-bottom-links a:hover::after {
  width: 100%;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .newsletter-title {
    font-size: 1.5rem;
  }

  .newsletter-container {
    padding: 20px;
  }

  .footer-heading::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .newsletter-section {
    padding: 30px 0;
  }

  .newsletter-text {
    margin-bottom: 20px;
  }

  .main-footer {
    padding: 40px 0 20px;
    text-align: center;
  }

  .footer-brand {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-heading {
    margin-top: 30px;
  }

  .footer-contact li {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
  }

  .copyright {
    margin-bottom: 15px;
  }

  .footer-bottom-links {
    justify-content: center;
  }

  .footer-bottom-links a {
    margin: 0 10px;
  }
}

@media (max-width: 576px) {
  .newsletter-form .btn {
    min-width: 100px;
    padding: 0 15px;
  }

  .newsletter-title {
    font-size: 1.3rem;
  }

  .newsletter-text {
    font-size: 0.9rem;
  }

  .footer-text {
    font-size: 0.9rem;
  }
}
</style>
