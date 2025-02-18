const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
  console.log("DB Is Getting Connected..........Please Wait!!!!!")
  await mongoose.connect(
    process.env.DB_CONNECTION_STRING
  );
}

module.exports = { connectDB};