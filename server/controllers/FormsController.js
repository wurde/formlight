'use strict'

const Form = require('../models/Form');
const Submission = require('../models/Submission');

/**
 * Define controller
 */

class FormsController {
  static async index(req, res) {
    try {
      const forms = await Form.allByUsername(req.query.username);
      res.status(200).json(forms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req, res) {
    try {
      const [id] = await Form.create({
        title: req.body.title,
        username: req.body.username
      });

      const form = await Form.find(id);

      res.status(200).json(form);
    } catch (err) {
      if (err.status && err.status != 500) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async show(req, res) {
    try {
      const form = await Form.find(req.params.id);
      res.status(200).json(form);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async update(req, res) {
    try {
      if (req.body.fields_json) {
        const id = await Form.update(req.params.id, {
          fields_json: JSON.stringify(req.body.fields_json)
        });
      }

      const form = await Form.find(req.params.id);

      await Submission.removeByForm(form.title);

      res.status(200).json(form);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async remove(req, res) {
    try {
      await Form.destroy(req.params.id);
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

module.exports = FormsController;
