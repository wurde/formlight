'use strict'

/**
 * Dependencies
 */

const knex = require('knex');
const config = require('../knexfile');

/**
 * Define client
 */

const env = process.env.NODE_ENV || 'development';
const client = knex(config[env]);

/**
 * Export client
 */

module.exports = client;
