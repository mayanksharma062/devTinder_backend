const validator = require('validator');

const signupValidator = (req) => {
  const { firstName, email, password, skills} = req.body;
  if(!firstName || firstName.length < 4 || firstName.length > 50){
    throw new Error("First Name Should Have 4-50 Characters");
  }
  else if(!validator.isEmail(email)){
    throw new Error("Email Is Not Valid");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Enter Strong Password");
  }
  else if(!skills.length > 10){
    throw new Error("Skills must be at most 10.");
  }
}

module.exports = {
  signupValidator
}