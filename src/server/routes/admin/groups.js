const express = require('express');
const controllers = require('../../controllers');
const joiValidator = require('../../../validators/expressValidator');
const schemas = require('../../../validators/schemas');

const groups = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupsRequestBody:
 *       type: object
 *       required:
 *         - name
 *         - curatorId
 *         - entryYear
 *         - graduationYear
 *         - fkSpecialityId
 *       properties:
 *           name:
 *           - type: string
 *           - description:  Group name
 *           curatorId:
 *           - type: integer
 *           - description: Unique user`s identifier
 *           entryYear:
 *           - type: data
 *           - description: data of entry to university
 *           graduationYear:
 *           - type: data
 *           - description: data of graduation from university
 *           fkSpecialityId:
 *           - type: integer
 *           - description: Unique specialities identifier
 *       example:
 *         name: 1п-19
 *         curatorId: 2
 *         entryYear: 2020-07-10
 *         graduationYear: 2024-07-10
 *         fkSpecialityId: 10
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupsResponseBody:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - curatorId
 *         - entryYear
 *         - graduationYear
 *         - fkSpecialityId
 *       properties:
 *           name:
 *           - type: string
 *           - description:  Group name
 *           curatorId:
 *           - type: integer
 *           - description: Unique user`s identifier
 *           entryYear:
 *           - type: data
 *           - description: data of entry to university
 *           graduationYear:
 *           - type: data
 *           - description: data of graduation from university
 *           fkSpecialityId:
 *           - type: integer
 *           - description: Unique specialities identifier
 *       example:
 *         id: 1
 *         name: 1п-19
 *         curatorId: 2
 *         entryYear: 2020-07-10
 *         graduationYear: 2024-07-10
 *         fkSpecialityId: 10
 */


/**
 * @swagger
 * /admin/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupsResponseBody'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
 groups.get('/',controllers.getAllGroups);
/**
 * @swagger
 * /admin/groups/create:
 *   post:
 *     summary: Create groups
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupsRequestBody'
 *     responses:
 *       200:
 *         description: Group was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupsResponseBody'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 */
 groups.post('/create',
  joiValidator(schemas.groupSchema,'body'),
  controllers.createGroup);
/**
 * @swagger
 * /admin/groups/{id}:
 *  get:
 *    summary: Find Group by  id
 *    tags: [Groups]
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
 *              $ref: '#/components/schemas/GroupsResponseBody'
 *      401:
 *          description: Unauthorized
 *      404:
 *        description: Group not found
 *      500:
 *        description: Some error happened
 */
 groups.get('/:id',
  joiValidator(schemas.IdSchema,'params'),
  controllers.getGroupByID);


module.exports = groups;
