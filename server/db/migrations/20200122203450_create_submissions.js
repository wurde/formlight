
exports.up = function(knex) {
  return knex.schema.createTable('submissions', t => {
    t.increments();
    t.text('form_title').notNullable();
    t.text('fields_json');
    t.text('answers_json');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('submissions');
};
