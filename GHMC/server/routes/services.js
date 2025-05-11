const express = require('express');
const {
  getServices,
  getService,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  getServicesByCategory,
  addDoctorToService,
  removeDoctorFromService
} = require('../controllers/services');

const Service = require('../models/Service');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Special routes
router.get('/slug/:slug', getServiceBySlug);
router.get('/category/:category', getServicesByCategory);

// Doctor routes
router
  .route('/:id/doctors')
  .put(protect, authorize('admin'), addDoctorToService);

router
  .route('/:id/doctors/:doctorId')
  .delete(protect, authorize('admin'), removeDoctorFromService);

// Standard routes
router
  .route('/')
  .get(advancedResults(Service, 'doctors'), getServices)
  .post(protect, authorize('admin'), createService);

router
  .route('/:id')
  .get(getService)
  .put(protect, authorize('admin'), updateService)
  .delete(protect, authorize('admin'), deleteService);

module.exports = router;
