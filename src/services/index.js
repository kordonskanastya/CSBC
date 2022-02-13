const { env } = require('../config');
const Constants = require('../Constants');
const {sendEmailWithPassword} = require('../utils');
const {
  hashPassword,
  generatePassword,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils');
const db = require('../db');
const statusCode = require('../statusCode');

function successMessage(functionMessage) {
  return {
    code: statusCode.ok,
    message: functionMessage,
  };
}

async function getAllUsers() {
  const dbData = await db.getAllUsers();
  return successMessage(dbData);
}

async function createUser(body) {
  const newUser =
    await db.createUser({password:hashPassword(body.password),...body});
  return successMessage(newUser);
}

async function updateUser(req) {
  const updatedUser = await db.updateUser({ id: req.params.id,
    password: hashPassword(req.body.password),...req.body });
  return successMessage(updatedUser);
}

async function deleteUser(req) {
  const deletedUser = await db.deleteUser(req.params.id);
  return successMessage(deletedUser);
}

async function getUserByID(req) {
  const user = await db.getUserByID(req);
  return successMessage(user);
}

async function changePassword(req) {
  const pass = generatePassword();
  const user = {
    email: req.body.email,
    newPassword: hashPassword(pass),
  };
  sendEmailWithPassword(user.email, pass);
  const message = await db.changePassword(user);
  return successMessage(message);
}

async function checkPassword(body) {
  const {email: emailUser, password: passwordUser} = body;
  const userFromDB = await db.getUserByEmail(emailUser);
  if (userFromDB.length === 0) {
    throw new Error('No user was found');
  }
  const hashUserPassword = hashPassword(passwordUser);
  if (hashUserPassword !== userFromDB.password) {
    throw new Error('Password is not correct');
  }
}

async function authenticatingUser (body) {
    const { email } = body;
    await checkPassword(body);
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    await db.putRefreshToken(email, refreshToken);
    if ( env === Constants.env.dev ) {
      console.log(`Access Token: ${accessToken}`);
      console.log(`Refresh Token: ${refreshToken}`);
    }
  return accessToken;
}

async function loginCheck (body) {
  try {
    const accessToken = await authenticatingUser(body);
    return successMessage(accessToken);
  } catch (err) {
    return { code: statusCode.unauthorized, message: err.message };
  }
}

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
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID,
  changePassword,
  loginCheck,
  createCourse,
  getAllCourses,
  getCourseByID
};
