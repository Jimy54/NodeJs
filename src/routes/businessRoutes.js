const express = require("express");
var businessController = require("../controllers/businessController");
var ensureToken = require("../middlewares/ensureToken");
module.exports = function(app) {
  app.get("/business/listBusiness", businessController.listBusiness);
  app.post("/business/createBusiness", businessController.createBusiness);
  app.put("/business/uploadImage/:BusinessID", businessController.uploadImage);
  app.put("/business/updateBusiness/:BusinessID", ensureToken.ensureToken, businessController.updateBusiness);
  app.delete("/business/deleteBusiness/:BusinessID", ensureToken.ensureToken, businessController.deleteBusiness);

};
