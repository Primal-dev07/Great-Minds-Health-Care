<template>
  <div class="time-slot-picker">
    <h4 class="time-slot-title">Available Time Slots</h4>

    <div v-if="!selectedDate" class="no-date-selected">
      <p>Please select a date to view available time slots</p>
    </div>

    <div v-else-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="availableTimeSlots.length === 0" class="no-slots-available">
      <p>No time slots available for the selected date</p>
      <p class="text-muted">Please select another date</p>
    </div>

    <div v-else class="time-slots-container">
      <div
        v-for="(slot, index) in availableTimeSlots"
        :key="index"
        class="time-slot"
        :class="{ 'selected': selectedTimeSlot === slot }"
        @click="selectTimeSlot(slot)"
      >
        <span class="time">{{ formatTime(slot) }}</span>
        <span class="availability">Available</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeSlotPicker',
  props: {
    selectedDate: {
      type: String,
      default: ''
    },
    doctorId: {
      type: Number,
      default: null
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      selectedTimeSlot: this.value,
      // Mock time slots data - in a real app, this would come from an API
      timeSlotsByDoctor: {
        1: { // Dr. Sarah Johnson
          morning: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
          afternoon: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
        },
        2: { // Dr. Michael Chen
          morning: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
          afternoon: ['13:00', '13:30', '14:00', '14:30', '15:00']
        },
        3: { // Dr. Emily Rodriguez
          morning: ['09:00', '10:00', '11:00'],
          afternoon: ['13:00', '14:00', '15:00', '16:00']
        },
        4: { // Dr. David Osei
          morning: ['08:00', '09:00', '10:00', '11:00'],
          afternoon: ['13:00', '14:00', '15:00', '16:00', '17:00']
        }
      }
    }
  },
  computed: {
    availableTimeSlots() {
      if (!this.selectedDate || !this.doctorId) {
        return []
      }

      // Get the doctor's schedule
      const doctorSchedule = this.timeSlotsByDoctor[this.doctorId]
      if (!doctorSchedule) {
        return []
      }

      // Combine morning and afternoon slots
      const allSlots = [...doctorSchedule.morning, ...doctorSchedule.afternoon]

      // Randomly remove some slots to simulate availability
      // In a real app, this would come from the backend
      return allSlots.filter(() => Math.random() > 0.3).sort()
    }
  },
  methods: {
    formatTime(time) {
      if (!time) return ''

      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12

      return `${hour12}:${minutes} ${ampm}`
    },
    selectTimeSlot(slot) {
      this.selectedTimeSlot = slot
      this.$emit('input', slot)
    },
    simulateLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 800)
    }
  },
  watch: {
    selectedDate() {
      this.selectedTimeSlot = ''
      this.$emit('input', '')
      this.simulateLoading()
    },
    doctorId() {
      this.selectedTimeSlot = ''
      this.$emit('input', '')
    },
    value(newValue) {
      this.selectedTimeSlot = newValue
    }
  }
}
</script>

<style scoped>
.time-slot-picker {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.time-slot-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.no-date-selected, .no-slots-available {
  text-align: center;
  padding: 30px 0;
  color: #6c757d;
}

.no-slots-available p {
  margin-bottom: 5px;
}

.time-slots-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.time-slot {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  /* Improve touch target size */
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  touch-action: manipulation; /* Improve touch behavior */
}

.time-slot:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.time-slot.selected {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  /* Add a subtle shadow for better visual feedback */
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.time {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 5px;
}

.availability {
  display: block;
  font-size: 0.8rem;
  color: #28a745;
}

.time-slot.selected .availability {
  color: #fff;
}

/* Mobile Optimizations */
@media (max-width: 576px) {
  .time-slot-picker {
    padding: 15px;
  }

  .time-slot-title {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  .time-slots-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .time-slot {
    padding: 8px;
    min-height: 55px;
  }

  .time {
    font-size: 0.9rem;
    margin-bottom: 3px;
  }

  .availability {
    font-size: 0.7rem;
  }

  .no-date-selected, .no-slots-available {
    padding: 20px 0;
  }

  /* Add active state for touch devices */
  .time-slot:active {
    background-color: #e9ecef;
    transform: translateY(0);
  }
}
</style>
