const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id).populate({
    path: 'user',
    select: 'name email phone profileImage'
  });

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Create new doctor profile
// @route   POST /api/doctors
// @access  Private/Admin
exports.createDoctor = asyncHandler(async (req, res, next) => {
  // Check if user exists
  const user = await User.findById(req.body.user);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.body.user}`, 404)
    );
  }

  // Check if user is already a doctor
  const existingDoctor = await Doctor.findOne({ user: req.body.user });

  if (existingDoctor) {
    return next(
      new ErrorResponse(`User already has a doctor profile`, 400)
    );
  }

  // Update user role to doctor
  user.role = 'doctor';
  await user.save();

  // Create doctor profile
  const doctor = await Doctor.create(req.body);

  res.status(201).json({
    success: true,
    data: doctor
  });
});

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private/Admin or Doctor
exports.updateDoctor = asyncHandler(async (req, res, next) => {
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is doctor owner or admin
  if (
    doctor.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this doctor profile`,
        401
      )
    );
  }

  doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Delete doctor profile
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this doctor profile`,
        401
      )
    );
  }

  // Update user role back to patient
  const user = await User.findById(doctor.user);
  if (user) {
    user.role = 'patient';
    await user.save();
  }

  await doctor.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add doctor review
// @route   POST /api/doctors/:id/reviews
// @access  Private/Patient
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.doctor = req.params.id;

  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user has already reviewed this doctor
  const alreadyReviewed = doctor.reviews.find(
    review => review.user.toString() === req.user.id
  );

  if (alreadyReviewed) {
    return next(
      new ErrorResponse(`You have already reviewed this doctor`, 400)
    );
  }

  // Add review
  doctor.reviews.push(req.body);

  // Update rating
  doctor.rating = doctor.getAverageRating();

  await doctor.save();

  res.status(201).json({
    success: true,
    data: doctor
  });
});

// @desc    Update doctor review
// @route   PUT /api/doctors/:id/reviews/:reviewId
// @access  Private/Patient
exports.updateReview = asyncHandler(async (req, res, next) => {
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Find review
  let review = doctor.reviews.id(req.params.reviewId);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.params.reviewId}`, 404)
    );
  }

  // Make sure review belongs to user
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this review`,
        401
      )
    );
  }

  // Update review
  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;
  review.date = Date.now();

  // Update rating
  doctor.rating = doctor.getAverageRating();

  await doctor.save();

  res.status(200).json({
    success: true,
    data: doctor
  });
});
