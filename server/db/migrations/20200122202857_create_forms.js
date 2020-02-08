'use strict'

exports.up = function(knex) {
  return knex.schema.createTable("forms", t => {
    t.increments();
    t.text("title").notNullable().unique();
    t.text("username").notNullable();
    t.text("fields_json");
    t.timestamps();

    t.foreign("username")
      .references("username")
      .inTable("users")
      .onUpdate("cascade")
      .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("forms");
};
