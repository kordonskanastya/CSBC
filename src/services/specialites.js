const { successMessage } = require('../utils');
const db = require('../db');

async function createSpeciality(body){
  try {
    const groups = await db.createSpeciality(body);
    return successMessage(groups);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getAllSpecialities(body){
  try {
    const newGroup = await db.getAllSpecialities(body);
    return successMessage(newGroup);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getSpecialityByID(req) {
  try {
    const group = await db.getSpecialityByID(req);
    return successMessage(group);
  } catch (err){
    throw new Error (err.message || err);
  }
}

module.exports = {
  getAllSpecialities,
  getSpecialityByID,
  createSpeciality
};
