'use strict'

exports.up = function(knex) {
  return knex.schema.alterTable('forms', t => {
    t.unique('title');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('forms', t => {
    t.dropUnique('title');
  })
};
