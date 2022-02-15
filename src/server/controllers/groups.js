const services = require('../../services');
const { badRequest } = require('../../statusCode');

async function createGroup(req, res){
  try {
    const {message, code} = await services.createGroup(req.body);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function getAllGroups(req, res) {
  try {
    const {message, code} = await services.getAllGroups();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}
async function getGroupByID(req, res) {
  try {
    const {message, code} = await services.getGroupByID(req.params);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}
module.exports={
  createGroup,
  getAllGroups,
  getGroupByID
};
