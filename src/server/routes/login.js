const express = require('express');
const { loginCheck, changePassword} = require('../controllers/auth');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

const login = express.Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginResponse'
 *        400:
 *          description: User not found
 *        500:
 *          description: Some error happened
 */

// eslint-disable-next-line consistent-return
login.post(
  '/login',
  joiValidator(schemas.schemaLogin, 'body'),
  async (req, res, next) => {
    try {
      await loginCheck(req, res);
    } catch (err) {
      next(err);
    }
});
/**
 * @swagger
 * /auth/login/forgotten:
 *   post:
 *     summary: If the user has forgotten the password, change the password and send an email
 *     tags: [Authentication]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *        200:
 *          description: Password Successfully changed
 *        400:
 *          description: User not found
 *        500:
 *          description: Some error happened
 */
login.post(
  '/login/forgotten',
  joiValidator(schemas.schemaLoginForgotten, 'body'),
  async (req, res, next) => {
    try {
      await changePassword(req, res);
    } catch (err) {
      next(err);
    }
});

module.exports = login;
