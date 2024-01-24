// /index.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy;
const { isAuthenticated } = require('./utils/middlewares');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL, SESSION_SECRET } = require('./utils/constants');

// Initialize Express app
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set up session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User model
const User = require('./models/userModel');

// Configure GitHub authentication strategy
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL,
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

// Include routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const teamRoutes = require('./routes/teamRoutes');

app.use('/', authRoutes);
app.use('/', isAuthenticated, projectRoutes); // Protect project routes with isAuthenticated middleware
app.use('/', isAuthenticated, teamRoutes); // Protect team routes with isAuthenticated middleware

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
