const jwt = require("jsonwebtoken");

const generateToken = (id,username,role) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({id,username,role}, secretKey, { expiresIn: "6h" });
  return token; 
};


module.exports=generateToken; 