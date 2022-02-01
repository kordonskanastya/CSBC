const express = require('express');
const config = require('../../config');
const auth = require('../../utils/auth');
const db = require('../../db')(config.db);
const services = require('../../services');
const { generateAccessToken, generateRefreshToken } = require('../../utils');

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
 * /login:
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
login.post('/login', (req, res, next) => {
  try {
    const { email } = req.body;
    auth.authUser(req, res).then((authFlag) => {
      if (authFlag) {
        const accessToken = generateAccessToken(email);
        const refreshToken = generateRefreshToken(email);
        db.addRefreshToken(email, refreshToken);
        res.json({
          accessToken,
          refreshToken,
          message: 'You are logged-in',
        });
      }
    });
  } catch (err) {
    return next(err);
  }
});

login.post('/login/forgotten',(req,res)=>{
 services.changePassword(req,res).then(data=>{
   res.json(data.message);
 });

});

module.exports = login;
