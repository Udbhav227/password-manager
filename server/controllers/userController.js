const User = require("../models/User");

getCurrentUser = (req, res) => {
  res.json({
    username: req.user.username,
  });
};

module.exports = { getCurrentUser }