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
    return db("forms");
  }

  static create(params) {
    return db("forms").insert(params);
  }

  static find(id) {
    return db("forms").where({ id }).first();
  }

  static update(id, params) {
    return db("forms").where({ id }).first().update(params);
  }

  static remove(id) {
    return db("forms").where({ id }).del();
  }
}

/**
 * Export model
 */

module.exports = Form;
