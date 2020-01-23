'use strict'

/**
 * Dependencies
 */

const express = require('express');
const RootController = require('../controllers/RootController');

/**
 * Define router
 */

const router = express.Router();

/**
 * Mount routes
 */

router.route("/")
  .get(RootController.index);

router.route("/errs")
  .get(RootController.err);

/**
 * Export router
 */

module.exports = router;
