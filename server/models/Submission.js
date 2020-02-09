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
  static all(title) {
    return db(table)
      .where({ form_title: title });
  }

  static create(params) {
    if (!params.form_title) {
      const err = new Error();
      err.status = 400;
      err.message = "Form title is required.";
      throw err;
    }
    return db(table).insert(params);
  }

  static find(id) {
    return db(table)
      .where({ id })
      .first();
  }

  static removeByForm(form_title) {
    return db(table).where({ form_title }).truncate();
  }

  static clearAll() {
    return db(table).truncate();
  }
}

/**
 * Export model
 */

module.exports = Submission;
