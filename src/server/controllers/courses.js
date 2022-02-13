const services = require('../../services');
const { badRequest } = require('../../statusCode');

async function createCourse(req, res){
  try {
    const {message, code} = await services.createCourse(req.body);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function getAllCourses(req, res) {
  try {
    const {message, code} = await services.getAllCourses();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}
async function getCourseByID(req, res) {
  try {
    const {message, code} = await services.getCourseByID(req.params);

    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}
module.exports={
  createCourse,
  getAllCourses,
  getCourseByID
};