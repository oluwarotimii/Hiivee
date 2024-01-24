// /utils/middlewares.js

// Custom middleware to ensure the user is authenticated
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      // If authenticated, proceed to the next middleware or route handler
      return next();
    } else {
      // If not authenticated, redirect to the login page
      res.redirect('/');
    }
  };
  