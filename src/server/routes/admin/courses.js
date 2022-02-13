const express = require('express');
const controllers = require('../../controllers');

const courses = express.Router();

courses.get('/',controllers.getAllCourses);
courses.post('/create',controllers.createCourse);
 courses.post('/:id',controllers.getCourseByID);


module.exports=courses;