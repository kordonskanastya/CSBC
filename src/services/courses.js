const { successMessage } = require('../utils');
const db = require('../db');

async function createCourse(body){
  try {
    const courses = await db.createCourse(body);
    return successMessage(courses);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getAllCourses(body){
  try {
    const newCourse = await db.getAllCourses(body);
    return successMessage(newCourse);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getCourseByID(req) {
  try {
    const course = await db.getCourseByID(req);
    return successMessage(course);
  } catch (err){
    throw new Error (err.message || err);
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseByID
};
