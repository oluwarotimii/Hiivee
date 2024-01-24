// /models/userModel.js

// Import necessary modules
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  githubId: String,
  username: String,
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
