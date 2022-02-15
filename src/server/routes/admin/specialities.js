const express = require('express');
const controllers = require('../../controllers');
const joiValidator = require('../../../validators/expressValidator');
const schemas = require('../../../validators/schemas');

const specialities = express.Router();

/**
 * @swagger
 * /admin/specialities:
 *   get:
 *     summary: Get all specialities
 *     tags: [Specialities]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpecialitiesResponseBody'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
specialities.get('/',controllers.getAllSpecialities);
/**
 * @swagger
 * /admin/specialities/create:
 *   post:
 *     summary: Create specialities
 *     tags: [Specialities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpecialitiesRequestBody'
 *     responses:
 *       200:
 *         description: Group was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpecialitiesResponseBody'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 */
specialities.post('/create',
  joiValidator(schemas.specialitySchema,'body'), controllers.createSpeciality);
/**
 * @swagger
 * /admin/specialities/{id}:
 *  get:
 *    summary: Find speciality by  id
 *    tags: [Specialities]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Group id
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SpecialitiesResponseBody'
 *      401:
 *          description: Unauthorized
 *      404:
 *        description: Group not found
 *      500:
 *        description: Some error happened
 */
specialities.get('/:id',
  joiValidator(schemas.IdSchema,'params'),
  controllers.getSpecialityByID);


module.exports = specialities;
