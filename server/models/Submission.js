'use strict'

/**
 * Dependencies
 */

const db = require('../db/client');

/**
 * Define model
 */

class Submission {
  static all() {
    return db("submissions");
  }

  static create(params) {
    return db("submissions").insert(params);
  }

  static find(id) {
    return db("submissions").where({ id }).first();
  }

  static update(id, params) {
    return db("submissions").where({ id }).first().update(params);
  }

  static remove(id) {
    return db("submissions").where({ id }).del();
  }
}

/**
 * Export model
 */

module.exports = Submission;
