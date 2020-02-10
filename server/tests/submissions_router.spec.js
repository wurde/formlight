'use strict'

/**
 * Dependencies
 */

const app = require('../index');
const request = require('supertest');
const Form = require('../models/Form');
const Submission = require('../models/Submission');
const User = require('../models/User');

/**
 * Assertions
 */

describe('submissions_router.js', () => {
  beforeEach(async () => {
    let user = await User.find("Andy");

    if (!user) {
      const [id] = await User.create({
        username: "Andy"
      });
    }
    await Form.clearAll();
    await Form.create({
      title: "SigninForm",
      username: "Andy",
      fields_json: '[{"label":"username"},{"label":"password"}]'
    });
    await Submission.clearAll();
    await Submission.create({
      form_title: "SigninForm",
      answers_json: '[{"username":"admin"},{"password":"secret"}]',
    });
    await Submission.create({
      form_title: "SigninForm",
      answers_json: '[{"username":"andy"},{"password":"test-1-2-3"}]'
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
        form_title: "Signin Form",
        answers_json: '[{"username":"myname"},{"password":"secret123"}]'
      })
      .expect(200)
      .expect("Content-Type", /json/);
  });
})
