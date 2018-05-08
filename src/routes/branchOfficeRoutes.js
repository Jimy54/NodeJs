const express = require('express');
var branchOfficeController = require('../controllers/branchOfficeController');


module.exports = function (app){

  app.get('/branchOffice/listBranchOffices', branchOfficeController.listBranchOffices);
  app.post('/branchOffice/createBranchOffice', branchOfficeController.createBranchOffice);
  app.put('/branchOffice/updateBranchOffice/:BranchOfficeID', branchOfficeController.updateBranchOffice);
  app.delete('/branchOffice/deleteBranchOffice/:BranchOfficeID', branchOfficeController.deleteBranchOffice);

}
