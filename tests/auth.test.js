// /tests/auth.test.js

// Import necessary modules
const assert = require('assert');
const request = require('supertest');
const app = require('../index'); // Assuming your main file is named index.js

describe('Authentication Tests', () => {
  it('should return status 200 for GitHub authentication', (done) => {
    request(app)
      .get('/auth/github')
      .expect(200, done);
  });

  it('should return status 302 for GitHub authentication callback', (done) => {
    request(app)
      .get('/auth/github/callback')
      .expect(302, done);
  });
});
