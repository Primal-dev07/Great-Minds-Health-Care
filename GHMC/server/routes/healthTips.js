const express = require('express');
const {
  getHealthTips,
  getHealthTip,
  getHealthTipBySlug,
  createHealthTip,
  updateHealthTip,
  deleteHealthTip,
  getHealthTipsByCategory,
  likeHealthTip,
  addComment,
  removeComment
} = require('../controllers/healthTips');

const HealthTip = require('../models/HealthTip');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Special routes
router.get('/slug/:slug', getHealthTipBySlug);
router.get('/category/:category', getHealthTipsByCategory);

// Like route
router.put('/:id/like', protect, likeHealthTip);

// Comment routes
router
  .route('/:id/comments')
  .post(protect, addComment);

router
  .route('/:id/comments/:commentId')
  .delete(protect, removeComment);

// Standard routes
router
  .route('/')
  .get(
    advancedResults(
      HealthTip,
      { path: 'author', select: 'name profileImage' }
    ),
    getHealthTips
  )
  .post(
    protect,
    authorize('admin', 'doctor'),
    createHealthTip
  );

router
  .route('/:id')
  .get(getHealthTip)
  .put(protect, authorize('admin', 'doctor'), updateHealthTip)
  .delete(protect, authorize('admin', 'doctor'), deleteHealthTip);

module.exports = router;
