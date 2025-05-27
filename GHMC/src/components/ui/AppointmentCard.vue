<template>
  <div class="appointment-card" :class="statusClass">
    <div class="appointment-header">
      <div class="appointment-status">
        <span class="status-badge">{{ appointment.status }}</span>
        <span class="appointment-date">{{ formatDate(appointment.date) }}</span>
      </div>
      <div class="appointment-time">
        <i class="fa fa-clock-o"></i> {{ formatTime(appointment.time) }}
      </div>
    </div>

    <div class="appointment-body">
      <div class="doctor-info">
        <img
          :src="
            appointment.doctor.image
              ? require(`@/assets/images/doctors/${appointment.doctor.image}`)
              : require('@/assets/images/doctor-placeholder.jpg')
          "
          :alt="appointment.doctor.name"
          class="doctor-image"
        />
        <div>
          <h4 class="doctor-name">Dr. {{ appointment.doctor.name }}</h4>
          <p class="doctor-specialty">{{ appointment.doctor.specialty }}</p>
        </div>
      </div>

      <div class="appointment-details">
        <div class="detail-item">
          <i class="fa fa-stethoscope"></i>
          <span>{{ appointment.service }}</span>
        </div>
        <div class="detail-item">
          <i class="fa fa-map-marker"></i>
          <span>{{ appointment.location }}</span>
        </div>
        <div class="detail-item" v-if="appointment.notes">
          <i class="fa fa-sticky-note"></i>
          <span>{{ appointment.notes }}</span>
        </div>
      </div>
    </div>

    <div class="appointment-actions">
      <button
        v-if="canReschedule"
        class="btn btn-outline-primary btn-sm"
        @click="$emit('reschedule', appointment.id)"
      >
        <i class="fas fa-calendar"></i> Reschedule
      </button>
      <button
        v-if="canCancel"
        class="btn btn-outline-danger btn-sm"
        @click="$emit('cancel', appointment.id)"
      >
        <i class="fas fa-times"></i> Cancel
      </button>
      <button
        v-if="isPast && appointment.status === 'completed'"
        class="btn btn-outline-success btn-sm"
        @click="$emit('review', appointment.id)"
      >
        <i class="fas fa-star"></i> Leave Review
      </button>
      <button class="btn btn-outline-secondary btn-sm" @click="$emit('details', appointment.id)">
        <i class="fas fa-eye"></i> View Details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppointmentCard',
  props: {
    appointment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusClass() {
      const status = this.appointment.status.toLowerCase()
      return {
        'status-upcoming': status === 'upcoming',
        'status-completed': status === 'completed',
        'status-cancelled': status === 'cancelled',
        'status-rescheduled': status === 'rescheduled',
      }
    },
    isPast() {
      return new Date(this.appointment.date) < new Date()
    },
    canReschedule() {
      return this.appointment.status === 'upcoming' && !this.isPast
    },
    canCancel() {
      return this.appointment.status === 'upcoming' && !this.isPast
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
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
  },
}
</script>

<style scoped>
.appointment-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 20px;
  border-left: 5px solid #ccc;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.status-upcoming {
  border-left-color: #007bff;
}

.status-completed {
  border-left-color: #28a745;
}

.status-cancelled {
  border-left-color: #dc3545;
}

.status-rescheduled {
  border-left-color: #ffc107;
}

.appointment-header {
  padding: 15px 20px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appointment-status {
  display: flex;
  flex-direction: column;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
  background-color: #e9ecef;
}

.status-upcoming .status-badge {
  background-color: #cce5ff;
  color: #007bff;
}

.status-completed .status-badge {
  background-color: #d4edda;
  color: #28a745;
}

.status-cancelled .status-badge {
  background-color: #f8d7da;
  color: #dc3545;
}

.status-rescheduled .status-badge {
  background-color: #fff3cd;
  color: #856404;
}

.appointment-date {
  font-size: 0.85rem;
  color: #6c757d;
}

.appointment-time {
  font-weight: 600;
  color: #495057;
}

.appointment-body {
  padding: 20px;
}

.doctor-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.doctor-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 2px solid #e9ecef;
}

.doctor-name {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #343a40;
}

.doctor-specialty {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;
}

.appointment-details {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item i {
  color: #6c757d;
  margin-right: 10px;
  margin-top: 3px;
}

.appointment-actions {
  padding: 15px 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 10px;
}

.appointment-actions .btn {
  border-radius: 20px;
  transition: all 0.3s;
}

.appointment-actions .btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 576px) {
  .appointment-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .appointment-time {
    margin-top: 10px;
  }

  .appointment-actions {
    flex-wrap: wrap;
  }

  .appointment-actions .btn {
    flex: 1 0 calc(50% - 5px);
  }
}
</style>
