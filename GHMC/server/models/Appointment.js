const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  date: {
    type: Date,
    required: [true, 'Please add an appointment date']
  },
  time: {
    type: String,
    required: [true, 'Please add an appointment time']
  },
  duration: {
    type: Number,
    default: 30, // Duration in minutes
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['in-person', 'telemedicine'],
    default: 'in-person'
  },
  reason: {
    type: String,
    required: [true, 'Please add a reason for the appointment'],
    maxlength: [200, 'Reason cannot be more than 200 characters']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  symptoms: [{
    type: String
  }],
  medicalHistory: {
    type: String
  },
  medications: [{
    type: String
  }],
  allergies: [{
    type: String
  }],
  payment: {
    amount: {
      type: Number
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'refunded'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['cash', 'card', 'insurance', 'other']
    },
    transactionId: {
      type: String
    },
    date: {
      type: Date
    }
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms'],
      required: true
    },
    sentAt: {
      type: Date
    },
    status: {
      type: String,
      enum: ['scheduled', 'sent', 'failed'],
      default: 'scheduled'
    }
  }],
  followUp: {
    required: {
      type: Boolean,
      default: false
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for efficient querying
AppointmentSchema.index({ patient: 1, date: 1 });
AppointmentSchema.index({ doctor: 1, date: 1 });
AppointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);
