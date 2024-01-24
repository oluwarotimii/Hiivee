// /controllers/authController.js

// Import necessary modules
const passport = require('passport');

// Controller for handling GitHub authentication
exports.githubAuth = passport.authenticate('github');

// Callback for GitHub authentication
exports.githubAuthCallback = passport.authenticate('github', {
  failureRedirect: '/',
  successRedirect: '/home', // Redirect to home page on successful authentication
});

// Logout controller
exports.logout = (req, res) => {
  // Logout and redirect to the login page
  req.logout();
  res.redirect('/');
};

// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // If not authenticated, redirect to the login page
    res.redirect('/');
  }
};
