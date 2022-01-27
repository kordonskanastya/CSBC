const config = require('../config');
const hashPassword = require('../utils/hash');
const db = require('../db')(config.db);
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

async function createUser(req) {
    req['password'] = hashPassword(req['password']);
    const newUser = await db.createUser(req);

    return successMessage(newUser);
}

async function updateUser(req) {

    const updatedUser = await db.updateUser(
        {id: req.params.id, ...req.body}
    );

    return successMessage(updatedUser);
}

async function deleteUser(req) {
    const deletedUser = await db.deleteUser(req.params.id);
    return successMessage(deletedUser);
}

async function getUserByEmail(req) {

    const user = await db.getUserByEmail(req);
    return successMessage(user);
}

async function getUserByID(req) {

    const user = await db.getUserByID(req);
    return successMessage(user);
}

async function putRefreshToken(req) {
    const res = await db.addRefreshToken(req);
    return successMessage(res);
}


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserByID,
    putRefreshToken
};