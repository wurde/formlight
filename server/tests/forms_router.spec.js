'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');

/**
 * Assertions
 */

describe('forms_router.js', () => {
  it("process.env.NODE_ENV == 'test'", () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it("GET /forms", () => {
    return request(app).get('/forms').expect(200)
  })
})
