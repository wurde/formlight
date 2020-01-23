'use strict'

/**
 * Dependencies
 */

const express = require('express');
const SubmissionsController = require('../controllers/SubmissionsController');

/**
 * Define router
 */

const router = express.Router({ mergeParams: true });

/**
 * Mount routes
 */

// GET,POST /forms/:id/submissions
router.route("/submissions")
  .get(SubmissionsController.index)
  .post(SubmissionsController.create)

// GET,PUT,PATCH,DELETE /forms/:form_id/submissions/:id
router.route("/submissions/:id")
  .get(SubmissionsController.find)
  .put(SubmissionsController.update)
  .patch(SubmissionsController.update)
  .delete(SubmissionsController.remove)

/**
 * Export router
 */

module.exports = router;
