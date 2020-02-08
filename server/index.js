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

app.use(require('./routes/root_router'));
app.use(require('./routes/users_router'));
app.use(require('./routes/forms_router'));

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

/**
 * Export app
 */

module.exports = app;
