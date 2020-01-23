'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');

/**
 * Assertions
 */

describe('submissions_router.js', () => {
  it("process.env.NODE_ENV == 'test'", () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it("GET /forms/1/submissions", () => {
    return request(app).get('/forms/1/submissions').expect(200)
  })
})
