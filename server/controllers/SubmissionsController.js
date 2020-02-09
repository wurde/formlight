'use strict';

const Submission = require("../models/Submission");
const Form = require("../models/Form");

/**
 * Define controller
 */

class SubmissionsController {
  static async index(req, res) {
    try {
      const form = await Form.find(req.params.form_id);
      const submissions = await Submission.all(form.title);
      res.status(200).json(submissions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req, res) {
    try {
      const [id] = await Submission.create({
        form_title: req.body.form_title,
        answers_json: JSON.stringify(req.body.answers_json)
      });

      const submission = await Submission.find(id);

      res.status(200).json(submission);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Export controller
 */

module.exports = SubmissionsController;
