const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_STRING
  );
}

module.exports = { connectDB};