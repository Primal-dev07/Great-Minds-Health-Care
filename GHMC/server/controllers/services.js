const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id).populate({
    path: 'doctors',
    select: 'specialization consultationFee rating',
    populate: {
      path: 'user',
      select: 'name profileImage'
    }
  });

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Get service by slug
// @route   GET /api/services/slug/:slug
// @access  Public
exports.getServiceBySlug = asyncHandler(async (req, res, next) => {
  const service = await Service.findOne({ slug: req.params.slug }).populate({
    path: 'doctors',
    select: 'specialization consultationFee rating',
    populate: {
      path: 'user',
      select: 'name profileImage'
    }
  });

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with slug of ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = asyncHandler(async (req, res, next) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
  }

  await service.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
exports.getServicesByCategory = asyncHandler(async (req, res, next) => {
  const services = await Service.find({ 
    category: req.params.category,
    isAvailable: true
  });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Add doctor to service
// @route   PUT /api/services/:id/doctors
// @access  Private/Admin
exports.addDoctorToService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if doctor already exists in service
  if (service.doctors.includes(req.body.doctorId)) {
    return next(
      new ErrorResponse(`Doctor already added to this service`, 400)
    );
  }

  // Add doctor to service
  service.doctors.push(req.body.doctorId);
  await service.save();

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Remove doctor from service
// @route   DELETE /api/services/:id/doctors/:doctorId
// @access  Private/Admin
exports.removeDoctorFromService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if doctor exists in service
  if (!service.doctors.includes(req.params.doctorId)) {
    return next(
      new ErrorResponse(`Doctor not found in this service`, 404)
    );
  }

  // Remove doctor from service
  service.doctors = service.doctors.filter(
    doctor => doctor.toString() !== req.params.doctorId
  );
  
  await service.save();

  res.status(200).json({
    success: true,
    data: service
  });
});
