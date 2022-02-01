const services = require('../services');
const {badRequest} = require('../statusCode');


async function getAllUsers(req, res) {
  try {
    const {message, code} = await services.getAllUsers();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function createUser(req, res) {
  try {

    const {message, code} = await services.createUser(req.body);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateUser(req, res) {
  try {
    const {message, code} = await services.updateUser(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function deleteUser(req, res) {
  try {
    const {message, code} = await services.deleteUser(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function getUserByID(req, res) {
  try {
    const {message, code} = await services.getUserByID(req.params);

    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserByID,
};
