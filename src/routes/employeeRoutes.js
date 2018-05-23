const express = require("express");
var employeeController = require("../controllers/employeeController");
var authenticateEmployee = require("../middlewares/authenticateEmployee");
var ensureToken = require("../middlewares/ensureToken");
var authenticateEmployee = require("../middlewares/authenticateEmployee");
module.exports = function(app) {
  app.get(
    "/employee/listEmployees/:BusinessID",
    ensureToken.ensureToken,
    employeeController.listEmployees
  );

  app.get("/employee/listEmployees2", employeeController.listEmployees2);

  app.post(
    "/employee/loginEmployee",
    authenticateEmployee.authenticateEmployee
  );
  app.post(
    "/employee/createEmployee",
    ensureToken.ensureToken,
    employeeController.createEmployee
  );
  app.put(
    "/employee/updateEmployee/:EmployeeID",
    ensureToken.ensureToken,
    employeeController.updateEmployee
  );
  app.delete(
    "/employee/deleteEmployee/:EmployeeID",
    ensureToken.ensureToken,
    employeeController.deleteEmployee
  );

  app.post(
    "/employee/loginEmployee",
    authenticateEmployee.authenticateEmployee
  );
};
