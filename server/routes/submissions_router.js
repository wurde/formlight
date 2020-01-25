'use strict'

/**
 * Dependencies
 */

const express = require('express');
const Submission = require("../models/Submission");
const SubmissionsController = require('../controllers/SubmissionsController');
const require_body = require("../middleware/require_body");
const require_record = require("../middleware/require_record");

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
  .all(require_body(['title']))
  .post(SubmissionsController.create)

// GET,PUT,PATCH,DELETE /forms/:form_id/submissions/:id
router.route("/submissions/:id")
  .all(require_record(Submission.find, 'id'))
  .get(SubmissionsController.show)
  .put(SubmissionsController.update)
  .patch(SubmissionsController.update)
  .delete(SubmissionsController.remove)

/**
 * Export router
 */

module.exports = router;
