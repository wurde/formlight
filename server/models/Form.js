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
  static all() {
    return db(table);
  }

  static async create(params) {
    if (!await this.uniqueTitleRef(params.title_ref)) {
      const err = new Error()
      err.status = 400
      err.message = 'Title must be unique.'
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

  static async uniqueTitleRef(title_ref) {
    const x = await db(table).where({ title_ref }).first();
    return x ? false : true
  }
}

/**
 * Export model
 */

module.exports = Form;
