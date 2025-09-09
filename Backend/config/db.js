const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
// Lock file deleted, restart triggered

const connectDB = async () => {
  try {
    let mongoUri;

    if (process.env.NODE_ENV === 'test' || !process.env.MONGO_URI || process.env.MONGO_URI === 'memory' || process.env.MONGO_URI.includes('localhost') || process.env.MONGO_URI.includes('127.0.0.1')) {
      // Use in-memory MongoDB for testing, development, or if MONGO_URI points to localhost
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('Using in-memory MongoDB');
    } else {
      mongoUri = process.env.MONGO_URI;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
