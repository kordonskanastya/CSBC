const { successMessage } = require('../utils');
const db = require('../db');
const statusCode = require('../statusCode');

async function createCourse(body){
  try {
    const newSubject = await db.createCourse(body);
    return successMessage(newSubject);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getAllCourses(body){
  try {
    const newSubject = await db.getAllCourses(body);
    return successMessage(newSubject);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getCourseByID(req) {
  try {
    const user = await db.getCourseByID(req);
    return successMessage(user);
  } catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseByID
};
