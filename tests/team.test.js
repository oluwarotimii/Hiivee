// /tests/team.test.js

// Import necessary modules
const assert = require('assert');
const request = require('supertest');
const app = require('../index'); // the main file is named index.js

describe('Team Tests', () => {
  it('should return status 200 for team details', (done) => {
    // Assuming you have a team ID available for testing
    const teamId = 'your_team_id';

    request(app)
      .get(`/teams/${teamId}`)
      .expect(200, done);
  });

  // Add more team-related tests as needed
});
