'use strict'

/**
 * Dependencies
 */

const express = require('express');
const UsersController = require('../controllers/UsersController');
const require_body = require("../middleware/require_body");

/**
 * Define router
 */

const router = express.Router();

/**
 * Mount routes
 */

// POST /users
router.route("/")
  .all(require_body(['username']))
  .post(UsersController.findOrCreate);

/**
 * Export router
 */

module.exports = router;
