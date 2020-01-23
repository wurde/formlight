'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');

/**
 * Assertions
 */

describe('GET /', () => {
  it("process.env.NODE_ENV == 'test'", () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
})
