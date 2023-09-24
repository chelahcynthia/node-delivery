const config = require("../../../config/keys");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

/**
 * Middleware to verify and decode JWT tokens
 */
function verifyToken(req, res, next) {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.access_token || "";

  // Check if the token exists
  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }

  // Verify and decode the token
  jwt.verify(token, config.secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    // Attach the decoded user data to the request
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  });
}

/**
 * Middleware to check if the user is authenticated
 */
function isAuthenticated(req, res, next) {
  // Check if the user is authenticated (i.e., if the token has been verified)
  if (!req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // User is authenticated, continue to the next middleware or route
  next();
}

/**
 * Middleware to check user roles
 */
function hasRole(roleRequired) {
  return (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check if the user's role meets the minimum requirements
    if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
      next();
    } else {
      res.status(403).json({ message: "Insufficient role permissions" });
    }
  };
}

/**
 * Example route using the middleware
 */
function exampleRoute(req, res) {
  res.status(200).json({ message: "Authenticated route", user: req.user });
}

module.exports = {
  verifyToken,
  isAuthenticated,
  hasRole,
  exampleRoute,
};
