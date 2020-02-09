'use strict'

/**
 * Dependencies
 */

const db = require('../db/client');

/**
 * Constants
 */

const table = 'forms';

/**
 * Define model
 */

class Form {
  static allByUsername(username) {
    return db(table).where({ username });
  }

  static async create(params) {
    if (!await this.uniqueTitle(params.title)) {
      const err = new Error()
      err.status = 400
      err.message = 'Title must be unique.'
      throw err
    }
    if (!params.username) {
      const err = new Error()
      err.status = 400
      err.message = 'Username is required.'
      throw err
    }
    return await db(table).insert(params);
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

  /**
   * Validations
   */

  static async uniqueTitle(title) {
    const x = await db(table).where({ title }).first();
    return x ? false : true
  }
}

/**
 * Export model
 */

module.exports = Form;
