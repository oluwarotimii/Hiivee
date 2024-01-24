// /config/passport.js

// Import necessary modules
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/userModel'); // Import the User model

// GitHub authentication configuration
passport.use(new GitHubStrategy({
  clientID: 'your_github_client_id',
  clientSecret: 'your_github_client_secret',
  callbackURL: 'http://localhost:3000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Check if the user already exists in the database
  User.findOne({ githubId: profile.id }, (err, user) => {
    if (err) return done(err);
    
    if (!user) {
      // If the user doesn't exist, create a new user
      const newUser = new User({
        githubId: profile.id,
        username: profile.username,
      });

      // Save the new user to the database
      newUser.save((err) => {
        if (err) return done(err);
        return done(null, newUser);
      });
    } else {
      // If the user exists, return the user
      return done(null, user);
    }
  });
}));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
