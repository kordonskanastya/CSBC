const { successMessage } = require('../utils');
const db = require('../db');

async function createGroup(body){
  try {
    const groups = await db.createGroup(body);
    return successMessage(groups);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getAllGroups(body){
  try {
    const allGroups = await db.getAllGroups(body);
    return successMessage(allGroups);
  }catch (err){
    throw new Error (err.message || err);
  }
}
async function getGroupByID(req) {
  try {
    const group = await db.getGroupByID(req);
    return successMessage(group);
  } catch (err){
    throw new Error (err.message || err);
  }
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupByID
};
