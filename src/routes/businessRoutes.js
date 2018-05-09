const express = require('express');
var businessController = require('../controllers/businessController');


module.exports = function (app){

  app.get('/business/listBusiness', businessController.listBusiness);
  app.post('/business/createBusiness', businessController.createBusiness);
  app.put('/business/updateBusiness/:BusinessID', businessController.updateBusiness);
  app.delete('/business/deleteBusiness/:BusinessID', businessController.deleteBusiness);

}
