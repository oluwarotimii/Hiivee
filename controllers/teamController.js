// /controllers/teamController.js

// Import necessary modules
const Team = require('../models/teamModel'); // Import the Team model

// Controller for displaying team details
exports.getTeamDetails = (req, res) => {
  const teamId = req.params.teamId;

  // Fetch team details from the database
  Team.findById(teamId)
    .populate('members') // Populate the 'members' field with user details
    .exec((err, team) => {
      if (err) {
        // Handle error
        res.status(500).send('Internal Server Error');
      } else {
        // Render the team details page with fetched team information
        res.render('team-details', { team });
      }
    });
};

// Controller for joining a team
exports.joinTeam = (req, res) => {
  const teamId = req.params.teamId;

  // Add the current user to the team's members
  Team.findByIdAndUpdate(teamId, { $push: { members: req.user._id } }, (err, team) => {
    if (err) {
      // Handle error
      res.status(500).send('Internal Server Error');
    } else {
      // Redirect to the team details page after successful join
      res.redirect(`/teams/${teamId}`);
    }
  });
};
