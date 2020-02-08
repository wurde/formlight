'use strict'

exports.up = function(knex) {
  return knex.schema.createTable("users", t => {
    t.text("username").notNullable().unique();
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
