<template>
  <header>
    <nav class="navbar navbar-expand-lg" :class="{ 'navbar-scrolled': isScrolled }">
      <div class="container">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
          <img src="/src/assets/GMHC.png" alt="Great Minds Healthcare Center Logo" height="60">
        </router-link>

        <!-- Hamburger button for mobile -->
        <div class="mobile-nav-buttons d-flex d-lg-none align-items-center">
          <!-- Mobile search toggle -->
          <button
            class="btn btn-icon me-2"
            @click="isSearchOpen = !isSearchOpen"
            aria-label="Toggle search"
          >
            <i class="fa" :class="isSearchOpen ? 'fa-times' : 'fa-search'"></i>
          </button>

          <!-- Mobile menu toggle -->
          <button
            class="navbar-toggler"
            type="button"
            @click="isNavOpen = !isNavOpen"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <!-- Mobile search bar -->
        <div class="mobile-search-container" :class="{ 'show': isSearchOpen }">
          <form class="d-flex search-form w-100" @submit.prevent="search">
            <input
              class="form-control"
              type="search"
              placeholder="Search for services, doctors..."
              aria-label="Search"
              v-model="searchQuery"
              ref="mobileSearchInput"
            >
            <button class="btn btn-search" type="submit">
              <i class="fa fa-search"></i>
            </button>
            <button class="btn btn-clear" type="button" @click="clearSearch">
              <i class="fa fa-times"></i>
            </button>
          </form>
        </div>

        <!-- Navigation links -->
        <div class="collapse navbar-collapse" :class="{ 'show': isNavOpen }">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/" exact-active-class="active" @click="closeNavOnMobile">Home</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="healthResourcesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Health Resources
              </a>
              <ul class="dropdown-menu" aria-labelledby="healthResourcesDropdown">
                <li>
                  <router-link class="dropdown-item" to="/services" @click="closeNavOnMobile">
                    <i class="fa fa-stethoscope me-2"></i> Our Services
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/doctors" @click="closeNavOnMobile">
                    <i class="fa fa-user-md me-2"></i> Our Doctors
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/health-tips" @click="closeNavOnMobile">
                    <i class="fa fa-heartbeat me-2"></i> Health Tips
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact" active-class="active" @click="closeNavOnMobile">Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" active-class="active" @click="closeNavOnMobile">About Us</router-link>
            </li>

            <!-- Mobile Patient Portal Links -->
            <li class="nav-item patient-portal-mobile d-lg-none">
              <h6 class="portal-heading">Patient Portal</h6>
            </li>
            <li class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/dashboard" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-tachometer me-2"></i> Dashboard
              </router-link>
            </li>
            <li class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/appointments" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-calendar me-2"></i> My Appointments
              </router-link>
            </li>
            <li class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/medical-records" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-file-text-o me-2"></i> Medical Records
              </router-link>
            </li>
            <li class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/profile" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-user me-2"></i> My Profile
              </router-link>
            </li>

            <!-- Logout option for mobile - only shown when authenticated -->
            <li v-if="isAuthenticated" class="nav-item patient-portal-mobile d-lg-none">
              <a href="#" class="nav-link portal-link" @click.prevent="handleLogout">
                <i class="fa fa-sign-out me-2"></i> Logout
              </a>
            </li>

            <!-- Login option for mobile - only shown when not authenticated -->
            <li v-if="!isAuthenticated" class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/login" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-sign-in me-2"></i> Sign In
              </router-link>
            </li>

            <li class="nav-item patient-portal-mobile d-lg-none">
              <h6 class="portal-heading">Health Resources</h6>
            </li>
            <li class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/services" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-stethoscope me-2"></i> Our Services
              </router-link>
            </li>
            <li class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/doctors" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-user-md me-2"></i> Our Doctors
              </router-link>
            </li>
            <li class="nav-item patient-portal-mobile d-lg-none">
              <router-link class="nav-link portal-link" to="/health-tips" active-class="active" @click="closeNavOnMobile">
                <i class="fa fa-heartbeat me-2"></i> Health Tips
              </router-link>
            </li>
          </ul>

          <div class="navbar-right-section">
            <!-- Desktop Search bar -->
            <form class="d-none d-lg-flex search-form me-3" @submit.prevent="search">
              <input
                class="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                v-model="searchQuery"
              >
              <button class="btn btn-search" type="submit">
                <i class="fa fa-search"></i>
              </button>
            </form>

            <!-- Auth buttons -->
            <div class="auth-buttons">
              <!-- Patient Portal Dropdown - Always visible -->
              <div class="dropdown d-none d-lg-inline-block me-2">
                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="patientPortalDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa fa-user-circle me-1"></i> <span class="d-none d-xl-inline">Patient Portal</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="patientPortalDropdown">
                  <li>
                    <router-link class="dropdown-item" to="/dashboard">
                      <i class="fa fa-tachometer me-2"></i> Dashboard
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/appointments">
                      <i class="fa fa-calendar me-2"></i> My Appointments
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/medical-records">
                      <i class="fa fa-file-text-o me-2"></i> Medical Records
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/health-tips">
                      <i class="fa fa-heartbeat me-2"></i> Health Tips
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <router-link class="dropdown-item" to="/profile">
                      <i class="fa fa-user me-2"></i> My Profile
                    </router-link>
                  </li>
                  <!-- Logout option only shown when user is authenticated -->
                  <li v-if="isAuthenticated">
                    <hr class="dropdown-divider">
                  </li>
                  <li v-if="isAuthenticated">
                    <a href="#" class="dropdown-item" @click.prevent="handleLogout">
                      <i class="fa fa-sign-out me-2"></i> Logout
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Sign In button only shown when user is NOT authenticated -->
              <router-link v-if="!isAuthenticated" to="/login" class="btn btn-outline-primary">Sign In</router-link>

              <!-- User info and logout button shown when user IS authenticated -->
              <div v-else class="d-flex align-items-center">
                <div class="user-info me-3 d-none d-md-block">
                  <span class="user-name">Welcome, {{ userName }}</span>
                </div>
                <button @click="handleLogout" class="btn btn-outline-danger btn-sm">
                  <i class="fa fa-sign-out"></i> <span class="d-none d-md-inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBarComponent',
  data() {
    return {
      isNavOpen: false,
      isSearchOpen: false,
      isScrolled: false,
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      currentUser: 'auth/currentUser'
    }),
    userName() {
      if (this.currentUser) {
        return this.currentUser.name || 'User';
      }
      return 'User';
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    search() {
      if (this.searchQuery.trim()) {
        // Since we don't have a search page, redirect to services with a query
        this.$router.push({
          path: '/services',
          query: { search: this.searchQuery }
        })

        // Store the search query for display purposes
        const query = this.searchQuery

        // Clear the search and close mobile UI elements
        this.searchQuery = ''
        this.isNavOpen = false
        this.isSearchOpen = false

        // Show an alert to inform the user
        alert(`Searching for "${query}" in our services. This is a demo feature.`)
      }
    },
    clearSearch() {
      this.searchQuery = ''
      this.isSearchOpen = false
    },
    closeNavOnMobile() {
      if (window.innerWidth < 992) {
        this.isNavOpen = false
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleDropdown(event) {
      // This method is for handling dropdown clicks manually if needed
      const dropdown = event.currentTarget.parentElement;
      const menu = dropdown.querySelector('.dropdown-menu');
      const isExpanded = event.currentTarget.getAttribute('aria-expanded') === 'true';

      event.currentTarget.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('show');

      // Prevent the default behavior
      event.preventDefault();
    },
    async handleLogout() {
      try {
        await this.logout();
        this.$router.push('/');
        // Show a success message
        alert('You have been successfully logged out.');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  },
  mounted() {
    // Add scroll event listener for sticky navbar
    window.addEventListener('scroll', this.handleScroll)

    // Add resize event listener to close mobile menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) {
        this.isNavOpen = false
        this.isSearchOpen = false
      }
    })
  },
  beforeUnmount() {
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    isSearchOpen(newVal) {
      if (newVal) {
        // Focus the search input when opened
        this.$nextTick(() => {
          if (this.$refs.mobileSearchInput) {
            this.$refs.mobileSearchInput.focus()
          }
        })
      }
    }
  }
}
</script>

