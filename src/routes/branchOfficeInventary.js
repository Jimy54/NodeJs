const express = require("express");
var branchOfficeInventaryController = require("../controllers/branchOfficeInventaryController");
var ensureToken = require("../middlewares/ensureToken");

module.exports = function(app) {
  app.get(
    "/branchOfficeInventary/listBranchOfficeInventary",
    branchOfficeInventaryController.listBranchOfficeInventary
  );
  app.post(
    "/branchOfficeInventary/createBranchOfficeInventary",
    branchOfficeInventaryController.createBranchOfficeInventary
  );
  app.put(
    "/branchOfficeInventary/updateBranchOfficeInventary/:BranchOfficeInventaryID",
    branchOfficeInventaryController.updateBranchOfficeInventary
  );
  app.delete(
    "/branchOfficeInventary/deleteBranchOfficeInventary/:BranchOfficeInventaryID",
    branchOfficeInventaryController.deleteBranchOfficeInventary
  );
};
