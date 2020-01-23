'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');

/**
 * Assertions
 */

describe('root_router.js', () => {
  it("process.env.NODE_ENV == 'test'", () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it("GET /", () => {
    return request(app).get('/').expect(200)
  })
})