<style scoped>
/* Header and Navbar Base Styles */
header {
  position: relative;
  z-index: 1000;
}

.navbar {
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 10px 0;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  width: 100%;
}

.navbar .container {
  max-width: 1280px;
  width: 100%;
  padding: 0 20px;
}

.navbar-scrolled {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(248, 249, 250, 0.95) 0%, rgba(225, 221, 240, 0.95) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  animation: slideDown 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Logo Styles */
.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand img {
  transition: transform 0.3s;
}

.navbar-brand:hover img {
  transform: scale(1.05);
}

/* Navigation Links */
.nav-link {
  color: #333;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  position: relative;
  transition: all 0.3s;
  border-radius: 8px;
  margin: 0 2px;
  letter-spacing: 0.2px;
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 3px;
  background: linear-gradient(120deg, #007bff, #170752);
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: width 0.3s, opacity 0.3s;
  opacity: 0;
  border-radius: 3px;
}

.nav-link:hover, .nav-link.active {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.05);
}

.nav-link:hover:after, .nav-link.active:after {
  width: 60%;
  opacity: 1;
}

/* Dropdown Styles */
.nav-item.dropdown {
  position: relative;
}

.nav-item.dropdown .dropdown-toggle::after {
  margin-left: 0.5em;
  vertical-align: middle;
  transition: transform 0.3s;
}

.nav-item.dropdown .dropdown-toggle[aria-expanded="true"]::after {
  transform: rotate(180deg);
}

.nav-item.dropdown .dropdown-menu {
  margin-top: 5px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  padding: 12px;
  min-width: 240px;
  animation: fadeIn 0.25s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.nav-item.dropdown .dropdown-item {
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.2s;
  color: #444;
  margin-bottom: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.nav-item.dropdown .dropdown-item i {
  color: #007bff;
  width: 24px;
  text-align: center;
  font-size: 1.1rem;
  margin-right: 8px;
  transition: transform 0.2s;
}

.nav-item.dropdown .dropdown-item:hover,
.nav-item.dropdown .dropdown-item:focus,
.nav-item.dropdown .dropdown-item.active {
  background: linear-gradient(120deg, #f0f7ff, #e8f0fe);
  color: #007bff;
  transform: translateX(3px);
}

.nav-item.dropdown .dropdown-item:hover i,
.nav-item.dropdown .dropdown-item:focus i,
.nav-item.dropdown .dropdown-item.active i {
  transform: scale(1.1);
}

/* Mobile Navigation Buttons */
.mobile-nav-buttons {
  z-index: 1100;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: #333;
  transition: all 0.2s;
}

.btn-icon:hover, .btn-icon:focus {
  background-color: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.navbar-toggler {
  border: none;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
}

.navbar-toggler:focus {
  box-shadow: none;
  outline: none;
}

.navbar-toggler:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Search Form Styles */
.search-form {
  position: relative;
  max-width: 300px;
}

.search-form input {
  border-radius: 20px;
  padding: 0.5rem 1rem;
  padding-right: 70px;
  border: 1px solid #e0e0e0;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s;
  width: 200px;
}

.search-form input:focus {
  background-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
  border-color: #b8c9f1;
}

.btn-search {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border: none;
  background: transparent;
  color: #007bff;
  padding: 0 15px;
  border-radius: 0 20px 20px 0;
  transition: all 0.2s;
}

.btn-search:hover {
  color: #0056b3;
  background-color: rgba(0, 123, 255, 0.1);
}

.btn-clear {
  position: absolute;
  right: 40px;
  top: 0;
  height: 100%;
  border: none;
  background: transparent;
  color: #6c757d;
  padding: 0 5px;
  transition: all 0.2s;
}

.btn-clear:hover {
  color: #343a40;
}

/* Mobile Search Container */
.mobile-search-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #e1ddf0;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-20px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 1050;
}

.mobile-search-container.show {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

/* Navbar Right Section */
.navbar-right-section {
  display: flex;
  align-items: center;
  margin-left: auto;
}

/* Auth Buttons */
.auth-buttons {
  display: flex;
  align-items: center;
}

.auth-buttons .btn {
  border-radius: 30px;
  padding: 0.5rem 1.8rem;
  transition: all 0.3s;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.auth-buttons .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #007bff, #170752);
  z-index: -1;
  transition: opacity 0.3s ease;
  opacity: 0;
  border-radius: 30px;
}

.auth-buttons .btn-primary {
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);
}

.auth-buttons .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
}

.auth-buttons .btn-outline-primary {
  border: 2px solid #007bff;
  color: #007bff;
  background: rgba(255, 255, 255, 0.8);
}

.auth-buttons .btn-outline-primary:hover {
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
  border-color: transparent;
}

.auth-buttons .btn-outline-primary:hover::before {
  opacity: 1;
}

.auth-buttons .btn-outline-danger {
  border: 2px solid #dc3545;
  color: #dc3545;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.375rem 1rem;
}

.auth-buttons .btn-outline-danger:hover {
  color: white;
  background-color: #dc3545;
  border-color: #dc3545;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
}

/* Dropdown Styles */
.dropdown-menu {
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-width: 220px;
  margin-top: 10px;
  animation: fadeIn 0.2s ease;
}

/* User Info Styles */
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #007bff;
  white-space: nowrap;
}

.user-role {
  font-size: 0.75rem;
  color: #666;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  padding: 8px 15px;
  border-radius: 5px;
  transition: all 0.2s;
  color: #555;
  margin-bottom: 2px;
}

.dropdown-item i {
  color: #007bff;
  width: 20px;
  text-align: center;
}

.dropdown-item:hover, .dropdown-item:focus {
  background-color: #f0f7ff;
  color: #007bff;
}

.dropdown-divider {
  margin: 8px 0;
  border-top: 1px solid #e9ecef;
}

/* Patient Portal Mobile Styles */
.portal-heading {
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #6c757d;
  margin: 20px 0 10px;
  padding: 0 1rem;
  letter-spacing: 0.8px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 20px;
  font-weight: 600;
  position: relative;
}

.portal-heading:first-of-type {
  border-top: none;
  padding-top: 0;
}

.portal-heading::after {
  content: '';
  position: absolute;
  left: 1rem;
  bottom: -5px;
  width: 30px;
  height: 2px;
  background: linear-gradient(120deg, #007bff, #170752);
  border-radius: 2px;
}

.portal-link {
  padding: 0.7rem 1.5rem 0.7rem 2.5rem !important;
  color: #444 !important;
  font-weight: 500;
  border-radius: 8px;
  margin-bottom: 5px;
  transition: all 0.3s;
}

.portal-link i {
  color: #007bff;
  transition: transform 0.2s;
}

.portal-link:hover, .portal-link.active {
  background: linear-gradient(120deg, #f0f7ff, #e8f0fe);
  color: #007bff !important;
  transform: translateX(5px);
}

.portal-link:hover i, .portal-link.active i {
  transform: scale(1.2);
}

.portal-link:after {
  display: none;
}

/* Responsive Styles */
@media (max-width: 1199px) {
  /* Adjust spacing for large screens but not quite XL */
  .search-form input {
    width: 160px;
  }

  .auth-buttons .btn {
    padding: 0.375rem 1rem;
  }
}

@media (max-width: 992px) {
  .navbar-collapse {
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 280px;
    height: 100vh;
    background: linear-gradient(160deg, #ffffff 0%, #f8f9fa 100%);
    padding: 1.5rem 1rem;
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.15);
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    overflow-y: auto;
    z-index: 1040;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }

  /* Add overlay when mobile menu is open */
  .navbar-collapse.show::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .navbar-collapse.show {
    transform: translateX(0);
  }

  .navbar-right-section {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }

  .navbar-nav {
    margin-bottom: 1rem !important;
  }

  .nav-item {
    margin-bottom: 5px;
  }

  .nav-link {
    padding: 0.75rem 1rem;
  }

  .nav-link:hover, .nav-link.active {
    background-color: #f8f9fa;
  }

  .nav-link:after {
    display: none;
  }

  .navbar-nav .nav-item.patient-portal-mobile {
    margin-top: 0.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 0.5rem;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
  }

  .auth-buttons .btn {
    width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .navbar-brand img {
    height: 55px;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 10px 0;
  }

  .navbar-brand img {
    height: 45px;
  }

  .mobile-search-container {
    padding: 10px;
  }

  .search-form input {
    font-size: 0.9rem;
  }

  .btn-icon, .navbar-toggler {
    width: 36px;
    height: 36px;
  }
}
</style>
