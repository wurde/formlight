'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('submissions', t => {
    t.increments();
    t.text('title').notNullable();
    t.text('fields_json');
    t.text('answers');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('submissions');
};
