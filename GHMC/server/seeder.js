const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');
const HealthTip = require('./models/HealthTip');
const MedicalRecord = require('./models/MedicalRecord');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const doctors = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/doctors.json`, 'utf-8')
);

const services = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/services.json`, 'utf-8')
);

const healthTips = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/healthTips.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Doctor.create(doctors);
    await Service.create(services);
    await HealthTip.create(healthTips);
    
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Doctor.deleteMany();
    await Service.deleteMany();
    await Appointment.deleteMany();
    await HealthTip.deleteMany();
    await MedicalRecord.deleteMany();
    
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please add proper flag: -i (import) or -d (delete)');
  process.exit(1);
}
