const services = require('../../services');
const { badRequest } = require('../../statusCode');

async function createSpeciality(req, res){
  try {
    const {message, code} = await services.createSpeciality(req.body);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function getAllSpecialities(req, res) {
  try {
    const {message, code} = await services.getAllSpecialities();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}
async function getSpecialityByID(req, res) {
  try {
    const {message, code} = await services.getSpecialityByID(req.params);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}
module.exports={
  createSpeciality,
  getAllSpecialities,
  getSpecialityByID
};
