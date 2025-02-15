const express = require('express');

const app = express();

app.use("/", (req, res)=>{
  res.send("This is Home Page!");
})

app.listen(7777, ()=>{
  console.log("Server is successfully listening on port 7777..");
})