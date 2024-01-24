// /controllers/projectController.js

// Import necessary modules
const Project = require('../models/projectModel'); // Import the Project model

// Controller for displaying project listings
exports.getProjectListings = (req, res) => {
  // Fetch all projects from the database
  Project.find({}, (err, projects) => {
    if (err) {
      // Handle error
      res.status(500).send('Internal Server Error');
    } else {
      // Render the project listings page with fetched projects
      res.render('project-listings', { projects });
    }
  });
};

// Controller for creating a new project
exports.createProject = (req, res) => {
  // Extract project details from the request body
  const { title, description, skillsRequired, isBeginnerFriendly } = req.body;

  // Create a new project
  const newProject = new Project({
    title,
    description,
    skillsRequired,
    isBeginnerFriendly,
    owner: req.user._id, // Assign the project owner's ID
  });

  // Save the new project to the database
  newProject.save((err) => {
    if (err) {
      // Handle error
      res.status(500).send('Internal Server Error');
    } else {
      // Redirect to the project listings page after successful creation
      res.redirect('/projects');
    }
  });
};
