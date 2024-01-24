// /routes/teamRoutes.js

// Import necessary modules
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authController = require('../controllers/authController');

// Middleware to check if the user is authenticated
router.use(authController.isAuthenticated);

// Route for displaying team details
router.get('/teams/:teamId', teamController.getTeamDetails);

// Route for joining a team
router.post('/teams/:teamId/join', teamController.joinTeam);

// Export the router
module.exports = router;
