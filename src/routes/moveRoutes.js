const express = require("express");
var moveController = require("../controllers/moveController");
var ensureToken = require("../middlewares/ensureToken");

module.exports = function(app) {
  app.get("/move/listMoves", moveController.listMoves);
  app.post("/move/createMove", moveController.createMove);
  app.put("/move/updateMove/:MoveID", moveController.updateMove);
  app.delete("/move/deleteMove/:MoveID", moveController.deleteMove);
};
