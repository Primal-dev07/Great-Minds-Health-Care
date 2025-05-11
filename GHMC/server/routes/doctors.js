const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  addReview,
  updateReview
} = require('../controllers/doctors');

const Doctor = require('../models/Doctor');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Doctor, {
      path: 'user',
      select: 'name email phone profileImage'
    }),
    getDoctors
  )
  .post(protect, authorize('admin'), createDoctor);

router
  .route('/:id')
  .get(getDoctor)
  .put(protect, authorize('admin', 'doctor'), updateDoctor)
  .delete(protect, authorize('admin'), deleteDoctor);

router
  .route('/:id/reviews')
  .post(protect, authorize('patient'), addReview);

router
  .route('/:id/reviews/:reviewId')
  .put(protect, authorize('patient', 'admin'), updateReview);

module.exports = router;
