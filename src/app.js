const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const User = require('./models/user');
const { signupValidator } = require('./utils/validator');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) =>{
  try{
    const { firstName, lastName, email, password, about, skills, gender, age, photoUrl } = req.body;

    signupValidator(req);

    let passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, password: passwordHash, about, skills, gender, age, photoUrl });  
    await user.save();
    res.send("User saved successfully");
  }catch(err){
    res.status(400).send("Error: "+ err.message);
    
  }
})

app.post('/login', async (req, res) =>{
  try{

    const { email, password } = req.body;

    if(!validator.isEmail(email)){
      throw new Error("Invalid Credentials");
    }

    let user = await User.findOne({ email: email});

    if(!user){
      throw new Error("Invalid Credentials");
    }

    let isPasswordMatched = await bcrypt.compare(password, user.password);

    if(isPasswordMatched){
      var token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      res.cookie('token',token, { maxAge: 900000, httpOnly: true })
      res.send("Sign in successfully");
    }else{
      throw new Error("Invalid Credentials");
    }

  }catch(err){
    res.status(400).send("Login Failed Due To: "+ err.message);
  }

})

app.get('/feed', async (req, res) =>{

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

app.get('/profile', async (req, res) =>{
  try{
    const cookies = req.cookies;
    const token = jwt.verify(cookies.token, process.env.SECRET_KEY)


    let user = await User.findOne({_id: token._id});
  
    if(!user){
      throw new Error("User Not Found!!!!");
    }
    res.send(user);
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
    console.error("Database connection failed due to error: " + err.message);
  });