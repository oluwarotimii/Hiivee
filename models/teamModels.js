// /models/teamModel.js

// Import necessary modules
const mongoose = require('mongoose');

// Define the Team schema
const teamSchema = new mongoose.Schema({
  name: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

// Create the Team model
const Team = mongoose.model('Team', teamSchema);

// Export the Team model
module.exports = Team;
