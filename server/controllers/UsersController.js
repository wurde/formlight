'use strict'

const User = require('../models/User');

/**
 * Define controller
 */

class UsersController {
  static async findOrCreate(req, res) {
    try {
      let user = await User.find(req.body.username);

      if (!user) {
        const [id] = await User.create({
          username: req.body.username
        });

        user = await User.find(id);
      }

      res.status(200).json(user);
    } catch (err) {
      if (err.status && err.status != 500) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

/**
 * Export controller
 */

module.exports = UsersController;
