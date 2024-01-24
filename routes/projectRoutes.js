// /routes/projectRoutes.js

// Import necessary modules
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

// Middleware to check if the user is authenticated
router.use(authController.isAuthenticated);

// Route for displaying project listings
router.get('/projects', projectController.getProjectListings);

// Route for creating a new project
router.post('/projects/create', projectController.createProject);

// Export the router
module.exports = router;
