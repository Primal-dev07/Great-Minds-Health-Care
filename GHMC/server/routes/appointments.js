const express = require('express');
const {
  getAppointments,
  getPatientAppointments,
  getDoctorAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointments');

const Appointment = require('../models/Appointment');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

// Special routes
router.get('/patient', authorize('patient', 'admin'), getPatientAppointments);
router.get('/doctor', authorize('doctor', 'admin'), getDoctorAppointments);

// Standard routes
router
  .route('/')
  .get(
    authorize('admin'),
    advancedResults(
      Appointment,
      [
        { path: 'patient', select: 'name email phone' },
        { 
          path: 'doctor', 
          select: 'specialization consultationFee',
          populate: { path: 'user', select: 'name email' }
        },
        { path: 'service', select: 'name price duration' }
      ]
    ),
    getAppointments
  )
  .post(authorize('patient'), createAppointment);

router
  .route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
