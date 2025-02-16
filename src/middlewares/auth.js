const userAuth = (req, res, next) => {
  try{
    let user = "www";

    if(user == "www"){
      next();
    }else{
      throw new Error("User not found");
    }
  } catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
}

const adminAuth = (req, res, next) => {
  try{
    let admin = "xyz";

    if(admin == "xyz"){
      next();
    }else{
      throw new Error("Admin not found");
    }
  } catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
}



module.exports = {
  adminAuth,
  userAuth
}