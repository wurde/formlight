'use strict'

const Form = require('../models/Form');

/**
 * Define controller
 */

class RootController {
  static async index(req, res) {
    const forms = await Form.all();
    console.log({ forms })
    await Form.create({ title: 'TestForm' })
    res.sendStatus(200);
  }
}

/**
 * Export controller
 */

module.exports = RootController;
