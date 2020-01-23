'use strict'

const Form = require('../models/Form');

/**
 * Define controller
 */

class RootController {
  static async index(req, res) {
    try {
      const forms = await Form.all();
      console.log({ forms })
      await Form.create({ title: 'TestForm' })

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

/**
 * Export controller
 */

module.exports = RootController;
