'use strict'

/**
 * Dependencies
 */

const db = require('../db/client');

/**
 * Define model
 */

class Form {
  static all() {
    return db('forms');
  }

  static create({ title }) {
    return db('forms').insert({ title });
  }
}

/**
 * Export model
 */

module.exports = Form;
