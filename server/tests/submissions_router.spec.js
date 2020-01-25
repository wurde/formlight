'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');
const Submission = require('../models/Submission');
const Form = require('../models/Form');

/**
 * Assertions
 */

describe('submissions_router.js', () => {
  beforeEach(async () => {
    await Form.clearAll();
    await Form.create({
      title: "SigninForm",
      fields_json: '[{"label":"username"},{"label":"password"}]'
    });
    await Submission.clearAll();
    await Submission.create({
      title: "SigninForm",
      fields_json: '[{"label":"username"},{"label":"password"}]',
      answers: '[{"username":"admin"},{"password":"secret"}]',
    });
    await Submission.create({
      title: "SigninForm",
      fields_json: '[{"label":"username"},{"label":"password"}]',
      answers: '[{"username":"andy"},{"password":"test-1-2-3"}]',
    });
  });

  it("process.env.NODE_ENV == 'test'", () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it("GET /forms/:form_id/submissions", () => {
    return request(app)
      .get("/forms/1/submissions")
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it("POST /forms/:form_id/submissions - missing request body", () => {
    return request(app)
      .post("/forms/1/submissions")
      .expect(400)
      .expect('Content-Type', /json/)
  });

  it("POST /forms/:form_id/submissions - missing body fields", () => {
    return request(app)
      .post("/forms/1/submissions")
      .send({ wrong: "field" })
      .expect(422)
      .expect('Content-Type', /json/)
  });

  it("POST /forms/:form_id/submissions", () => {
    return request(app)
      .post("/forms/1/submissions")
      .send({
        title: "Signin Form",
        fields_json: '[{"label":"username"},{"label":"password"}]',
        answers: '[{"username":"myname"},{"password":"secret123"}]'
      })
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("GET /forms/:form_id/submissions/:id", () => {
    return request(app)
      .get("/forms/1/submissions/1")
      .expect(200)
      .expect('Content-Type', /json/)
  });

  it("GET /forms/:form_id/submissions/:id - not found", () => {
    return request(app)
      .get("/forms/1/submissions/99")
      .expect(404)
      .expect('Content-Type', /json/)
  });

  it("PUT /forms/:form_id/submissions/:id", () => {
    return request(app)
      .put("/forms/1/submissions/1")
      .expect(200)
      .expect('Content-Type', /json/)
  });

  it("PUT /forms/:form_id/submissions/:id - not found", () => {
    return request(app)
      .put("/forms/1/submissions/99")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("PATCH /forms/:form_id/submissions/:id", () => {
    return request(app)
      .patch("/forms/1/submissions/1")
      .expect(200)
      .expect('Content-Type', /json/)
  });

  it("PATCH /forms/:form_id/submissions/:id - not found", () => {
    return request(app)
      .patch("/forms/1/submissions/99")
      .expect(404)
      .expect("Content-Type", /json/);
  });

  it("DELETE /forms/:form_id/submissions/:id", () => {
    return request(app)
      .delete("/forms/1/submissions/1")
      .expect(200)
      .expect('Content-Type', /json/)
  });

  it("DELETE /forms/:form_id/submissions/:id - not found", () => {
    return request(app)
      .delete("/forms/1/submissions/99")
      .expect(404)
      .expect("Content-Type", /json/);
  });
})
