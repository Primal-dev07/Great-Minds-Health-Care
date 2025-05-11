# Great Minds Healthcare Center (GHMC)

A comprehensive full-stack healthcare application that provides a platform for patients to book appointments, access medical services, view health tips, and communicate with healthcare providers.

## Features

### Patient Features
- User registration and profile management
- Appointment booking and management
- Access to medical records
- Health tips and articles
- Doctor search and filtering
- Service browsing and information

### Doctor Features
- Profile management
- Appointment scheduling and management
- Patient information access
- Medical record creation and updates
- Health tip publishing

### Admin Features
- User management
- Doctor verification
- Service management
- Content management
- Analytics and reporting

## Tech Stack

### Frontend
- Vue.js 3
- Bootstrap 5
- Font Awesome
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Project Structure

```
GHMC/
├── src/                # Frontend Vue.js application
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable Vue components
│   ├── views/          # Page components
│   ├── router/         # Vue Router configuration
│   ├── services/       # API services
│   └── utils/          # Utility functions
│
└── server/             # Backend Node.js/Express application
    ├── config/         # Configuration files
    ├── controllers/    # Route controllers
    ├── middleware/     # Custom middleware
    ├── models/         # Mongoose models
    ├── routes/         # Express routes
    ├── utils/          # Utility functions
    └── _data/          # Sample data for seeding
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```
   cd GHMC/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ghmc
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=noreply@ghmc.com
   ```

4. Seed the database with sample data:
   ```
   npm run data:import
   ```

5. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd GHMC
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resettoken` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### User Endpoints
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get single user (admin)
- `POST /api/users` - Create user (admin)
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get single doctor
- `POST /api/doctors` - Create doctor profile (admin)
- `PUT /api/doctors/:id` - Update doctor profile (admin/doctor)
- `DELETE /api/doctors/:id` - Delete doctor profile (admin)
- `POST /api/doctors/:id/reviews` - Add doctor review (patient)
- `PUT /api/doctors/:id/reviews/:reviewId` - Update doctor review (patient/admin)

### Appointment Endpoints
- `GET /api/appointments` - Get all appointments (admin)
- `GET /api/appointments/patient` - Get patient appointments (patient)
- `GET /api/appointments/doctor` - Get doctor appointments (doctor)
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create appointment (patient)
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Service Endpoints
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `GET /api/services/slug/:slug` - Get service by slug
- `GET /api/services/category/:category` - Get services by category
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)
- `PUT /api/services/:id/doctors` - Add doctor to service (admin)
- `DELETE /api/services/:id/doctors/:doctorId` - Remove doctor from service (admin)

### Health Tips Endpoints
- `GET /api/health-tips` - Get all health tips
- `GET /api/health-tips/:id` - Get single health tip
- `GET /api/health-tips/slug/:slug` - Get health tip by slug
- `GET /api/health-tips/category/:category` - Get health tips by category
- `POST /api/health-tips` - Create health tip (admin/doctor)
- `PUT /api/health-tips/:id` - Update health tip (admin/doctor)
- `DELETE /api/health-tips/:id` - Delete health tip (admin/doctor)
- `PUT /api/health-tips/:id/like` - Like health tip
- `POST /api/health-tips/:id/comments` - Add comment to health tip
- `DELETE /api/health-tips/:id/comments/:commentId` - Remove comment from health tip
