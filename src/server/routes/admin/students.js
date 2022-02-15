const express = require('express');
const controllers = require('../../controllers');
const joiValidator = require('../../../validators/expressValidator');
const schemas = require('../../../validators/schemas');

const students = express.Router();

/**
 * @swagger
 * /admin/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentsResponseBody'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
 students.get('/',controllers.getAllStudents);
/**
 * @swagger
 * /admin/students/create:
 *   post:
 *     summary: Create student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentsRequestBody'
 *     responses:
 *       200:
 *         description: Student was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentsResponseBody'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 */
 students.post('/create',
  joiValidator(schemas.studentSchema,'body'),
  controllers.createStudent);

/**
 * @swagger
 * /admin/students/update/{id}:
 *  put:
 *    summary: Update Student by id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/StudentRequestBody'
 *    responses:
 *      200:
 *        description: Student was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      401:
 *          description: Unauthorized
 *      400:
 *        description: Student not found
 *      500:
 *        description: Some error happened
 */
students.put('/update/:id',
  joiValidator(schemas.IdSchema,'params'),
  joiValidator(schemas.studentSchema,'body'),
  controllers.updateStudent);
/**
 * @swagger
 * /admin/students/{id}:
 *  get:
 *    summary: Find Students by id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Student id
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StudentsResponseBody'
 *      401:
 *          description: Unauthorized
 *      404:
 *        description: Student not found
 *      500:
 *        description: Some error happened
 */
 students.get('/:id',
  joiValidator(schemas.IdSchema,'params'),
  controllers.getStudentByID);


module.exports = students;
