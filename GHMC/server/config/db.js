const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Construct MongoDB URI from environment variables if not directly provided
    let mongoURI = process.env.MONGODB_URI;

    // If the URI contains placeholders, replace them with actual values
    if (mongoURI.includes('${MONGODB_USERNAME}') || mongoURI.includes('${MONGODB_PASSWORD}')) {
      mongoURI = mongoURI
        .replace('${MONGODB_USERNAME}', process.env.MONGODB_USERNAME)
        .replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD);
    }

    const conn = await mongoose.connect(mongoURI, {
      // These options are no longer needed in newer versions of Mongoose
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Continuing without database connection for demo purposes');
    // Don't exit the process for the demo
    // process.exit(1);
  }
};

module.exports = connectDB;
