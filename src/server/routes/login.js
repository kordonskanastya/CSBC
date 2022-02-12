const express = require('express');
const { loginCheck, changePassword} = require('../controllers');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

const login = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - surname
 *         - patronymic
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description:  User Name
 *         surname:
 *           type: string
 *           description:  User surname
 *         patronymic:
 *           type: string
 *           description:  User patronymic
 *         email:
 *           type: string
 *           description:  User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         id: default
 *         username: Vasya
 *         surname: Pup
 *         patronymic: Georgovich
 *         email: pupvasya@gmail.com
 *         password: VasyaKrutoy
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description:  User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         email: pupvasya@gmail.com
 *         password: VasyaKrutoy
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description:  accessToken
 *         refreshToken:
 *           type: string
 *           description: refreshToken
 *         message:
 *           type: string
 *           description: Message
 *       example:
 *         accessToken: sdgfkgfgfruiygfvbn
 *         refreshToken: fdhhfdhfdfd
 *         message: You are logged in
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description:  accessToken
 *         refreshToken:
 *           type: string
 *           description: refreshToken
 *         message:
 *           type: string
 *           description: Message
 *       example:
 *         accessToken: sdgfkgfgfruiygfvbn
 *         refreshToken: fdhhfdhfdfd
 *         message: You are logged in
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
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
