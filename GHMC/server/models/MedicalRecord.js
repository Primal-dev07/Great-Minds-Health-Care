const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
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
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  diagnosis: {
    type: String,
    required: [true, 'Please add a diagnosis']
  },
  symptoms: [{
    type: String
  }],
  vitalSigns: {
    temperature: {
      type: Number
    },
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    heartRate: {
      type: Number
    },
    respiratoryRate: {
      type: Number
    },
    oxygenSaturation: {
      type: Number
    },
    height: {
      type: Number
    },
    weight: {
      type: Number
    },
    bmi: {
      type: Number
    }
  },
  treatment: {
    type: String,
    required: [true, 'Please add a treatment plan']
  },
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
    },
    duration: {
      type: String
    },
    instructions: {
      type: String
    }
  }],
  labTests: [{
    name: {
      type: String,
      required: true
    },
    result: {
      type: String
    },
    date: {
      type: Date
    },
    notes: {
      type: String
    },
    fileUrl: {
      type: String
    }
  }],
  imaging: [{
    type: {
      type: String,
      required: true
    },
    result: {
      type: String
    },
    date: {
      type: Date
    },
    notes: {
      type: String
    },
    fileUrl: {
      type: String
    }
  }],
  allergies: [{
    type: String
  }],
  notes: {
    type: String
  },
  followUp: {
    required: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date
    },
    reason: {
      type: String
    }
  },
  isPrivate: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
MedicalRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create index for efficient querying
MedicalRecordSchema.index({ patient: 1, date: -1 });
MedicalRecordSchema.index({ doctor: 1, date: -1 });

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
