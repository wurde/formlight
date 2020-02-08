BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS users (
  username text UNIQUE NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forms (
  id integer PRIMARY KEY AUTOINCREMENT,
  title text NOT NULL UNIQUE,
  username text NOT NULL,
  fields_json text,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (username) REFERENCES users (username)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS submissions (
  id integer PRIMARY KEY AUTOINCREMENT,
  form_title text NOT NULL,
  answers_json text,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_title) REFERENCES forms (title)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

END TRANSACTION;
