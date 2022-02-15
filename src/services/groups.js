const { successMessage } = require('../utils');
const db = require('../db');
const statusCode = require('../statusCode');

async function createGroup(body){
  try {
    const groups = await db.createGroup(body);
    return successMessage(groups);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getAllGroups(body){
  try {
    const allGroups = await db.getAllGroups(body);
    return successMessage(allGroups);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getGroupByID(req) {
  try {
    const group = await db.getGroupByID(req);
    return successMessage(group);
  } catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupByID
};
