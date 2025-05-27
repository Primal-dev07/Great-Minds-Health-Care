<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-lg-3">
          <div class="dashboard-sidebar">
            <div class="user-profile">
              <div class="user-avatar">
                <img :src="userAvatar" :alt="currentUser.firstName + ' ' + currentUser.lastName" />
              </div>
              <h3 class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
              <p class="user-email">{{ currentUser.email }}</p>
            </div>

            <div class="sidebar-menu">
              <router-link to="/dashboard" class="menu-item" exact-active-class="active">
                <i class="fas fa-tachometer-alt"></i> Dashboard
              </router-link>
              <router-link to="/appointments" class="menu-item" active-class="active">
                <i class="fas fa-calendar"></i> My Appointments
              </router-link>
              <router-link to="/appointments/book" class="menu-item" active-class="active">
                <i class="fas fa-plus-circle"></i> Book Appointment
              </router-link>
              <router-link to="/medical-records" class="menu-item" active-class="active">
                <i class="fas fa-file-medical"></i> Medical Records
              </router-link>
              <router-link to="/profile" class="menu-item" active-class="active">
                <i class="fas fa-user"></i> My Profile
              </router-link>
              <a href="#" class="menu-item" @click.prevent="handleLogout">
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-lg-9">
          <div class="dashboard-content">
            <h1 class="dashboard-title">Dashboard</h1>

            <!-- Welcome Card -->
            <div class="welcome-card">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h2>Welcome back, {{ currentUser.firstName }}!</h2>
                  <p>Here's a summary of your health information and upcoming appointments.</p>
                </div>
                <div class="col-md-4 text-md-end">
                  <router-link to="/appointments/book" class="btn btn-primary">
                    <i class="fa fa-plus-circle"></i> Book Appointment
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="row stats-row">
              <div class="col-md-4">
                <div class="stats-card">
                  <div class="stats-icon">
                    <i class="fa fa-calendar-check-o"></i>
                  </div>
                  <div class="stats-info">
                    <h3 class="stats-number">{{ upcomingAppointments.length }}</h3>
                    <p class="stats-title">Upcoming Appointments</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="stats-card">
                  <div class="stats-icon">
                    <i class="fa fa-history"></i>
                  </div>
                  <div class="stats-info">
                    <h3 class="stats-number">{{ pastAppointments.length }}</h3>
                    <p class="stats-title">Past Appointments</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <router-link to="/medical-records" class="stats-link">
                  <div class="stats-card">
                    <div class="stats-icon">
                      <i class="fa fa-file-text-o"></i>
                    </div>
                    <div class="stats-info">
                      <h3 class="stats-number">3</h3>
                      <p class="stats-title">Medical Records</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- Upcoming Appointments -->
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Upcoming Appointments</h2>
                <router-link to="/appointments" class="btn btn-sm btn-outline-primary"
                  >View All</router-link
                >
              </div>

              <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div v-else-if="upcomingAppointments.length === 0" class="empty-state">
                <i class="fa fa-calendar-o empty-icon"></i>
                <p>You don't have any upcoming appointments.</p>
                <router-link to="/appointments/book" class="btn btn-primary">Book Now</router-link>
              </div>

              <div v-else>
                <div
                  v-for="appointment in upcomingAppointments.slice(0, 3)"
                  :key="appointment.id"
                  class="appointment-item"
                >
                  <div class="appointment-date">
                    <div class="date-day">{{ formatDay(appointment.date) }}</div>
                    <div class="date-month">{{ formatMonth(appointment.date) }}</div>
                  </div>

                  <div class="appointment-details">
                    <h3 class="appointment-title">{{ appointment.service.title }}</h3>
                    <p class="appointment-doctor">
                      <i class="fa fa-user-md"></i> Dr. {{ appointment.doctor.name }}
                    </p>
                    <p class="appointment-time">
                      <i class="fa fa-clock-o"></i> {{ formatTime(appointment.time) }}
                    </p>
                  </div>

                  <div class="appointment-actions">
                    <router-link
                      :to="`/appointments/${appointment.id}`"
                      class="btn btn-sm btn-outline-primary"
                    >
                      View Details
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- Health Tips -->
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Health Tips</h2>
                <router-link to="/health-tips" class="btn btn-sm btn-outline-primary"
                  >View All Tips</router-link
                >
              </div>

              <div class="row">
                <div class="col-md-4 mb-4" v-for="(tip, index) in healthTips" :key="index">
                  <HealthTipCard
                    :tip="tip"
                    @click="viewHealthTip(tip)"
                    @read-more="viewHealthTip(tip)"
                  />
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
import { mapGetters, mapActions } from 'vuex'
import HealthTipCard from '../components/ui/HealthTipCard.vue'

