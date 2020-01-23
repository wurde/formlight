'use strict'

/**
 * Dependencies
 */

const express = require('express');

/**
 * Define router
 */

const router = express.Router();

/**
 * Mount routes
 */

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/err", (req, res) => {
  throw new Error("Test server failure.");
  res.sendStatus(200);
});

/**
 * Export router
 */

module.exports = router;
