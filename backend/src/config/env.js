module.exports = {
    appUrl: process.env.APP_URL || 'http://localhost:7777',
  mongoUri:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/aircnc",
};
