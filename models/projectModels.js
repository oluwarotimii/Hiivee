// /models/projectModel.js

// Import necessary modules
const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  isBeginnerFriendly: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

// Export the Project model
module.exports = Project;
