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
      const id = await Submission.create({
        title: req.body.title,
        fields_json: JSON.stringify(req.body.fields_json),
        answers: JSON.stringify(req.body.answers)
      });

      const submission = await Submission.find(id);

      res.status(200).json(submission);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async show(req, res) {
    try {
      const submission = await Submission.find(req.params.id);
      res.status(200).json(submission);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async update(req, res) {
    try {
      if (req.body.answers) {
        const [id] = await Submission.update(req.params.id, {
          answers: req.body.answers
        });
      }

      const submission = await Submission.find(req.params.id);

      res.status(200).json(submission);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async remove(req, res) {
    try {
      await Submission.destroy(req.params.id);
      res.status(200).json();
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
