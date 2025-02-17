const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type: String,
    minLength: 4,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Enter Correct Email!")
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error('Password is not strong!');
      }
    }
  },
  age: {
    type: Number
  }, 
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not a valid gender type`,
    },
  },
  photoUrl: {
    type: String,
    default: "https://geographyandyou.com/images/user-profile.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid Photo URL: " + value);
      }
    },
  },
  about: {
    type: String,
    default: "this is default about.",
  },
  skills: {
    type: [String],
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;