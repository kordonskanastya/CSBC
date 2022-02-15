const express = require('express');
const controllers = require('../../controllers');
const joiValidator = require('../../../validators/expressValidator');
const schemas = require('../../../validators/schemas');

const users = express.Router();

/**
 * @swagger
 * /admin/users/registration:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequestBody'
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRequestBody'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 */

users.post(
  '/registration',
  joiValidator(schemas.userSchema, 'body'),
  async(req, res, next) => {
    try {
      await controllers.createUser(req, res);
    } catch (err) {
      next(err);
    }
});

/**
 * @swagger
 * /admin/users/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
users.get('/', controllers.getAllUsers);


/**
 * @swagger
 * /admin/users/{id}:
 *  get:
 *    summary: Find User by  id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User id
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *          description: Unauthorized
 *      404:
 *        description: User  not found
 *      500:
 *        description: Some error happened
 */
users.get(
  '/:id',
  joiValidator(schemas.IdSchema, 'params'),
  async (req, res, next) => {
    try {
      await controllers.getUserByID(req, res);
    } catch (err) {
      next(err);
    }
});
/**
 * @swagger
 * /admin/users/update/{id}:
 *  put:
 *    summary: Update User by  id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserRequestBody'
 *    responses:
 *      200:
 *        description: User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *          description: Unauthorized
 *      400:
 *        description: User  not found
 *      500:
 *        description: Some error happened
 */
users.put(
  '/update/:id',
  joiValidator(schemas.IdSchema, 'params'),
  joiValidator(schemas.userSchema, 'body'),
  async (req, res, next) => {
    try {
      await controllers.updateUser(req,res);
    } catch (err) {
      next(err);
    }
});

/**
 * @swagger
 * /admin/users/delete/{id}:
 *  delete:
 *    summary: Delete User by  id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description:  User deleted
 *      401:
 *          description: Unauthorized
 *      404:
 *        description: User  not found
 *      500:
 *        description: Some error happened
 */

users.delete(
  '/delete/:id',
  joiValidator(schemas.IdSchema, 'params'),
  async (req, res, next) => {
    try {
      await controllers.deleteUser(req, res);
    } catch (err) {
      next(err);
    }
});


module.exports = users;
