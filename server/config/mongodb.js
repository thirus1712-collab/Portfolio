const mongoose = require('mongoose');

let isMongoConnected = false;

async function initializeMongoDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[MongoDB] No MONGODB_URI configured. Operating in dynamic seed/fallback mode.');
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('[MongoDB] Connected successfully to MongoDB.');
    isMongoConnected = true;
    return true;
  } catch (err) {
    console.warn('[MongoDB] MongoDB connection failed:', err.message);
    console.log('[MongoDB] Using high-fidelity seed data fallback.');
    isMongoConnected = false;
    return false;
  }
}

function getMongoStatus() {
  return {
    connected: isMongoConnected,
    readyState: mongoose.connection.readyState,
  };
}

module.exports = {
  initializeMongoDB,
  getMongoStatus,
};
