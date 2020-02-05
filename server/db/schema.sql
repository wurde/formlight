BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS forms (
  id integer PRIMARY KEY AUTOINCREMENT,
  title text NOT NULL UNIQUE,
  fields_json text
);

CREATE TABLE IF NOT EXISTS submissions (
  id integer PRIMARY KEY AUTOINCREMENT,
  title text NOT NULL,
  fields_json text,
  answers text
);

END TRANSACTION;
