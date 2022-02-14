const { successMessage } = require('../utils');
const db = require('../db');

async function createCourse(body){
  const newSubject = await db.createCourse(body);
  return successMessage(newSubject);
}
async function getAllCourses(body){
  const newSubject = await db.getAllCourses(body);
  return successMessage(newSubject);
}
async function getCourseByID(req) {
  const user = await db.getCourseByID(req);
  return successMessage(user);
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseByID
};
