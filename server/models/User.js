'use strict'

/**
 * Dependencies
 */

const db = require('../db/client');

/**
 * Constants
 */

const table = 'users';

/**
 * Define model
 */

class User {
  static async create(params) {
    if (!await this.uniqueUsername(params.username)) {
      const err = new Error()
      err.status = 400
      err.message = 'Username must be unique.'
      throw err
    }
    return await db(table).insert(params);
  }

  static find(username) {
    return db(table)
      .where({ username })
      .first();
  }

  /**
   * Validations
   */

  static async uniqueUsername(username) {
    const x = await db(table).where({ username }).first();
    return x ? false : true
  }
}

/**
 * Export model
 */

module.exports = User;
