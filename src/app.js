const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const User = require('./models/user');

require("dotenv").config();

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) =>{
  const { firstName, lastName, email, password, about, skills, gender, age, photoUrl } = req.body;
  const user = new User({ firstName, lastName, email, password, about, skills, gender, age, photoUrl });
  res.setHeader('Content-Type', 'application/json');

  
  try{
    if(req.body.skills.length > 10){
      throw new Error("Skills must be at most 10.");
    }
    await user.save();
    res.send("User saved successfully");
  }catch(err){
    res.status(400).send("Error: "+ err);
    
  }
})

app.get('/users', async (req, res) =>{

  const email = req.query.email;

  let users = await User.find({ email: email });

  if(users.length == 0){
    users = await User.find({});
  }

  try{
    res.send(users);
  }catch(err){
    res.status(400).send("Something Went Wrong."+ err.message);
    
  }
})

app.patch('/user/:email', async (req, res) =>{

  const email = req.params?.email;

  if(req.body.skills.length > 10){
    throw new Error("Skills must be at most 10.");
  }

  const userData = req.body;

  let user = await User.findOneAndUpdate({ email: email }, userData, {returnDocument: after, runValidators: true});

  try{
    res.send(user);
  }catch(err){
    res.status(400).send("Something Went Wrong."+ err.message);
    
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