export default {
  name: 'Dashboard',
  components: {
    HealthTipCard,
  },
  data() {
    return {
      loading: false,
      healthTips: [
        {
          title: 'Stay Active',
          description:
            'Regular physical activity can help prevent heart disease and improve your overall health.',
          icon: 'fas fa-heartbeat',
          category: 'Fitness',
        },
        {
          title: 'Eat Healthy',
          description:
            'A balanced diet rich in fruits, vegetables, and whole grains is essential for good health.',
          icon: 'fas fa-apple-alt',
          category: 'Nutrition',
        },
        {
          title: 'Get Enough Sleep',
          description:
            'Aim for 7-9 hours of quality sleep each night to support your physical and mental health.',
          icon: 'fas fa-bed',
          category: 'Sleep',
        },
      ],
      // Mock appointments data for demo
      mockAppointments: [
        {
          id: 'appt-001',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
          time: '10:30',
          status: 'confirmed',
          service: {
            title: 'General Health Check-up',
            id: 'service-001',
          },
          doctor: {
            name: 'John Johnson',
            id: 'doctor-001',
            specialization: 'Cardiology',
          },
        },
        {
          id: 'appt-002',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          time: '14:00',
          status: 'confirmed',
          service: {
            title: 'Dental Cleaning',
            id: 'service-002',
          },
          doctor: {
            name: 'Sarah Smith',
            id: 'doctor-002',
            specialization: 'Dentistry',
          },
        },
        {
          id: 'appt-003',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
          time: '09:15',
          status: 'completed',
          service: {
            title: 'Eye Examination',
            id: 'service-003',
          },
          doctor: {
            name: 'Michael Brown',
            id: 'doctor-003',
            specialization: 'Ophthalmology',
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/currentUser',
      isAuthenticated: 'auth/isAuthenticated',
    }),
    currentUser() {
      // If we have a user from auth store, use it, otherwise use the mock data
      if (this.user) {
        return {
          firstName: this.user.name ? this.user.name.split(' ')[0] : 'Demo',
          lastName: this.user.name ? this.user.name.split(' ')[1] || '' : 'User',
          email: this.user.email || 'demo@example.com',
          avatar: this.user.profileImage,
        }
      }

      // Fallback to mock data
      return {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        avatar: null,
      }
    },
    userAvatar() {
      // Always use a placeholder image for the demo
      return 'https://via.placeholder.com/100x100'
    },
    upcomingAppointments() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Use mock appointments for demo
      return this.mockAppointments
        .filter((appointment) => {
          const appointmentDate = new Date(appointment.date)
          return appointmentDate >= today && appointment.status !== 'cancelled'
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    },
    pastAppointments() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Use mock appointments for demo
      return this.mockAppointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date)
        return appointmentDate < today || appointment.status === 'completed'
      })
    },
  },
  methods: {
    ...mapActions({
      logoutAction: 'auth/logout',
    }),
    formatDay(dateString) {
      return new Date(dateString).getDate()
    },
    formatMonth(dateString) {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      return months[new Date(dateString).getMonth()]
    },
    formatTime(timeString) {
      if (!timeString) return ''

      // Assuming timeString is in 24-hour format like "14:30"
      const [hours, minutes] = timeString.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12

      return `${hour12}:${minutes} ${ampm}`
    },
    async handleLogout() {
      try {
        await this.logoutAction()
        this.$router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    viewHealthTip(tip) {
      // In a real application, this would navigate to a detailed view or show a modal
      this.$router.push('/health-tips')
    },
    // Mock method for demo
    fetchAppointmentsDemo() {
      this.loading = true
      // Simulate API call delay
      setTimeout(() => {
        console.log('Mock appointments loaded')
        this.loading = false
      }, 1000)
    },
  },
  created() {
    // For demo, just use the mock data
    this.fetchAppointmentsDemo()
  },
}
</script>

<style scoped>
.dashboard {
  padding: 40px 0;
  background-color: #f8f9fa;
  min-height: calc(100vh - 76px);
}

.dashboard-sidebar {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  position: sticky;
  top: 100px;
}

.user-profile {
  text-align: center;
  margin-bottom: 30px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
  border: 3px solid #e1ddf0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.user-email {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #555;
  border-radius: 8px;
  margin-bottom: 5px;
  transition: all 0.3s;
  text-decoration: none;
}

.menu-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.menu-item:hover {
  background-color: #f8f9fa;
  color: #007bff;
}

.menu-item.active {
  background-color: #e1ddf0;
  color: #007bff;
  font-weight: 500;
}

.dashboard-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
}

.welcome-card {
  background: linear-gradient(120deg, #007bff, #170752);
  color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
}

.welcome-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.welcome-card p {
  margin-bottom: 0;
  opacity: 0.9;
}

.welcome-card .btn {
  background-color: #fff;
  color: #007bff;
  border: none;
  transition: all 0.3s;
}

.welcome-card .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

.stats-row {
  margin-bottom: 30px;
}

.stats-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  height: 100%;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(120deg, #007bff, #170752);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.stats-icon i {
  color: #fff;
  font-size: 1.25rem;
}

.stats-info {
  flex: 1;
}

.stats-number {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
}

.stats-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0;
}

.stats-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
}

.empty-icon {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 15px;
}

.appointment-item {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.3s;
}

.appointment-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.appointment-date {
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.date-day {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.date-month {
  font-size: 0.8rem;
  text-transform: uppercase;
}

.appointment-details {
  flex: 1;
}

.appointment-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.appointment-doctor,
.appointment-time {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.appointment-doctor i,
.appointment-time i {
  margin-right: 5px;
  color: #007bff;
}

.health-tip-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
  height: 100%;
}

.health-tip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.tip-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(120deg, #007bff, #170752);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.tip-icon i {
  color: #fff;
  font-size: 1.5rem;
}

.tip-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.tip-text {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .dashboard-sidebar {
    margin-bottom: 30px;
    position: static;
  }
}
</style>
