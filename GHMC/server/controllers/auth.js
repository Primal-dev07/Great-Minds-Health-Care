const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // For demo purposes, return a mock response
  console.log('Registration attempt:', { name, email, role });

  // Create a mock user object
  const mockUser = {
    _id: 'demo123456789',
    name,
    email,
    role: role || 'patient',
    isEmailVerified: false
  };

  // Create a mock verification URL
  const verificationUrl = `${req.protocol}://${req.get('host')}/email-verification?token=demo-verification-token`;

  console.log('Mock verification URL:', verificationUrl);

  // Return a success response with a token
  const token = 'demo-jwt-token-for-testing-purposes-only';

  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const emailVerificationToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set email as verified
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  console.log('Login attempt:', { email });

  // For demo purposes, return a mock response
  // Create a mock user object
  const mockUser = {
    _id: 'demo123456789',
    name: 'Demo User',
    email,
    role: email.includes('admin') ? 'admin' : email.includes('doctor') ? 'doctor' : 'patient',
    isEmailVerified: true
  };

  console.log('Mock user created:', mockUser);

  // Return a success response with a token
  const token = 'demo-jwt-token-for-testing-purposes-only';

  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // For demo purposes, return a mock user
  const mockUser = {
    _id: 'demo123456789',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'patient',
    isEmailVerified: true,
    phone: '+1234567890',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'State',
      zipCode: '12345',
      country: 'Country'
    },
    dateOfBirth: '1990-01-01',
    gender: 'male',
    profileImage: 'default-profile.jpg',
    createdAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    data: mockUser
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(
    key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url for frontend
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  ).replace('5000', '5173')}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the link to reset your password: \n\n ${resetUrl}`;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(120deg, #007bff, #170752); padding: 20px; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; text-align: center;">Password Reset</h1>
      </div>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
        <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.5;">You are receiving this email because you (or someone else) has requested to reset your password for your Great Minds Healthcare Center account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: linear-gradient(120deg, #007bff, #170752); color: white; padding: 12px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 16px; line-height: 1.5;">If the button doesn't work, you can also click on the link below or copy and paste it into your browser:</p>
        <p style="font-size: 14px; line-height: 1.5; word-break: break-all;"><a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a></p>
        <p style="font-size: 16px; line-height: 1.5;">This link will expire in 10 minutes.</p>
        <p style="font-size: 16px; line-height: 1.5;">If you did not request a password reset, please ignore this email and your password will remain unchanged.</p>
        <p style="font-size: 16px; line-height: 1.5; margin-top: 30px;">Best regards,<br>The Great Minds Healthcare Team</p>
      </div>
    </div>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset - Great Minds Healthcare Center',
      message,
      html
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};
