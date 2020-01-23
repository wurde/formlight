'use strict'

/**
 * Dependencies
 */

const express = require('express');
const Form = require('../models/Form');
const FormsController = require('../controllers/FormsController');
const require_body = require('../middleware/require_body');
const require_record = require('../middleware/require_record');

/**
 * Define router
 */

const router = express.Router({ mergeParams: true });

/**
 * Mount routes
 */

// GET,POST /forms
router.route("/forms")
  .get(FormsController.index)
  .all(require_body(['title']))
  .post(FormsController.create)

// GET,PUT,PATCH,DELETE /forms/:id
router.route("/forms/:id")
  .all(require_record(Form.find, 'id'))
  .get(FormsController.show)
  .put(FormsController.update)
  .patch(FormsController.update)
  .delete(FormsController.remove)

/**
 * Mount sub-routers
 */

router.use("/forms/:form_id", require('./submissions_router'));

/**
 * Export router
 */

module.exports = router;
