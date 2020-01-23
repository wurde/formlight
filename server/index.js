'use strict'

/**
 * Dependencies
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

/**
 * Constants
 */

const port = process.env.PORT || 3000;

/**
 * Define app
 */

const app = express();

/**
 * Mount middleware
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Mount routes
 */

app.get('/', (req, res) => {
  res.sendStatus(200);
})

app.get('/error', (req, res) => {
  throw new Error('Test server failure.')
  res.sendStatus(200);
})

/**
 * Mount error handlers
 */

app.use(require('./middleware/error_handlers'));

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  })
}
