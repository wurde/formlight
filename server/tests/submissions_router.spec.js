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

  it("GET /forms/:form_id/submissions", () => {
    return request(app).get('/forms/1/submissions').expect(200)
  })

  it("POST /forms/:form_id/submissions", () => {
    return request(app)
      .post("/forms/1/submissions")
      .expect(200);
  });

  it("GET /forms/:form_id/submissions/:id", () => {
    return request(app)
      .get("/forms/1/submissions/1")
      .expect(200);
  });

  it("PUT /forms/:form_id/submissions/:id", () => {
    return request(app)
      .put("/forms/1/submissions/1")
      .expect(200);
  });

  it("PATCH /forms/:form_id/submissions/:id", () => {
    return request(app)
      .patch("/forms/1/submissions/1")
      .expect(200);
  });

  it("DELETE /forms/:form_id/submissions/:id", () => {
    return request(app)
      .delete("/forms/1/submissions/1")
      .expect(200);
  });
})
