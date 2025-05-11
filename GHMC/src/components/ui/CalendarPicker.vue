<template>
  <div class="calendar-picker">
    <div class="calendar-header">
      <button class="btn btn-sm btn-outline-secondary" @click="prevMonth">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h3>{{ currentMonthName }} {{ currentYear }}</h3>
      <button class="btn btn-sm btn-outline-secondary" @click="nextMonth">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div class="calendar-weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
    </div>

    <div class="calendar-days">
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="calendar-day"
        :class="{
          'empty': !day.inMonth,
          'today': day.isToday,
          'selected': isSelected(day.date),
          'available': day.available && day.inMonth,
          'unavailable': !day.available && day.inMonth
        }"
        @click="selectDate(day)"
      >
        <span class="day-number">{{ day.dayNumber }}</span>
        <span v-if="day.available && day.inMonth" class="availability-indicator">
          <i class="fas fa-check-circle"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarPicker',
  props: {
    selectedDate: {
      type: String,
      default: ''
    },
    minDate: {
      type: String,
      default: ''
    },
    doctorId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currentDate: new Date(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // Mock availability data - in a real app, this would come from an API
      availableDates: {}
    }
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear()
    },
    currentMonth() {
      return this.currentDate.getMonth()
    },
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth, 1)
        .toLocaleString('default', { month: 'long' })
    },
    calendarDays() {
      const days = []
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1)
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0)

      // Get the first day to display (might be from the previous month)
      const firstDayToDisplay = new Date(firstDayOfMonth)
      firstDayToDisplay.setDate(firstDayToDisplay.getDate() - firstDayOfMonth.getDay())

      // Get the last day to display (might be from the next month)
      const lastDayToDisplay = new Date(lastDayOfMonth)
      const daysToAdd = 6 - lastDayOfMonth.getDay()
      lastDayToDisplay.setDate(lastDayToDisplay.getDate() + daysToAdd)

      // Generate all days to display
      const currentDay = new Date(firstDayToDisplay)
      while (currentDay <= lastDayToDisplay) {
        const dateString = this.formatDate(currentDay)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        days.push({
          date: dateString,
          dayNumber: currentDay.getDate(),
          inMonth: currentDay.getMonth() === this.currentMonth,
          isToday: currentDay.getTime() === today.getTime(),
          available: this.isDateAvailable(dateString)
        })

        currentDay.setDate(currentDay.getDate() + 1)
      }

      return days
    }
  },
  methods: {
    prevMonth() {
      const newDate = new Date(this.currentDate)
      newDate.setMonth(newDate.getMonth() - 1)
      this.currentDate = newDate
    },
    nextMonth() {
      const newDate = new Date(this.currentDate)
      newDate.setMonth(newDate.getMonth() + 1)
      this.currentDate = newDate
    },
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    isSelected(dateString) {
      return this.selectedDate === dateString
    },
    selectDate(day) {
      if (day.inMonth && day.available) {
        this.$emit('date-selected', day.date)
      }
    },
    isDateAvailable(dateString) {
      // Check if date is in the past
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const checkDate = new Date(dateString)

      if (checkDate < today) {
        return false
      }

      // Check if date is a weekend (Saturday or Sunday)
      const dayOfWeek = new Date(dateString).getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return false
      }

      // Check if date is in the availability data
      if (this.doctorId && this.availableDates[this.doctorId]) {
        return this.availableDates[this.doctorId].includes(dateString)
      }

      // Default to available on weekdays
      return true
    },
    generateAvailabilityData() {
      // Generate mock availability data for the next 3 months
      const availableDates = {}

      // For each doctor
      for (let doctorId = 1; doctorId <= 4; doctorId++) {
        availableDates[doctorId] = []

        // Generate dates for the next 3 months
        const startDate = new Date()
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 3)

        const currentDate = new Date(startDate)
        while (currentDate <= endDate) {
          const dayOfWeek = currentDate.getDay()

          // Skip weekends
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // Each doctor has different availability patterns
            let isAvailable = false

            switch (doctorId) {
              case 1: // Dr. Sarah Johnson - available on Mon, Wed, Fri
                isAvailable = [1, 3, 5].includes(dayOfWeek)
                break
              case 2: // Dr. Michael Chen - available on Tue, Thu
                isAvailable = [2, 4].includes(dayOfWeek)
                break
              case 3: // Dr. Emily Rodriguez - available on Mon, Tue, Wed
                isAvailable = [1, 2, 3].includes(dayOfWeek)
                break
              case 4: // Dr. David Osei - available on Wed, Thu, Fri
                isAvailable = [3, 4, 5].includes(dayOfWeek)
                break
            }

            // Add some randomness to availability (80% chance of being available on their days)
            if (isAvailable && Math.random() < 0.8) {
              availableDates[doctorId].push(this.formatDate(currentDate))
            }
          }

          currentDate.setDate(currentDate.getDate() + 1)
        }
      }

      this.availableDates = availableDates
    }
  },
  created() {
    this.generateAvailabilityData()
  },
  watch: {
    doctorId() {
      // When doctor changes, emit null to clear the selected date
      this.$emit('date-selected', null)
    }
  }
}
</script>

<style scoped>
.calendar-picker {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
  overflow-x: hidden; /* Prevent horizontal scrolling on mobile */
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.calendar-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.calendar-header button {
  min-width: 40px; /* Ensure buttons are easy to tap on mobile */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
  padding: 5px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  /* Make touch targets larger on mobile */
  min-width: 40px;
  touch-action: manipulation; /* Improve touch behavior */
}

.calendar-day:hover:not(.empty):not(.unavailable) {
  background-color: #f0f7ff;
}

.day-number {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.empty {
  opacity: 0.3;
  cursor: default;
}

.today {
  background-color: #f8f9fa;
  font-weight: 700;
}

.selected {
  background-color: #007bff;
}

.selected .day-number {
  color: #fff;
}

.available {
  background-color: #f0f7ff;
  border: 1px solid #e6f2ff;
}

.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f8f9fa;
}

.availability-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 0.6rem;
  color: #28a745;
}

/* Mobile Optimizations */
@media (max-width: 576px) {
  .calendar-picker {
    padding: 15px 10px;
  }

  .calendar-header h3 {
    font-size: 1rem;
  }

  .weekday {
    font-size: 0.8rem;
    padding: 3px;
  }

  .calendar-day {
    height: 35px;
    min-width: 35px;
  }

  .day-number {
    font-size: 0.8rem;
  }

  /* Adjust spacing for better touch targets */
  .calendar-days {
    gap: 3px;
  }

  .calendar-weekdays {
    gap: 3px;
  }
}
</style>
