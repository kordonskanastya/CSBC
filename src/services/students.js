const { successMessage } = require('../utils');
const db = require('../db');

async function createStudent(body){
  try {
    const students = await db.createStudent(body);
    return successMessage(students);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getAllStudents(body){
  try {
    const allStudents = await db.getAllStudents(body);
    return successMessage(allStudents);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getStudentByID(req) {
  try {
    const student = await db.getStudentByID(req);
    return successMessage(student);
  } catch (err){
    throw new Error (err.message || err);
  }
}
async function updateStudent(req){
  try {
    const students = await db.updateStudent({ id: req.params.id, ...req.body });
    return successMessage(students);
  }catch (err){
    throw new Error (err.message || err);
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByID,
  updateStudent
};
