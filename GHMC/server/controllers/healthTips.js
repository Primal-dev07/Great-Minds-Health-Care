const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const HealthTip = require('../models/HealthTip');

// @desc    Get all health tips
// @route   GET /api/health-tips
// @access  Public
exports.getHealthTips = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single health tip
// @route   GET /api/health-tips/:id
// @access  Public
exports.getHealthTip = asyncHandler(async (req, res, next) => {
  const healthTip = await HealthTip.findById(req.params.id)
    .populate({
      path: 'author',
      select: 'name profileImage'
    })
    .populate({
      path: 'relatedServices',
      select: 'name slug description'
    })
    .populate({
      path: 'relatedTips',
      select: 'title slug summary image'
    });

  if (!healthTip) {
    return next(
      new ErrorResponse(`Health tip not found with id of ${req.params.id}`, 404)
    );
  }

  // Increment view count
  healthTip.views += 1;
  await healthTip.save();

  res.status(200).json({
    success: true,
    data: healthTip
  });
});

// @desc    Get health tip by slug
// @route   GET /api/health-tips/slug/:slug
// @access  Public
exports.getHealthTipBySlug = asyncHandler(async (req, res, next) => {
  const healthTip = await HealthTip.findOne({ slug: req.params.slug })
    .populate({
      path: 'author',
      select: 'name profileImage'
    })
    .populate({
      path: 'relatedServices',
      select: 'name slug description'
    })
    .populate({
      path: 'relatedTips',
      select: 'title slug summary image'
    });

  if (!healthTip) {
    return next(
      new ErrorResponse(`Health tip not found with slug of ${req.params.slug}`, 404)
    );
  }

  // Increment view count
  healthTip.views += 1;
  await healthTip.save();

  res.status(200).json({
    success: true,
    data: healthTip
  });
});

// @desc    Create new health tip
// @route   POST /api/health-tips
// @access  Private/Admin or Doctor
exports.createHealthTip = asyncHandler(async (req, res, next) => {
  // Add author to req.body
  req.body.author = req.user.id;

  const healthTip = await HealthTip.create(req.body);

  res.status(201).json({
    success: true,
    data: healthTip
  });
});

// @desc    Update health tip
// @route   PUT /api/health-tips/:id
// @access  Private/Admin or Doctor
exports.updateHealthTip = asyncHandler(async (req, res, next) => {
  let healthTip = await HealthTip.findById(req.params.id);

  if (!healthTip) {
    return next(
      new ErrorResponse(`Health tip not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is health tip author or admin
  if (
    healthTip.author.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this health tip`,
        401
      )
    );
  }

  healthTip = await HealthTip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: healthTip
  });
});

// @desc    Delete health tip
// @route   DELETE /api/health-tips/:id
// @access  Private/Admin or Doctor
exports.deleteHealthTip = asyncHandler(async (req, res, next) => {
  const healthTip = await HealthTip.findById(req.params.id);

  if (!healthTip) {
    return next(
      new ErrorResponse(`Health tip not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is health tip author or admin
  if (
    healthTip.author.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this health tip`,
        401
      )
    );
  }

  await healthTip.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get health tips by category
// @route   GET /api/health-tips/category/:category
// @access  Public
exports.getHealthTipsByCategory = asyncHandler(async (req, res, next) => {
  const healthTips = await HealthTip.find({ 
    category: req.params.category,
    isPublished: true
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: healthTips.length,
    data: healthTips
  });
});

// @desc    Like health tip
// @route   PUT /api/health-tips/:id/like
// @access  Private
exports.likeHealthTip = asyncHandler(async (req, res, next) => {
  const healthTip = await HealthTip.findById(req.params.id);

  if (!healthTip) {
    return next(
      new ErrorResponse(`Health tip not found with id of ${req.params.id}`, 404)
    );
  }

  // Increment like count
  healthTip.likes += 1;
  await healthTip.save();

  res.status(200).json({
    success: true,
    data: healthTip
  });
});

// @desc    Add comment to health tip
// @route   POST /api/health-tips/:id/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const healthTip = await HealthTip.findById(req.params.id);

  if (!healthTip) {
    return next(
      new ErrorResponse(`Health tip not found with id of ${req.params.id}`, 404)
    );
  }

  // Add user to req.body
  req.body.user = req.user.id;

  // Add comment
  healthTip.comments.push(req.body);
  await healthTip.save();

  res.status(201).json({
    success: true,
    data: healthTip
  });
});

// @desc    Remove comment from health tip
// @route   DELETE /api/health-tips/:id/comments/:commentId
// @access  Private
exports.removeComment = asyncHandler(async (req, res, next) => {
  const healthTip = await HealthTip.findById(req.params.id);

  if (!healthTip) {
    return next(
      new ErrorResponse(`Health tip not found with id of ${req.params.id}`, 404)
    );
  }

  // Find comment
  const comment = healthTip.comments.id(req.params.commentId);

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id of ${req.params.commentId}`, 404)
    );
  }

  // Make sure user is comment owner or admin
  if (
    comment.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this comment`,
        401
      )
    );
  }

  // Remove comment
  comment.remove();
  await healthTip.save();

  res.status(200).json({
    success: true,
    data: healthTip
  });
});
