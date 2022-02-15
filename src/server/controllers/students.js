const services = require('../../services');
const { badRequest } = require('../../statusCode');

async function createStudent(req, res){
  try {
    const {message, code} = await services.createStudent(req.body);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function getAllStudents(req, res) {
  try {
    const {message, code} = await services.getAllStudents();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}
async function getStudentByID(req, res) {
  try {
    const {message, code} = await services.getStudentByID(req.params);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateStudent(req, res){
  try {
    const {message, code} = await services.updateStudent(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

module.exports={
  createStudent,
  getAllStudents,
  getStudentByID,
  updateStudent
};
