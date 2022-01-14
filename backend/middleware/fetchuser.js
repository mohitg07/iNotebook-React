// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

// JSON Web Token(JWT) is an open standard used to share security information between two parties — a client and a server. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Saarthakisagood$oy";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to the request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({error: "Please authenticate using the valid token"});
  }
  try {
    // When you make a claim using a JWT, it's signed off by a server that has a secret key. The server reading the key can easily verify that the claim is valid, even without knowing the secret that was used.
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({error: "Please authenticate using the valid token"});
  }
};

module.exports = fetchuser;