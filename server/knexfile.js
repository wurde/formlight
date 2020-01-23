// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/development.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: "./db/test.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
