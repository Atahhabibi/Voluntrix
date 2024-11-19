const extractToken = require("../util/extractToken");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = extractToken(req.headers["authorization"]);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming the token contains 'id' (lowercase)
    req.userId = decode.id;

    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
