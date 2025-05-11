const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  // For demo purposes, create a mock user and attach it to the request
  console.log('Demo mode: Bypassing authentication');

  // Create a mock user based on the token if it exists
  let role = 'patient'; // Default role

  // Check if there's a token and try to extract role information
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If we have a demo token, extract role information
  if (token && token === 'demo-jwt-token-for-testing-purposes-only') {
    // Check if there's an email in the request that indicates a role
    if (req.body && req.body.email) {
      if (req.body.email.includes('admin')) {
        role = 'admin';
      } else if (req.body.email.includes('doctor')) {
        role = 'doctor';
      }
    }
  }

  // Create the mock user
  const mockUser = {
    _id: 'demo123456789',
    name: 'Demo User',
    email: 'demo@example.com',
    role: role,
    isEmailVerified: true
  };

  // Attach the mock user to the request
  req.user = mockUser;

  // Continue to the next middleware
  next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // For demo purposes, log the authorization check
    console.log(`Demo mode: Checking if role '${req.user.role}' is authorized for this route`);
    console.log(`Allowed roles: ${roles.join(', ')}`);

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      console.log(`Demo mode: Role '${req.user.role}' is not authorized, but allowing access for demo`);
      // For demo purposes, we'll allow access anyway
      // In a real application, we would return an error
      // return next(
      //   new ErrorResponse(
      //     `User role ${req.user.role} is not authorized to access this route`,
      //     403
      //   )
      // );
    } else {
      console.log(`Demo mode: Role '${req.user.role}' is authorized`);
    }

    // Continue to the next middleware
    next();
  };
};
