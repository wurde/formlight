'use strict'

/**
 * Define controller
 */

class RootController {
  static index(req, res) {
    res.sendStatus(200);
  }

  static err(req, res) {
    throw new Error("Test server failure.");
    res.sendStatus(200);
  }
}

/**
 * Export controller
 */

module.exports = RootController;
