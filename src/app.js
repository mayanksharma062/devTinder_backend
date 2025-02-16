const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const User = require('./models/user');

require("dotenv").config();

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) =>{
  const { firstName, lastName, email, password } = req.body;
  const user = new User({ firstName, lastName, email, password });

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