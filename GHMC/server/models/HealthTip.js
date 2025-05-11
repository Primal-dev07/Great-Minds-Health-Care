const mongoose = require('mongoose');
const slugify = require('slugify');

const HealthTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: String,
  summary: {
    type: String,
    required: [true, 'Please add a summary'],
    maxlength: [200, 'Summary cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'nutrition',
      'fitness',
      'mental-health',
      'preventive-care',
      'chronic-disease',
      'women-health',
      'men-health',
      'children-health',
      'senior-health',
      'covid-19',
      'other'
    ]
  },
  image: {
    type: String,
    default: 'default-health-tip.jpg'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String
  }],
  relatedServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  relatedTips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthTip'
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create health tip slug from the title
HealthTipSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  
  // Update the updatedAt field on save
  this.updatedAt = Date.now();
  
  next();
});

module.exports = mongoose.model('HealthTip', HealthTipSchema);
