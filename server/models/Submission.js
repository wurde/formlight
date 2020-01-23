'use strict'

/**
 * Dependencies
 */

const db = require('../db/client');

/**
 * Constants
 */

const table = 'submissions';

/**
 * Define model
 */

class Submission {
  static all() {
    return db(table);
  }

  static create(params) {
    return db(table).insert(params);
  }

  static find(id) {
    return db(table)
      .where({ id })
      .first();
  }

  static update(id, params) {
    return db(table)
      .where({ id })
      .first()
      .update(params);
  }

  static destroy(id) {
    return db(table)
      .where({ id })
      .del();
  }

  static clearAll() {
    return db(table).truncate();
  }
}

/**
 * Export model
 */

module.exports = Submission;
