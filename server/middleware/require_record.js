'use strict'

/**
 * Define middleware
 */

function require_record(find, param) {
  return async (req, res, next) => {
    try {
      if (!req.params[param]) {
        return res.status(500).json({ message: "Internal Server Error." });
      }

      if (!await find(req.params[param])) {
        return res.status(404).json({ message: "Record not found." });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  };
}

/**
 * Export middleware
 */

module.exports = require_record;
