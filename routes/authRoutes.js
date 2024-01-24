// /routes/authRoutes.js

// Import necessary modules
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GitHub authentication route
router.get('/auth/github', authController.githubAuth);

// GitHub authentication callback route
router.get('/auth/github/callback', authController.githubAuthCallback);

// Logout route
router.get('/logout', authController.logout);

// Export the router
module.exports = router;
