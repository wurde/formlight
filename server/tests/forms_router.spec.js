'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');
const Form = require('../models/Form');

/**
 * Assertions
 */

describe('forms_router.js', () => {
  beforeEach(async () => {
    await Form.clearAll()
    await Form.create({ title: 'TestFormHook1' })
    await Form.create({ title: 'TestFormHook2' })
    await Form.create({ title: 'TestFormHook3' })
    await Form.create({ title: 'TestFormHook4' })
  })

  it("process.env.NODE_ENV == 'test'", () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it("GET /forms", () => {
    return request(app).get('/forms')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it("POST /forms - missing request body", () => {
    return request(app).post('/forms').expect(400)
  })

  it("POST /forms - missing body fields", () => {
    return request(app).post('/forms')
      .send({ wrong: "field" }).expect(422)
  })

  it("POST /forms", () => {
    return request(app).post('/forms')
      .send({ title: 'TestFormAdded' }).expect(200)
  })

  it("GET /forms/:id", () => {
    return request(app).get('/forms/1')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it("GET /forms/:id - not found", () => {
    return request(app)
      .get("/forms/99")
      .expect(404);
  })

  it("PUT /forms/:id", () => {
    return request(app)
      .put("/forms/1")
      .expect(200);
  })

  it("PUT /forms/:id - not found", () => {
    return request(app)
      .put("/forms/99")
      .expect(404);
  });

  it("PATCH /forms/:id", () => {
    return request(app)
      .patch("/forms/1")
      .expect(200);
  })

  it("PATCH /forms/:id - not found", () => {
    return request(app)
      .patch("/forms/99")
      .expect(404);
  });

  it("DELETE /forms/:id", () => {
    return request(app)
      .delete("/forms/1")
      .expect(200);
  })

  it("DELETE /forms/:id - not found", () => {
    return request(app)
      .delete("/forms/99")
      .expect(404);
  });
})
