const { successMessage } = require('../utils');
const db = require('../db');
const statusCode = require('../statusCode');

async function createStudent(body){
  try {
    const students = await db.createStudent(body);
    return successMessage(students);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getAllStudents(body){
  try {
    const allStudents = await db.getAllStudents(body);
    return successMessage(allStudents);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getStudentByID(req) {
  try {
    const student = await db.getStudentByID(req);
    return successMessage(student);
  } catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function updateStudent(req){
  try {
    const students = await db.updateStudent({ id: req.params.id, ...req.body });
    return successMessage(students);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByID,
  updateStudent
};
