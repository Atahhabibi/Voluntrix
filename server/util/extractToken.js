const extractToken = (authorizationHeader) => {
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.split(" ")[1]; // Extract token after 'Bearer '
  }
  return authorizationHeader; // If no 'Bearer' prefix, return the authorization header itself (direct token)
};


module.exports=extractToken