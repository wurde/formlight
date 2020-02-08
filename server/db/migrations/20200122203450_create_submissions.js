'use strict'

exports.up = function(knex) {
  return knex.schema.createTable("submissions", t => {
    t.increments();
    t.text("form_title").notNullable();
    t.text("answers_json");
    t.timestamps();

    t.foreign("form_title")
      .references("title")
      .inTable("forms")
      .onUpdate("cascade")
      .onDelete("cascade");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("submissions");
};
