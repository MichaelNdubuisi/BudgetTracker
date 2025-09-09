const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
// Lock file deleted, restart triggered

const connectDB = async () => {
  try {
    let mongoUri;

    if (process.env.MONGO_URI && process.env.MONGO_URI !== 'memory') {
      // Use the provided MONGO_URI
      mongoUri = process.env.MONGO_URI;
      console.log('Using provided MongoDB URI');
    } else if (process.env.NODE_ENV === 'test') {
      // Use in-memory MongoDB for testing
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('Using in-memory MongoDB for testing');
    } else {
      // Use in-memory MongoDB for development
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('Using in-memory MongoDB for development');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
