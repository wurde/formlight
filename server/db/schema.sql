BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS forms (
  id integer PRIMARY KEY AUTOINCREMENT,
  title text NOT NULL,
  fields_json text
);

CREATE TABLE IF NOT EXISTS submissions (
  id integer PRIMARY KEY AUTOINCREMENT,
  form_title text NOT NULL,
  fields_json text,
  answers_json text
);

END TRANSACTION;
