'use strict'

const Form = require('../models/Form');

/**
 * Define controller
 */

class FormsController {
  static async index(req, res) {
    try {
      const forms = await Form.all();
      res.status(200).json(forms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req, res) {
    try {
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async find(req, res) {
    try {
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async update(req, res) {
    try {
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async remove(req, res) {
    try {
      res.sendStatus(200);
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
