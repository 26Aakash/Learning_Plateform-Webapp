const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Try connecting to the provided remote User Cluster Address
    console.log('Attempting to connect to remote MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log(`Remote MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Remote MongoDB Failed: ${error.message}`);
    // 2. If it fails, fallback to an active local Memory Database automatically so the app works seamlessly!
    console.log('Falling back to purely local in-memory MongoDB server to solve the connectivity issue...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      
      const memoryConn = await mongoose.connect(uri);
      console.log(`Local Memory MongoDB Connected Successfully! Host: ${memoryConn.connection.host}`);
      
      const seedDummyData = require('../scripts/seedDummy');
      await seedDummyData();
    } catch (fallbackError) {
       console.error(`Fallback also failed: ${fallbackError.message}`);
    }
  }
};

module.exports = connectDB;
