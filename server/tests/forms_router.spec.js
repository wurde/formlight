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

  it("POST /forms", () => {
    return request(app).post('/forms').expect(200)
  })

  it("GET /forms/:id", () => {
    return request(app).get('/forms/1').expect(200)
  })

  it("PUT /forms/:id", () => {
    return request(app).put('/forms/1').expect(200)
  })

  it("PATCH /forms/:id", () => {
    return request(app).patch('/forms/1').expect(200)
  })

  it("DELETE /forms/:id", () => {
    return request(app).delete('/forms/1').expect(200)
  })
})
