'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('forms', t => {
    t.increments();
    t.text('title').notNullable();
    t.text('fields_json');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('forms');
};