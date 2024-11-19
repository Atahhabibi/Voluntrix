const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../monogdb/modals/userSchema");

const router = express.Router();

router.post("/register", (req,res) => {
  res.status(200).send("<h1>WELOCME</h1>");
});


module.exports=router; 