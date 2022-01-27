const express = require('express');
const controllers=require('../controllers');

const admin = express.Router();

admin.post('/reg' , controllers.createUser);
admin.put('/update/:id', controllers.updateUser);
admin.delete('/delete/:id', controllers.deleteUser);


module.exports = admin;
