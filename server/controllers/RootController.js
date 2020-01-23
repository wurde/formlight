'use strict'

/**
 * Define controller
 */

class RootController {
  static index(req, res) {
    res.sendStatus(200);
  }
}

/**
 * Export controller
 */

module.exports = RootController;
