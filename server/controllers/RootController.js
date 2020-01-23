'use strict'

/**
 * Define controller
 */

class RootController {
  static index(req, res) {
    try {
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
