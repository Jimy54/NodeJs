const express = require('express');
var employeeController = require('../controllers/employeeController');


module.exports = function (app){

  app.get('/employee/listEmployees', employeeController.listEmployees);
  app.post('/employee/createEmployee', employeeController.createEmployee);
  app.put('/employee/updateEmployee/:EmployeeID', employeeController.updateEmployee);
  app.delete('/employee/deleteEmployee/:EmployeeID', employeeController.deleteEmployee);

}
