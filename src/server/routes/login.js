const express = require('express');
const {username: userDB, password: passwordDB} = require('../../config');

const login = express.Router();

login.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username !== userDB || password !== passwordDB) {
      throw new Error('Bad username or password');
    }
    return res.json({ success: true});
  } catch (err) {
    return next(err);
  }
});

module.exports = login;
