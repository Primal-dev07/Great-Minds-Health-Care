import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home - Great Minds Healthcare Center' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: 'About Us - Great Minds Healthcare Center' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: { title: 'Our Services - Great Minds Healthcare Center' }
  },
  {
    path: '/services/:id',
    name: 'ServiceDetail',
    component: () => import('../views/ServiceDetail.vue'),
    meta: { title: 'Service Detail - Great Minds Healthcare Center' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: 'Contact Us - Great Minds Healthcare Center' }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../views/FAQ.vue'),
    meta: { title: 'Frequently Asked Questions - Great Minds Healthcare Center' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      title: 'Register - Great Minds Healthcare Center',
      guest: true
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: { title: 'Forgot Password - Great Minds Healthcare Center' }
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: () => import('../views/Doctors.vue'),
    meta: { title: 'Our Doctors - Great Minds Healthcare Center' }
  },
  {
    path: '/doctors/:id',
    name: 'DoctorDetail',
    component: () => import('../views/DoctorDetail.vue'),
    meta: { title: 'Doctor Detail - Great Minds Healthcare Center' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      title: 'Dashboard - Great Minds Healthcare Center',
      requiresAuth: true
    }
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: () => import('../views/Appointments.vue'),
    meta: {
      title: 'My Appointments - Great Minds Healthcare Center',
      requiresAuth: true
    }
  },
  {
    path: '/appointments/book',
    name: 'BookAppointment',
    component: () => import('../views/BookAppointment.vue'),
    meta: {
      title: 'Book Appointment - Great Minds Healthcare Center',
      requiresAuth: true
    }
  },
  {
    path: '/medical-records',
    name: 'MedicalRecords',
    component: () => import('../views/MedicalRecords.vue'),
    meta: {
      title: 'Medical Records - Great Minds Healthcare Center',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: 'My Profile - Great Minds Healthcare Center',
      requiresAuth: true
    }
  },
  {
    path: '/health-tips',
    name: 'HealthTips',
    component: () => import('../views/HealthTips.vue'),
    meta: {
      title: 'Health Tips - Great Minds Healthcare Center',
      requiresAuth: true
    }
  },
  {
    path: '/health-tips/:id',
    name: 'HealthTipDetail',
    component: () => import('../views/HealthTipDetail.vue'),
    meta: {
      title: 'Health Tip Detail - Great Minds Healthcare Center',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Sign In - Great Minds Healthcare Center',
      guest: true
    }
  },
  {
    path: '/email-verification',
    name: 'EmailVerification',
    component: () => import('../views/EmailVerification.vue'),
    meta: {
      title: 'Verify Your Email - Great Minds Healthcare Center'
    }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue'),
    meta: {
      title: 'Reset Password - Great Minds Healthcare Center',
      guest: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Page Not Found - Great Minds Healthcare Center' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Set document title
  document.title = to.meta.title || 'Great Minds Healthcare Center'

  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters['auth/isAuthenticated']

  // Check if the route is for guests only (like login, register)
  const isGuestRoute = to.matched.some(record => record.meta.guest)

  if (requiresAuth && !isAuthenticated) {
    // If route requires auth but user is not authenticated, redirect to login
    // Store a toast message in localStorage to show after redirect
    localStorage.setItem('auth_redirect_message', 'Please sign in to access the patient portal')

    // Redirect to login with the intended destination
    next({
      name: 'Login',
      query: { redirect: to.fullPath },
      params: { showAuthMessage: true }
    })
  } else if (isGuestRoute && isAuthenticated) {
    // If route is for guests only and user is authenticated, redirect to dashboard
    next({ name: 'Dashboard' })
  } else {
    // Otherwise proceed as normal
    next()
  }
})

export default router
