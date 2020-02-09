'use strict'

/**
 * Dependencies
 */

const express = require('express');
const SubmissionsController = require('../controllers/SubmissionsController');
const require_body = require("../middleware/require_body");

/**
 * Define router
 */

const router = express.Router({ mergeParams: true });

/**
 * Mount routes
 */

// GET,POST /forms/:form_id/submissions
router.route("/submissions")
  .get(SubmissionsController.index)
  .all(require_body(['form_title', 'answers_json']))
  .post(SubmissionsController.create)

/**
 * Export router
 */

module.exports = router;
