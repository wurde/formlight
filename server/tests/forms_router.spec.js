'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');
const Form = require('../models/Form');
const User = require('../models/User');

/**
 * Assertions
 */

describe('forms_router.js', () => {
  beforeEach(async () => {
    let user = await User.find("Andy");

    if (!user) {
      const [id] = await User.create({
        username: "Andy"
      });
    }
    await Form.clearAll()
    await Form.create({
      title: "Signin Form",
      username: "Andy",
      fields_json: '[{"label":"username"},{"label":"password"}]'
    });
    await Form.create({
      title: "Favorite Food",
      username: "Andy",
      fields_json: '[{"label":"name"}]'
    });
  })

  it("process.env.NODE_ENV == 'test'", () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it("GET /forms", () => {
    return request(app).get('/forms')
    .query({ username: "Andy" })
    .expect(200)
    .expect('Content-Type', /json/)
  })

  it("POST /forms - missing request body", () => {
    return request(app)
      .post("/forms")
      .expect(400)
      .expect("Content-Type", /json/)
  })

  it("POST /forms - missing body fields", () => {
    return request(app)
      .post("/forms")
      .send({ wrong: "field" })
      .expect(422)
      .expect("Content-Type", /json/)
  })

  it("POST /forms", () => {
    return request(app)
      .post("/forms")
      .send({ username: "Andy", title: "TestFormAdded" })
      .expect(200)
      .expect("Content-Type", /json/)
  })

  it("GET /forms/:id", () => {
    return request(app)
      .get("/forms/1")
      .expect(200)
      .expect("Content-Type", /json/)
  })

  it("GET /forms/:id - not found", () => {
    return request(app)
      .get("/forms/99")
      .expect(404)
      .expect("Content-Type", /json/)
  })

  it("PUT /forms/:id - body not required", () => {
    return request(app)
      .put("/forms/1")
      .expect(200)
      .expect("Content-Type", /json/)
  })

  it("PUT /forms/:id - record updated", () => {
    return request(app)
      .put("/forms/1")
      .expect(200)
      .expect("Content-Type", /json/)
  })

  it("PUT /forms/:id - not found", () => {
    return request(app)
      .put("/forms/99")
      .expect(404)
      .expect("Content-Type", /json/)
  });

  it("PATCH /forms/:id", () => {
    return request(app)
      .patch("/forms/1")
      .expect(200)
      .expect("Content-Type", /json/)
  })

  it("PATCH /forms/:id - not found", () => {
    return request(app)
      .patch("/forms/99")
      .expect(404)
      .expect("Content-Type", /json/)
  });

  it("DELETE /forms/:id", () => {
    return request(app)
      .delete("/forms/1")
      .expect(200)
      .expect("Content-Type", /json/)
  })

  it("DELETE /forms/:id - not found", () => {
    return request(app)
      .delete("/forms/99")
      .expect(404)
      .expect("Content-Type", /json/)
  });
})
