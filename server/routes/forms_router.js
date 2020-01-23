'use strict'

/**
 * Dependencies
 */

const express = require('express');
const FormsController = require('../controllers/FormsController');

/**
 * Define router
 */

const router = express.Router();

/**
 * Mount routes
 */

// GET,POST /forms
router.route("/forms")
  .get(FormsController.index);
  .post(FormsController.create);

// GET,PUT,PATCH,DELETE /forms/:id
router.route("/forms/:id")
  .get(FormsController.find);
  .put(FormsController.update);
  .patch(FormsController.update);
  .delete(FormsController.remove);

/**
 * Export router
 */

module.exports = router;
