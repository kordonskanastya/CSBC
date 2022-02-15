const { successMessage } = require('../utils');
const db = require('../db');
const statusCode = require('../statusCode');

async function createCourse(body){
  try {
    const courses = await db.createCourse(body);
    return successMessage(courses);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getAllCourses(body){
  try {
    const newCourse = await db.getAllCourses(body);
    return successMessage(newCourse);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getCourseByID(req) {
  try {
    const course = await db.getCourseByID(req);
    return successMessage(course);
  } catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseByID
};
