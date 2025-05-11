const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'general',
      'cardiology',
      'neurology',
      'orthopedics',
      'pediatrics',
      'gynecology',
      'dermatology',
      'ophthalmology',
      'dentistry',
      'psychiatry',
      'other'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  duration: {
    type: Number,
    required: [true, 'Please add a duration'],
    default: 30 // Duration in minutes
  },
  image: {
    type: String,
    default: 'default-service.jpg'
  },
  features: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create service slug from the name
ServiceSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);
