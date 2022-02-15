const { successMessage } = require('../utils');
const db = require('../db');
const statusCode = require('../statusCode');

async function createSpeciality(body){
  try {
    const groups = await db.createSpeciality(body);
    return successMessage(groups);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getAllSpecialities(body){
  try {
    const newGroup = await db.getAllSpecialities(body);
    return successMessage(newGroup);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getSpecialityByID(req) {
  try {
    const group = await db.getSpecialityByID(req);
    return successMessage(group);
  } catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}

module.exports = {
  getAllSpecialities,
  getSpecialityByID,
  createSpeciality
};
