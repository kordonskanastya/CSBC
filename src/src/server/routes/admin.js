const express = require('express');
const controllers = require('../controllers');
const admin = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminRequestBody:
 *       type: object
 *       required:
 *         - username
 *         - surname
 *         - patronymic
 *         - email
 *         - password
 *       properties:
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
 *         username: Vasya
 *         surname: Pup
 *         patronymic: Georgovich
 *         email: pupvasya@gmail.com
 *         password: VasyaKrutoy
 */


/**
 * @swagger
 * /admin/reg:
 *   post:
 *     summary: Create user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminRequestBody'
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */

admin.post('/reg', controllers.createUser);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
admin.get('/users', controllers.getAllUsers);


/**
 * @swagger
 * /admin/users/{id}:
 *  get:
 *    summary: Find User by  id
 *    tags: [Admin]
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
 *      400:
 *        description: User  not found
 *      500:
 *        description: Some error happened
 */

admin.get('/users/:id', controllers.getUserByID);
/**
 * @swagger
 * /admin/update/{id}:
 *  put:
 *    summary: Update User by  id
 *    tags: [Admin]
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
 *            $ref: '#/components/schemas/AdminRequestBody'
 *    responses:
 *      200:
 *        description: User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: User  not found
 *      500:
 *        description: Some error happened
 */
admin.put('/update/:id', controllers.updateUser);

/**
 * @swagger
 * /admin/delete/{id}:
 *  delete:
 *    summary: Delete User by  id
 *    tags: [Admin]
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
 *      400:
 *        description: User  not found
 *      500:
 *        description: Some error happened
 */

admin.delete('/delete/:id', controllers.deleteUser);


module.exports = admin;