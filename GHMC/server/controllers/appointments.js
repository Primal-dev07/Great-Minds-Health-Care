const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
exports.getAppointments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get appointments for patient
// @route   GET /api/appointments/patient
// @access  Private/Patient
exports.getPatientAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find({ patient: req.user.id })
    .populate({
      path: 'doctor',
      select: 'specialization consultationFee',
      populate: {
        path: 'user',
        select: 'name email profileImage'
      }
    })
    .populate({
      path: 'service',
      select: 'name description price duration'
    })
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get appointments for doctor
// @route   GET /api/appointments/doctor
// @access  Private/Doctor
exports.getDoctorAppointments = asyncHandler(async (req, res, next) => {
  // Get doctor profile for the logged in user
  const doctorProfile = await Doctor.findOne({ user: req.user.id });

  if (!doctorProfile) {
    return next(
      new ErrorResponse(`No doctor profile found for user ${req.user.id}`, 404)
    );
  }

  const appointments = await Appointment.find({ doctor: doctorProfile._id })
    .populate({
      path: 'patient',
      select: 'name email phone profileImage'
    })
    .populate({
      path: 'service',
      select: 'name description price duration'
    })
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate({
      path: 'doctor',
      select: 'specialization consultationFee',
      populate: {
        path: 'user',
        select: 'name email profileImage'
      }
    })
    .populate({
      path: 'patient',
      select: 'name email phone profileImage'
    })
    .populate({
      path: 'service',
      select: 'name description price duration'
    });

  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is appointment owner, the doctor, or an admin
  const doctorProfile = await Doctor.findOne({ user: req.user.id });
  const isDoctorOfAppointment = doctorProfile && 
    doctorProfile._id.toString() === appointment.doctor._id.toString();

  if (
    appointment.patient._id.toString() !== req.user.id &&
    !isDoctorOfAppointment &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this appointment`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private/Patient
exports.createAppointment = asyncHandler(async (req, res, next) => {
  // Add patient to req.body
  req.body.patient = req.user.id;

  // Check if doctor exists
  const doctor = await Doctor.findById(req.body.doctor);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.body.doctor}`, 404)
    );
  }

  // Check doctor availability
  const { date, time } = req.body;
  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'lowercase' });

  // Check if doctor works on this day
  const dayAvailability = doctor.availability.find(
    day => day.day === dayOfWeek && day.isAvailable
  );

  if (!dayAvailability) {
    return next(
      new ErrorResponse(`Doctor is not available on ${dayOfWeek}`, 400)
    );
  }

  // Check if time is within doctor's working hours
  const appointmentTime = time.split(':');
  const appointmentHour = parseInt(appointmentTime[0]);
  const appointmentMinute = parseInt(appointmentTime[1]);

  const startTime = dayAvailability.startTime.split(':');
  const startHour = parseInt(startTime[0]);
  const startMinute = parseInt(startTime[1]);

  const endTime = dayAvailability.endTime.split(':');
  const endHour = parseInt(endTime[0]);
  const endMinute = parseInt(endTime[1]);

  const isTimeInRange =
    (appointmentHour > startHour || 
      (appointmentHour === startHour && appointmentMinute >= startMinute)) &&
    (appointmentHour < endHour || 
      (appointmentHour === endHour && appointmentMinute <= endMinute));

  if (!isTimeInRange) {
    return next(
      new ErrorResponse(
        `Appointment time is outside doctor's working hours (${dayAvailability.startTime} - ${dayAvailability.endTime})`,
        400
      )
    );
  }

  // Check if doctor already has an appointment at this time
  const existingAppointment = await Appointment.findOne({
    doctor: req.body.doctor,
    date: appointmentDate,
    time: req.body.time,
    status: { $in: ['scheduled', 'confirmed'] }
  });

  if (existingAppointment) {
    return next(
      new ErrorResponse(`Doctor already has an appointment at this time`, 400)
    );
  }

  // Create appointment
  const appointment = await Appointment.create(req.body);

  // Send email notification to doctor
  const doctorUser = await User.findById(doctor.user);
  
  if (doctorUser && doctorUser.email) {
    const patientUser = await User.findById(req.user.id);
    
    const message = `You have a new appointment request from ${patientUser.name} on ${new Date(date).toLocaleDateString()} at ${time}. Please log in to your account to confirm or reschedule.`;
    
    try {
      await sendEmail({
        email: doctorUser.email,
        subject: 'New Appointment Request',
        message
      });
    } catch (err) {
      console.log('Email could not be sent', err);
    }
  }

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user is the patient, the doctor, or an admin
  const doctorProfile = await Doctor.findOne({ user: req.user.id });
  const isDoctorOfAppointment = doctorProfile && 
    doctorProfile._id.toString() === appointment.doctor.toString();

  if (
    appointment.patient.toString() !== req.user.id &&
    !isDoctorOfAppointment &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this appointment`,
        401
      )
    );
  }

  // If status is being updated to 'confirmed' or 'cancelled', send notification
  if (
    req.body.status &&
    (req.body.status === 'confirmed' || req.body.status === 'cancelled') &&
    appointment.status !== req.body.status
  ) {
    // Get patient and doctor details
    const patient = await User.findById(appointment.patient);
    const doctor = await Doctor.findById(appointment.doctor);
    const doctorUser = await User.findById(doctor.user);

    // Determine who made the change
    const changedBy = isDoctorOfAppointment ? 'doctor' : 'patient';

    // Send email to the other party
    if (changedBy === 'doctor' && patient.email) {
      const message = `Your appointment with Dr. ${doctorUser.name} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time} has been ${req.body.status}.`;
      
      try {
        await sendEmail({
          email: patient.email,
          subject: `Appointment ${req.body.status.charAt(0).toUpperCase() + req.body.status.slice(1)}`,
          message
        });
      } catch (err) {
        console.log('Email could not be sent', err);
      }
    } else if (changedBy === 'patient' && doctorUser.email) {
      const message = `The appointment with ${patient.name} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time} has been ${req.body.status} by the patient.`;
      
      try {
        await sendEmail({
          email: doctorUser.email,
          subject: `Appointment ${req.body.status.charAt(0).toUpperCase() + req.body.status.slice(1)}`,
          message
        });
      } catch (err) {
        console.log('Email could not be sent', err);
      }
    }
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user is the patient, the doctor, or an admin
  const doctorProfile = await Doctor.findOne({ user: req.user.id });
  const isDoctorOfAppointment = doctorProfile && 
    doctorProfile._id.toString() === appointment.doctor.toString();

  if (
    appointment.patient.toString() !== req.user.id &&
    !isDoctorOfAppointment &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this appointment`,
        401
      )
    );
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
