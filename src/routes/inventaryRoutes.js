const express = require("express");
var inventaryController = require("../controllers/inventaryController");

module.exports = function(app) {
  app.get("/inventary/listInventaries", inventaryController.listInventaries);
  app.post("/inventary/createInventary", inventaryController.createInventary);
  app.put(
    "/inventary/updateInventary/:InventaryID",
    inventaryController.updateInventary
  );
  app.delete(
    "/inventary/deleteInventary/:InventaryID",
    inventaryController.deleteInventary
  );
};
