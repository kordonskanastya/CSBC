/* eslint-disable max-len */
const express = require('express');
const controllers = require('../../controllers');
const joiValidator = require('../../../validators/expressValidator');
const schemas = require('../../../validators/schemas');

const courses = express.Router();

/**
 * @swagger
 * /admin/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoursesResponseBody'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
courses.get('/',controllers.getAllCourses);
/**
 * @swagger
 * /admin/courses/create:
 *   post:
 *     summary: Create course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoursesRequestBody'
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoursesResponseBody'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 */
courses.post('/create',
  joiValidator(schemas.coursesSchema,'body'),
  controllers.createCourse);
/**
 * @swagger
 * /admin/courses/{id}:
 *  get:
 *    summary: Find Course by  id
 *    tags: [Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Course id
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CoursesResponseBody'
 *      401:
 *          description: Unauthorized
 *      404:
 *        description: User  not found
 *      500:
 *        description: Some error happened
 */
courses.get('/:id',
  joiValidator(schemas.IdSchema,'params'),
  controllers.getCourseByID);


module.exports=courses;
