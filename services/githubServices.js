// /services/githubService.js

// Import necessary modules
const axios = require('axios');

// GitHub API service for fetching user information
exports.getUserInfo = async (githubAccessToken) => {
  try {
    // Make a GET request to the GitHub API
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });

    // Return user information
    return response.data;
  } catch (error) {
    // Handle error
    console.error('GitHub API Error:', error.response.data);
    throw new Error('Unable to fetch GitHub user information');
  }
};
