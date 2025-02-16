const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const User = require('./models/user');

require("dotenv").config();

const app = express();

app.post('/users', async (req, res) =>{
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password'
  });

  try{
    await user.save();
    res.send("User saved successfully");
  }catch(err){
    res.status(400).send("User Is Not Saved!!"+ err.message);
    
  }
})

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });