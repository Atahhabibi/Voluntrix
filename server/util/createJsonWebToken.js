const jwt = require("jsonwebtoken");

const generateToken = (id,username) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({id,username}, secretKey, { expiresIn: "6h" });
  return token; 
};


module.exports=generateToken; 