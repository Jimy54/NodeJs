const express = require("express");
var userController = require("../controllers/userController");
var authenticateUser = require("../middlewares/authenticateUser");
var ensureToken = require("../middlewares/ensureToken");

var multipart = require('connect-multiparty');
var md_upload =  multipart({uploadDir: './src/uploads/users'});

module.exports = function(app) {
  app.get("/user/listUsers/:BusinessID", userController.listUsers);
  app.post("/user/loginUser", authenticateUser.authenticateUser);
  app.post("/user/createUser", userController.createUser);
  app.post("/user/updateUser/:UserID", md_upload, userController.updateUser);
  app.delete("/user/deleteUser/:UserID", userController.deleteUser);
};
