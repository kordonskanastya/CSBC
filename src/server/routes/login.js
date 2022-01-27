const express = require('express');
const auth = require('../../utils/auth');
const service = require('../../services');
const {generateAccessToken, generateRefreshToken} = require('../../utils');

const login = express.Router();

// eslint-disable-next-line consistent-return
login.post('/login', (req, res, next) => {
  try {
    const { email } = req.body;
    auth.authUser(req, res).then(data => {
      if (data) {
        const AToken = generateAccessToken(email); // accessToken
        const RToken = generateRefreshToken(email); // refreshToken
        service.putRefreshToken({email, RToken}).finally();
        return res.json({
          AccessToken: AToken,
          RefreshToken: RToken,
          message: 'You are logged-in'
        });
      }
      throw new Error('You are not logged-in');
    });
  } catch (err) {
    return next(err);
  }
});


module.exports = login;
