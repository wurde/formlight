'use strict'

/**
 * Dependencies
 */

const express = require('express');

/**
 * Constants
 */

const port = process.env.PORT || 3000;

/**
 * Define app
 */

const app = express();

/**
 * Mount routes
 */

app.get('/', (req, res) => {
  res.sendStatus(500);
})

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  })
}
